'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Search, X, Bookmark } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Card } from './ui/card';
import { useRef, useState, type KeyboardEvent } from 'react';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';
import { useBookmarks } from '@/hooks/use-bookmarks.tsx';
import { useToast } from '@/hooks/use-toast';

export function Viewer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get('url');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const { toast } = useToast();

  const isBookmarked = url ? bookmarks.some((b) => b.url === url) : false;

  const handleBack = () => router.back();

  const handleSearch = () => {
    if (iframeRef.current && searchTerm) {
      try {
        iframeRef.current.contentWindow?.find(searchTerm);
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Search Error',
          description:
            'Could not search content in this frame due to security restrictions.',
        });
        console.error('Could not access iframe content for searching:', e);
      }
    }
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchTerm(''); // Reset search on close
    }
  };

  const handleToggleBookmark = () => {
    if (!url) return;
    const pageTitle = url;

    if (isBookmarked) {
      removeBookmark(url);
      toast({
        title: 'Bookmark removed',
        description: pageTitle,
      });
    } else {
      addBookmark({ url, title: pageTitle });
      toast({
        title: 'Bookmark added!',
        description: pageTitle,
      });
    }
  };

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
            'flex-1 truncate rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground',
            isSearchVisible && 'hidden sm:block'
          )}
        >
          {url}
        </div>

        {isSearchVisible && (
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search in page..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              className="h-8 pr-8"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-8 w-8"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        )}

        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleSearch}>
                {isSearchVisible ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
                <span className="sr-only">
                  {isSearchVisible ? 'Close Search' : 'Search in Page'}
                </span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isSearchVisible ? 'Close Search' : 'Search in Page'}</p>
            </TooltipContent>
          </Tooltip>

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
        </TooltipProvider>
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
