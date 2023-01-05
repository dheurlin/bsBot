import 'https://deno.land/x/dotenv@v3.2.0/load.ts';
import { Bot, session } from 'https://deno.land/x/grammy@v1.13.0/mod.ts';
import { freeStorage } from 'https://deno.land/x/grammy_storages@v2.0.2/free/src/mod.ts';

import {
  conversations,
  createConversation,
} from 'https://deno.land/x/grammy_conversations@v1.1.0/mod.ts';

import { genShuffle } from './cube.ts';
import { initialData, SessionData } from './types/SessionData.ts';
import { BotContext } from './types/BotConfig.ts';
import { addWord, removeWord, wordList } from './vocab.ts';

const API_KEY = Deno.env.get('API_KEY');
if (typeof API_KEY !== 'string') throw new Error('API_KEY missing!');

const bot = new Bot<BotContext>(API_KEY);

bot.use(session({
  initial: initialData,
  storage: freeStorage<SessionData>(bot.token),
}));

bot.use(conversations());

bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'));

// Always exit any conversation upon /cancel
bot.command('cancel', async (ctx) => {
  await ctx.conversation.exit();
  await ctx.reply('Leaving.');
});

bot.command('shuffle', async (cxt) => {
  cxt.reply(await genShuffle());
});

bot.use(createConversation(addWord));
bot.command('addword', async (cxt) => {
  await cxt.conversation.enter('addWord');
});

bot.use(createConversation(removeWord));
bot.command('removeword', async (cxt) => {
  await cxt.conversation.enter('removeWord');
});

bot.command('words', async (cxt) => {
  await cxt.reply('Here is your current word list:');
  await cxt.reply(wordList(cxt.session.vocabList));
});

// Handle other messages.
bot.on('message', (ctx) => {
  ctx.reply('Weird innit?');
});

bot.catch((err) => console.error(err));
bot.start();
