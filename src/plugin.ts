import {
  VendurePlugin,
  PluginCommonModule,
  FulfillmentState
} from '@vendure/core';
import { createCustomFulfillmentProcess } from './custom-fulfillment-proccess';
import { WebmaniaBRPluginOptions } from './types';

/**
 * This plugin create integration with WebmaniaBR API.
 *
 * To use you need to create a new instance of this plugin using the init static function
 *
 * ```ts
 * new WebmaniaBRPlugin.init({...});
 * ```
 */
@VendurePlugin({
  imports: [PluginCommonModule],
  configuration: (config) => {
    config.shippingOptions.customFulfillmentProcess?.push(
      createCustomFulfillmentProcess(WebmaniaBRPlugin.options)
    );
    return config;
  }
})
export class WebmaniaBRPlugin {
  private static options: WebmaniaBRPluginOptions<any>;

  /**
   * @description
   * Set the plugin options.
   */
  static init<I extends FulfillmentState>(
    options: WebmaniaBRPluginOptions<I>
  ): typeof WebmaniaBRPlugin {
    WebmaniaBRPlugin.options = options;
    return this;
  }
}
