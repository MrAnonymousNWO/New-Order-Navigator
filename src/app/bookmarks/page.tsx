
'use client';

import { useBookmarks } from '@/hooks/use-bookmarks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, ExternalLink, Bookmark } from 'lucide-react';
import Link from 'next/link';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();

  const isExternalUrl = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://');

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
      <Card className="border-0 bg-transparent shadow-none">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bookmark className="h-10 w-10 text-primary" />
            <CardTitle className="font-headline text-5xl tracking-tight">
              My Bookmarks
            </CardTitle>
          </div>
          <p className="pt-2 text-lg text-muted-foreground">
            Your saved pages for quick access.
          </p>
        </CardHeader>
        <CardContent>
          {bookmarks.length > 0 ? (
            <ul className="space-y-4">
              {bookmarks.map((bookmark) => (
                <li key={bookmark.url}>
                  <Card className="flex items-center justify-between p-4 transition-shadow hover:shadow-md">
                    <div className="flex-1 overflow-hidden">
                       <Link
                        href={
                          isExternalUrl(bookmark.url)
                            ? `/view?url=${encodeURIComponent(bookmark.url)}`
                            : bookmark.url
                        }
                        className="group"
                      >
                        <h3 className="truncate font-semibold group-hover:text-primary">
                          {bookmark.title}
                        </h3>
                        <p className="truncate text-sm text-muted-foreground group-hover:underline">
                          {bookmark.url}
                        </p>
                      </Link>
                    </div>
                    <div className="ml-4 flex shrink-0 items-center gap-2">
                       <Button
                        variant="ghost"
                        size="icon"
                        asChild
                      >
                         <a href={bookmark.url} target="_blank" rel="noopener noreferrer" aria-label="Open in new tab">
                           <ExternalLink className="h-4 w-4" />
                         </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => removeBookmark(bookmark.url)}
                        aria-label="Remove bookmark"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-8 text-center text-muted-foreground">
              <Bookmark className="mb-4 h-12 w-12" />
              <p className="text-lg">You have no bookmarks yet.</p>
              <p>Click the bookmark icon in the header to save a page.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
