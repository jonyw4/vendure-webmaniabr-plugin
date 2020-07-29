import { CustomOrderProcess, OrderService } from '@vendure/core';
import WebmaniaBR from 'webmaniabr-js';
import {
  ShippingPackagesService,
  convertUnit
} from '@vendure-advanced-shipping/core';
import {
  ProductWithCustomFields,
  AddressWithCustomFields,
  OrderWithCustomFields,
  WebmaniaBRPluginOptions
} from './types';

/**
 * Create a custom validation process based on plugin options to emit NFe when order transit from Fullied to Packed state.
 *
 * When transition they will:
 *
 * - Verify if the order have all information to emit the NFe
 * - Map the data in Vendure using Advanced Shipping, Order, Customer and custom fields to WebmaniaBR information
 * - Emit NFe
 * - If work, they will save the ID of the NFe in the order
 */
export function createCustomValidationProcess(
  config: WebmaniaBRPluginOptions
): CustomOrderProcess<'Packed'> {
  let shippingPackagesService: ShippingPackagesService;
  let orderService: OrderService;
  const customerValidationProcess: CustomOrderProcess<'Packed'> = {
    init: (injector) => {
      shippingPackagesService = injector.get(ShippingPackagesService);
      orderService = injector.get(OrderService);
    },
    async onTransitionStart(fromState, toState, data) {
      const order: OrderWithCustomFields = data.order;
      // @ts-ignore
      const shippingAddress: AddressWithCustomFields = order.shippingAddress;
      // @ts-ignore
      const billingAddress: AddressWithCustomFields = order.billingAddress;
      const customer = order.customer;
      if (
        (fromState === 'PartiallyFulfilled' || fromState === 'Fulfilled') &&
        toState === 'Packed'
      ) {
        if (order.customFields.nfeUuid) {
          return;
        }
        if (order.currencyCode !== 'BRL') {
          throw new Error(
            'Os valores do pedido precisam ser na moeda brasileira'
          );
        }
        if (!customer) {
          throw new Error('Não é possível emitir Nota Fiscal sem cliente');
        }

        const orderShippingPackages = await shippingPackagesService.getOrderShippingPackages(
          order.id
        );

        if (!orderShippingPackages || !orderShippingPackages.packages) {
          throw new Error(
            `Não é possível emitir nota fiscal do pedido pois não há informação sobre quais volumes/caixas que serão enviadas`
          );
        }

        if (
          !shippingAddress.city ||
          !shippingAddress.country ||
          !shippingAddress.postalCode ||
          !shippingAddress.phoneNumber ||
          !shippingAddress.customFields.isCompany ||
          !shippingAddress.customFields.cpfCnpj ||
          !shippingAddress.customFields.rgIE ||
          !shippingAddress.customFields.addressNumber ||
          !shippingAddress.customFields.addressComplemento ||
          !shippingAddress.customFields.uf
        ) {
          throw new Error(
            'O pedido não tem informações de endereço de entrega suficiente'
          );
        }

        if (
          !billingAddress.city ||
          !billingAddress.country ||
          !billingAddress.postalCode ||
          !billingAddress.phoneNumber ||
          !billingAddress.customFields.isCompany ||
          !billingAddress.customFields.cpfCnpj ||
          !billingAddress.customFields.rgIE ||
          !billingAddress.customFields.addressNumber ||
          !billingAddress.customFields.addressComplemento ||
          !billingAddress.customFields.uf
        ) {
          throw new Error(
            'O pedido não tem informações de endereço de cobrança suficiente'
          );
        }

        const totalPackagesWeight = orderShippingPackages.packages
          .reduce(
            (weight, box) =>
              weight + convertUnit(box.totalWeight).from(box.massUnit).to('kg'),
            0
          )
          .toFixed(2);

        const wmbr = new WebmaniaBR(
          config.consumerKey,
          config.consumerSecret,
          config.accessToken,
          config.accessTokenSecret,
          config.timeout
        );
        wmbr
          .createNotaFiscal({
            operacao: 1,
            natureza_operacao: 'Venda de Produto',
            modelo: '1',
            finalidade: 1,
            ambiente: config.ambiente === 'produção' ? 1 : 2,
            pedido: {
              presenca: 2,
              modalidade_frete: 0,
              frete: order.shipping.toFixed(2),
              desconto: Number(
                order.subTotal + order.shipping - order.total
              ).toFixed(2),
              pagamento: 0,
              forma_pagamento: '99',
              tipo_integracao: 1
            },
            transporte: {
              volume: String(orderShippingPackages.packages.length),
              especie: 'Caixa',
              peso_bruto: totalPackagesWeight,
              peso_liquido: totalPackagesWeight,
              entrega: {
                endereco: shippingAddress.streetLine1,
                numero: shippingAddress.customFields.addressNumber,
                complemento: shippingAddress.customFields.addressComplemento,
                bairro: shippingAddress.streetLine2,
                cidade: shippingAddress.city,
                uf:
                  String(shippingAddress.country.code) !== 'BR'
                    ? 'EX'
                    : shippingAddress.customFields.uf,
                pais: shippingAddress.country.name,
                cep: shippingAddress.postalCode,
                telefone: shippingAddress.phoneNumber,
                email: customer.emailAddress,
                ...(shippingAddress.customFields.isCompany
                  ? {
                      cnpj: shippingAddress.customFields.cpfCnpj,
                      razao_social: shippingAddress.company
                    }
                  : {
                      cpf: shippingAddress.customFields.cpfCnpj,
                      nome_completo: shippingAddress.fullName
                    })
              }
            },
            cliente: {
              endereco: billingAddress.streetLine1,
              numero: billingAddress.customFields.addressNumber,
              complemento: billingAddress.customFields.addressComplemento,
              bairro: billingAddress.streetLine2,
              cidade: billingAddress.city,
              uf:
                billingAddress.country.code !== 'BR'
                  ? 'EX'
                  : billingAddress.customFields.uf,
              cep: billingAddress.postalCode,
              telefone: billingAddress.phoneNumber,
              email: customer.emailAddress,
              ...(billingAddress.customFields.isCompany
                ? {
                    cnpj: billingAddress.customFields.cpfCnpj,
                    razao_social: billingAddress.company
                  }
                : {
                    cpf: billingAddress.customFields.cpfCnpj,
                    nome_completo: billingAddress.fullName
                  })
            },
            // @ts-ignore
            produtos: order.lines.map((line) => {
              const productVariant = line.productVariant;
              // @ts-ignore
              const product: ProductWithCustomFields = productVariant.product;
              const {
                ncm,
                massUnit,
                weight,
                origem,
                classeImposto
              } = product.customFields;

              if (!ncm || !massUnit || !origem || !weight) {
                throw new Error(
                  `O produto de ID ${product.id} Não tem informações suficientes para emissão da nota fiscal`
                );
              }

              return {
                nome: productVariant.name,
                codigo: String(productVariant.id),
                ncm: ncm,
                quantidade: line.quantity,
                unidade: massUnit,
                peso: weight.toFixed(2),
                origem: Number(origem),
                subtotal: line.unitPriceWithTax.toFixed(2),
                total: line.totalPrice.toFixed(2),
                classe_imposto: classeImposto || undefined
              };
            })
          })
          .then(async (response) => {
            await orderService.updateCustomFields(data.ctx, order.id, {
              ...order.customFields,
              nfeUuid: response.uuid
            });
            return;
          })
          .catch((e) => e.message);
      }
    }
  };

  return customerValidationProcess;
}
