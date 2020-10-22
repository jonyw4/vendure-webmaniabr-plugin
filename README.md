# Vendure WebmaniaBR Plugin
![Publish](https://github.com/jonyw4/vendure-webmaniabr-plugin/workflows/Publish/badge.svg?branch=master)
![Build & Test](https://github.com/jonyw4/vendure-webmaniabr-plugin/workflows/Build%20&%20Test/badge.svg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

📄 Plugin para [Vendure](https://github.com/vendure-ecommerce/vendure) para emitir NFe pelo Vendure usando Webmania BR. O plugin está em fase de testes e tem apenas o necessário para emitir nota fiscal.

## ❗ Requisitos:
- `@vendure/core` ~ 0.16.0

## Como funciona?
Esse plugin cria um `CustomFulfillmentProcess` onde executa a biblioteca javascript do WebmaniaBR para criar NFe. Você determina em qual condição a NFe será criada e também como será salva.

## ⚙️ Instalação
```bash
npm install vendure-webmaniabr-plugin --save
```

### Add o plugin nas configurações inserindo suas chaves e escolhendo a sua configuração
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

## ❗️ Licença
MIT 