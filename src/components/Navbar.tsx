import React, { useState } from 'react';
import { Search, Bookmark, Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { CategoryType } from '../data/articles';

interface NavbarProps {
  onSearchClick: () => void;
  onBookmarksClick: () => void;
  onAboutClick: () => void;
  savedCount: number;
  onSelectCategory: (category: CategoryType) => void;
  onNavigateHome: () => void;
  currentArticleId: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  onSearchClick,
  onBookmarksClick,
  onAboutClick,
  savedCount,
  onSelectCategory,
  onNavigateHome,
  currentArticleId,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E3EBE6] transition-all">
      {/* Editorial Announcement Banner */}
      <div className="bg-[#072417] text-white py-2 px-4 text-center text-xs tracking-wider uppercase font-medium flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#E6C687]" />
        <span>The Anti-Tarnish Standard: 18K Gold fused with 316L Surgical Steel</span>
        <span className="hidden sm:inline text-emerald-400/40">·</span>
        <span className="hidden sm:inline text-emerald-100/80">100% Shower, Pool & Workout Safe</span>
      </div>

      {/* Main Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title wordmark */}
        <button
          onClick={() => {
            onNavigateHome();
            setMobileMenuOpen(false);
          }}
          className="text-left group cursor-pointer focus-visible:outline-none"
        >
          <span className="font-editorial text-2xl sm:text-3xl font-bold tracking-tight text-[#0A2619] uppercase group-hover:text-[#184E36] transition-colors">
            Glitz n Glam
          </span>
          <span 
            className="block tracking-[0.25em] text-[#3B5B4C] uppercase font-sans font-medium -mt-1"
            style={{ fontSize: '7px' }}
          >
            The Anti-Tarnish Journal
          </span>
        </button>

        {/* Zone 2: 4-6 Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#2D4539]">
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('All Articles');
            }}
            className="hover:text-[#0A2619] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#0A2619]"
          >
            All Articles
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Science & Innovation');
            }}
            className="hover:text-[#0A2619] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#0A2619]"
          >
            The Science
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Style & Layering');
            }}
            className="hover:text-[#0A2619] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#0A2619]"
          >
            Style Guides
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Materials & Metals');
            }}
            className="hover:text-[#0A2619] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#0A2619]"
          >
            Materials
          </button>
          <button
            onClick={() => {
              onNavigateHome();
              onSelectCategory('Jewellery Care');
            }}
            className="hover:text-[#0A2619] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#0A2619]"
          >
            Care Guide
          </button>
          <button
            onClick={onAboutClick}
            className="hover:text-[#0A2619] transition-colors cursor-pointer py-1 border-b-2 border-transparent hover:border-[#0A2619]"
          >
            Our Philosophy
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onSearchClick}
            aria-label="Search articles"
            className="flex items-center gap-2 text-xs font-medium text-[#2D4539] hover:text-[#0A2619] bg-[#F1F6F3] hover:bg-[#E3EDE7] px-3 py-2 rounded-lg transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#3B5B4C]" />
            <span className="hidden sm:inline text-[#3B5B4C]">Search articles...</span>
          </button>

          <button
            onClick={onBookmarksClick}
            aria-label="Saved articles"
            className="relative p-2 text-[#2D4539] hover:text-[#0A2619] hover:bg-[#F1F6F3] rounded-lg transition-colors cursor-pointer"
            title="Saved Reading List"
          >
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#0A2619] text-white text-[11px] font-bold rounded-full flex items-center justify-center tabular-nums">
                {savedCount}
              </span>
            )}
          </button>

          <button
            onClick={onAboutClick}
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wide uppercase bg-[#0A2619] text-white hover:bg-[#163D2B] rounded-lg transition-colors cursor-pointer shadow-xs"
          >
            <span>Brand Story</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#2D4539] hover:text-[#0A2619] rounded-lg cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E3EBE6] bg-white px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-base font-medium text-[#1E362A]">
            <button
              onClick={() => {
                onNavigateHome();
                onSelectCategory('All Articles');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#EDF4F0]"
            >
              All Articles (10)
            </button>
            <button
              onClick={() => {
                onNavigateHome();
                onSelectCategory('Science & Innovation');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#EDF4F0]"
            >
              The Science (PVD Tech)
            </button>
            <button
              onClick={() => {
                onNavigateHome();
                onSelectCategory('Style & Layering');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#EDF4F0]"
            >
              Style & Layering Guides
            </button>
            <button
              onClick={() => {
                onNavigateHome();
                onSelectCategory('Materials & Metals');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#EDF4F0]"
            >
              Materials & 316L Steel
            </button>
            <button
              onClick={() => {
                onNavigateHome();
                onSelectCategory('Jewellery Care');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 border-b border-[#EDF4F0]"
            >
              Jewellery Care Guide
            </button>
            <button
              onClick={() => {
                onAboutClick();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#0A2619] font-semibold"
            >
              About Glitz n Glam
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
