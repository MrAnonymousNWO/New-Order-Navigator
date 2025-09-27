
'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

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

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export function BookmarkProvider({ children }: { children: ReactNode }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedBookmarks = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error('Failed to load bookmarks from localStorage', error);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
      } catch (error) {
        console.error('Failed to save bookmarks to localStorage', error);
      }
    }
  }, [bookmarks, isLoaded]);

  const addBookmark = (newBookmark: Bookmark) => {
    setBookmarks((prevBookmarks) => {
      // Avoid adding duplicate URLs
      if (prevBookmarks.some(b => b.url === newBookmark.url)) {
        return prevBookmarks;
      }
      return [...prevBookmarks, newBookmark];
    });
  };

  const removeBookmark = (url: string) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((bookmark) => bookmark.url !== url)
    );
  };
  
  const isBookmarked = (url: string) => {
    return bookmarks.some(bookmark => bookmark.url === url);
  };

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
