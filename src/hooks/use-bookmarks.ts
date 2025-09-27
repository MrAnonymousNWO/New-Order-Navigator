'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from 'react';

const BOOKMARKS_STORAGE_KEY = 'sovereign_navigator_bookmarks';

export interface Bookmark {
  title: string;
  url: string;
}

interface BookmarkContextType {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (url: string) => void;
  isBookmarked: (url: string) => boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (item) {
        setBookmarks(JSON.parse(item));
      }
    } catch (error) {
      console.error('Error reading bookmarks from localStorage', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(
          BOOKMARKS_STORAGE_KEY,
          JSON.stringify(bookmarks)
        );
      } catch (error) {
        console.error('Error saving bookmarks to localStorage', error);
      }
    }
  }, [bookmarks, isLoaded]);

  const addBookmark = useCallback((bookmark: Bookmark) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.url === bookmark.url)) {
        return prev; // Already bookmarked
      }
      return [...prev, bookmark];
    });
  }, []);

  const removeBookmark = useCallback((url: string) => {
    setBookmarks((prev) => prev.filter((b) => b.url !== url));
  }, []);

  const isBookmarked = useCallback(
    (url: string) => {
      return bookmarks.some((b) => b.url === url);
    },
    [bookmarks]
  );

  const value = { bookmarks, addBookmark, removeBookmark, isBookmarked };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
