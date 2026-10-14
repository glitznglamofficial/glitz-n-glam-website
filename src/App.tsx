import React, { useState, useEffect } from 'react';
import { 
  ARTICLES, 
  CATEGORIES, 
  CategoryType 
} from './data/articles';
import { Navbar } from './components/Navbar';
import { FeaturedArticle } from './components/FeaturedArticle';
import { ArticleCard } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { AboutModal } from './components/AboutModal';
import { JewelleryQuiz } from './components/JewelleryQuiz';
import { Footer } from './components/Footer';
import { CleanLink } from './components/CleanLink';
import { 
  parseCurrentRoute, 
  pushRoute, 
  CATEGORY_SLUG_MAP, 
  updatePageSEO 
} from './utils/router';
import { 
  ArrowUpDown, 
  Sparkles, 
  Droplets, 
  ShieldCheck, 
  Layers, 
  Search as SearchIcon,
  X
} from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All Articles');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'newest' | 'reading-time' | 'title'>('newest');
  
  // Modals & Drawers state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Bookmarks state with localStorage persistence
  const [savedArticleIds, setSavedArticleIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('glitz_saved_articles');
      return stored ? JSON.parse(stored) : ['1', '3']; // Pre-populate 2 favorites
    } catch {
      return ['1', '3'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('glitz_saved_articles', JSON.stringify(savedArticleIds));
    } catch {
      // storage unavailable
    }
  }, [savedArticleIds]);

  // Sync route on mount and when browser back/forward buttons are pressed
  useEffect(() => {
    const syncRoute = () => {
      const route = parseCurrentRoute();

      if (route.page === 'article' && route.articleSlug) {
        const target = ARTICLES.find((a) => a.slug === route.articleSlug);
        if (target) {
          setActiveArticleId(target.id);
          setIsAboutOpen(false);
          setIsBookmarksOpen(false);
          setIsSearchOpen(false);
          updatePageSEO(
            target.metaTitle || `${target.title} | Glitz n Glam`,
            target.metaDescription || target.excerpt,
            `/${target.slug}`
          );
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
      }

      // If not viewing an article
      setActiveArticleId(null);

      if (route.page === 'category' && route.category) {
        setSelectedCategory(route.category);
        setIsAboutOpen(false);
        setIsBookmarksOpen(false);
        setIsSearchOpen(false);
        if (route.category === 'All Articles') {
          updatePageSEO(
            'Anti Tarnish Jewellery Articles – Tips & Style Guides',
            'Explore anti tarnish jewellery tips, styling ideas, care guides and jewellery trends from Glitz N Glam. Discover inspiration and find your next favourite piece!',
            `/${CATEGORY_SLUG_MAP[route.category]}`
          );
        } else {
          updatePageSEO(
            `${route.category} Articles | Glitz n Glam Journal`,
            `Curated anti-tarnish jewellery guides on ${route.category} by Glitz n Glam.`,
            `/${CATEGORY_SLUG_MAP[route.category]}`
          );
        }
        const el = document.getElementById('articles-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (route.page === 'philosophy') {
        setIsAboutOpen(true);
        setIsBookmarksOpen(false);
        setIsSearchOpen(false);
        updatePageSEO(
          'Our Philosophy & Material Standards | Glitz n Glam',
          'Learn about our standard of 18K gold fused onto medical-grade 316L surgical steel.',
          '/our-philosophy'
        );
      } else if (route.page === 'saved') {
        setIsBookmarksOpen(true);
        setIsAboutOpen(false);
        setIsSearchOpen(false);
        updatePageSEO(
          'Saved Reading List | Glitz n Glam Journal',
          'Your saved anti-tarnish jewellery guides and style routines.',
          '/saved-articles'
        );
      } else if (route.page === 'quiz') {
        setIsAboutOpen(false);
        setIsBookmarksOpen(false);
        setIsSearchOpen(false);
        updatePageSEO(
          'Jewellery Formula Matcher | Glitz n Glam',
          'Find your ideal anti-tarnish jewellery formula for workouts, sensitive skin, and daily wear.',
          '/jewellery-quiz'
        );
        const quizEl = document.getElementById('jewellery-quiz-section');
        if (quizEl) {
          quizEl.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (route.page === 'search') {
        setIsSearchOpen(true);
        setIsAboutOpen(false);
        setIsBookmarksOpen(false);
        updatePageSEO(
          'Search Articles Archive | Glitz n Glam',
          'Search through all 10 in-depth anti-tarnish jewellery investigations.',
          '/search'
        );
      } else {
        // Home
        setIsAboutOpen(false);
        setIsBookmarksOpen(false);
        setIsSearchOpen(false);
        updatePageSEO(
          'Anti Tarnish Jewellery Articles – Tips & Style Guides',
          'Explore anti tarnish jewellery tips, styling ideas, care guides and jewellery trends from Glitz N Glam. Discover inspiration and find your next favourite piece!',
          '/'
        );
      }
    };

    syncRoute();
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  const navigateToArticle = (idOrSlug: string) => {
    const article = ARTICLES.find((a) => a.id === idOrSlug || a.slug === idOrSlug);
    if (article) {
      pushRoute(`/${article.slug}`);
      setActiveArticleId(article.id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateHome = () => {
    pushRoute('/');
    setActiveArticleId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (cat: CategoryType) => {
    setSelectedCategory(cat);
    setActiveArticleId(null);
    if (cat === 'All Articles') {
      pushRoute('/all-articles');
    } else {
      pushRoute(`/${CATEGORY_SLUG_MAP[cat]}`);
    }
  };

  const openAbout = () => {
    pushRoute('/our-philosophy');
  };

  const closeAbout = () => {
    setIsAboutOpen(false);
    if (window.location.pathname === '/our-philosophy') {
      pushRoute(activeArticle ? `/${activeArticle.slug}` : '/');
    }
  };

  const openBookmarks = () => {
    pushRoute('/saved-articles');
  };

  const closeBookmarks = () => {
    setIsBookmarksOpen(false);
    if (window.location.pathname === '/saved-articles') {
      pushRoute(activeArticle ? `/${activeArticle.slug}` : '/');
    }
  };

  const openSearch = () => {
    pushRoute('/search');
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    if (window.location.pathname === '/search') {
      pushRoute(activeArticle ? `/${activeArticle.slug}` : '/');
    }
  };

  const toggleBookmark = (articleId: string) => {
    setSavedArticleIds((prev) =>
      prev.includes(articleId)
        ? prev.filter((id) => id !== articleId)
        : [...prev, articleId]
    );
  };

  const clearBookmarks = () => {
    setSavedArticleIds([]);
  };

  // Find currently active article object
  const activeArticle = activeArticleId
    ? ARTICLES.find((a) => a.id === activeArticleId) || null
    : null;

  // Filter & Sort articles for homepage grid
  const filteredArticles = ARTICLES.filter((art) => {
    const matchesCategory =
      selectedCategory === 'All Articles' || art.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesQuery;
  }).sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    if (sortBy === 'reading-time') {
      const timeA = parseInt(a.readTime, 10);
      const timeB = parseInt(b.readTime, 10);
      return timeB - timeA;
    }
    // 'newest' default (by article id)
    return parseInt(b.id, 10) - parseInt(a.id, 10);
  });

  // Featured flagship article
  const featuredArticle = ARTICLES.find((a) => a.featured) || ARTICLES[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14281f]">
      {/* Top Navigation Bar with Clean Links */}
      <Navbar
        onSearchClick={openSearch}
        onBookmarksClick={openBookmarks}
        onAboutClick={openAbout}
        savedCount={savedArticleIds.length}
        onSelectCategory={handleSelectCategory}
        onNavigateHome={navigateHome}
        currentArticleId={activeArticleId}
        activeCategory={selectedCategory}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeArticle ? (
          /* Separate Dedicated Article View with Clean URL */
          <ArticleView
            article={activeArticle}
            allArticles={ARTICLES}
            onBack={navigateHome}
            onSelectArticle={navigateToArticle}
            isBookmarked={savedArticleIds.includes(activeArticle.id)}
            onToggleBookmark={toggleBookmark}
          />
        ) : (
          /* Homepage View */
          <div>
            {/* Editorial Hero Banner */}
            <section className="pt-12 sm:pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#EEF5F1] border border-[#CDE1D6] rounded-full text-xs font-semibold tracking-wider text-[#0A2619] uppercase mb-6">
                <Sparkles className="w-3.5 h-3.5 text-[#0A2619]" />
                <span>The Definitive Anti-Tarnish Jewellery Archive</span>
              </div>

              <h1 
                className="font-editorial text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#0A2619] leading-[1.08] mb-6 max-w-4xl mx-auto"
                style={{ textWrap: 'balance' }}
              >
                Anti Tarnish Jewelry: Timeless 18K Gold, Engineered for Endless Wear
              </h1>

              <p className="text-base sm:text-xl text-[#2D4539] max-w-2xl mx-auto leading-relaxed mb-8">
                Welcome to the definitive guide to anti tarnish jewelry by Glitz N Glam. Our curated journal uncovers the metallurgy of durable stainless steel jewellery and waterproof gold finishes, helping you style luxury anti tarnish jewellery that withstands water, sweat, and daily life.
              </p>

              {/* Three Pillars Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto pt-6 border-t border-[#E3EBE6] text-left">
                <div className="flex items-center gap-3 p-3.5 bg-[#F8FAF9] border border-[#E3EBE6] rounded-xl">
                  <Droplets className="w-5 h-5 text-[#0A2619] shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#0A2619] font-bold block">100% Waterproof</span>
                    <span className="text-xs text-[#3B5B4C]">Shower & swim tested</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-[#F8FAF9] border border-[#E3EBE6] rounded-xl">
                  <ShieldCheck className="w-5 h-5 text-[#0A2619] shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#0A2619] font-bold block">Zero Green Skin</span>
                    <span className="text-xs text-[#3B5B4C]">Stainless steel jewellery base</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 bg-[#F8FAF9] border border-[#E3EBE6] rounded-xl">
                  <Layers className="w-5 h-5 text-[#0A2619] shrink-0" />
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#0A2619] font-bold block">18K PVD Fusion</span>
                    <span className="text-xs text-[#3B5B4C]">Anti tarnish jewellery standard</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Featured Article Section */}
            <FeaturedArticle
              article={featuredArticle}
              onReadArticle={navigateToArticle}
              isBookmarked={savedArticleIds.includes(featuredArticle.id)}
              onToggleBookmark={toggleBookmark}
            />

            {/* Interactive Jewellery Formula Matcher */}
            <div id="jewellery-quiz-section">
              <JewelleryQuiz onSelectArticle={navigateToArticle} />
            </div>

            {/* All Articles Section */}
            <section id="articles-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              {/* Section Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#E3EBE6] gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#164D34] font-bold block mb-1">
                    Complete Editorial Collection
                  </span>
                  <h2 className="font-editorial text-3xl sm:text-4xl font-bold text-[#0A2619]">
                    Anti Tarnish Jewellery & Stainless Steel Jewellery Journal
                  </h2>
                </div>

                {/* Filter and Search Stats */}
                <div className="flex items-center gap-3 text-xs text-[#446252]">
                  <span>Showing <strong className="text-[#0A2619] font-semibold">{filteredArticles.length}</strong> of 10 articles</span>
                  {selectedCategory !== 'All Articles' && (
                    <button
                      onClick={() => handleSelectCategory('All Articles')}
                      className="text-[#0A2619] font-semibold underline cursor-pointer hover:text-[#184E36]"
                    >
                      Reset filter
                    </button>
                  )}
                </div>
              </div>

              {/* Interactive Category Segmented Tabs with Clean Links */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-8 no-scrollbar">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat;
                  const catUrl = cat === 'All Articles' ? '/all-articles' : `/${CATEGORY_SLUG_MAP[cat]}`;
                  return (
                    <CleanLink
                      key={cat}
                      to={catUrl}
                      onClick={() => handleSelectCategory(cat)}
                      className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap cursor-pointer block ${
                        isActive
                          ? 'bg-[#0A2619] text-white shadow-xs'
                          : 'bg-[#F1F6F3] text-[#2D4539] hover:bg-[#E3EDE7] hover:text-[#0A2619]'
                      }`}
                    >
                      {cat}
                    </CleanLink>
                  );
                })}
              </div>

              {/* Inline Search & Sort Controls Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 bg-[#F8FAF9] border border-[#E3EBE6] rounded-xl shadow-xs">
                {/* Search input */}
                <div className="w-full sm:w-80 relative">
                  <SearchIcon className="w-4 h-4 text-[#446252] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Filter articles by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-[#D6E3DC] rounded-lg focus:outline-none focus:border-[#0A2619] text-[#14281f]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 text-[#446252] hover:text-[#0A2619]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Sort selector */}
                <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-[#2D4539]">
                  <ArrowUpDown className="w-3.5 h-3.5 text-[#164D34]" />
                  <span>Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-[#D6E3DC] text-[#0A2619] rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#0A2619] font-medium"
                  >
                    <option value="newest">Featured & Newest</option>
                    <option value="reading-time">Reading Length</option>
                    <option value="title">Alphabetical</option>
                  </select>
                </div>
              </div>

              {/* Grid of All 10 Article Cards */}
              {filteredArticles.length === 0 ? (
                <div className="py-20 text-center bg-[#F8FAF9] border border-[#E3EBE6] rounded-2xl">
                  <p className="font-editorial text-2xl text-[#0A2619] mb-2">
                    No articles match your criteria
                  </p>
                  <p className="text-sm text-[#446252] mb-4">
                    Try choosing a different category or clearing your search term.
                  </p>
                  <button
                    onClick={() => {
                      handleSelectCategory('All Articles');
                      setSearchQuery('');
                    }}
                    className="px-5 py-2.5 bg-[#0A2619] text-white text-xs font-semibold uppercase tracking-wider rounded-lg cursor-pointer hover:bg-[#184E36]"
                  >
                    View All 10 Articles
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onReadArticle={navigateToArticle}
                      isBookmarked={savedArticleIds.includes(article.id)}
                      onToggleBookmark={toggleBookmark}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      {/* Luxury Editorial Footer with Clean Links */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onAboutClick={openAbout}
        onNavigateHome={navigateHome}
      />

      {/* Global Overlays & Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={closeSearch}
        articles={ARTICLES}
        onSelectArticle={navigateToArticle}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={closeBookmarks}
        savedArticleIds={savedArticleIds}
        articles={ARTICLES}
        onSelectArticle={navigateToArticle}
        onRemoveBookmark={toggleBookmark}
        onClearAll={clearBookmarks}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={closeAbout}
      />
    </div>
  );
}
