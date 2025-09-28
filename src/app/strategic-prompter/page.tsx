// src/app/strategic-prompter/page.tsx
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
import { Loader2, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  strategicPrompt,
  type StrategicPromptResponse,
  type OutputFormat,
} from '@/ai/flows/strategic-prompter-flow';
import { InfographicPoint, InfographicResponse } from '@/ai/flows/infographic-generator-flow';
import { MindMapNode, MindMapResponse } from '@/ai/flows/mindmap-generator-flow';
import { PodcastResponse } from '@/ai/flows/podcast-generator-flow';
import { icons } from 'lucide-react';
import { cn } from '@/lib/utils';

const LucideIcon = ({ name, className }: { name: string; className: string }) => {
  const LucideIconComponent = icons[name as keyof typeof icons];
  if (!LucideIconComponent) {
    return null;
  }
  return <LucideIconComponent className={className} />;
};

const MindMapNodeComponent = ({ node, level = 0 }: { node: MindMapNode, level?: number }) => {
  const isRoot = level === 0;
  return (
    <li className={cn(!isRoot && "ml-6 mt-2")}>
      <div className="flex items-center gap-2">
         <div className={cn(
            "h-2 w-2 rounded-full",
            isRoot ? "bg-primary" : "bg-muted-foreground/50",
         )} />
        <span className={cn(
            "font-medium",
            isRoot ? "text-lg text-primary" : "text-base",
        )}>
          {node.title}
        </span>
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="mt-2 border-l-2 border-primary/20 pl-4">
          {node.children.map((child, index) => (
            <MindMapNodeComponent key={index} node={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};


export default function StrategicPrompterPage() {
  const [url, setUrl] = useState('');
  const [prompt, setPrompt] = useState('');
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('text');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<StrategicPromptResponse | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !prompt.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await strategicPrompt({ url, prompt, outputFormat });
      setResult(response);
    } catch (error) {
      console.error('Error in strategic prompt:', error);
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
  
  const renderResult = () => {
    if (!result || !result.content) return null;

    switch (result.format) {
      case 'text':
        return (
          <Card>
            <CardHeader>
              <CardTitle>Generated Text</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm prose-invert max-w-none whitespace-pre-wrap">
              {result.content as string}
            </CardContent>
          </Card>
        );
      case 'podcast':
        const podcast = result.content as PodcastResponse;
        return (
          <Card>
            <CardHeader>
              <CardTitle>{podcast.title}</CardTitle>
              <CardDescription>{podcast.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {podcast.audioDataUri && (
                <div className="mb-6">
                  <audio controls src={podcast.audioDataUri} className="w-full">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
              <div className="space-y-4 rounded-md border bg-muted/50 p-4">
                <h4 className="font-semibold">Transcript</h4>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap text-foreground">
                  {podcast.script}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      case 'infographic':
        const infographic = result.content as InfographicResponse;
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-headline text-4xl font-bold">{infographic.title}</h2>
              <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">{infographic.description}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {infographic.points.map((point, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader className="flex flex-col items-center text-center">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <LucideIcon name={point.iconName} className="h-6 w-6" />
                    </div>
                    <CardTitle className="font-headline text-xl">{point.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 text-center text-muted-foreground">
                    {point.text}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'mindmap':
        const mindmap = result.content as MindMapResponse;
        return (
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">{mindmap.topic}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <MindMapNodeComponent node={mindmap.map} level={0} />
              </ul>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
      <Card className="shadow-2xl mb-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Wand2 className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">
              Strategic Prompter
            </CardTitle>
          </div>
          <CardDescription>
            Provide a URL, a strategic prompt, and an output format to process content with AI.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="url">Content URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/article"
                disabled={loading}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="prompt">Strategic Prompt</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Summarize this content for a journalist in 3 bullet points."
                disabled={loading}
                className="min-h-[100px]"
              />
            </div>
            <div>
              <Label>Output Format</Label>
              <RadioGroup
                value={outputFormat}
                onValueChange={(value) => setOutputFormat(value as OutputFormat)}
                className="mt-2 flex flex-wrap gap-4"
                disabled={loading}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="text" />
                  <Label htmlFor="text">Text</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="podcast" id="podcast" />
                  <Label htmlFor="podcast">Podcast</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="infographic" id="infographic" />
                  <Label htmlFor="infographic">Infographic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mindmap" id="mindmap" />
                  <Label htmlFor="mindmap">Mind Map</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading || !url.trim() || !prompt.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
      
      {result && !loading && (
        <div className="mt-8">
            {renderResult()}
        </div>
      )}
    </div>
  );
}
