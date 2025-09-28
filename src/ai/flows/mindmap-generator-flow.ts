'use server';
/**
 * @fileOverview A mind map generation AI agent.
 *
 * - generateMindMap - A function that handles the mind map generation process.
 * - MindMapNode - The recursive type for a node in the mind map.
 * - MindMapResponse - The return type for the generateMindMap function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Using a recursive schema for the mind map structure.
// See: https://zod.dev/?id=recursive-types
const MindMapNodeSchema: z.ZodType<MindMapNode> = z.lazy(() =>
  z.object({
    title: z.string().describe('The title of this node.'),
    children: z
      .array(MindMapNodeSchema)
      .optional()
      .describe('An array of child nodes.'),
  })
);

export type MindMapNode = {
  title: string;
  children?: MindMapNode[];
};

const MindMapResponseSchema = z.object({
  topic: z.string().describe('The central topic of the mind map.'),
  map: MindMapNodeSchema.describe('The root node of the mind map.'),
});
export type MindMapResponse = z.infer<typeof MindMapResponseSchema>;

export async function generateMindMap(topic: string): Promise<MindMapResponse> {
  return mindMapGeneratorFlow(topic);
}

const mindMapPrompt = ai.definePrompt({
  name: 'mindMapPrompt',
  input: { schema: z.string() },
  output: { schema: MindMapResponseSchema },
  prompt: `You are an expert at creating structured mind maps for any given topic.

  Your task is to generate a mind map based on the provided topic.
  The output must be a JSON object with a central 'topic' and a root 'map' node.
  The mind map should be hierarchical, with a main topic that branches out into several main nodes (children).
  Each of these main nodes can further branch out into sub-nodes.
  Aim for a depth of at least 2-3 levels where appropriate.

  Topic: {{{input}}}
  `,
});

const mindMapGeneratorFlow = ai.defineFlow(
  {
    name: 'mindMapGeneratorFlow',
    inputSchema: z.string(),
    outputSchema: MindMapResponseSchema,
  },
  async (topic) => {
    const { output } = await mindMapPrompt(topic);
    if (!output) {
      throw new Error('Failed to generate mind map content.');
    }
    return output;
  }
);
