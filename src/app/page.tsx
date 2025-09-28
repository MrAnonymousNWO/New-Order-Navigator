// src/app/page.tsx
'use client';

import Link from 'next/link';
import { navigationLinks } from '@/lib/nav-links';
import { Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

// A mapping of category titles to their rotation for the compass layout
const categoryRotations: { [key: string]: string } = {
  'Home': 'rotate-0',
  'Websites': 'rotate-[25deg]',
  'AI Tools': 'rotate-[50deg]',
  'eBooks & Reading': 'rotate-[75deg]',
  'Media': 'rotate-[100deg]',
  'AI Chat': 'rotate-[125deg]',
  'Social Media': 'rotate-[150deg]',
  'YouTube Videos': 'rotate-[175deg]',
  'Ground Zero Files': 'rotate-[200deg]',
  'UBI': 'rotate-[225deg]',
  'Blog Posts (English)': 'rotate-[250deg]',
  'Blog Posts (German)': 'rotate-[275deg]',
  'Micronation': 'rotate-[300deg]',
  'Support': 'rotate-[325deg]',
};

// A mapping for the inner content rotation to counteract the parent rotation
const contentRotations: { [key: string]: string } = {
  'Home': '-rotate-0',
  'Websites': '-rotate-[25deg]',
  'AI Tools': '-rotate-[50deg]',
  'eBooks & Reading': '-rotate-[75deg]',
  'Media': '-rotate-[100deg]',
  'AI Chat': '-rotate-[125deg]',
  'Social Media': '-rotate-[150deg]',
  'YouTube Videos': '-rotate-[175deg]',
  'Ground Zero Files': '-rotate-[200deg]',
  'UBI': '-rotate-[225deg]',
  'Blog Posts (English)': '-rotate-[250deg]',
  'Blog Posts (German)': '-rotate-[275deg]',
  'Micronation': '-rotate-[300deg]',
  'Support': '-rotate-[325deg]',
};


const isExternalUrl = (url: string) =>
  url.startsWith('http://') || url.startsWith('https://');

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 overflow-hidden">
        <div className="text-center mb-12">
            <h1 className="font-headline text-5xl font-bold text-primary">New Order Compass</h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl">A tool for system-critical analysis and bypassing censorship through decentralized information.</p>
        </div>
      <div className="relative flex h-[300px] w-[300px] items-center justify-center rounded-full md:h-[350px] md:w-[350px]">
        {/* Central Compass Rose */}
        <div className="absolute flex h-full w-full items-center justify-center">
            <Compass className="h-32 w-32 text-primary/10" strokeWidth={0.5} />
        </div>
        <div className="absolute h-[90%] w-[90%] rounded-full border border-dashed border-border"></div>
        <div className="absolute h-[60%] w-[60%] rounded-full border border-dashed border-border"></div>

        {/* Navigation Points */}
        {navigationLinks.map((category) => {
          const rotationClass = categoryRotations[category.title] || 'rotate-0';
          const contentRotationClass = contentRotations[category.title] || '-rotate-0';
          
          const categoryUrl = category.url ?? '#';
          
          return (
            <div
              key={category.title}
              className={cn(
                'absolute h-full w-full transform transition-transform',
                rotationClass
              )}
            >
              <div className="absolute left-1/2 top-0 -ml-6 -mt-6 h-12 w-12">
                 <Link href={isExternalUrl(categoryUrl) ? `/view?url=${encodeURIComponent(categoryUrl)}` : categoryUrl} passHref>
                   <div
                      className={cn(
                        'group flex items-center justify-center h-12 w-12 rounded-full border-2 border-primary/50 bg-background transition-all hover:scale-110 hover:bg-accent',
                        contentRotationClass
                      )}
                       aria-label={category.title}
                    >
                       <span className="text-2xl transition-transform group-hover:scale-125">{category.emoji}</span>
                    </div>
                 </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
