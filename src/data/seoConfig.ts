export interface SEOEntry {
  title: string;
  description: string;
  canonicalPath: string;
  headline?: string;
}

export const HOMEPAGE_SEO: SEOEntry = {
  title: 'Anti Tarnish Jewellery Articles – Tips & Style Guides',
  description:
    'Explore anti tarnish jewellery tips, styling guides, and trends from Glitz N Glam. Discover curated inspiration and find your next favourite waterproof piece.',
  canonicalPath: '/',
};

export const ARTICLE_SEO_MAP: Record<string, SEOEntry> = {
  'how-to-choose-anti-tarnish-earrings': {
    title: 'How to Choose Anti Tarnish Earrings | Glitz N Glam Guide',
    description:
      'Learn how to choose anti tarnish earrings for sensitive ears and daily wear. Discover waterproof studs, hoop styling tips, and durable hypoallergenic designs.',
    canonicalPath: '/how-to-choose-anti-tarnish-earrings',
    headline: 'How to Choose Anti-Tarnish Earrings',
  },
  'gold-plated-jewellery': {
    title: 'Gold Plated Jewellery: Expert Style, Quality & Care Guide',
    description:
      'Explore our complete guide to gold plated jewellery. Discover PVD coating, lasting quality, versatile daily styling, and essential cleaning and care tips.',
    canonicalPath: '/gold-plated-jewellery',
    headline: 'Gold-Plated Jewellery: Style, Quality and Care',
  },
  'what-is-anti-tarnish-jewellery': {
    title: 'What Is Anti Tarnish Jewellery? Complete Science Guide',
    description:
      'Discover what is anti tarnish jewellery, how modern PVD gold bonding prevents fading, and why waterproof stainless steel pieces are ideal for everyday wear.',
    canonicalPath: '/what-is-anti-tarnish-jewellery',
    headline: 'What Is Anti-Tarnish Jewellery?',
  },
  'recipes': {
    title: 'Jewellery Care Recipes & Cleaning Formulas | Glitz N Glam',
    description:
      'Explore jewellery care recipes, cleaning formulas, and maintenance tips from Glitz N Glam to keep anti-tarnish pieces sparkling.',
    canonicalPath: '/recipes',
    headline: 'Jewellery Care Recipes & Cleaning Formulas',
  },
  'heritage': {
    title: 'Jewellery Heritage & Materials Guide | Glitz N Glam',
    description:
      'Discover the heritage of durable jewellery, 18K gold finishes, and hypoallergenic metals curated by Glitz N Glam.',
    canonicalPath: '/heritage',
    headline: 'Jewellery Heritage & Materials Guide',
  },
  'techniques': {
    title: 'Anti Tarnish Techniques & Innovation | Glitz N Glam',
    description:
      'Learn advanced anti tarnish techniques, PVD bonding science, and waterproof jewellery innovation from Glitz N Glam.',
    canonicalPath: '/techniques',
    headline: 'Anti Tarnish Techniques & Innovation',
  },
};

/**
 * Resolves SEO metadata based on a pathname or slug.
 */
export function getSeoForPath(pathname: string): SEOEntry {
  const clean = pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  
  if (!clean || clean === 'all-articles') {
    return HOMEPAGE_SEO;
  }

  // Check article direct match
  if (ARTICLE_SEO_MAP[clean]) {
    return ARTICLE_SEO_MAP[clean];
  }

  // Check /articles/ or /article/ prefix
  const slugWithoutPrefix = clean.replace(/^(articles|article)\//, '');
  if (ARTICLE_SEO_MAP[slugWithoutPrefix]) {
    return ARTICLE_SEO_MAP[slugWithoutPrefix];
  }

  return HOMEPAGE_SEO;
}

/**
 * Injects SEO metadata into an HTML string.
 */
export function injectSeoIntoHtml(html: string, seo: SEOEntry): string {
  let updated = html;

  // Replace <title>...</title>
  updated = updated.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);

  // Replace or inject <meta name="description" content="..." />
  if (/<meta\s+name=["']description["']/i.test(updated)) {
    updated = updated.replace(
      /<meta\s+name=["']description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta name="description" content="${seo.description}" />`
    );
  } else {
    updated = updated.replace(/<\/head>/i, `  <meta name="description" content="${seo.description}" />\n</head>`);
  }

  // Replace og:title
  if (/<meta\s+property=["']og:title["']/i.test(updated)) {
    updated = updated.replace(
      /<meta\s+property=["']og:title["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:title" content="${seo.title}" />`
    );
  } else {
    updated = updated.replace(/<\/head>/i, `  <meta property="og:title" content="${seo.title}" />\n</head>`);
  }

  // Replace og:description
  if (/<meta\s+property=["']og:description["']/i.test(updated)) {
    updated = updated.replace(
      /<meta\s+property=["']og:description["']\s+content=["'][\s\S]*?["']\s*\/?>/i,
      `<meta property="og:description" content="${seo.description}" />`
    );
  } else {
    updated = updated.replace(/<\/head>/i, `  <meta property="og:description" content="${seo.description}" />\n</head>`);
  }

  // Replace or inject canonical link
  if (/<link\s+rel=["']canonical["']/i.test(updated)) {
    updated = updated.replace(
      /<link\s+rel=["']canonical["']\s+href=["'][\s\S]*?["']\s*\/?>/i,
      `<link rel="canonical" href="${seo.canonicalPath}" />`
    );
  }

  return updated;
}
