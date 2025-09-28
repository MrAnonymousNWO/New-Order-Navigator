// src/app/ebooks/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { navigationLinks } from '@/lib/nav-links';
import { generateSocialImage } from '@/lib/emoji-to-svg';
import { BreadcrumbLd } from '@/lib/json-ld';

const category = navigationLinks.find(
  (category) => category.title === 'eBooks & Reading'
);
const socialImage = generateSocialImage(category?.emoji || '📚');
const pageUrl = "https://new-order-navigator.com/ebooks"; // Replace with your actual domain

export const metadata: Metadata = {
  title: 'eBooks & Reading Material',
  description: 'Access and download free eBooks and reading materials, including "The Buyer\'s Memoir" and other key documents related to the World Succession Deed.',
  keywords: ['eBooks', 'reading', 'download', "The Buyer's Memoir", 'World Succession Deed', 'PDF'],
  robots: 'index, follow',
  openGraph: {
    title: 'eBooks & Reading Material',
    description: 'Access and download free eBooks and key documents.',
    images: [socialImage],
    url: pageUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'eBooks & Reading Material',
    description: 'Access and download free eBooks and key documents.',
    images: [socialImage],
  },
};

export default function EbooksPage() {
  if (!category) {
    return (
      <div className="container mx-auto max-w-4xl py-4 px-2">
        <h1 className="text-2xl font-bold">Category not found</h1>
      </div>
    );
  }

  const isExternalUrl = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://');

  return (
    <>
      <BreadcrumbLd items={[
        { name: 'Home', url: 'https://new-order-navigator.com' },
        { name: 'eBooks & Reading', url: pageUrl },
      ]} />
      <div className="container mx-auto max-w-4xl py-4 px-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <span className="text-3xl">{category.emoji}</span>
              <CardTitle className="font-headline text-3xl">
                {category.title}
              </CardTitle>
            </div>
            <CardDescription>
              Find essential reading materials here. Access free PDF downloads of our core eBooks and read key texts like "The Buyer's Memoir" directly in your browser.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {category.links.map((link) => (
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
    </>
  );
}
