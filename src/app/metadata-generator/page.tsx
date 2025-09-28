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
import { Code, Copy, Loader2, Sparkles, Tags } from 'lucide-react';
import { generateMetadata, type MetadataRequest, type MetadataResponse } from '@/ai/flows/metadata-generator-flow';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function MetadataGeneratorPage() {
  const [request, setRequest] = useState<MetadataRequest>({ url: '', topic: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<MetadataResponse | null>(null);
  const { toast } = useToast();

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.url.trim() || !request.topic.trim()) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await generateMetadata(request);
      setResult(response);
    } catch (error) {
      console.error('Error generating metadata:', error);
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

  const renderMetaTag = (property: string, content: string) => (
    <div className="flex items-center justify-between gap-2 rounded-md bg-muted p-2 text-sm">
      <code className="text-muted-foreground">
        <span className="text-sky-400">{`<meta `}</span>
        <span className="text-purple-400">{`property`}</span>
        <span className="text-foreground">{`="`}</span>
        <span className="text-amber-400">{property}</span>
        <span className="text-foreground">{`" `}</span>
        <span className="text-purple-400">{`content`}</span>
        <span className="text-foreground">{`="`}</span>
        <span className="text-amber-400 truncate">{content}</span>
        <span className="text-foreground">{`" />`}</span>
      </code>
      <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0" onClick={() => handleCopyToClipboard(content)}>
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
      <Card className="shadow-2xl mb-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Tags className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">
              AI Metadata Generator
            </CardTitle>
          </div>
          <CardDescription>
            Enter a URL and a topic/cluster to generate SEO, Open Graph, Twitter, and JSON-LD metadata.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="url">Content URL</Label>
              <Input
                id="url"
                type="url"
                value={request.url}
                onChange={(e) => setRequest({ ...request, url: e.target.value })}
                placeholder="https://example.com/my-article"
                disabled={loading}
                required
              />
            </div>
             <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="topic">Topic / Cluster</Label>
              <Input
                id="topic"
                value={request.topic}
                onChange={(e) => setRequest({ ...request, topic: e.target.value })}
                placeholder="e.g., Renewable Energy"
                disabled={loading}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading || !request.url.trim() || !request.topic.trim()}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Metadata
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEO Meta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Title</Label>
                <div className="flex items-center gap-2">
                  <p className="flex-1 rounded-md bg-muted px-3 py-2 text-sm">{result.seo.title}</p>
                  <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(result.seo.title)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Description</Label>
                 <div className="flex items-center gap-2">
                  <p className="flex-1 rounded-md bg-muted px-3 py-2 text-sm">{result.seo.description}</p>
                   <Button variant="ghost" size="icon" onClick={() => handleCopyToClipboard(result.seo.description)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div>
                <Label>Keywords</Label>
                <div className="flex flex-wrap gap-2 pt-2">
                  {result.seo.keywords.map(kw => <Badge key={kw}>{kw}</Badge>)}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Open Graph (Facebook)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {renderMetaTag('og:title', result.openGraph.title)}
                {renderMetaTag('og:description', result.openGraph.description)}
                {renderMetaTag('og:type', result.openGraph.type)}
                {renderMetaTag('og:url', result.openGraph.url)}
                {renderMetaTag('og:image', result.openGraph.image)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Twitter Card</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {renderMetaTag('twitter:card', result.twitter.card)}
                {renderMetaTag('twitter:title', result.twitter.title)}
                {renderMetaTag('twitter:description', result.twitter.description)}
                {renderMetaTag('twitter:image', result.twitter.image)}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>JSON-LD Structured Data</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-md bg-muted p-4">
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => handleCopyToClipboard(result.jsonLd)}>
                  <Copy className="h-4 w-4" />
                </Button>
                <pre className="text-xs whitespace-pre-wrap overflow-auto">
                  <code>{JSON.stringify(JSON.parse(result.jsonLd), null, 2)}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
