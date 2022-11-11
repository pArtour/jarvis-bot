import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import path from 'path';
import { connectToMongo } from './utils/mongo';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function bootstrap() {
  connectToMongo();

  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.start((ctx) => ctx.reply('Welcome'));

  bot.help((ctx) => {
    ctx.replyWithHTML(`
		Avaliable commands:
	/sync_reports - <strong>Syncronize daily reports with google sheet</strong>
	/new_record - <strong>Create a new record</strong>
	/new_note - <strong>Create a new record note</strong>
	/stop_notifications - <strong>Stop notifications for a particular record</strong>
	/add_notifications - <strong>Add notifications for a particular record</strong>
	/delete_record - <strong>Delete a record</strong>
	`);
  });

  bot.on('sticker', (ctx) => ctx.reply('👍'));
  bot.hears('hi', (ctx) => ctx.reply('Hey there'));
  bot.launch();

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

bootstrap();
