import { ARTICLES, Article, CategoryType } from '../data/articles';

export interface RouteState {
  page: 'home' | 'article' | 'category' | 'philosophy' | 'saved' | 'quiz' | 'search';
  articleSlug?: string;
  category?: CategoryType;
}

// Map human-readable categories to clean, hyphenated lowercase URLs
export const CATEGORY_SLUG_MAP: Record<CategoryType, string> = {
  'All Articles': 'all-articles',
  'Science & Innovation': 'science-and-innovation',
  'Style & Layering': 'style-and-layering',
  'Materials & Metals': 'materials-and-metals',
  'Everyday Staples': 'everyday-staples',
  'Jewellery Care': 'jewellery-care',
};

export const SLUG_TO_CATEGORY_MAP: Record<string, CategoryType> = {
  'all-articles': 'All Articles',
  'science-and-innovation': 'Science & Innovation',
  'style-and-layering': 'Style & Layering',
  'materials-and-metals': 'Materials & Metals',
  'everyday-staples': 'Everyday Staples',
  'jewellery-care': 'Jewellery Care',
};

// Legacy slug aliases for backwards-compatibility redirection
const LEGACY_SLUG_MAP: Record<string, string> = {
  'science-of-anti-tarnish-pvd-coating': 'science-pvd-coating',
  'gold-plated-vs-stainless-steel-comparison': 'gold-plated-vs-stainless-steel',
  'sweat-proof-water-resistant-gym-jewellery': 'waterproof-gym-jewellery',
  'perfume-lotion-moisture-damaging-jewellery': 'perfume-moisture-jewellery-care',
  'hypoallergenic-jewellery-sensitive-skin': 'hypoallergenic-jewellery-guide',
  'mastering-necklace-layering-without-tangling': 'necklace-layering-guide',
  'art-of-ring-stacking-proportions-comfort': 'ring-stacking-guide',
  'sustainable-anti-tarnish-jewellery-green-fashion': 'sustainable-jewellery-fashion',
  'how-to-clean-and-store-anti-tarnish-jewellery': 'jewellery-care-and-storage',
  'boardroom-to-beach-club-versatile-styling': 'waterproof-jewellery-styling',
};

/**
 * Normalizes any incoming pathname or hash into a clean RouteState
 */
export function parseCurrentRoute(): RouteState {
  let path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase();

  // If a hash exists (e.g. from older links or external shares), translate it and strip the hash
  if (hash.startsWith('#/article/')) {
    const raw = hash.replace('#/article/', '').replace(/\/+$/, '');
    const resolvedSlug = LEGACY_SLUG_MAP[raw] || raw;
    const target = ARTICLES.find((a) => a.slug === resolvedSlug || a.id === resolvedSlug);
    if (target) {
      window.history.replaceState(null, '', `/${target.slug}`);
      return { page: 'article', articleSlug: target.slug };
    }
  } else if (hash === '#quiz' || hash === '#/quiz') {
    window.history.replaceState(null, '', '/jewellery-quiz');
    return { page: 'quiz' };
  } else if (hash === '#about' || hash === '#/philosophy') {
    window.history.replaceState(null, '', '/our-philosophy');
    return { page: 'philosophy' };
  } else if (hash === '#bookmarks' || hash === '#/saved') {
    window.history.replaceState(null, '', '/saved-articles');
    return { page: 'saved' };
  }

  // Root homepage
  if (!path || path === '') {
    return { page: 'home' };
  }

  // Strip leading slash
  const slug = path.startsWith('/') ? path.slice(1) : path;

  // Handle /articles/slug or /article/slug
  const cleanSlug = slug.replace(/^(articles|article)\//, '');

  // Check legacy redirect
  if (LEGACY_SLUG_MAP[cleanSlug]) {
    const canonical = LEGACY_SLUG_MAP[cleanSlug];
    window.history.replaceState(null, '', `/${canonical}`);
    return { page: 'article', articleSlug: canonical };
  }

  // Check if it's an article
  const article = ARTICLES.find((a) => a.slug === cleanSlug);
  if (article) {
    if (slug !== article.slug) {
      // Canonicalize e.g. /articles/something -> /something
      window.history.replaceState(null, '', `/${article.slug}`);
    }
    return { page: 'article', articleSlug: article.slug };
  }

  // Check category
  if (SLUG_TO_CATEGORY_MAP[slug]) {
    return { page: 'category', category: SLUG_TO_CATEGORY_MAP[slug] };
  }

  // Static clean routes
  if (slug === 'our-philosophy' || slug === 'philosophy') {
    return { page: 'philosophy' };
  }

  if (slug === 'saved-articles' || slug === 'reading-list') {
    return { page: 'saved' };
  }

  if (slug === 'jewellery-quiz' || slug === 'formula-matcher') {
    return { page: 'quiz' };
  }

  if (slug === 'search') {
    return { page: 'search' };
  }

  // Fallback to home
  return { page: 'home' };
}

/**
 * Updates document meta tags for SEO and social sharing
 */
export function updatePageSEO(title: string, description: string, canonicalPath: string) {
  document.title = title;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute('content', description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', description);
  }

  const ogUrl = document.querySelector('meta[property="og:url"]');
  const fullUrl = `${window.location.origin}${canonicalPath.startsWith('/') ? canonicalPath : '/' + canonicalPath}`;
  if (ogUrl) {
    ogUrl.setAttribute('content', fullUrl);
  }

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', fullUrl);
}

/**
 * Navigate to a clean URL using HTML5 pushState
 */
export function pushRoute(url: string) {
  if (window.location.pathname !== url) {
    window.history.pushState(null, '', url);
  }
  window.dispatchEvent(new PopStateEvent('popstate'));
}
