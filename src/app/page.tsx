// src/app/page.tsx
'use client';

import Link from 'next/link';
import { navigationLinks } from '@/lib/nav-links';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Compass } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl py-4 px-2">
       <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Compass className="h-8 w-8 text-primary" />
              <CardTitle className="font-headline text-3xl">
                New Order Navigator
              </CardTitle>
            </div>
             <CardDescription>
              A tool for system-critical analysis and bypassing censorship through decentralized information. This is your central hub for navigating all related content.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {navigationLinks.map((category) => (
                <li
                  key={category.title}
                  className="group flex items-center justify-between gap-4 rounded-md border p-4 transition-colors hover:bg-muted/50"
                >
                  <Link
                      href={category.url || '#'}
                      className="flex flex-1 items-center gap-3 truncate text-primary hover:underline"
                    >
                      <span className="text-2xl">{category.emoji}</span>
                      <span className="truncate font-medium">{category.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
    </div>
  );
}
