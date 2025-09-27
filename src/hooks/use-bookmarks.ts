
'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
  useMemo,
} from 'react';

export interface Bookmark {
  url: string;
  title: string;
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

export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}

interface BookmarkProviderProps {
  children: ReactNode;
}

const BOOKMARKS_STORAGE_KEY = 'sovereign_navigator_bookmarks';

export function BookmarkProvider({ children }: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedBookmarks = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error('Failed to load bookmarks from localStorage', error);
      setBookmarks([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(
          BOOKMARKS_STORAGE_KEY,
          JSON.stringify(bookmarks)
        );
      } catch (error) {
        console.error('Failed to save bookmarks to localStorage', error);
      }
    }
  }, [bookmarks, isLoaded]);

  const addBookmark = useCallback((bookmark: Bookmark) => {
    setBookmarks((prevBookmarks) => {
      if (prevBookmarks.some((b) => b.url === bookmark.url)) {
        return prevBookmarks;
      }
      return [...prevBookmarks, bookmark];
    });
  }, []);

  const removeBookmark = useCallback((url: string) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((b) => b.url !== url)
    );
  }, []);

  const isBookmarked = useCallback(
    (url: string) => {
      return bookmarks.some((b) => b.url === url);
    },
    [bookmarks]
  );

  const value = useMemo(
    () => ({
      bookmarks,
      addBookmark,
      removeBookmark,
      isBookmarked,
    }),
    [bookmarks, addBookmark, removeBookmark, isBookmarked]
  );

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
}
