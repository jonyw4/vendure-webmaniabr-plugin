import { LanguageCode, CustomFields } from '@vendure/core';

const AddressCustomFields: CustomFields['Address'] = [
  {
    name: 'isCompany',
    type: 'boolean',
    public: true,
    label: [
      {
        languageCode: LanguageCode.en,
        value: 'Is a company?'
      },
      {
        languageCode: LanguageCode.pt_BR,
        value: 'É uma empresa?'
      }
    ]
  },
  {
    name: 'cpfCnpj',
    type: 'string',
    public: true,
    label: [
      {
        languageCode: LanguageCode.en,
        value: 'CPF/CNPJ'
      }
    ]
  },
  {
    name: 'rgIE',
    type: 'string',
    public: true,
    label: [
      {
        languageCode: LanguageCode.en,
        value: 'RG / Inscrição estadual'
      }
    ]
  },
  {
    name: 'telephone',
    type: 'string',
    public: true,
    label: [
      {
        languageCode: LanguageCode.en,
        value: 'Phone'
      },
      {
        languageCode: LanguageCode.pt_BR,
        value: 'Telefone'
      }
    ]
  },
  {
    name: 'addressNumber',
    type: 'string',
    public: true,
    label: [
      {
        languageCode: LanguageCode.en,
        value: 'Número'
      }
    ]
  },
  {
    name: 'addressComplemento',
    type: 'string',
    public: true,
    label: [
      {
        languageCode: LanguageCode.en,
        value: 'Complemento'
      }
    ]
  }
];
export default AddressCustomFields;
