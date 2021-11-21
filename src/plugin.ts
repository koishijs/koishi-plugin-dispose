import 'source-map-support/register';
import { Context, Schema, Session } from 'koishi';
import type { OneBotBot } from '@koishijs/plugin-onebot/lib/bot';

export interface Config {
  commmandName?: string;
}

export class MyPlugin {
  config: Config;
  ctx: Context;
  name = 'dispose-main';
  schema: Schema<Config> = Schema.object({
    commmandName: Schema.string('退群命令名称').default('dispose'),
  });
  private async onQuit(session: Session) {
    this.ctx
      .logger('dispose')
      .info(`Got dispose in ${session.guildId} by ${session.userId}`);
    if (!session.guildId) {
      return;
    }
    const bot = session.bot as OneBotBot;
    const memberInfo = await bot.getGuildMember(
      session.guildId,
      session.userId,
    );
    if (
      !memberInfo.roles ||
      !memberInfo.roles.some((r) => r === 'owner' || r === 'admin')
    ) {
      return;
    }
    try {
      await bot.internal.setGroupLeave(session.guildId, false);
    } catch (e) {
      this.ctx
        .logger('dispose')
        .error(`Leave group ${session.guildId} failed: ${e.toString()}`);
    }
    return;
  }
  apply(ctx: Context, config: Config) {
    this.ctx = ctx;
    this.config = config;
    this.ctx
      .logger('dispose')
      .info(`Loaded dispose command as ${this.config.commmandName}`);
    this.ctx
      .platform('onebot')
      .guild()
      .command(this.config.commmandName, '退群')
      .usage('请不要直接踢我出去，而是使用这个命令让我自己退群。')
      .action(({ session }) => this.onQuit(session));
  }
}
