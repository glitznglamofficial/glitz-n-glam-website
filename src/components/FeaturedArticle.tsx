import React from 'react';
import { Article } from '../data/articles';
import { ArrowRight, Bookmark, Check } from 'lucide-react';

interface FeaturedArticleProps {
  article: Article;
  onReadArticle: (articleId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
  article,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <section className="relative overflow-hidden bg-[#0A2619] border-y border-[#16432E] py-12 md:py-16 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section kicker */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-semibold text-[#E6C687]">
            <span>Flagship Investigation</span>
            <span aria-hidden="true" className="text-emerald-500/40">/</span>
            <span>Cover Story</span>
          </div>
          <span className="text-xs text-emerald-200/60 font-mono tabular-nums">
            Issue № 01 · 2026
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-7 relative group">
            <div 
              onClick={() => onReadArticle(article.id)}
              className="relative aspect-16/10 rounded-xl overflow-hidden cursor-pointer shadow-xl border border-emerald-800/60 bg-[#071D13]"
            >
              <img
                src={article.image}
                alt={article.imageAlt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Highlight callout badge */}
              {article.highlightStat && (
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-[#081F14]/90 backdrop-blur-md px-4 py-3 rounded-lg border border-emerald-700/50 shadow-lg text-white">
                  <div className="text-[11px] uppercase tracking-wider text-[#E6C687] font-semibold">
                    {article.highlightStat.label}
                  </div>
                  <div className="text-xl font-bold font-editorial text-white">
                    {article.highlightStat.value}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {/* Clean unboxed metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-200/80 mb-3">
              <span className="text-[#E6C687] font-semibold tracking-wide uppercase">
                {article.category}
              </span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{article.publishDate}</span>
            </div>

            <h2 
              onClick={() => onReadArticle(article.id)}
              className="font-editorial text-3xl sm:text-4xl lg:text-[40px] font-bold text-white leading-[1.15] mb-4 cursor-pointer hover:text-[#E6C687] transition-colors"
              style={{ textWrap: 'balance' }}
            >
              {article.title}
            </h2>

            <p className="text-base text-emerald-100/90 leading-relaxed mb-6">
              {article.excerpt}
            </p>

            {/* Author Attribution */}
            <div className="flex items-center gap-3 py-4 border-y border-[#184530] mb-6">
              <div className="w-10 h-10 rounded-full bg-[#E6C687] text-[#0A2619] flex items-center justify-center font-editorial font-bold text-sm shadow-xs">
                {article.author.avatarInitials}
              </div>
              <div>
                <div className="text-sm font-semibold text-white">
                  {article.author.name}
                </div>
                <div className="text-xs text-emerald-200/70">
                  {article.author.role}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => onReadArticle(article.id)}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0A2619] hover:bg-[#EAEFEA] text-sm font-semibold tracking-wide uppercase rounded-lg transition-all shadow-sm cursor-pointer whitespace-nowrap"
              >
                <span>Read Full Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onToggleBookmark(article.id)}
                aria-label={isBookmarked ? 'Remove from saved' : 'Save article'}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-[#E6C687] text-[#0A2619] border-[#E6C687]'
                    : 'bg-transparent text-emerald-100 border-emerald-700/60 hover:text-white hover:border-emerald-400'
                }`}
                title={isBookmarked ? 'Saved to bookmarks' : 'Save for later'}
              >
                {isBookmarked ? <Check className="w-5 h-5 text-[#0A2619]" /> : <Bookmark className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
