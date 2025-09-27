
'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Printer,
  Languages,
  ExternalLink,
  Bookmark,
  FileText,
  Loader2,
  Share2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { getWebpageSummary } from '@/app/actions';

export function AppHeader() {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);

  const handlePrint = () => {
    toast({
      title: 'Print / Download PDF',
      description:
        'To print or save as PDF, please open the page in a new tab using the "Open in Browser" button and use your browser\'s print function (Ctrl+P or Cmd+P).',
      duration: 8000,
    });
  };

  const handleTranslate = () => {
    let urlToTranslate = window.location.href;
    if (pathname === '/view') {
      const url = searchParams.get('url');
      if (url) {
        urlToTranslate = url;
      }
    }
    const googleTranslateUrl = `https://translate.google.com/translate?sl=auto&tl=en&u=${encodeURIComponent(
      urlToTranslate
    )}`;
    window.open(googleTranslateUrl, '_blank', 'noopener,noreferrer');
  };

  const handleOpenExternal = () => {
    let externalUrl;
    if (pathname === '/view') {
      externalUrl = searchParams.get('url');
    } else {
      externalUrl = window.location.href;
    }

    if (externalUrl) {
      window.open(externalUrl, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not determine the URL to open.',
      });
    }
  };

  const handleBookmark = () => {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
    const shortcut = isMac ? 'Cmd+D' : 'Ctrl+D';
    toast({
      title: 'Bookmark this page',
      description: `Press ${shortcut} to add this page to your bookmarks.`,
    });
  };

  const handleSummarize = async () => {
    const urlToSummarize = searchParams.get('url');
    if (!urlToSummarize) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No URL to summarize.',
      });
      return;
    }

    setIsSummarizing(true);
    setSummary(null);
    setSummaryError(null);
    setIsSummaryDialogOpen(true);

    try {
      const userLang = navigator.language || 'en';
      const result = await getWebpageSummary(urlToSummarize, userLang);
      setSummary(result);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred.';
      setSummaryError(errorMessage);
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleShare = async () => {
    let urlToShare;
    if (pathname === '/view') {
      urlToShare = searchParams.get('url');
    } else {
      urlToShare = window.location.href;
    }

    if (!urlToShare) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not determine the URL to share.',
      });
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: document.title,
          url: urlToShare,
        });
      } else {
        await navigator.clipboard.writeText(urlToShare);
        toast({
          title: 'Link Copied',
          description: 'The URL has been copied to your clipboard.',
        });
      }
    } catch (error) {
      // Don't show an error if the user cancels the share dialog.
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }

      console.error('Error sharing:', error);
      // Fallback for when sharing is cancelled or fails
      try {
        await navigator.clipboard.writeText(urlToShare);
        toast({
          title: 'Link Copied',
          description:
            'Sharing failed. The URL has been copied to your clipboard instead.',
        });
      } catch (copyError) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not share or copy the URL.',
        });
      }
    }
  };

  const canSummarize = pathname === '/view' && !!searchParams.get('url');

  return (
    <>
      <header className="sticky top-0 z-10 flex h-12 items-center gap-2 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger className="md:hidden" />
        <div className="flex-grow" />
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSummarize}
                disabled={!canSummarize || isSummarizing}
              >
                <FileText className="h-5 w-5" />
                <span className="sr-only">Summarize Page</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Summarize Page</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleShare}>
                <Share2 className="h-5 w-5" />
                <span className="sr-only">Share Page</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share Page</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleBookmark}>
                <Bookmark className="h-5 w-5" />
                <span className="sr-only">Bookmark Page</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bookmark Page</p>
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
              <p>Open in Browser</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handlePrint}>
                <Printer className="h-5 w-5" />
                <span className="sr-only">Print / Download PDF</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Print / Download PDF</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleTranslate}>
                <Languages className="h-5 w-5" />
                <span className="sr-only">Translate Page</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Translate Page</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </header>

      <AlertDialog
        open={isSummaryDialogOpen}
        onOpenChange={setIsSummaryDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>AI Page Summary</AlertDialogTitle>
            <AlertDialogDescription>
              {isSummarizing && (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Generating summary...</span>
                </span>
              )}
              {summary && <span className="whitespace-pre-wrap">{summary}</span>}
              {summaryError && (
                <span className="text-destructive">{summaryError}</span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
