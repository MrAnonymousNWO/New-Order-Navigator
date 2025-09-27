import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/app-header';
import { SwipeHandler } from '@/components/swipe-handler';
import { CookieConsent } from '@/components/cookie-consent';
import { BookmarkProvider } from '@/hooks/use-bookmarks';

export const metadata: Metadata = {
  title: 'Sovereign Navigator',
  description: 'Navigate the sovereign web.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <Toaster />
        <BookmarkProvider>
          <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden">
              <AppSidebar />
              <div className="flex flex-1 flex-col overflow-hidden">
                <AppHeader />
                <main className="flex-1 overflow-auto">
                  <SwipeHandler>{children}</SwipeHandler>
                </main>
              </div>
            </div>
          </SidebarProvider>
        </BookmarkProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
