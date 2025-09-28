// src/app/content-audit/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { navigationLinks, type NavLink } from '@/lib/nav-links';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, XCircle, Loader2, ShieldAlert, Sparkles } from 'lucide-react';
import { getWebsiteSummary } from '@/app/actions';
import { ScrollArea } from '@/components/ui/scroll-area';

type AuditStatus = 'idle' | 'loading' | 'success' | 'error';

interface AuditResult {
  url: string;
  title: string;
  status: AuditStatus;
  summary?: string;
  error?: string;
}

export default function ContentAuditPage() {
  const [auditResults, setAuditResults] = useState<AuditResult[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);

  const allLinks = useMemo(() => navigationLinks.flatMap((cat) => cat.links), []);

  const duplicateLinks = useMemo(() => {
    const urlMap = new Map<string, NavLink[]>();
    allLinks.forEach((link) => {
      if (!urlMap.has(link.url)) {
        urlMap.set(link.url, []);
      }
      urlMap.get(link.url)?.push(link);
    });

    return Array.from(urlMap.entries())
      .filter(([, links]) => links.length > 1)
      .map(([url, links]) => ({ url, titles: links.map((l) => l.title) }));
  }, [allLinks]);

  const handleRunAudit = async () => {
    setIsAuditing(true);
    const initialResults: AuditResult[] = allLinks.map((link) => ({
      ...link,
      status: 'loading',
    }));
    setAuditResults(initialResults);

    const results = await Promise.all(
      allLinks.map(async (link) => {
        try {
          const summary = await getWebsiteSummary(link.url);
          return { ...link, status: 'success' as AuditStatus, summary };
        } catch (error) {
          return {
            ...link,
            status: 'error' as AuditStatus,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      })
    );

    setAuditResults(results);
    setIsAuditing(false);
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
      <Card className="shadow-2xl mb-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <ShieldAlert className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">Content Audit</CardTitle>
          </div>
          <CardDescription>
            Check for duplicate URLs and run an AI health check to ensure pages are accessible and summarizable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold font-headline mb-2">Duplicate URL Check</h3>
              {duplicateLinks.length > 0 ? (
                <Alert variant="destructive">
                  <AlertTitle>Found {duplicateLinks.length} duplicate URLs</AlertTitle>
                  <AlertDescription>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      {duplicateLinks.map(({ url, titles }) => (
                        <li key={url}>
                          <strong className="font-mono">{url}</strong> appears {titles.length} times with titles: "{titles.join('", "')}"
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert>
                   <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>No duplicate URLs found</AlertTitle>
                  <AlertDescription>
                    All links in the navigation are unique.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold font-headline mb-2">AI Health Check</h3>
               <p className="text-sm text-muted-foreground mb-4">
                This tool attempts to generate an AI summary for every link in your navigation. A "Success" status indicates the page is likely accessible to search engines. An "Error" status may indicate a problem with the page's accessibility.
              </p>
              <Button onClick={handleRunAudit} disabled={isAuditing}>
                {isAuditing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Running Audit...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Run AI Health Check
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

       {auditResults.length > 0 && (
        <Card>
            <CardHeader>
                <CardTitle>AI Health Check Results</CardTitle>
                <CardDescription>
                    Found {allLinks.length} total links. Audit results are below.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-3">
                        {auditResults.map((result) => (
                            <div key={result.url} className="flex items-start gap-3 rounded-md border p-3">
                                <div>
                                    {result.status === 'success' && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                                    {result.status === 'error' && <XCircle className="h-5 w-5 text-destructive" />}
                                    {result.status === 'loading' && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold">{result.title}</p>
                                    <p className="text-xs text-muted-foreground font-mono truncate">{result.url}</p>
                                    {result.status === 'error' && (
                                        <p className="text-xs text-destructive mt-1">{result.error}</p>
                                    )}
                                </div>
                                <div>
                                    <Badge variant={result.status === 'success' ? 'default' : result.status === 'error' ? 'destructive' : 'secondary'} className="capitalize">
                                        {result.status}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
      )}
    </div>
  );
}
