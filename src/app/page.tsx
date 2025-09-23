import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { navigationLinks } from '@/lib/nav-links';
import { ArrowUpRight } from 'lucide-react';

export default function Home() {
  const isExternalUrl = (url: string) =>
    url.startsWith('http://') || url.startsWith('https://');

  return (
    <div className="h-full bg-background p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="font-headline text-5xl tracking-tight">
            Sovereign Navigator
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Your portal to the decentralized web.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {navigationLinks.map((category) => (
            <Card key={category.title} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline text-2xl">
                  {category.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <ul className="flex flex-1 flex-col gap-2">
                  {category.links.map((link) => (
                    <li key={link.url}>
                      <Link
                        href={
                          isExternalUrl(link.url)
                            ? `/view?url=${encodeURIComponent(link.url)}`
                            : link.url
                        }
                        target={isExternalUrl(link.url) ? '' : '_self'}
                        rel={isExternalUrl(link.url) ? 'noopener noreferrer' : ''}
                        className="group flex items-center justify-between rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                      >
                        <div className="flex items-center gap-3">
                          <link.icon className="h-5 w-5 shrink-0 text-primary/80" />
                          <span className="truncate">{link.title}</span>
                        </div>
                        {isExternalUrl(link.url) && (
                           <ArrowUpRight className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
