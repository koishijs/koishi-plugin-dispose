import 'source-map-support/register';
import { Context, Schema, Session } from 'koishi';
import type { OneBotBot } from '@koishijs/plugin-adapter-onebot/lib/bot';

export interface PluginConfig {
  commmandName?: string;
  leaveMessage?: string;
}

export class MyPlugin {
  config: PluginConfig;
  ctx: Context;
  name = 'dispose-main';
  schema: Schema<PluginConfig> = Schema.object({
    commmandName: Schema.string()
      .description('退群命令名称')
      .default('dispose'),
    leaveMessage: Schema.string()
      .description('确认退群消息')
      .default('确定要请我退群吗？输入 yes 以退群。'),
  });
  private async onQuit(session: Session) {
    this.ctx
      .logger('dispose')
      .info(
        `Got dispose from ${session.selfId} in ${session.guildId} by ${session.userId}`,
      );
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
    await session.send(this.config.leaveMessage);
    const result = await session.prompt();
    if (result !== 'yes') {
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
  apply(ctx: Context, config: PluginConfig) {
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
