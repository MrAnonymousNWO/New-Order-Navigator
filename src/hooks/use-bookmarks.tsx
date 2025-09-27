'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

// 1. DEFINE TYPES
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

// 2. CREATE CONTEXT
const BookmarkContext = createContext<BookmarkContextType | undefined>(
  undefined
);

// 3. CREATE PROVIDER COMPONENT
interface BookmarkProviderProps {
  children: ReactNode;
}

const BOOKMARKS_STORAGE_KEY = 'sovereign_navigator_bookmarks';

export function BookmarkProvider({ children }: BookmarkProviderProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load bookmarks from localStorage on initial mount
  useEffect(() => {
    try {
      const storedBookmarks = window.localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (storedBookmarks) {
        setBookmarks(JSON.parse(storedBookmarks));
      }
    } catch (error) {
      console.error('Failed to load bookmarks from localStorage:', error);
      setBookmarks([]); // Reset to empty array on error
    } finally {
      setIsLoaded(true);
    }
  }, []); // Empty dependency array ensures this runs only once

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(
          BOOKMARKS_STORAGE_KEY,
          JSON.stringify(bookmarks)
        );
      } catch (error) {
        console.error('Failed to save bookmarks to localStorage:', error);
      }
    }
  }, [bookmarks, isLoaded]);

  // Memoized function to add a bookmark
  const addBookmark = useCallback((bookmark: Bookmark) => {
    setBookmarks((prevBookmarks) => {
      // Avoid adding duplicates
      if (prevBookmarks.some((b) => b.url === bookmark.url)) {
        return prevBookmarks;
      }
      return [...prevBookmarks, bookmark];
    });
  }, []);

  // Memoized function to remove a bookmark
  const removeBookmark = useCallback((url: string) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((b) => b.url !== url)
    );
  }, []);

  // Memoized function to check if a URL is bookmarked
  const isBookmarked = useCallback(
    (url: string) => {
      return bookmarks.some((b) => b.url === url);
    },
    [bookmarks]
  );

  // Memoize the context value to prevent unnecessary re-renders
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

// 4. CREATE CUSTOM HOOK
export function useBookmarks() {
  const context = useContext(BookmarkContext);
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}
