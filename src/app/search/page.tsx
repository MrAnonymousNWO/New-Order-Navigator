// src/app/search/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Search className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">Search Results</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="gcse-searchresults-only"></div>
        </CardContent>
      </Card>
    </div>
  );
}
