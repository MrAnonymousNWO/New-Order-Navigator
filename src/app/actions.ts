'use server';

import { summarizeWebsiteForNavigation } from '@/ai/flows/summarize-website-for-navigation';

export async function getWebsiteSummary(
  url: string
): Promise<string> {
  try {
    const result = await summarizeWebsiteForNavigation({ url });
    return result.summary;
  } catch (error) {
    console.error(`Error summarizing website at ${url}:`, error);
    throw new Error('Could not generate a summary for this website.');
  }
}
