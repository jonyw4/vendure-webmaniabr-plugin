import {
  FulfillmentState,
  FulfillmentTransitionData,
  InjectableStrategy
} from '@vendure/core';
import { Request, Response } from 'webmaniabr-js/lib/types';

export type WebmaniaBRPluginOptions<
  T extends FulfillmentState
> = InjectableStrategy & {
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
  timeout: number;
  ambiente: 'produção' | 'homologação';
  /**
   * When and how you want to trigger the creation of NFe in Fulfillment process
   */
  createNfe: {
    toState: T;
    fromState: T;
    /**
     * Use this fn to map your order and fulfillment data with the creation of NFe
     */
    map: (data: FulfillmentTransitionData) => Request.CreateNotaFiscal;
    /**
     * Use this fn to save information returned from NFe and order in database or something like that
     */
    save: (
      fulfillmentTransitionData: FulfillmentTransitionData,
      nfeData: Response.CreateNotaFiscal
    ) => Promise<string | boolean | void> | string | boolean | void;
  };
};
