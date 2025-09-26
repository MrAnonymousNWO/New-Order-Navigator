'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Printer, Languages, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export function AppHeader() {
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePrint = () => {
    window.print();
  };

  const handleTranslate = () => {
    const currentUrl = window.location.href;
    const googleTranslateUrl = `https://translate.google.com/translate?sl=auto&tl=en&u=${encodeURIComponent(
      currentUrl
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

  return (
    <header className="sticky top-0 z-10 flex h-12 items-center gap-2 border-b bg-background px-4 sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-grow" />
      <TooltipProvider delayDuration={100}>
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
  );
}
