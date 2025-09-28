// src/app/blog/english/page.tsx
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rss } from 'lucide-react';
import { navigationLinks } from '@/lib/nav-links';

export default function EnglishBlogPostsPage() {
  const blogCategory = navigationLinks.find(
    (category) => category.title === 'Blog Posts (English)'
  );

  const blogLinks = blogCategory ? blogCategory.links : [];

  const isExternalUrl = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://');


  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Rss className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">
              Blog Posts (English)
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {blogLinks.map((link) => (
              <li
                key={link.url}
                className="group flex items-center justify-between gap-4 rounded-md border p-4 transition-colors hover:bg-muted/50"
              >
                 <Link
                    href={isExternalUrl(link.url) ? `/view?url=${encodeURIComponent(link.url)}` : link.url}
                    className="flex flex-1 items-center gap-3 truncate text-primary hover:underline"
                  >
                    <link.icon className="h-5 w-5 shrink-0 text-accent" />
                    <span className="truncate font-medium">{link.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
