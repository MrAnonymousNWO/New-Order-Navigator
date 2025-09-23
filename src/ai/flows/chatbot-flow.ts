'use server';
/**
 * @fileOverview A simple chatbot flow that uses streaming.
 *
 * - chat - A function that handles the chatbot conversation.
 * - ChatMessage - The type for a single chat message.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { generate } from 'genkit/generate';
import { streamFlow } from 'genkit/flow';

const ChatMessageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

const ChatHistorySchema = z.array(ChatMessageSchema);

export async function chat(history: ChatMessage[]): Promise<AsyncIterable<string>> {
  const {stream} = await chatFlow({ history });
  return stream;
}

const chatFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: z.object({ history: ChatHistorySchema }),
    outputSchema: z.string(),
    stream: true,
  },
  async ({ history }) => {
    const { stream, response } = await ai.generateStream({
      model: 'googleai/gemini-2.5-flash',
      prompt: {
        messages: history.map((msg) => ({
            role: msg.role === 'assistant' ? 'model' : msg.role,
            content: [{text: msg.content}]
        }))
      },
    });

    return { stream: stream.text(), response: response };
  }
);
