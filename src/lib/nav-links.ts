import type { ComponentType } from 'react';
import {
  Globe,
  type LucideProps,
  Youtube,
  Mic,
  BookOpen,
  Rocket,
  MessageSquare,
  BookText,
  Map,
  Rss,
  Music,
  Heart,
  ShoppingCart,
  DollarSign,
  Home,
  FileText,
  Video,
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
        title: 'WSD - World Succession Deed',
        url: 'http://world.rf.gd',
        icon: Globe,
      },
      {
        title: 'Electric Technocracy',
        url: 'http://ep.ct.ws',
        icon: Globe,
      },
      {
        title: 'Start-Page WSD & Electric Paradise',
        url: 'http://paradise.gt.tc',
        icon: Rocket,
      },
      {
        title: 'Blacksite Blog',
        url: 'http://blacksite.iblogger.org',
        icon: Rss,
      },
    ],
  },
  {
    title: 'eBooks & Reading',
    links: [
      {
        title: 'Read the eBooks & Download free PDF',
        url: 'http://4u.free.nf',
        icon: BookOpen,
      },
      {
        title: "The Buyer's Memoir",
        url: 'http://ab.page.gd',
        icon: BookText,
      },
    ],
  },
  {
    title: 'Media',
    links: [
      {
        title: 'YouTube Channel',
        url: 'http://videos.xo.je',
        icon: Youtube,
      },
      {
        title: 'Podcast Show',
        url: 'http://nwo.likesyou.org',
        icon: Mic,
      },
      {
        title: 'Cassandra Cries - AI Music',
        url: 'http://listen.free.nf',
        icon: Music,
      },
      {
        title: 'Anti-war music',
        url: 'http://music.page.gd',
        icon: Music,
      },
    ],
  },
  {
    title: 'AI Chat',
    links: [
      {
        title: 'Join the NotebookLM Chat WSD',
        url: 'http://chat-wsd.rf.gd',
        icon: MessageSquare,
      },
      {
        title: 'Join the NotebookLM Chat ET',
        url: 'http://chat-et.rf.gd',
        icon: MessageSquare,
      },
      {
        title: 'Join the NotebookLM Chat Nation Building',
        url: 'http://chat-kb.rf.gd',
        icon: MessageSquare,
      },
    ],
  },
  {
    title: 'Micronation',
    links: [
      {
        title: 'Micronation Links',
        url: 'http://micro.page.gd',
        icon: Map,
      },
      {
        title: 'Micronation Storybook',
        url: 'https://g.co/gemini/share/9fe07106afff',
        icon: BookText,
      },
      {
        title: 'Found your own state',
        url: 'http://micronation.page.gd',
        icon: Map,
      },
      {
        title: 'Video: Dream Your Own State',
        url: 'https://youtu.be/zGXLeYJsAtc',
        icon: Video,
      },
      {
        title: 'Video: How to Start Your Own Country',
        url: 'https://youtu.be/KTL6imKT3_w',
        icon: Video,
      },
      {
        title: 'Video: Anatomy of a Modern Microstate',
        url: 'https://youtu.be/ToPHDtEA-JI',
        icon: Video,
      },
      {
        title: 'DIY Micronation Sovereignty',
        url: 'https://youtu.be/WsJetlIjF5Q',
        icon: Video,
      },
      {
        title: 'Your Nation in 30 Days',
        url: 'https://youtu.be/JSk13GnVMdU',
        icon: Video,
      },
    ],
  },
  {
    title: 'Support',
    links: [
      {
        title: 'Support our Mission',
        url: 'http://donate.gt.tc',
        icon: Heart,
      },
      {
        title: 'Support Shop',
        url: 'http://nwo.page.gd',
        icon: ShoppingCart,
      },
      {
        title: 'Support Store',
        url: 'http://merch.page.gd',
        icon: ShoppingCart,
      },
    ],
  },
  {
    title: 'UBI',
    links: [
      {
        title: 'Universal Basic Income Links',
        url: 'http://ubi.gt.tc',
        icon: DollarSign,
      },
      {
        title: 'UBI Storybook',
        url: 'https://g.co/gemini/share/4a457895642b',
        icon: BookText,
      },
      {
        title: 'YouTube explainer Video UBI',
        url: 'https://youtu.be/cbyME1y4m4o',
        icon: Youtube,
      },
      {
        title: 'Podcast Episode UBI',
        url: 'https://open.spotify.com/episode/1oTeGrNnXazJmkBdyH0Uhz',
        icon: Mic,
      },
    ],
  },
  {
    title: 'Blog Posts',
    links: [
      {
        title: 'UBI and Electronic Technocracy',
        url: 'https://worldsold.wixsite.com/electric-technocracy/post/ubi-unconditional-basic-income-electronic-technocracy',
        icon: FileText,
      },
      {
        title: 'BGE und die Elektronische Technokratie',
        url: 'https://worldsold.wixsite.com/electric-technocracy/de/post/bge-bedingungsloses-grundeinkommen-elektronische-technokratie',
        icon: FileText,
      },
      {
        title: 'Found Your Own State – Sovereignty with AI',
        url: 'https://worldsold.wixsite.com/world-sold/en/post/ai-chat-now-or-never-establish-your-own-state',
        icon: FileText,
      },
      {
        title: 'Deinen eigenen Staat gründen – Souveränität mit KI',
        url: 'https://worldsold.wixsite.com/world-sold/post/deinen-eigenen-staat-gründen-souveraenität-mit-ki-chat-begleitung',
        icon: FileText,
      },
    ],
  },
  {
    title: 'Home',
    links: [
      {
        title: 'Startpage',
        url: '/',
        icon: Home,
      },
    ],
  },
];
