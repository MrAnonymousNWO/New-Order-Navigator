'use server';
/**
 * @fileOverview An AI agent for generating SEO and social media metadata.
 *
 * - generateMetadata - A function that handles the metadata generation process.
 * - MetadataRequest - The input type for the generateMetadata function.
 * - MetadataResponse - The return type for the generateMetadata function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const MetadataRequestSchema = z.object({
  url: z.string().url().describe('The URL of the content to analyze.'),
  topic: z.string().describe('The primary topic or cluster for the content.'),
});
export type MetadataRequest = z.infer<typeof MetadataRequestSchema>;

export const MetadataResponseSchema = z.object({
  seo: z.object({
    title: z.string().describe('A concise, SEO-friendly title (50-60 characters).'),
    description: z.string().describe('A compelling meta description (150-160 characters).'),
    keywords: z.array(z.string()).describe('A list of 5-7 relevant keywords.'),
  }),
  openGraph: z.object({
    title: z.string().describe('The title for social sharing on platforms like Facebook.'),
    description: z.string().describe('The description for social sharing.'),
    type: z.string().describe("The type of content (e.g., 'website', 'article')."),
    url: z.string().url().describe('The canonical URL of the content.'),
    image: z.string().url().describe('A suggested image URL for sharing. Can be a placeholder if none is found on the page.'),
  }),
  twitter: z.object({
    card: z.string().describe("The type of Twitter card (e.g., 'summary_large_image')."),
    title: z.string().describe('The title for sharing on Twitter.'),
    description: z.string().describe('The description for sharing on Twitter.'),
    image: z.string().url().describe('The image URL for the Twitter card.'),
  }),
  jsonLd: z.string().describe('A JSON-LD string for structured data. It should be a valid JSON object string representing a schema (e.g., Article, WebSite).'),
});
export type MetadataResponse = z.infer<typeof MetadataResponseSchema>;


export async function generateMetadata(request: MetadataRequest): Promise<MetadataResponse> {
  return metadataGeneratorFlow(request);
}

const metadataPrompt = ai.definePrompt({
  name: 'metadataPrompt',
  input: { schema: MetadataRequestSchema },
  output: { schema: MetadataResponseSchema },
  prompt: `You are an expert SEO and digital marketing strategist. Your task is to generate comprehensive metadata for a given URL and topic.

  Analyze the content at the provided URL: {{{url}}}
  The primary topic or cluster for this content is: {{{topic}}}

  Based on your analysis, generate the following metadata:
  1.  **SEO:** A concise title, a compelling meta description, and a list of relevant keywords.
  2.  **Open Graph:** Metadata for sharing on platforms like Facebook, including a title, description, content type, the canonical URL, and a relevant image URL.
  3.  **Twitter:** Metadata for creating a Twitter Card, including the card type, title, description, and image URL.
  4.  **JSON-LD:** A complete, valid JSON-LD script string for structured data. Choose an appropriate schema (like Article, WebSite, or NewsArticle) based on the content.

  Ensure all text lengths are within standard SEO and social media best practices.
  `,
});


const metadataGeneratorFlow = ai.defineFlow(
  {
    name: 'metadataGeneratorFlow',
    inputSchema: MetadataRequestSchema,
    outputSchema: MetadataResponseSchema,
  },
  async (request) => {
    const { output } = await metadataPrompt(request);
    if (!output) {
      throw new Error('Failed to generate metadata.');
    }
    return output;
  }
);
