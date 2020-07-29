# Vendure Advanced Shipping
![Publish](https://github.com/jonyw4/vendure-webmaniabr-plugin/workflows/Publish/badge.svg?branch=master)
![Build & Test](https://github.com/jonyw4/vendure-webmaniabr-plugin/workflows/Build%20&%20Test/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

📄 Plugin para [Vendure](https://github.com/vendure-ecommerce/vendure) para emitir NFe pelo Vendure usando Webmania BR. O plugin está em fase de testes e tem apenas o necessário para emitir nota fiscal.

## 🌟 Features
- Emite nota fiscal quando transaciona o status `Packed`.
- Adiciona `customFields` em `Address`, `Order` e `Product`

## ❗ Requisitos:
- `@vendure/core` >= 0.14.0
- `@vendure-advanced-shipping/core` >=2.1.1
- [Conferir como os dados são montados para verificar se bate com os requisitos da sua loja](https://github.com/jonyw4/vendure-webmaniabr-plugin/blob/master/src/custom-validation-proccess.ts). Se algum campo faltar por favor abrir PR ou mandar issue
- Cadastrar possíveis caixas que serão utilizadas no envio. Para isso usamos o [plugin *Advanced Shipping*](https://github.com/jonyw4/vendure-advanced-shipping)

**Você PRECISA preencher os seguintes campos no Vendure para emitir a nota fiscal**.
### `Product`
- customFields.ncm
- customFields.origem
- customFields.massUnit
- customFields.weight

**Você PRECISA solicitar os seguintes campos para seu usuário antes de finalizar a compra**:

### `Address` (`BillingAddress` e `ShippingAddress`)
- city
- country
- postalCode
- phoneNumber
- customFields.isCompany
- customFields.cpfCnpj
- customFields.rgIE
- customFields.addressNumber
- customFields.addressComplemento
- customFields.uf

## ⚙️ Instalação
### 1. Instale e configure o Vendure
### 2. Instale e configure o [Vendure Advanced Shipping](https://github.com/jonyw4/vendure-advanced-shipping#%EF%B8%8F-install)
### 3. Instale o pacote
```bash
npm install vendure-webmaniabr-plugin --save
```

### 4. Add o plugin nas configurações inserindo suas chaves e escolhendo a sua configuração
```typescript
import { WebmaniaBRPlugin } from '@vendure-advanced-shipping/core';
const config: VendureConfig = {
  ...
  plugins: [
    WebmaniaBRPlugin.init({
      consumerKey: '',
      consumerSecret: '',
      accessToken: '',
      accessTokenSecret: '',
      timeout: 10000,
      ambiente: 'homologação'
    })
  ]
}
```

### 📚 Como usar?
Depois de configurado agora podemos cadastrar informações referente a NFe na pagina do produto, como também temos como solicitar esses dados ao cliente.

- Todos dados da NFe do produto estarão disponíveis na página do produto.
- Para preencher os dados pedidos nos requisitos ao cliente você precisara utilizar a _mutation_ `setOrderBillingAddress` e `setOrderShippingAddress` em seu _storefront_
- Sempre que uma NFe é criada é salvo o ID do WebmaniaBR no _customField_ `nfeUuid` em `Order`.
- O plugin está em fase de testes e tem apenas os campos obrigatórios para a emissão da nota fiscal. Se você deseja que algum campo ou recurso seja adicionado, crie um PR ou uma issue para discutirmos.

## ❗️ Licença
MIT 