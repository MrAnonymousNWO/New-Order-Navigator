'use server';
/**
 * @fileOverview An infographic generation AI agent.
 *
 * - generateInfographic - A function that handles the infographic generation process.
 * - InfographicPoint - The type for a single point in the infographic.
 * - InfographicResponse - The return type for the generateInfographic function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { icons } from 'lucide-react';

const iconNames = Object.keys(icons) as [string, ...string[]];

export const InfographicPointSchema = z.object({
  title: z.string().describe('A short, catchy title for this point.'),
  text: z.string().describe('A brief explanation of this point (1-2 sentences).'),
  iconName: z.enum(iconNames).describe('A relevant icon name from the lucide-react library.'),
});
export type InfographicPoint = z.infer<typeof InfographicPointSchema>;

export const InfographicResponseSchema = z.object({
  title: z.string().describe('An engaging main title for the infographic.'),
  description: z.string().describe('A one-sentence summary of the infographic topic.'),
  points: z.array(InfographicPointSchema).describe('An array of 3 to 5 key points for the infographic.'),
});
export type InfographicResponse = z.infer<typeof InfographicResponseSchema>;


export async function generateInfographic(topic: string): Promise<InfographicResponse> {
  return infographicGeneratorFlow(topic);
}

const infographicPrompt = ai.definePrompt({
  name: 'infographicPrompt',
  input: { schema: z.string() },
  output: { schema: InfographicResponseSchema },
  prompt: `You are an expert graphic designer and content strategist specializing in creating compelling infographics.

  Your task is to generate the content for an infographic based on the provided topic.
  The output should be a JSON object that includes:
  1. A main 'title' for the infographic.
  2. A brief 'description' (one sentence).
  3. An array of 3 to 5 'points'. Each point must have:
     - A short 'title'.
     - A concise 'text' explanation.
     - A valid 'iconName' from the lucide-react library that visually represents the point.

  Choose icons that are conceptually related to the point's title and text.
  Available lucide-react icons: ${iconNames.join(', ')}

  Topic: {{{input}}}
  `,
});


const infographicGeneratorFlow = ai.defineFlow(
  {
    name: 'infographicGeneratorFlow',
    inputSchema: z.string(),
    outputSchema: InfographicResponseSchema,
  },
  async (topic) => {
    const { output } = await infographicPrompt(topic);
    if (!output) {
      throw new Error('Failed to generate infographic content.');
    }
    return output;
  }
);
