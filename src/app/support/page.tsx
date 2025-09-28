// src/app/support/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { navigationLinks } from '@/lib/nav-links';
import { generateSocialImage } from '@/lib/emoji-to-svg';
import { BreadcrumbLd } from '@/lib/json-ld';

const category = navigationLinks.find(
  (category) => category.title === 'Support'
);
const socialImage = generateSocialImage(category?.emoji || '❤️');
const pageUrl = "https://new-order-navigator.com/support"; // Replace with your actual domain

export const metadata: Metadata = {
  title: 'Support Our Mission',
  description: 'Help support our mission through donations or by purchasing merchandise from our support shops. Your contribution is greatly appreciated.',
  keywords: ['support', 'donate', 'Ko-fi', 'merchandise', 'shop', 'mission'],
  robots: 'index, follow',
  openGraph: {
    title: 'Support Our Mission',
    description: 'Help support our mission through donations or by purchasing merchandise.',
    images: [socialImage],
    url: pageUrl,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support Our Mission',
    description: 'Help support our mission through donations or by purchasing merchandise.',
    images: [socialImage],
  },
};

export default function SupportPage() {
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
        { name: 'Support', url: pageUrl },
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
              If you find this project valuable, please consider supporting our mission. You can make a contribution through Ko-fi or purchase merchandise from our online stores.
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
