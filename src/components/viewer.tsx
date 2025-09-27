
'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card } from './ui/card';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

export function Viewer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get('url');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleBack = () => router.back();

  if (!url) {
    return (
      <div className="flex h-full items-center justify-center p-4">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-headline">Invalid URL</h2>
          <p className="text-muted-foreground">
            Please select a valid link from the sidebar.
          </p>
          <Button onClick={handleBack} className="mt-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col bg-background">
      <header className="flex shrink-0 items-center gap-2 border-b border-border p-2">
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Back</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div
          className={cn(
            'flex-1 truncate rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground'
          )}
        >
          {url}
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        <iframe
          ref={iframeRef}
          src={url}
          title={url}
          className="h-full w-full border-0"
          sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
