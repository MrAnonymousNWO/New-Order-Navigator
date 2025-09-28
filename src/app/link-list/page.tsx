// src/app/link-list/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link as LinkIcon } from 'lucide-react';

const linkGroups = [
  {
    title: '🌐 Group 1: Main Pages & Strategic Domains',
    links: [
      'http://world.rf.gd',
      'http://ep.ct.ws',
      'http://contract-1400-98.ct.ws',
      'http://bit.ly/m/world-succession-deed',
      'https://worldsold.wixsite.com/electric-technocracy',
      'https://worldsold.wixsite.com/electric-technocracy/de',
      'https://worldsold.wixsite.com/world-sold/en',
      'https://worldsold.wixsite.com/world-sold',
      'https://worldwide-kingdom.mobirisesite.com',
      'https://electric-paradise.start.page',
      'https://nwo-9.creator-spring.com',
      'https://beacons.ai/nwo.shop',
      'https://world-sold.simdif.com',
      'https://medium.com/@sukzession1998/elektronische-technokratie-b0ed35abe334',
    ],
  },
  {
    title: '📚 Group 2: FlipHTML5 Documents',
    links: [
      'https://fliphtml5.com/bookcase/gjiqf',
      'https://online.fliphtml5.com/mwven/llvo',
      'https://online.fliphtml5.com/vrwno/tenv',
      'https://online.fliphtml5.com/vrwno/selx',
      'https://online.fliphtml5.com/NeroNWO/cvgu',
      'https://online.fliphtml5.com/mwven/wmse',
      'https://online.fliphtml5.com/mwven/wrgv',
      'https://online.fliphtml5.com/ElectricTechnocrat/wgez',
      'https://online.fliphtml5.com/ElectricTechnocrat/icjg',
      'https://online.fliphtml5.com/ElectricTechnocrat/mbcj',
      'https://online.fliphtml5.com/World-Succession-Deed/gwwq',
      'https://online.fliphtml5.com/vrwno/tenv',
    ],
  },
  {
    title: '📄 Group 3: Yumpu Documents',
    links: [
      'https://www.yumpu.com/de/document/view/70322199/elektrische-technokratie-staatensukzessionsurkunde',
      'https://www.yumpu.com/en/document/view/70322241/electric-technocracy-ai-governance-for-the-world-succession-deed',
      'https://www.yumpu.com/de/document/view/70480705/mind-games-strafpsychiatrie-als-politisches-kampfmittel-in-der-brd-2025',
      'https://www.yumpu.com/de/document/view/70533497/welt-verkauft-sachbuch-staatennachfolge',
      'https://www.yumpu.com/en/document/view/70554737/world-sold-non-fiction-world-succession-treaty-1400-98',
      'https://www.yumpu.com/en/document/view/70769389/2025-trillions-for-the-future-ai-power-and-post-scarcity-electric-technocracy',
      'https://www.yumpu.com/de/document/view/70769405/2025-billionen-fur-die-zukunft-ki-macht-und-post-scarcity-elektronische-technokratie',
      'https://www.yumpu.com/en/document/view/70735714/ubi-and-the-future-of-humanity-from-work-to-electric-technocracy',
      'https://www.yumpu.com/de/document/view/70738553/bge-und-die-zukunft-der-menschheit-mit-der-elektronischen-technokratie',
      'https://www.yumpu.com/s/5FHPwWbnuNijgayk',
      'https://www.yumpu.com/s/oy5uv8VDxYOzX7kU',
      'https://www.yumpu.com/s/pGAfcejDXBstHi4y',
      'https://www.yumpu.com/en/document/view/70769389/2025-trillions-for-the-future-ai-power-and-post-scarcity-electric-technocracy',
      'https://www.yumpu.com/de/document/view/70769405/2025-billionen-fur-die-zukunft-ki-macht-und-post-scarcity-elektronische-technokratie',
      'https://www.yumpu.com/en/document/view/70735714/ubi-and-the-future-of-humanity-from-work-to-electric-technocracy',
      'https://www.yumpu.com/de/document/view/70738553/bge-und-die-zukunft-der-menschheit-mit-der-elektronischen-technokratie',
    ],
  },
  {
    title: '📊 Group 4: Slideshare & SlideOrbit',
    links: [
      'https://de.slideshare.net/slideshow/die-welt-ist-verkauft-staatensukzessionsurkunde-1400-98/271862293',
      'https://de.slideshare.net/slideshow/un-united-nations-nato-world-sold-state-succession-deed-1400-98/272558581',
      'https://de.slideshare.net/slideshow/elektrische-technokratie-staatensukzessionsurkunde-1400-98/278289050',
      'https://de.slideshare.net/slideshow/electric-technocracy-world-succession-deed-1400-98/278289509',
      'https://de.slideshare.net/slideshow/2025-micronation-made-easy-with-the-world-succession-deed-1400-98/282957777',
      'https://de.slideshare.net/slideshow/bge-und-die-zukunft-der-menschheit-mit-der-elektronischen-technokratie/282909825',
      'https://de.slideshare.net/slideshow/ubi-unconditional-basic-income-and-the-electric-technocracy-world-succession-deed-1400-98/282910013',
      'https://www.slideshare.net/slideshow/ubi-and-the-future-of-humanity-from-work-to-electric-technocracy-world-succession-deed-1400-98/282885222',
      'https://www.slideshare.net/slideshow/2025-state-founding-for-dummies-how-to-start-your-own-country-the-world-succession-deed-1400-98/282970060',
      'https://www.slideshare.net/slideshow/2025-staatsgrundung-fur-dummies-mit-der-staatensukzessionsurkunde-1400-98/282969936',
      'https://www.slideserve.com/CassyComplex/the-electronic-technocracy-built-on-the-legal-reality-of-the-world-succession-deed-1400',
      'https://www.slideorbit.com/slide/2025-universal-basic-income-electric-technocracy-world-succession-deed-1400/508704',
    ],
  },
  {
    title: '🗃️ Group 5: Archive.org',
    links: [
      'https://archive.org/details/welt-verkauft-staatensukzessionsurkunde-1400',
      'https://archive.org/details/electric-technocracy',
      'https://archive.org/download/electric-technocracy',
      'https://archive.org/download/elektrische-technokratie-staatensukzessionsurkunde',
      'https://archive.org/details/elektrische-technokratie-staatensukzessionsurkunde',
      'https://archive.org/details/mind-games-strafpsychiatrie-als-politisches-kampfmittel-in-der-brd',
      'https://archive.org/details/turenne_kaserne_vertrag_1400_98_06_10_1998_nato_brd_nl_vn_itu_hns',
      'https://archive.org/download/electric-technocracy',
      'https://archive.org/download/elektrische-technokratie-staatensukzessionsurkunde',
    ],
  },
  {
    title: '🧠 Group 6: Encyclopedias, Wikis & Political Platforms',
    links: [
      'https://de.m.wikipedia.org/wiki/Technokratische_Bewegung',
      'https://de.micronations.wiki/wiki/Königreich_Kreuzberg',
      'https://politicalwiki.org/index.php?title=Electric_Technocracy',
      'https://politicalwiki.org/index.php?title=Kingdom_of_Kreuzberg',
      'https://notebooklm.google.com/notebook/435f97dc-5c34-4f6a-bc76-b4a20ce0db35',
    ],
  },
  {
    title: '🎧 Group 7: Podcasts & Audio Platforms',
    links: [
      'https://iheart.com/podcast/246661302',
      'https://music.amazon.de/podcasts/e25a5879-9fb6-45b5-93b5-2f7716cdc8fa/world-soldworld-succession-deed-1400-98-httpsworldsoldwixsitecomworldsolden',
      'https://creators.spotify.com/pod/show/world-succession-deed',
      'https://podcasts.apple.com/de/podcast/world-sold-world-succession-deed-1400-98-http-world/id1786462631',
      'https://soundcloud.com/world-succession-deed',
      'https://www.youtube.com/@Staatensukzessionsurkunde-1400',
      'https://www.riffusion.com/World_Succession_Deed',
      'https://suno.com/@sukzession1998',
    ],
  },
  {
    title: '💬 Group 8: Social Media & Ko-fi',
    links: [
      'https://x.com/NWO_Support',
      'https://x.com/NWO_BOOKS',
      'https://x.com/WW3Precognition',
      'https://www.facebook.com/groups/528455169898378/?ref=share',
      'https://www.facebook.com/share/1B22YRgwYB',
      'https://www.facebook.com/share/1RwKsh5ikR',
      'https://www.facebook.com/share/1CCPHn65Qy',
      'https://ko-fi.com/electric_technocrat',
      'https://ko-fi.com/post/Resist-WWIII-Protest-Songs-for-Peace-H2H61HSW4T',
      'https://ko-fi.com/post/Tune-In-to-the-Future-Our-Podcast-Show-W7W21HR9L6',
    ],
  },
  {
    title: '🧪 Group 9: Google Gemini & NotebookLM',
    links: [
      'https://g.co/gemini/share/9fe07106afff',
      'https://g.co/gemini/share/4a457895642b',
      'https://notebooklm.google.com/notebook/435f97dc-5c34-4f6a-bc76-b4a20ce0db35',
      'https://notebooklm.google.com/notebook/1438a866-825e-493b-b662-f11971c41005',
      'https://notebooklm.google.com/notebook/9bf8032d-17db-471a-89e6-3dc684ea92c7',
    ],
  },
  {
    title: '📚 Group 10: HostingAuthors & Groops',
    links: [
      'https://www.hostingauthors.com/books/electric_technocracy',
      'https://www.hostingauthors.com/books/World_Succession_Deed',
      'https://www.hostingauthors.com/books/Mind_Games',
      'https://www.groops.com/pages/Electric-Technocracy-The-New-Government-for-a-Digital-Paradise.html',
    ],
  },
  {
    title: '🧭 Group 11: Wix Blog Categories & Cluster Structure',
    links: [
      'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/digitale-gesellschaft',
      'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/technologische-singularitaet',
      'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/innovation-zukunft',
      'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/zukunft-der-ki',
      'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/elektro-technokratie',
      'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/tech-regierung',
      'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/langlebigkeit',
      'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog/categories/kuenstliche-superintelligenz',
      'https://worldsold.wixsite.com/electric-technocracy/de/electric-paradise-blog',
      'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/tech-governance',
      'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/technological-singularity',
      'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/artificial-superintelligence',
      'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/future-innovations',
      'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/digital-society',
      'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/future-of-ai',
      'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/electric-technocracy',
      'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog/categories/longevity',
      'https://worldsold.wixsite.com/electric-technocracy/electric-paradise-blog',
      'https://worldsold.wixsite.com/world-sold/blog/categories/system_comparison',
      'https://worldsold.wixsite.com/world-sold/blog/categories/blacksite-geschichten',
      'https://worldsold.wixsite.com/world-sold/blog/categories/was-kostet-die-welt',
      'https://worldsold.wixsite.com/world-sold/blog/categories/elektronische-technokratie',
      'https://worldsold.wixsite.com/world-sold/blog/categories/lexicon_wiki',
      'https://worldsold.wixsite.com/world-sold/blog/categories/state_encyclopedia',
      'https://worldsold.wixsite.com/world-sold/blog/categories/between_nightmare_and_warning_exploring_dystopian_worlds',
      'https://worldsold.wixsite.com/world-sold/blog/categories/nwo-weltrevolution-tag-x',
      'https://worldsold.wixsite.com/world-sold/blog',
      'https://worldsold.wixsite.com/world-sold/en/blog/categories/between_nightmare_and_warning_exploring_dystopian_worlds-1',
      'https://worldsold.wixsite.com/world-sold/en/blog/categories/lexicon_wiki-1',
      'https://worldsold.wixsite.com/world-sold/en/blog/categories/blacksite-tales',
      'https://worldsold.wixsite.com/world-sold/en/blog/categories/cost-of-the-world',
      'https://worldsold.wixsite.com/world-sold/en/blog/categories/nwo-worldrevolution-day-x',
      'https://worldsold.wixsite.com/world-sold/en/blog/categories/elektronische-technokratie-1',
      'https://worldsold.wixsite.com/world-sold/en/blog/categories/state_encyclopedia-1',
      'https://worldsold.wixsite.com/world-sold/en/blog/categories/system_comparison-1',
      'https://worldsold.wixsite.com/world-sold/en/blog',
    ],
  },
];

export default function LinkListPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <LinkIcon className="h-8 w-8 text-primary" />
            <CardTitle className="font-headline text-3xl">Link Collection</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="prose prose-invert max-w-none">
          <p>
            Welcome to the future of world order! This blog post delves deeply into
            two key concepts that could redefine our global structure: the World
            Succession Deed 1400/98 and Electric Technocracy. Deed 1400/98 is
            presented as the legal foundation for global succession, while
            Electric Technocracy is presented as the planned AI-driven
            administrative system that will build upon it. Whether it is a
            strategic realignment or a utopian dream, the amount of linked
            material attests to the depth and breadth of this movement. Dive in
            and explore the various facets, documentation, and discussions
`surrounding these topics. Here is your clickable list of links.
          </p>
          
          {linkGroups.map((group) => (
            <div key={group.title} className="mt-8">
              <h2 className="font-headline text-2xl">{group.title}</h2>
              <ul className="list-disc space-y-2 pl-5">
                {group.links.map((link, index) => (
                  <li key={`${link}-${index}`}>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </CardContent>
      </Card>
    </div>
  );
}
