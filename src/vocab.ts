import { BotContext, BotConversation } from './types/BotConfig.ts';
import { VocabList } from './types/VocabList.ts';

export async function addWord(conversation: BotConversation, cxt: BotContext) {
  await cxt.reply('What polish word do you want to add?');
  const { msg: { text: word } } = await conversation.waitFor('message:text');

  await cxt.reply('What is the meaning of the word?');
  const { msg: { text: meaning } } = await conversation.waitFor('message:text');

  conversation.session.vocabList.entries.push({ word, meaning });
  conversation.log('Added to session: ', { word, meaning });

  await cxt.reply(`Added to word list:\n${word} = ${meaning}`);
}

export async function removeWord(
  conversation: BotConversation,
  cxt: BotContext,
) {
  const words = conversation.session.vocabList;
  await cxt.reply(wordList(words));
  await cxt.reply('Remove which word? (0 = cancel)');

  const { msg: { text } } = await conversation.waitFor('message:text');
  const parsed = Number.parseInt(text, 10);

  if (Number.isNaN(parsed)) {
    await cxt.reply('Invalid number, aborting...');
    return;
  }

  if (parsed < 0 || parsed > words.entries.length) {
    await cxt.reply('Index out of range, aborting...');
    return;
  }

  if (parsed === 0) {
    await cxt.reply('OK, never mind.');
    return;
  }

  const removed = conversation.session.vocabList.entries.splice(
    words.entries.length - parsed,
    1,
  );
  await cxt.reply(`OK, I have deleted the word ${removed[0]?.word} for you`);
}

export const wordList = (words: VocabList): string => {
  const len = words.entries.length;
  return words.entries.map(({ word, meaning }, i) =>
    `${len - i}: ${word} = ${meaning}`
  ).join('\n');
};
