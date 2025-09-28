'use client';

import Link from 'next/link';
import { useBookmarks } from '@/hooks/use-bookmarks.tsx';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bookmark, Trash2, ExternalLink } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div className="container mx-auto max-w-4xl py-4 px-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bookmark className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">My Bookmarks</CardTitle>
          </div>
          <CardDescription>
            Here are the pages you have saved for later. You can add bookmarks from the viewer page by clicking the bookmark icon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {bookmarks.length > 0 ? (
            <ul className="space-y-4">
              {bookmarks.map((bookmark) => (
                <li
                  key={bookmark.url}
                  className="group flex items-center justify-between gap-4 rounded-md border p-4 transition-colors hover:bg-muted/50"
                >
                  <div className="flex-1 truncate">
                    <Link
                      href={`/view?url=${encodeURIComponent(bookmark.url)}`}
                      className="font-medium text-primary hover:underline"
                    >
                      {bookmark.title || bookmark.url}
                    </Link>
                    <p className="truncate text-sm text-muted-foreground">
                      {bookmark.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="opacity-70 transition-opacity group-hover:opacity-100"
                    >
                      <a href={bookmark.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive opacity-70 transition-opacity hover:text-destructive group-hover:opacity-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently remove the bookmark for "
                            {bookmark.title || bookmark.url}". This action cannot be
                            undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => removeBookmark(bookmark.url)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-12 text-center text-muted-foreground">
              <Bookmark className="mb-4 h-12 w-12" />
              <h3 className="text-xl font-semibold">No bookmarks yet!</h3>
              <p className="mt-2 max-w-md">
                You can add bookmarks from the viewer page by clicking the bookmark
                icon. Saved pages will appear here.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
