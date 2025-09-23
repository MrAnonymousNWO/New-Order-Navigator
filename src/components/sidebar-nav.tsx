'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { navigationLinks } from '@/lib/nav-links';
import Link from 'next/link';
import { Loader2, Sparkles } from 'lucide-react';
import type { NavLink } from '@/lib/nav-links';
import { useState } from 'react';
import { getWebsiteSummary } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { usePathname } from 'next/navigation';

interface SummaryState {
  summary?: string;
  isLoading: boolean;
  error?: string;
}

export function SidebarNav() {
  const [summaries, setSummaries] = useState<Record<string, SummaryState>>({});
  const { toast } = useToast();
  const pathname = usePathname();

  const handleGetSummary = async (url: string) => {
    if (summaries[url]?.summary) return;

    setSummaries((prev) => ({
      ...prev,
      [url]: { isLoading: true },
    }));

    try {
      const summary = await getWebsiteSummary(url);
      setSummaries((prev) => ({
        ...prev,
        [url]: { summary, isLoading: false },
      }));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      setSummaries((prev) => ({
        ...prev,
        [url]: { error: errorMessage, isLoading: false },
      }));
      toast({
        variant: 'destructive',
        title: 'Summarization Failed',
        description: 'Could not generate a summary for this website.',
      });
    }
  };

  const isActive = (url: string) => {
    // This is a simple check, a more robust solution might be needed for complex routing
    return pathname === `/view?url=${encodeURIComponent(url)}`;
  };

  return (
    <nav className="flex flex-col">
      <Accordion
        type="multiple"
        defaultValue={navigationLinks.map((c) => c.title)}
        className="w-full"
      >
        {navigationLinks.map((category) => (
          <AccordionItem value={category.title} key={category.title}>
            <AccordionTrigger className="px-2 text-base hover:no-underline">
              {category.title}
            </AccordionTrigger>
            <AccordionContent>
              <ul className="flex flex-col gap-1 px-2">
                {category.links.map((link: NavLink) => (
                  <li
                    key={link.url}
                    className="group flex items-center justify-between rounded-md text-sm text-sidebar-foreground/80 hover:bg-sidebar-accent"
                    data-active={isActive(link.url)}
                  >
                    <Link
                      href={`/view?url=${encodeURIComponent(link.url)}`}
                      className="flex flex-1 items-center gap-3 p-2"
                    >
                      <link.icon className="h-4 w-4 shrink-0 text-accent" />
                      <span className="truncate">{link.title}</span>
                    </Link>
                    <Popover onOpenChange={(open) => open && handleGetSummary(link.url)}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="mr-1 h-7 w-7 shrink-0 opacity-60 group-hover:opacity-100"
                          aria-label={`Summarize ${link.title}`}
                        >
                          <Sparkles className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent side="right" align="start" className="w-80">
                        <div className="space-y-2">
                          <h4 className="font-headline font-medium leading-none">
                            AI Summary
                          </h4>
                          <p className="text-sm font-semibold text-primary">
                            {link.title}
                          </p>
                          {summaries[link.url]?.isLoading && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              <span>Generating summary...</span>
                            </div>
                          )}
                          {summaries[link.url]?.summary && (
                            <p className="text-sm text-muted-foreground">
                              {summaries[link.url]?.summary}
                            </p>
                          )}
                          {summaries[link.url]?.error && (
                             <p className="text-sm text-destructive">
                              {summaries[link.url]?.error}
                            </p>
                          )}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </nav>
  );
}
