'use server';
/**
 * @fileOverview A podcast generation AI agent.
 *
 * - generatePodcast - A function that handles the podcast generation process.
 * - PodcastResponse - The return type for the generatePodcast function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import wav from 'wav';

const PodcastScriptSchema = z.object({
    title: z.string().describe('An engaging title for the podcast episode.'),
    description: z.string().describe('A brief, one-sentence summary of the podcast episode.'),
    script: z.string().describe(
        "The full podcast script. It MUST be formatted with 'Speaker1: ' and 'Speaker2: ' labels for each line of dialogue to support multi-speaker text-to-speech."
    ),
});

// We can export the TypeScript type, but not the Zod schema constant.
export type PodcastResponse = z.infer<typeof PodcastScriptSchema> & {
    audioDataUri?: string;
};


export async function generatePodcast(topic: string): Promise<PodcastResponse> {
  return podcastGeneratorFlow(topic);
}

const podcastScriptPrompt = ai.definePrompt({
  name: 'podcastScriptPrompt',
  input: { schema: z.string() },
  output: { schema: PodcastScriptSchema },
  prompt: `You are a creative podcast scriptwriter. Your task is to generate a short, engaging podcast episode script based on a given topic.

  The podcast should feature two speakers: Speaker1 and Speaker2.
  The script should be conversational, informative, and around 200-300 words long.
  It is CRITICAL that every line of dialogue is prefixed with either "Speaker1: " or "Speaker2: " to ensure proper audio generation.

  Topic: {{{input}}}
  `,
});

const podcastGeneratorFlow = ai.defineFlow(
  {
    name: 'podcastGeneratorFlow',
    inputSchema: z.string(),
    // Define the schema inline here instead of exporting it.
    outputSchema: PodcastScriptSchema.extend({
      audioDataUri: z.string().optional().describe('The generated audio as a base64-encoded data URI.'),
    }),
  },
  async (topic) => {
    // Step 1: Generate the podcast script.
    const scriptResponse = await podcastScriptPrompt(topic);
    const podcast = scriptResponse.output;

    if (!podcast) {
      throw new Error('Failed to generate podcast script.');
    }

    // Step 2: Generate the audio from the script.
    const { media } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash-preview-tts'),
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          multiSpeakerVoiceConfig: {
            speakerVoiceConfigs: [
              {
                speaker: 'Speaker1',
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Algenib' } },
              },
              {
                speaker: 'Speaker2',
                voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Achernar' } },
              },
            ],
          },
        },
      },
      prompt: podcast.script,
    });
    
    if (!media) {
      // Don't throw an error, just return without audio
      return podcast;
    }

    // Step 3: Convert PCM audio to WAV format.
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavData = await toWav(audioBuffer);
    
    return {
        ...podcast,
        audioDataUri: 'data:audio/wav;base64,' + wavData,
    };
  }
);

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}
