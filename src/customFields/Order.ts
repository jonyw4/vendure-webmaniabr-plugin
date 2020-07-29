import { LanguageCode, CustomFields } from '@vendure/core';

const OrderCustomFields: CustomFields['Order'] = [
  {
    name: 'nfeUuid',
    type: 'string',
    internal: true,
    label: [
      {
        languageCode: LanguageCode.pt_BR,
        value: 'ID da NFe'
      }
    ]
  }
];

export default OrderCustomFields;
