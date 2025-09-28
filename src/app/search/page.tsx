// src/app/search/page.tsx
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Search } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Find search results from across the entire New Order Navigator network of sites and documents. Powered by Google Custom Search.',
  keywords: ['search', 'find', 'results', 'Google Custom Search'],
  robots: 'index, follow',
};

export default function SearchPage() {
  return (
    <div className="container mx-auto max-w-4xl py-4 px-2">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Search className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">Search Results</CardTitle>
          </div>
          <CardDescription>
            Results from your search across the network are displayed below. Use the search bar in the sidebar to start a new search.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="gcse-searchresults-only"></div>
        </CardContent>
      </Card>
    </div>
  );
}
