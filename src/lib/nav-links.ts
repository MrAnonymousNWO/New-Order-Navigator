import type { ComponentType } from 'react';
import {
  Globe,
  type LucideProps,
  Youtube,
  Mic,
  BookMarked,
  ShoppingCart,
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
      {
        title: 'Staatensukzessionsurkunde',
        url: 'https://www.youtube.com/@Staatensukzessionsurkunde-1400',
        icon: Youtube,
      },
      {
        title: 'World Succession Deed Podcast',
        url: 'https://creators.spotify.com/pod/show/world-succession-deed',
        icon: Mic,
      },
      {
        title: 'Kreuzbergkaserne Zweibrücken',
        url: 'https://de.m.wikipedia.org/wiki/Kreuzbergkaserne_Zweibr%C3%BCcken',
        icon: BookMarked,
      },
      {
        title: 'Electric Paradise',
        url: 'https://electric-paradise.start.page',
        icon: Globe,
      },
      {
        title: 'NWO Shop',
        url: 'https://beacons.ai/nwo.shop',
        icon: ShoppingCart,
      },
    ],
  },
];
