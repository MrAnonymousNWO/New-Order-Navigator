import { MetadataRoute } from 'next';
import { navigationLinks } from '@/lib/nav-links';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://new-order-navigator.com';

  // Get all static page URLs from the navigation links
  const staticPageUrls = navigationLinks
    .map((category) => category.url)
    .filter((url): url is string => !!url); // Filter out any undefined URLs

  // Add any other static pages not in the main navigation
  const additionalPages = [
    '/link-list',
    '/search',
    '/bookmarks',
    '/view' // Although dynamic, it's a core page structure
  ];

  const allUrls = [...staticPageUrls, ...additionalPages];

  const sitemapEntries = allUrls.map((url) => ({
    url: `${baseUrl}${url}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: url === '/' ? 1 : 0.8,
  }));

  return sitemapEntries;
}
