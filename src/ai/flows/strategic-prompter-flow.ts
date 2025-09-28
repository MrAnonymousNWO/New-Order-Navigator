'use server';
/**
 * @fileOverview A strategic prompter AI agent that processes content from a URL
 * based on a user-provided prompt and desired output format.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import {
  generateInfographic,
  InfographicResponseSchema,
} from './infographic-generator-flow';
import {
  generateMindMap,
  type MindMapResponse,
} from './mindmap-generator-flow';
import { generatePodcast, type PodcastResponse } from './podcast-generator-flow';

const OutputFormatSchema = z.enum([
  'text',
  'podcast',
  'infographic',
  'mindmap',
]);
export type OutputFormat = z.infer<typeof OutputFormatSchema>;

const StrategicPromptInputSchema = z.object({
  url: z.string().url().describe('The URL of the content to process.'),
  prompt: z.string().describe('The user-defined strategic prompt.'),
  outputFormat: OutputFormatSchema.describe('The desired output format.'),
});
export type StrategicPromptInput = z.infer<typeof StrategicPromptInputSchema>;

// The mindmap and podcast generator flows now only export types, not the schemas.
// We can use z.any() here since the type is checked by the underlying flow.
const StrategicPromptResponseSchema = z.object({
  format: OutputFormatSchema,
  content: z.union([
    z.string(),
    z.any(), // For PodcastResponse
    InfographicResponseSchema,
    z.any(), // For MindMapResponse
  ]),
});
export type StrategicPromptResponse = {
  format: OutputFormat;
  content: string | PodcastResponse | z.infer<typeof InfographicResponseSchema> | MindMapResponse;
};


export async function strategicPrompt(
  input: StrategicPromptInput
): Promise<StrategicPromptResponse> {
  return strategicPrompterFlow(input);
}

const textGenerationPrompt = ai.definePrompt({
  name: 'strategicTextPrompt',
  input: { schema: z.object({ url: z.string(), prompt: z.string() }) },
  output: { schema: z.string() },
  prompt: `You are an AI assistant that processes web content based on user instructions.
  
  Analyze the content from the following URL: {{{url}}}
  
  Then, apply the following instruction: "{{{prompt}}}"
  
  Provide the output as a clean string.`,
});

const strategicPrompterFlow = ai.defineFlow(
  {
    name: 'strategicPrompterFlow',
    inputSchema: StrategicPromptInputSchema,
    outputSchema: StrategicPromptResponseSchema,
  },
  async ({ url, prompt, outputFormat }) => {
    // Combine the content of the URL and the user's prompt into a single topic
    // for the specialized generator flows.
    const combinedTopic = `Analyze the content from the URL ${url} and then apply the following instruction: "${prompt}"`;

    switch (outputFormat) {
      case 'text':
        const { output: textOutput } = await textGenerationPrompt({ url, prompt });
        if (!textOutput) {
            throw new Error('Failed to generate text response.');
        }
        return { format: 'text', content: textOutput };
      
      case 'podcast':
        const podcastContent = await generatePodcast(combinedTopic);
        return { format: 'podcast', content: podcastContent };

      case 'infographic':
        const infographicContent = await generateInfographic(combinedTopic);
        return { format: 'infographic', content: infographicContent };

      case 'mindmap':
        const mindmapContent = await generateMindMap(combinedTopic);
        return { format: 'mindmap', content: mindmapContent };

      default:
        throw new Error(`Unsupported output format: ${outputFormat}`);
    }
  }
);
