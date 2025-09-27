'use server';
/**
 * @fileOverview A webpage summarization AI agent.
 *
 * - summarizeWebpage - A function that summarizes a webpage.
 * - SummarizeWebpageInput - The input type for the summarizeWebpage function.
 * - SummarizeWebpageOutput - The return type for the summarizeWebpage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SummarizeWebpageInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to summarize.'),
  targetLanguage: z
    .string()
    .optional()
    .describe(
      'The target language for the summary (e.g., "German", "Spanish"). Defaults to the original language of the page if not provided.'
    ),
});
export type SummarizeWebpageInput = z.infer<typeof SummarizeWebpageInputSchema>;

const SummarizeWebpageOutputSchema = z.object({
  summary: z
    .string()
    .describe('A comprehensive summary of the webpage content.'),
});
export type SummarizeWebpageOutput = z.infer<
  typeof SummarizeWebpageOutputSchema
>;

export async function summarizeWebpage(
  input: SummarizeWebpageInput
): Promise<SummarizeWebpageOutput> {
  return summarizeWebpageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeWebpagePrompt',
  input: { schema: SummarizeWebpageInputSchema },
  output: { schema: SummarizeWebpageOutputSchema },
  prompt: `You are a helpful assistant designed to provide comprehensive summaries of websites.

  Given the URL of a website, your task is to summarize its content in a clear and concise manner, highlighting the key topics, main points, and purpose of the site.
  The summary should be detailed enough to give the user a good understanding of the page content without having to read it all.

  {{#if targetLanguage}}
  The final summary MUST be translated into the following language: {{{targetLanguage}}}.
  {{/if}}

  URL: {{{url}}}`,
});

const summarizeWebpageFlow = ai.defineFlow(
  {
    name: 'summarizeWebpageFlow',
    inputSchema: SummarizeWebpageInputSchema,
    outputSchema: SummarizeWebpageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
