'use server';
/**
 * @fileOverview A pet analysis AI agent.
 *
 * - analyzePet - A function that handles the pet analysis process.
 * - AnalyzePetInput - The input type for the analyzePet function.
 * - PetAnalysis - The return type for the analyzePet function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzePetInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a pet, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzePetInput = z.infer<typeof AnalyzePetInputSchema>;

const PetAnalysisSchema = z.object({
  isPet: z.boolean().describe('Whether or not the image contains a pet.'),
  breed: z
    .string()
    .describe('The breed of the pet. e.g., "Golden Retriever".'),
  temperament: z
    .string()
    .describe(
      'A brief description of the pet\'s typical temperament. e.g., "Friendly, intelligent, and devoted."'
    ),
  health: z
    .string()
    .describe(
      'A brief overview of the breed\'s general health. e.g., "Generally healthy, but prone to hip dysplasia and certain heart conditions."'
    ),
});
export type PetAnalysis = z.infer<typeof PetAnalysisSchema>;

export async function analyzePet(input: AnalyzePetInput): Promise<PetAnalysis> {
  return analyzePetFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzePetPrompt',
  input: { schema: AnalyzePetInputSchema },
  output: { schema: PetAnalysisSchema },
  prompt: `You are a veterinarian specializing in identifying pet breeds.
    Analyze the provided photo to identify the pet's breed.
    First, determine if the image contains a pet (dog, cat, etc.). If not, set isPet to false and leave other fields empty.
    If it is a pet, provide its breed, a brief description of its typical temperament, and a summary of common health considerations for that breed.

    Photo: {{media url=photoDataUri}}`,
});

const analyzePetFlow = ai.defineFlow(
  {
    name: 'analyzePetFlow',
    inputSchema: AnalyzePetInputSchema,
    outputSchema: PetAnalysisSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
