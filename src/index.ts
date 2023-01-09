import { Context } from 'koishi';
import { PluginConfig, MyPlugin } from './plugin';
export * from './plugin';

const plugin = new MyPlugin();
export default class dispose {
  static Config: any = plugin.schema;
  constructor(ctx: Context, config: PluginConfig) {
    ctx.plugin(plugin, config);
  }
}
