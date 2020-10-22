import WebmaniaBR from 'webmaniabr-js';
import { CustomFulfillmentProcess, FulfillmentState } from '@vendure/core';
import { WebmaniaBRPluginOptions } from './types';

export function createCustomFulfillmentProcess<T extends FulfillmentState>(
  options: WebmaniaBRPluginOptions<T>
): CustomFulfillmentProcess<T> {
  const { createNfe } = options;
  const webmaniaClient = new WebmaniaBR(
    options.consumerKey,
    options.consumerSecret,
    options.accessToken,
    options.accessTokenSecret,
    options.timeout
  );

  return {
    init: async (injector) => {
      if (typeof options.init === 'function') {
        await options.init(injector);
      }
    },
    destroy: async () => {
      if (typeof options.destroy === 'function') {
        await options.destroy();
      }
    },
    onTransitionStart: async (fromState, toState, data) => {
      if (fromState === createNfe.fromState || toState === createNfe.toState) {
        return createNfe.save(
          data,
          await webmaniaClient.createNotaFiscal(createNfe.map(data))
        );
      }
    }
  };
}
