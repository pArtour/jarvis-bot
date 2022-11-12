import { Telegraf } from 'telegraf';
import * as dotenv from 'dotenv';
import path from 'path';
import userService from './services/user.service';
import { connectToMongo } from './utils/prisma';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function bootstrap() {
  connectToMongo();

  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.start(async (ctx) => {
    console.log(ctx.update.message.from);
    const userInput = {
      userId: ctx.update.message.from.id,
      first_name: ctx.update.message.from.first_name,
      last_name: ctx.update.message.from.last_name,
      username: ctx.update.message.from.username,
    };
    const user = await userService.createUser(userInput);
    // console.log({user});

    ctx.reply(`Welcome`);
  });

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
  bot.hears('hi', async (ctx) => {
    ctx.reply('Hey there');

    ctx.reply(JSON.stringify(ctx.update.message.from));
    const user = await userService.findUser({ id: ctx.update.message.from.id });

    if (!user) {
      console.log('NO USER');
    }

    console.log({ userFromDB: user });
  });
  bot.launch();

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
}

bootstrap();
