import { VendurePlugin, PluginCommonModule } from '@vendure/core';
import { createCustomValidationProcess } from './custom-validation-proccess';
import { WebmaniaBRPluginOptions } from './types';
import injectCustomFields from './injectCustomFields';
import customFields from './customFields';

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
    config.orderOptions.process.push(
      createCustomValidationProcess(WebmaniaBRPlugin.options)
    );
    return injectCustomFields(config, customFields);
  }
})
export class WebmaniaBRPlugin {
  private static options: WebmaniaBRPluginOptions;

  /**
   * @description
   * Set the plugin options.
   */
  static init(options: WebmaniaBRPluginOptions): typeof WebmaniaBRPlugin {
    WebmaniaBRPlugin.options = options;
    return this;
  }
}
