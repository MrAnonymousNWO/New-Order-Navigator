// src/app/page.tsx
'use client';

import Link from 'next/link';
import { navigationLinks } from '@/lib/nav-links';
import { Compass } from 'lucide-react';
import { cn } from '@/lib/utils';

// Calculate rotation for 14 items (360 / 14 = ~25.7 degrees per item)
const categoryRotations: { [key: string]: string } = {
  'Home': 'rotate-[0deg]',
  'Websites': 'rotate-[25.7deg]',
  'AI Tools': 'rotate-[51.4deg]',
  'eBooks & Reading': 'rotate-[77.1deg]',
  'Media': 'rotate-[102.8deg]',
  'AI Chat': 'rotate-[128.5deg]',
  'Social Media': 'rotate-[154.2deg]',
  'YouTube Videos': 'rotate-[179.9deg]',
  'Ground Zero Files': 'rotate-[205.6deg]',
  'UBI': 'rotate-[231.3deg]',
  'Blog Posts (English)': 'rotate-[257deg]',
  'Blog Posts (German)': 'rotate-[282.7deg]',
  'Micronation': 'rotate-[308.4deg]',
  'Support': 'rotate-[334.1deg]',
};

// Counter-rotation to keep the emoji upright
const contentRotations: { [key: string]: string } = {
    'Home': '-rotate-[0deg]',
    'Websites': '-rotate-[25.7deg]',
    'AI Tools': '-rotate-[51.4deg]',
    'eBooks & Reading': '-rotate-[77.1deg]',
    'Media': '-rotate-[102.8deg]',
    'AI Chat': '-rotate-[128.5deg]',
    'Social Media': '-rotate-[154.2deg]',
    'YouTube Videos': '-rotate-[179.9deg]',
    'Ground Zero Files': '-rotate-[205.6deg]',
    'UBI': '-rotate-[231.3deg]',
    'Blog Posts (English)': '-rotate-[257deg]',
    'Blog Posts (German)': '-rotate-[282.7deg]',
    'Micronation': '-rotate-[308.4deg]',
    'Support': '-rotate-[334.1deg]',
};


export default function Home() {
  // Filter out any categories that don't have a defined rotation, ensuring only our 14 items are displayed.
  const displayableLinks = navigationLinks.filter(category => categoryRotations[category.title]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background py-4 px-2 overflow-hidden">
        <div className="text-center mb-12">
            <h1 className="font-headline text-5xl font-bold text-primary">New Order Compass</h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl">A tool for system-critical analysis and bypassing censorship through decentralized information. This is your central hub for navigating all related content.</p>
        </div>
      <div className="relative flex h-[300px] w-[300px] items-center justify-center rounded-full md:h-[350px] md:w-[350px]">
        <div className="absolute flex h-full w-full items-center justify-center">
            <Compass className="h-32 w-32 text-primary/10" strokeWidth={0.5} />
        </div>
        <div className="absolute h-[90%] w-[90%] rounded-full border border-dashed border-border"></div>
        <div className="absolute h-[60%] w-[60%] rounded-full border border-dashed border-border"></div>

        {displayableLinks.map((category) => {
          const rotationClass = categoryRotations[category.title];
          const contentRotationClass = contentRotations[category.title];
          
          // Fallback to '#' if url is not defined, which should not happen for these categories
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
                 <Link
                    href={categoryUrl}
                    passHref
                    className={cn(
                        'group flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary/50 bg-background transition-all hover:scale-110 hover:bg-accent',
                        contentRotationClass
                    )}
                    aria-label={category.title}
                    >
                    <span className="text-2xl transition-transform group-hover:scale-125">{category.emoji}</span>
                 </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
