import 'source-map-support/register';
import { Context } from 'koishi';
import { Config, MyPlugin } from './plugin';
export { Config } from './plugin';

export const name = 'dispose';
const plugin = new MyPlugin();
export const schema = plugin.schema;
export function apply(ctx: Context, config: Config) {
  ctx.plugin(plugin, config);
}
