// src/app/blog/german/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { navigationLinks } from '@/lib/nav-links';
import { generateSocialImage } from '@/lib/emoji-to-svg';
import { BreadcrumbLd } from '@/lib/json-ld';

const category = navigationLinks.find(
  (category) => category.title === 'Blog Posts (German)'
);
const socialImage = generateSocialImage(category?.emoji || '🇩🇪');
const pageUrl = "/blog/german";

export const metadata: Metadata = {
  title: 'Blogartikel (Deutsch)',
  description: 'Entdecken Sie eine Sammlung deutscher Blogartikel zu Themen wie Bedingungsloses Grundeinkommen (BGE), Elektronische Technokratie, KI, Souveränität und die Zukunft der Gesellschaft.',
  keywords: ['blog', 'Deutsch', 'BGE', 'Elektronische Technokratie', 'KI', 'Souveränität', 'Zukunft'],
  robots: 'index, follow',
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: 'Blogartikel (Deutsch)',
    description: 'Entdecken Sie eine Sammlung deutscher Blogartikel.',
    images: [socialImage],
    url: pageUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blogartikel (Deutsch)',
    description: 'Entdecken Sie eine Sammlung deutscher Blogartikel.',
    images: [socialImage],
  },
};

export default function GermanBlogPostsPage() {
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
        { name: 'Blogartikel (Deutsch)', url: `https://new-order-navigator.com${pageUrl}` },
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
              Diese Seite enthält eine umfassende Liste aller deutschsprachigen Blogartikel. Entdecken Sie Beiträge zu BGE, KI, Souveränität und den Prinzipien der Elektronischen Technokratie.
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
