'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Camera, Download } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card } from './ui/card';

export function Viewer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get('url');

  const handleBack = () => router.back();
  const handlePrint = () => window.print();

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

  const handleOpenExternal = () => window.open(url, '_blank', 'noopener,noreferrer');

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

        <div className="flex-1 truncate rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground">
          {url}
        </div>

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" disabled>
                <Camera className="h-5 w-5" />
                <span className="sr-only">Screenshot</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Use your system's screenshot tool (e.g., Cmd+Shift+4, Win+Shift+S)
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handlePrint}>
                <Download className="h-5 w-5" />
                <span className="sr-only">Download as PDF</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download as PDF</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleOpenExternal}>
                <ExternalLink className="h-5 w-5" />
                <span className="sr-only">Open in new tab</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open in new tab</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </header>
      <div className="flex-1 overflow-hidden">
        <iframe
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
