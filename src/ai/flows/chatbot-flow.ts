'use server';
/**
 * @fileOverview A simple chatbot flow that uses streaming.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatMessage - The type for a single chat message.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const ChatHistorySchema = z.array(ChatMessageSchema);

export async function chat(history: ChatMessage[]): Promise<AsyncIterable<string>> {
  // To optimize performance and reduce token usage, we'll only send the last 10 messages.
  const recentHistory = history.slice(-10);

  const { stream } = await ai.generateStream({
    model: 'googleai/gemini-2.5-flash',
    prompt: {
      messages: recentHistory.map((msg) => ({
        role: msg.role === 'assistant' ? 'model' : msg.role,
        content: [{ text: msg.content }],
      })),
    },
  });

  return stream.text;
}
