// src/app/infographic-generator/page.tsx
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
import { Loader2, Sparkles, Image as ImageIcon, Icon } from 'lucide-react';
import { generateInfographic, type InfographicResponse, type InfographicPoint } from '@/ai/flows/infographic-generator-flow';
import { useToast } from '@/hooks/use-toast';
import { icons } from 'lucide-react';

const LucideIcon = ({ name, className }: { name: string; className: string }) => {
  const LucideIconComponent = icons[name as keyof typeof icons];
  if (!LucideIconComponent) {
    return <ImageIcon className={className} />; // Fallback icon
  }
  return <LucideIconComponent className={className} />;
};

export default function InfographicGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<InfographicResponse | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await generateInfographic(topic);
      setResult(response);
    } catch (error) {
      console.error('Error generating infographic:', error);
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
    <div className="container mx-auto max-w-4xl py-4 px-2">
      <Card className="shadow-2xl mb-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ImageIcon className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">
              AI Infographic Generator
            </CardTitle>
          </div>
          <CardDescription>
            Enter a topic, and the AI will generate a structured infographic with key points and icons. This tool is perfect for visualizing complex information in a simple, engaging format.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="topic">Infographic Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., The benefits of solar power"
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
                  Generate Infographic
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {result && (
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="font-headline text-4xl font-bold">{result.title}</h2>
            <p className="mx-auto mt-2 max-w-2xl text-lg text-muted-foreground">{result.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {result.points.map((point, index) => (
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
      )}
    </div>
  );
}
