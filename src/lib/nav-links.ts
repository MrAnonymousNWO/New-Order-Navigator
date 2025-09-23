import type { ComponentType } from 'react';
import {
  Globe,
  type LucideProps,
  Youtube,
  Mic,
  BookMarked,
  ShoppingCart,
  Users,
  Music,
  MessageSquare,
  Link as LinkIcon,
  Home,
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
      {
        title: 'NWO Spring Shop',
        url: 'https://nwo-9.creator-spring.com',
        icon: ShoppingCart,
      },
    ],
  },
  {
    title: 'Social',
    links: [
      {
        title: 'Facebook-Gruppe',
        url: 'https://facebook.com/groups/528455169898378/',
        icon: Users,
      },
      {
        title: 'SoundCloud Musik Profil',
        url: 'https://soundcloud.com/world-succession-deed',
        icon: Music,
      },
      {
        title: 'X - WW3 Präkognition',
        url: 'https://x.com/WW3Precognition',
        icon: MessageSquare,
      },
      {
        title: 'X - Welt verkauft offiziell',
        url: 'https://x.com/NWO_BOOKS',
        icon: MessageSquare,
      },
      {
        title: 'Linkübersicht - Bitly',
        url: 'https://bit.ly/m/world-succession-deed',
        icon: LinkIcon,
      },
      {
        title: 'Startseite Linkübersicht',
        url: 'https://electrictechnocracy.start.page',
        icon: Home,
      },
    ],
  },
];
