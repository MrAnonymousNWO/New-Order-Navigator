'use server';

/**
 * @fileOverview A website summarization AI agent for navigation purposes.
 *
 * - summarizeWebsiteForNavigation - A function that summarizes a website for navigation.
 * - SummarizeWebsiteForNavigationInput - The input type for the summarizeWebsiteForNavigation function.
 * - SummarizeWebsiteForNavigationOutput - The return type for the summarizeWebsiteForNavigation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeWebsiteForNavigationInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to summarize.'),
});
export type SummarizeWebsiteForNavigationInput = z.infer<typeof SummarizeWebsiteForNavigationInputSchema>;

const SummarizeWebsiteForNavigationOutputSchema = z.object({
  summary: z.string().describe('A brief summary of the website content.'),
});
export type SummarizeWebsiteForNavigationOutput = z.infer<typeof SummarizeWebsiteForNavigationOutputSchema>;

export async function summarizeWebsiteForNavigation(input: SummarizeWebsiteForNavigationInput): Promise<SummarizeWebsiteForNavigationOutput> {
  return summarizeWebsiteForNavigationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeWebsiteForNavigationPrompt',
  input: {schema: SummarizeWebsiteForNavigationInputSchema},
  output: {schema: SummarizeWebsiteForNavigationOutputSchema},
  prompt: `You are a helpful assistant designed to provide brief summaries of websites for users navigating a menu.

  Given the URL of a website, your task is to summarize its content in a concise manner, highlighting the key topics and purpose of the site.
  The summary should be no more than two sentences and focus on helping the user decide if they want to visit the site.

  URL: {{{url}}}`,
});

const summarizeWebsiteForNavigationFlow = ai.defineFlow(
  {
    name: 'summarizeWebsiteForNavigationFlow',
    inputSchema: SummarizeWebsiteForNavigationInputSchema,
    outputSchema: SummarizeWebsiteForNavigationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
