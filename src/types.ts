import { Product, Address, Order } from '@vendure/core';
import { ProductCustomFields as AdvancedShippingProductCustomFields } from '@vendure-advanced-shipping/core/lib/src/types/generated-admin-schema';

export interface WebmaniaBRPluginOptions {
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
  timeout: number;
  ambiente: 'produção' | 'homologação';
}

interface ProductCustomFields {
  classeImposto?: string | null | undefined;
  ncm?: string | null | undefined;
  origem?: string | null | undefined;
}
export type ProductWithCustomFields = Product & {
  customFields: ProductCustomFields & AdvancedShippingProductCustomFields;
};
export type AddressWithCustomFields = Address & {
  customFields: {
    isCompany?: boolean | null | undefined;
    cpfCnpj?: string | null | undefined;
    rgIE?: string | null | undefined;
    telephone?: string | null | undefined;
    addressNumber?: string | null | undefined;
    addressComplemento?: string | null | undefined;
    uf?: string | null | undefined;
  };
};

export type OrderWithCustomFields = Order & {
  customFields: {
    nfeUuid?: string | null | undefined;
  };
};
