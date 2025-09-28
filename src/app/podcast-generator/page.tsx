// src/app/podcast-generator/page.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Mic, Sparkles } from 'lucide-react';
import { generatePodcast, type PodcastResponse } from '@/ai/flows/podcast-generator-flow';
import { useToast } from '@/hooks/use-toast';

export default function PodcastGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PodcastResponse | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await generatePodcast(topic);
      setResult(response);
    } catch (error) {
      console.error('Error generating podcast:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred.';
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4 sm:p-6 md:p-8">
      <Card className="shadow-2xl">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Mic className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">
              AI Podcast Generator
            </CardTitle>
          </div>
          <CardDescription>
            Enter a topic, and the AI will generate a short, two-speaker podcast episode with audio.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="topic">Podcast Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., The future of renewable energy"
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading || !topic.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Podcast
                </>
              )}
            </Button>
          </CardFooter>
        </form>
        {result && (
          <CardContent className="border-t pt-6">
             <h3 className="font-headline text-2xl font-semibold">{result.title}</h3>
             <p className="mb-4 text-sm text-muted-foreground">{result.description}</p>
            {result.audioDataUri && (
                <div className="mb-6">
                     <audio controls src={result.audioDataUri} className="w-full">
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
             <div className="space-y-4 rounded-md border bg-muted/50 p-4">
                <h4 className="font-semibold">Transcript</h4>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">
                    {result.script}
                </div>
             </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
