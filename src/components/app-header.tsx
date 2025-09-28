
'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Printer,
  ExternalLink,
  FileText,
  Loader2,
  Share2,
  Bookmark,
  Code,
  Link as LinkIcon,
  Twitter,
  Facebook,
  Linkedin,
  Share,
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
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';
import { getWebpageSummary } from '@/app/actions';
import { useBookmarks } from '@/hooks/use-bookmarks.tsx';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';

export function AppHeader() {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = searchParams.get('url');
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const urlToShare = pathname === '/view' && url ? url : currentUrl;


  // Summary state
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [summaryError, setSummaryError] = useState<string | null>(null);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);
  const [isEmbedDialogOpen, setIsEmbedDialogOpen] = useState(false);

  // Bookmark state and functions
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const isBookmarked = url ? bookmarks.some((b) => b.url === url) : false;

  const handlePrint = () => {
    toast({
      title: 'Print / Download PDF',
      description:
        'To print or save as PDF, please open the page in a new tab using the "Open in Browser" button and use your browser\'s print function (Ctrl+P or Cmd+P).',
      duration: 8000,
    });
  };

  const handleOpenExternal = () => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not determine the URL to open.',
      });
    }
  };

  const handleSummarize = async () => {
    if (!url) {
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
      const result = await getWebpageSummary(url, userLang);
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
        await handleCopyLink();
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      console.error('Error sharing:', error);
      await handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    if (!urlToShare) return;
    try {
      await navigator.clipboard.writeText(urlToShare);
      toast({
        title: 'Link Copied',
        description: 'The URL has been copied to your clipboard.',
      });
    } catch (copyError) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not copy the URL.',
      });
    }
  };
  
  const socialShare = (platform: 'twitter' | 'facebook' | 'linkedin' | 'reddit') => {
    const encodedUrl = encodeURIComponent(urlToShare);
    const text = encodeURIComponent(document.title);
    let shareUrl = '';

    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${text}`;
        break;
      case 'reddit':
        shareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${text}`;
        break;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleToggleBookmark = () => {
    if (!url) return;

    if (isBookmarked) {
      removeBookmark(url);
      toast({
        title: 'Bookmark removed',
        description: url,
      });
    } else {
      addBookmark({ url, title: url });
      toast({
        title: 'Bookmark added!',
        description: url,
      });
    }
  };

  const embedCode = `<iframe src="${
    typeof window !== 'undefined' ? window.location.origin : ''
  }" width="100%" height="800" style="border:none;" allowfullscreen></iframe>`;

  const handleCopyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      toast({
        title: 'Copied to Clipboard',
        description: 'The embed code has been copied.',
      });
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Copy Failed',
        description: 'Could not copy the embed code.',
      });
    }
  };

  const isViewPage = pathname === '/view' && !!url;

  return (
    <>
      <header className="sticky top-0 z-10 flex h-12 items-center gap-2 border-b bg-background px-4 sm:px-6">
        <SidebarTrigger className="md:hidden" />
        <div className="flex-grow" />
        <TooltipProvider delayDuration={100}>
          {isViewPage && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={handleToggleBookmark}>
                  <Bookmark
                    className={cn(
                      'h-5 w-5',
                      isBookmarked && 'fill-primary text-primary'
                    )}
                  />
                  <span className="sr-only">
                    {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}</p>
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSummarize}
                disabled={!isViewPage || isSummarizing}
              >
                <FileText className="h-5 w-5" />
                <span className="sr-only">Summarize Page</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Summarize Page</p>
            </TooltipContent>
          </Tooltip>
          
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                    <span className="sr-only">Share Page</span>
                  </Button>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share Page</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => socialShare('twitter')}>
                <Twitter className="mr-2 h-4 w-4" />
                <span>Share on X</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => socialShare('facebook')}>
                <Facebook className="mr-2 h-4 w-4" />
                <span>Share on Facebook</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => socialShare('linkedin')}>
                <Linkedin className="mr-2 h-4 w-4" />
                <span>Share on LinkedIn</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => socialShare('reddit')}>
                <Share className="mr-2 h-4 w-4" />
                <span>Share on Reddit</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                <span>Share via...</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleCopyLink}>
                <LinkIcon className="mr-2 h-4 w-4" />
                <span>Copy Link</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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
              <Button variant="ghost" size="icon" onClick={() => setIsEmbedDialogOpen(true)}>
                <Code className="h-5 w-5" />
                <span className="sr-only">Embed App</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Embed App</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleOpenExternal} disabled={!isViewPage}>
                <ExternalLink className="h-5 w-5" />
                <span className="sr-only">Open in new tab</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Open in Browser</p>
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

      <AlertDialog
        open={isEmbedDialogOpen}
        onOpenChange={setIsEmbedDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Embed This App</AlertDialogTitle>
            <AlertDialogDescription>
              Copy and paste this HTML code into your website to embed the New Order Navigator.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Textarea
            readOnly
            value={embedCode}
            className="my-4 h-32 resize-none bg-muted font-code"
          />
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction onClick={handleCopyEmbedCode}>Copy Code</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
