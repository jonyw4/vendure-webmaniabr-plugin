import { LanguageCode, CustomFields } from '@vendure/core';

const ProductCustomFields: CustomFields['Product'] = [
  {
    name: 'classeImposto',
    type: 'string',
    public: true,
    label: [
      {
        languageCode: LanguageCode.pt_BR,
        value:
          'Definição automática de impostos, informe a referência da classe de imposto cadastrado no painel WebmaniaBR'
      }
    ]
  },
  {
    name: 'ncm',
    type: 'string',
    public: true,
    label: [
      {
        languageCode: LanguageCode.pt_BR,
        value: 'Código NCM'
      }
    ]
  },
  {
    name: 'origem',
    type: 'string',
    public: true,
    label: [
      {
        languageCode: LanguageCode.pt_BR,
        value: 'Origem do produto'
      }
    ],
    options: [
      {
        label: [
          {
            languageCode: LanguageCode.pt_BR,
            value: '0 - Nacional, exceto as indicadas nos códigos 3, 4, 5 e 8'
          }
        ],
        value: '0'
      },
      {
        label: [
          {
            languageCode: LanguageCode.pt_BR,
            value:
              '1 - Estrangeira - Importação direta, exceto a indicada no código 6'
          }
        ],
        value: '1'
      },
      {
        label: [
          {
            languageCode: LanguageCode.pt_BR,
            value:
              '2 - Estrangeira - Adquirida no mercado interno, exceto a indicada no código 7'
          }
        ],
        value: '2'
      },
      {
        label: [
          {
            languageCode: LanguageCode.pt_BR,
            value:
              '3 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 40% e inferior ou igual a 70%'
          }
        ],
        value: '3'
      },
      {
        label: [
          {
            languageCode: LanguageCode.pt_BR,
            value:
              '4 - Nacional, cuja produção tenha sido feita em conformidade com os processos produtivos básicos de que tratam as legislações citadas nos Ajustes'
          }
        ],
        value: '4'
      },
      {
        label: [
          {
            languageCode: LanguageCode.pt_BR,
            value:
              '5 - Nacional, mercadoria ou bem com Conteúdo de Importação inferior ou igual a 40%'
          }
        ],
        value: '5'
      },
      {
        label: [
          {
            languageCode: LanguageCode.pt_BR,
            value:
              '6 - Estrangeira - Importação direta, sem similar nacional, constante em lista da CAMEX e gás natural'
          }
        ],
        value: '6'
      },
      {
        label: [
          {
            languageCode: LanguageCode.pt_BR,
            value:
              '7 - Estrangeira - Adquirida no mercado interno, sem similar nacional, constante lista CAMEX e gás natural'
          }
        ],
        value: '7'
      },
      {
        label: [
          {
            languageCode: LanguageCode.pt_BR,
            value:
              '8 - Nacional, mercadoria ou bem com Conteúdo de Importação superior a 70%'
          }
        ],
        value: '8'
      }
    ]
  }
];

export default ProductCustomFields;
