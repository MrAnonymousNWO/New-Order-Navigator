// src/app/social-media/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { navigationLinks } from '@/lib/nav-links';
import { generateSocialImage } from '@/lib/emoji-to-svg';

const category = navigationLinks.find(
  (category) => category.title === 'Social Media'
);
const socialImage = generateSocialImage(category?.emoji || '💬');

export const metadata: Metadata = {
  title: 'Social Media Channels',
  description: 'Connect with us on various social media platforms, including Facebook, X (formerly Twitter), and Reddit. Join the conversation and stay updated.',
  keywords: ['social media', 'Facebook', 'X', 'Twitter', 'Reddit', 'community'],
  robots: 'index, follow',
  openGraph: {
    title: 'Social Media Channels',
    description: 'Connect with us on various social media platforms.',
    images: [socialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media Channels',
    description: 'Connect with us on various social media platforms.',
    images: [socialImage],
  },
};

export default function SocialMediaPage() {
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
            Connect with our community across various social media platforms. Follow us on X, join our Facebook groups, and engage with our content on Reddit.
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
  );
}
