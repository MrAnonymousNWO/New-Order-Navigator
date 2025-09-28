import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Toaster } from '@/components/ui/toaster';
import { AppHeader } from '@/components/app-header';
import { SwipeHandler } from '@/components/swipe-handler';
import { CookieConsent } from '@/components/cookie-consent';
import { BookmarkProvider } from '@/hooks/use-bookmarks.tsx';
import { generateSocialImage } from '@/lib/emoji-to-svg';

const defaultSocialImage = generateSocialImage('🧭');

export const metadata: Metadata = {
  title: {
    default: 'New Order Navigator',
    template: '%s | New Order Navigator',
  },
  description: 'Navigate the sovereign web. An information hub for the World Succession Deed 1400/98 and the concept of Electric Technocracy. Bypass censorship and explore decentralized information.',
  keywords: ['New Order', 'Navigator', 'World Succession Deed', 'Electric Technocracy', 'sovereign web', 'decentralized information', 'censorship bypass', 'system-critical analysis'],
  robots: 'index, follow',
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: 'https://new-order-navigator.com', // Replace with your actual domain
    title: 'New Order Navigator',
    description: 'Navigate the sovereign web. An information hub for the World Succession Deed 1400/98 and Electric Technocracy.',
    images: [defaultSocialImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'New Order Navigator',
    description: 'Navigate the sovereign web. An information hub for the World Succession Deed 1400/98 and Electric Technocracy.',
    images: [defaultSocialImage],
  },
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
        <meta name="theme-color" content="#c026d3" />
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
        <script
          async
          src="https://cse.google.com/cse.js?cx=86021a982e3a14848"
        ></script>
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
