// src/app/pet-analyzer/page.tsx
'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Dog, Sparkles } from 'lucide-react';
import type { PetAnalysis } from '@/ai/flows/analyze-pet-flow';
import { analyzePet } from '@/ai/flows/analyze-pet-flow';
import { useToast } from '@/hooks/use-toast';
import placeholderImage from '@/lib/placeholder-images.json';

export default function PetAnalyzerPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(
    placeholderImage.placeholderImages[0]?.imageUrl || null
  );
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<PetAnalysis | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: 'destructive',
          title: 'File too large',
          description: 'Please upload an image smaller than 4MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageDataUri(result);
        setAnalysis(null);
        setError(null);
      };
      reader.onerror = () => {
        setError('Failed to read the image file.');
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'There was an error reading the image file.',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = async () => {
    if (!imageDataUri) {
      setError('Please upload an image first.');
      toast({
        variant: 'destructive',
        title: 'No Image',
        description: 'Please upload an image before analyzing.',
      });
      return;
    }

    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzePet({ photoDataUri: imageDataUri });
      if (!result.isPet) {
        setError("This doesn't look like a pet. Please try another image.");
        toast({
          variant: 'destructive',
          title: 'Not a Pet',
          description: "The AI couldn't identify a pet in the image.",
        });
        setAnalysis(null);
      } else {
        setAnalysis(result);
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Analysis failed: ${errorMessage}`);
      toast({
        variant: 'destructive',
        title: 'Analysis Failed',
        description:
          'Something went wrong while analyzing the pet. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl">
        <Card className="mb-8 w-full border-0 bg-transparent text-center shadow-none">
          <CardHeader>
            <div className="mx-auto flex items-center justify-center gap-2">
              <Dog className="h-10 w-10 text-primary" />
              <CardTitle className="font-headline text-5xl tracking-tight">
                Pet-tential
              </CardTitle>
            </div>
            <p className="pt-2 text-lg text-muted-foreground">
              Unleash your pet's potential with AI
            </p>
          </CardHeader>
        </Card>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <Card className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl shadow-lg">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Pet preview"
                  fill
                  className="object-cover"
                  data-ai-hint="dog photo"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-muted p-8 text-center text-muted-foreground">
                  <Dog className="mb-4 h-16 w-16" />
                  <p>Upload a photo of your pet to begin</p>
                </div>
              )}
            </Card>
            <div className="flex w-full max-w-md gap-2">
              <Input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg"
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
                variant="outline"
              >
                Upload Photo
              </Button>
              <Button
                onClick={handleAnalyzeClick}
                disabled={loading || !imageDataUri}
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Analyze Pet
              </Button>
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="mb-4 font-headline text-3xl">Analysis</h2>
            <div className="w-full flex-grow">
              {loading && (
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Analyzing your pet...</p>
                  </div>
                </div>
              )}
              {error && (
                <Alert variant="destructive">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {analysis && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Breed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {analysis.breed}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Temperament</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {analysis.temperament}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl">Health</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {analysis.health}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}
               {!loading && !error && !analysis && (
                <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-8 text-center text-muted-foreground">
                  <p>Upload a photo and click "Analyze Pet" to see the results here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
