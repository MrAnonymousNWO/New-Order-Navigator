import type { ComponentType } from 'react';
import {
  Book,
  Globe,
  LifeBuoy,
  PlayCircle,
  Users,
  Dog,
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
    title: 'Apps',
    links: [
      {
        title: 'Pet Analyzer',
        url: '/pet-analyzer',
        icon: Dog,
      },
    ],
  },
  {
    title: 'Websites',
    links: [
      {
        title: 'Sovereign Stack',
        url: 'https://sovereignstack.tools/',
        icon: Globe,
      },
      {
        title: 'Bitcoin',
        url: 'https://bitcoin.org/',
        icon: Globe,
      },
      {
        title: 'Nostr',
        url: 'https://nostr.com/',
        icon: Globe,
      },
    ],
  },
  {
    title: 'eBooks',
    links: [
      {
        title: 'The Sovereign Individual',
        url: 'https://www.amazon.com/Sovereign-Individual-Mastering-Transition-Information/dp/0684832720',
        icon: Book,
      },
      {
        title: 'The Bitcoin Standard',
        url: 'https://www.amazon.com/Bitcoin-Standard-Decentralized-Alternative-Central/dp/1119473861',
        icon: Book,
      },
    ],
  },
  {
    title: 'Media',
    links: [
      {
        title: 'TFTC',
        url: 'https://tftc.io/',
        icon: PlayCircle,
      },
      {
        title: 'Citadel Dispatch',
        url: 'https://citadeldispatch.com/',
        icon: PlayCircle,
      },
    ],
  },
  {
    title: 'Support',
    links: [
      {
        title: 'Start9',
        url: 'https://start9.com/',
        icon: LifeBuoy,
      },
      {
        title: 'Foundation',
        url: 'https://foundationdevices.com/',
        icon: LifeBuoy,
      },
    ],
  },
  {
    title: 'UBI',
    links: [
      {
        title: 'Geyser',
        url: 'https://geyser.fund/',
        icon: Users,
      },
      {
        title: 'PlebLab',
        url: 'https://pleblab.com/',
        icon: Users,
      },
    ],
  },
];
