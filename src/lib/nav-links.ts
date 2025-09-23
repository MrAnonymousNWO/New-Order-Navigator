import type { ComponentType } from 'react';
import {
  Globe,
  type LucideProps,
} from 'lucide-react';

export interface NavLink {
  title: string;
  url: string;
  icon: ComponentType<LucideProps>;
}

export interface NavCategory {
  title: string;
  links: NavLink[];
}

export const navigationLinks: NavCategory[] = [
  {
    title: 'Websites',
    links: [
      {
        title: 'Electric Technocracy',
        url: 'https://worldsold.wixsite.com/electric-technocracy',
        icon: Globe,
      },
      {
        title: 'Electric Technocracy (DE)',
        url: 'https://worldsold.wixsite.com/electric-technocracy/de',
        icon: Globe,
      },
      {
        title: 'World Sold',
        url: 'https://worldsold.wixsite.com/world-sold',
        icon: Globe,
      },
      {
        title: 'World Sold (EN)',
        url: 'https://worldsold.wixsite.com/world-sold/en',
        icon: Globe,
      },
    ],
  },
];
