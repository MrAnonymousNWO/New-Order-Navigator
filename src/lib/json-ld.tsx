// src/lib/json-ld.tsx
import type { Organization, WebSite, BreadcrumbList } from 'schema-dts';

type JsonLdProps<T> = {
  data: T;
};

function JsonLd<T>({ data }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Organization Schema Component
interface OrganizationLdProps {
  name: string;
  url: string;
  logo: string;
}

export function OrganizationLd({ name, url, logo }: OrganizationLdProps) {
  const data: Organization = {
    '@type': 'Organization',
    name,
    url,
    logo,
  };
  return <JsonLd data={data} />;
}

// WebSite Schema Component
interface WebSiteLdProps {
  name: string;
  url: string;
  searchUrl: string;
}

export function WebSiteLd({ name, url, searchUrl }: WebSiteLdProps) {
  const data: WebSite = {
    '@type': 'WebSite',
    name,
    url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: searchUrl,
      },
      'query-input': 'required name=search_term_string',
    },
  };
  return <JsonLd data={data} />;
}

// BreadcrumbList Schema Component
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbLd({ items }: BreadcrumbLdProps) {
  const data: BreadcrumbList = {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
  return <JsonLd data={data} />;
}
