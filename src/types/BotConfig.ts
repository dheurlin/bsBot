import {
  Context,
  SessionFlavor,
} from 'https://deno.land/x/grammy@v1.13.0/mod.ts';
import {
  Conversation,
  ConversationFlavor,
} from 'https://deno.land/x/grammy_conversations@v1.1.0/mod.ts';
import { SessionData } from "./SessionData.ts";

export type BotContext = Context & SessionFlavor<SessionData> & ConversationFlavor;
export type BotConversation = Conversation<BotContext>;

