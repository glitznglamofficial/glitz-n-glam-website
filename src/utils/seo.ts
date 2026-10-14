/**
 * SEO & Metadata Helper for Glitz n Glam
 * Handles dynamic document head updates, canonical URLs, and Schema.org JSON-LD
 */

export interface PageSeoData {
  title: string;
  metaDescription: string;
  mainKeyword: string;
  relatedKeywords: [string, string];
  canonicalPath: string;
  type?: 'website' | 'article';
  image?: string;
  publishDate?: string;
  authorName?: string;
  faqs?: Array<{ question: string; answer: string }>;
}

export const HOMEPAGE_SEO: PageSeoData = {
  title: 'Anti Tarnish Jewellery Articles – Tips & Style Guides',
  metaDescription:
    'Explore our anti tarnish jewellery articles for expert styling guides, care tips, and buying advice to keep your waterproof pieces shining bright every day.',
  mainKeyword: 'anti tarnish jewellery',
  relatedKeywords: ['waterproof gold jewellery', 'hypoallergenic 18k jewellery'],
  canonicalPath: '/',
  type: 'website',
  image: '/images/hero_jewellery_water_1791397599157.jpg',
  faqs: [
    {
      question: 'What is anti tarnish jewellery and how does it work?',
      answer:
        'Anti-tarnish jewellery is crafted by bonding genuine 18K gold onto biocompatible 316L surgical stainless steel using high-vacuum Physical Vapor Deposition (PVD). This atomic-level fusion makes the metal completely resistant to water, sweat, humidity, and atmospheric oxidation, eliminating tarnishing, fading, and peeling.',
    },
    {
      question: 'Why does cheap fashion jewellery turn skin green, and how does Glitz n Glam stop it?',
      answer:
        'Cheap jewellery turns skin green because base metals like copper and brass react with acidic sweat to create green copper carbonate salts. Glitz n Glam stops green skin permanently by using 100% hypoallergenic, nickel-free 316L surgical stainless steel that does not corrode or leach metallic ions into the skin.',
    },
    {
      question: 'Can you wear Glitz n Glam anti-tarnish jewellery in the shower and gym?',
      answer:
        'Yes. Glitz n Glam jewellery is engineered with vacuum-bonded 18K gold over 316L surgical steel, making it 100% waterproof and sweat-resistant. You can wear your rings, chains, and earrings continuously while showering, swimming in pools or oceans, and during intense workouts.',
    },
  ],
};

export function updatePageSeo(seo: PageSeoData) {
  // 1. Update Title (Strictly 30-60 chars)
  document.title = seo.title;

  // 2. Update Meta Description (Strictly 120-160 chars)
  setMetaTag('name', 'description', seo.metaDescription);

  // 3. Update Meta Keywords (Main + Related)
  const keywordsStr = `${seo.mainKeyword}, ${seo.relatedKeywords[0]}, ${seo.relatedKeywords[1]}, glitz n glam, 18k gold jewellery, 316l steel`;
  setMetaTag('name', 'keywords', keywordsStr);

  // 4. Update OpenGraph Tags
  setMetaTag('property', 'og:title', seo.title);
  setMetaTag('property', 'og:description', seo.metaDescription);
  setMetaTag('property', 'og:type', seo.type || 'website');
  
  const siteUrl = window.location.origin;
  const canonicalUrl = `${siteUrl}${seo.canonicalPath}`;
  setMetaTag('property', 'og:url', canonicalUrl);

  if (seo.image) {
    const fullImg = seo.image.startsWith('http') ? seo.image : `${siteUrl}${seo.image}`;
    setMetaTag('property', 'og:image', fullImg);
    setMetaTag('name', 'twitter:image', fullImg);
  }

  // 5. Update Twitter Cards
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', seo.title);
  setMetaTag('name', 'twitter:description', seo.metaDescription);

  // 6. Update Canonical Link
  let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.rel = 'canonical';
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.href = canonicalUrl;

  // 7. Inject/Update Schema.org Structured Data (JSON-LD)
  updateSchemaJsonLd(seo, canonicalUrl);
}

function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function updateSchemaJsonLd(seo: PageSeoData, canonicalUrl: string) {
  let script = document.getElementById('schema-jsonld') as HTMLScriptElement;
  if (!script) {
    script = document.createElement('script');
    script.id = 'schema-jsonld';
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }

  const baseSchema: any = {
    '@context': 'https://schema.org',
    '@type': seo.type === 'article' ? 'Article' : 'WebSite',
    name: seo.title,
    headline: seo.title,
    description: seo.metaDescription,
    url: canonicalUrl,
    inLanguage: 'en-US',
    publisher: {
      '@type': 'Organization',
      name: 'Glitz n Glam',
      logo: {
        '@type': 'ImageObject',
        url: `${window.location.origin}/images/hero_jewellery_water_1791397599157.jpg`,
      },
    },
  };

  if (seo.type === 'article') {
    baseSchema.datePublished = seo.publishDate || '2026-10-01';
    baseSchema.author = {
      '@type': 'Person',
      name: seo.authorName || 'Glitz n Glam Editorial Board',
    };
    if (seo.image) {
      baseSchema.image = `${window.location.origin}${seo.image}`;
    }
  }

  // If page contains AEO FAQs, inject FAQPage schema
  if (seo.faqs && seo.faqs.length > 0) {
    const schemas = [
      baseSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: seo.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      },
    ];
    script.textContent = JSON.stringify(schemas, null, 2);
  } else {
    script.textContent = JSON.stringify(baseSchema, null, 2);
  }
}
