// src/app/mindmap-generator/page.tsx
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
import { Loader2, Sparkles, BrainCircuit } from 'lucide-react';
import { generateMindMap, type MindMapResponse, type MindMapNode } from '@/ai/flows/mindmap-generator-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Recursive component to render the mind map nodes
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


export default function MindMapGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MindMapResponse | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await generateMindMap(topic);
      setResult(response);
    } catch (error) {
      console.error('Error generating mind map:', error);
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
    <div className="container mx-auto max-w-2xl py-4 px-2">
      <Card className="shadow-2xl mb-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">
              AI Mind Map Generator
            </CardTitle>
          </div>
          <CardDescription>
            Enter a topic, and the AI will generate a hierarchical mind map to help you organize your thoughts.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="topic">Mind Map Topic</Label>
              <Input
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., Planning a vacation"
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
                  Generate Mind Map
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {result && (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{result.topic}</CardTitle>
                <CardDescription>Generated mind map structure.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2">
                    <MindMapNodeComponent node={result.map} level={0} />
                </ul>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
