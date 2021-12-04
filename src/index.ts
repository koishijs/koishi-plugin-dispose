import 'source-map-support/register';
import { Context } from 'koishi';
import { PluginConfig, MyPlugin } from './plugin';
export * from './plugin';

export const name = 'dispose';
const plugin = new MyPlugin();
export const Config = plugin.schema;
export function apply(ctx: Context, config: PluginConfig) {
  ctx.plugin(plugin, config);
}
