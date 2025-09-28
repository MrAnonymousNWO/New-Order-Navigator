// src/app/page.tsx
'use client';

import Link from 'next/link';
import { navigationLinks } from '@/lib/nav-links';
import { Compass, type LucideProps, Globe } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { ComponentType } from 'react';

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


interface NavLink {
  title: string;
  url: string;
  icon: ComponentType<LucideProps>;
}

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
          const Icon = category.icon || Globe;
          const rotationClass = categoryRotations[category.title] || 'rotate-0';
          const contentRotationClass = contentRotations[category.title] || '-rotate-0';
          
          const CategoryButton = (
             <Button
                variant="outline"
                size="icon"
                className={cn(
                  'group h-12 w-12 rounded-full border-2 border-primary/50 bg-background transition-all hover:scale-110 hover:bg-accent',
                  contentRotationClass
                )}
                 aria-label={category.title}
              >
                 <Icon className="h-6 w-6 text-primary transition-colors group-hover:text-accent-foreground" />
              </Button>
          );

          return (
            <div
              key={category.title}
              className={cn(
                'absolute h-full w-full transform transition-transform',
                rotationClass
              )}
            >
              <div className="absolute left-1/2 top-0 -ml-5 -mt-5 h-10 w-10">
                 {category.url ? (
                   <Link href={isExternalUrl(category.url) ? `/view?url=${encodeURIComponent(category.url)}` : category.url}>
                     {CategoryButton}
                   </Link>
                 ) : (
                   <Popover>
                    <PopoverTrigger asChild>
                      {CategoryButton}
                    </PopoverTrigger>
                    <PopoverContent 
                      side="right" 
                      align="start" 
                      className={cn(
                          "w-72 transform",
                          contentRotationClass
                      )}
                     >
                       <div className="space-y-2">
                          <h4 className="font-headline text-lg font-medium leading-none text-primary">{category.title}</h4>
                          <ul className="space-y-1">
                            {category.links.map((link: NavLink) => (
                              <li key={link.url} className="text-sm">
                                <Link 
                                  href={isExternalUrl(link.url) ? `/view?url=${encodeURIComponent(link.url)}` : link.url}
                                  className="flex items-center gap-2 rounded-md p-1 hover:bg-muted"
                                >
                                  <link.icon className="h-4 w-4 shrink-0 text-accent" />
                                  <span className="truncate">{link.title}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                       </div>
                    </PopoverContent>
                  </Popover>
                 )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
