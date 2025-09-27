
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
import { useState, useMemo, useEffect } from 'react';
import { getWebsiteSummary } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { usePathname, useSearchParams } from 'next/navigation';
import { useSidebar } from '@/components/ui/sidebar';

interface SummaryState {
  summary?: string;
  isLoading: boolean;
  error?: string;
}

export function SidebarNav() {
  const [summaries, setSummaries] = useState<Record<string, SummaryState>>({});
  const { toast } = useToast();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { setOpenMobile } = useSidebar();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const linksThatBlockEmbedding = [
    'https://bit.ly/m/world-succession-deed',
    'https://www.youtube.com/@Staatensukzessionsurkunde-1400',
    'https://creators.spotify.com/pod/show/world-succession-deed',
    'https://podcasts.apple.com/de/podcast/world-sold-world-succession-deed-1400-98-http-world/id1786462631',
    'https://soundcloud.com/world-succession-deed',
    'https://suno.com/@sukzession1998',
    'http://chat-wsd.rf.gd',
    'http://chat-et.rf.gd',
    'http://chat-kb.rf.gd',
    'https://g.co/gemini/share/9fe07106afff',
    'https://youtu.be/zGXLeYJsAtc',
    'https://youtu.be/KTL6imKT3_w',
    'https://youtu.be/ToPHDtEA-JI',
    'https://youtu.be/WsJetlIjF5Q',
    'https://youtu.be/JSk13GnVMdU',
    'https://youtu.be/cbyME1y4m4o',
    'https://g.co/gemini/share/4a457895642b',
    'https://open.spotify.com/episode/1oTeGrNnXazJmkBdyH0Uhz',
    'https://cse.google.com/cse?cx=86021a982e3a14848',
    'https://www.facebook.com/share/1ER7GbN7kM/',
    'https://www.facebook.com/share/1DEMSyrrAt/',
    'https://www.facebook.com/groups/528455169898378/',
    'https://www.facebook.com/share/1CZ2JE3Sjb/',
    'https://x.com/WW3Precognition',
    'https://x.com/i/lists/1890805076249182663?t=Ha_ioLR_itUriLE_7WdZMg&s=09',
    'https://x.com/NWO_BOOKS',
    'https://x.com/i/lists/1880937835307425922?t=1TaGjr6ExIAK0QYFePTV8g&s=09',
    'https://x.com/NWO_Support',
    'https://x.com/i/lists/1952924134679150999',
    'https://www.reddit.com/u/WSD1400/s/EJXoGigczB',
  ];

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

  const isExternalUrl = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://');

  const isActive = (url: string) => {
    if (url === '/') {
      return pathname === '/';
    }
    const currentUrl = searchParams.get('url');
    return pathname === '/view' && currentUrl === url;
  };

  const defaultActiveCategories = useMemo(() => {
    return navigationLinks.map((c) => c.title);
  }, []);

  const handleLinkClick = (e: React.MouseEvent, link: NavLink) => {
    if (linksThatBlockEmbedding.includes(link.url)) {
      e.preventDefault();
      window.open(link.url, '_blank', 'noopener,noreferrer');
    }
    setOpenMobile(false);
  };

  return (
    <>
      <nav className="flex flex-col">
        <Accordion
          type="multiple"
          value={defaultActiveCategories}
          className="w-full"
        >
          {navigationLinks.map((category) => (
            <AccordionItem value={category.title} key={category.title}>
              <AccordionTrigger className="px-2 text-base hover:no-underline">
                {category.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-1 px-2">
                  {category.links.map((link: NavLink) => {
                    return (
                      <li
                        key={link.url}
                        className="group flex items-center justify-between rounded-md text-sm text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent [&[data-active=true]]:bg-sidebar-accent"
                        data-active={isActive(link.url)}
                      >
                        <Link
                          href={
                             isExternalUrl(link.url)
                              ? `/view?url=${encodeURIComponent(link.url)}`
                              : link.url
                          }
                          onClick={(e) => handleLinkClick(e, link)}
                          className="flex flex-1 items-center gap-3 p-2"
                        >
                          <link.icon className="h-4 w-4 shrink-0 text-accent" />
                          <span className="truncate">{link.title}</span>
                        </Link>
                        {isExternalUrl(link.url) && !linksThatBlockEmbedding.includes(link.url) && (
                          <Popover
                            onOpenChange={(open) =>
                              open && handleGetSummary(link.url)
                            }
                          >
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
                            <PopoverContent
                              side="right"
                              align="start"
                              className="w-80"
                            >
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
                        )}
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </nav>
    </>
  );
}
