
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
    title: 'Home',
    links: [
      {
        title: 'Startpage',
        url: '/',
        icon: Home,
      },
    ],
  },
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
        url: 'https://worldsold.wixsite.com/electric-technocracy',
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
      {
        title: 'Songs vs ww3 (Riffusion)',
        url: 'https://www.riffusion.com/World_Succession_Deed',
        icon: Music,
      },
      {
        title: 'Songs vs ww3 (Suno)',
        url: 'https://suno.com/@sukzession1998',
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
      {
        title: 'Donate',
        url: 'https://ko-fi.com/electric_technocrat',
        icon: Heart,
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
    title: 'Blog Posts (English)',
    links: [
      {
        title: 'UBI and Electronic Technocracy',
        url: 'https://worldsold.wixsite.com/electric-technocracy/post/ubi-unconditional-basic-income-electronic-technocracy',
        icon: FileText,
      },
      {
        title: 'Found Your Own State – Sovereignty with AI',
        url: 'https://worldsold.wixsite.com/world-sold/en/post/ai-chat-now-or-never-establish-your-own-state',
        icon: FileText,
      },
      {
        title: 'Blog (EN): Electric Paradise',
        url: 'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Future Innovations',
        url: 'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/future-innovations',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Technological Singularity',
        url: 'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/technological-singularity',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Future of AI',
        url: 'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/future-of-ai',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Tech Governance',
        url: 'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/tech-governance',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Digital Society',
        url: 'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/digital-society',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Electric Technocracy',
        url: 'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/electric-technocracy',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Artificial Superintelligence',
        url: 'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/artificial-superintelligence',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Longevity',
        url: 'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/longevity',
        icon: Rss,
      },
      {
        title: 'Blog (EN): World Sold',
        url: 'https://worldsold.wixsite.com/world-sold/en/blog',
        icon: Rss,
      },
      {
        title: 'Blog (EN): System Comparison',
        url: 'https://worldsold.wixsite.com/world-sold/en/blog/categories/system_comparison-1',
        icon: Rss,
      },
      {
        title: 'Blog (EN): State Encyclopedia',
        url: 'https://worldsold.wixsite.com/world-sold/en/blog/categories/state_encyclopedia-1',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Electronic Technocracy',
        url: 'https://worldsold.wixsite.com/world-sold/en/blog/categories/elektronische-technokratie-1',
        icon: Rss,
      },
      {
        title: 'Blog (EN): NWO World Revolution Day X',
        url: 'https://worldsold.wixsite.com/world-sold/en/blog/categories/nwo-worldrevolution-day-x',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Cost of the World',
        url: 'https://worldsold.wixsite.com/world-sold/en/blog/categories/cost-of-the-world',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Blacksite Tales',
        url: 'https://worldsold.wixsite.com/world-sold/en/blog/categories/blacksite-tales',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Lexicon Wiki',
        url: 'https://worldsold.wixsite.com/world-sold/en/blog/categories/lexicon_wiki-1',
        icon: Rss,
      },
      {
        title: 'Blog (EN): Between Nightmare and Warning',
        url: 'https://worldsold.wixsite.com/world-sold/en/blog/categories/between_nightmare_and_warning_exploring_dystopian_worlds-1',
        icon: Rss,
      },
    ],
  },
  {
    title: 'Blog Posts (German)',
    links: [
      {
        title: 'BGE und die Elektronische Technokratie',
        url: 'https://worldsold.wixsite.com/electric-technocracy/de/post/bge-bedingungsloses-grundeinkommen-elektronische-technokratie',
        icon: FileText,
      },
      {
        title: 'Deinen eigenen Staat gründen – Souveränität mit KI',
        url: 'https://worldsold.wixsite.com/world-sold/post/deinen-eigenen-staat-gründen-souveraenität-mit-ki-chat-begleitung',
        icon: FileText,
      },
      {
        title: 'Electric Paradise Blog',
        url: 'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog',
        icon: Rss,
      },
      {
        title: 'Blog: Elektro-Technokratie',
        url: 'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/elektro-technokratie',
        icon: Rss,
      },
      {
        title: 'Blog: Künstliche Superintelligenz',
        url: 'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/kuenstliche-superintelligenz',
        icon: Rss,
      },
      {
        title: 'Blog: Langlebigkeit',
        url: 'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/langlebigkeit',
        icon: Rss,
      },
      {
        title: 'Blog: Tech-Regierung',
        url: 'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/tech-regierung',
        icon: Rss,
      },
      {
        title: 'Blog: Innovation & Zukunft',
        url: 'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/innovation-zukunft',
        icon: Rss,
      },
      {
        title: 'Blog: Zukunft der KI',
        url: 'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/zukunft-der-ki',
        icon: Rss,
      },
      {
        title: 'Blog: Technologische Singularität',
        url: 'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/technologische-singularitaet',
        icon: Rss,
      },
      {
        title: 'Blog: Digitale Gesellschaft',
        url: 'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/digitale-gesellschaft',
        icon: Rss,
      },
      {
        title: 'Blog: World Sold',
        url: 'https://worldsold.wixsite.com/world-sold/blog',
        icon: Rss,
      },
      {
        title: 'Blog: System Comparison',
        url: 'https://worldsold.wixsite.com/world-sold/blog/categories/system_comparison',
        icon: Rss,
      },
      {
        title: 'Blog: Lexicon Wiki',
        url: 'https://worldsold.wixsite.com/world-sold/blog/categories/lexicon_wiki',
        icon: Rss,
      },
      {
        title: 'Blog: Elektronische Technokratie',
        url: 'https://worldsold.wixsite.com/world-sold/blog/categories/elektronische-technokratie',
        icon: Rss,
      },
      {
        title: 'Blog: State Encyclopedia',
        url: 'https://worldsold.wixsite.com/world-sold/blog/categories/state_encyclopedia',
        icon: Rss,
      },
      {
        title: 'Blog: Blacksite Geschichten',
        url: 'https://worldsold.wixsite.com/world-sold/blog/categories/blacksite-geschichten',
        icon: Rss,
      },
      {
        title: 'Blog: NWO Weltrevolution Tag X',
        url: 'https://worldsold.wixsite.com/world-sold/blog/categories/nwo-weltrevolution-tag-x',
        icon: Rss,
      },
      {
        title: 'Blog: Was kostet die Welt',
        url: 'https://worldsold.wixsite.com/world-sold/blog/categories/was-kostet-die-welt',
        icon: Rss,
      },
      {
        title: 'Blog: Between Nightmare and Warning',
        url: 'https://worldsold.wixsite.com/world-sold/blog/categories/between_nightmare_and_warning_exploring_dystopian_worlds',
        icon: Rss,
      },
    ],
  },
];
