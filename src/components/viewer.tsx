'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Camera, Search, X } from 'lucide-react';
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

export function Viewer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get('url');
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleBack = () => router.back();

  const handleSearch = () => {
    if (iframeRef.current && searchTerm) {
      try {
        // The find() method is not universally supported and may be blocked by cross-origin policies.
        // It's a progressive enhancement.
        iframeRef.current.contentWindow?.find(searchTerm);
      } catch (e) {
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
              <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-8 w-8" onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
           </div>
        )}

        <TooltipProvider delayDuration={100}>
           <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={toggleSearch}>
                {isSearchVisible ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
                <span className="sr-only">{isSearchVisible ? "Close Search" : "Search in Page"}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{isSearchVisible ? "Close Search" : "Search in Page"}</p>
            </TooltipContent>
          </Tooltip>

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
