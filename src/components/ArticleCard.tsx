import React from 'react';
import { Article } from '../data/articles';
import { Bookmark, Check, ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onReadArticle: (articleId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onReadArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <article className="group flex flex-col bg-white border border-[#E3EBE6] rounded-xl overflow-hidden hover:border-[#0A2619] hover:shadow-lg transition-all duration-300">
      {/* Visual Asset Container (4:3 aspect ratio) */}
      <div 
        onClick={() => onReadArticle(article.id)}
        className="relative aspect-4/3 overflow-hidden bg-[#EEF5F1] cursor-pointer"
      >
        <img
          src={article.image}
          alt={article.imageAlt}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        {/* Subtle scrim for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover quick-read affordance */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center text-[#0A2619] shadow-md">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean Unboxed Metadata with Typographic Separators */}
          <div className="flex items-center gap-2 text-xs text-[#446252] mb-3">
            <span className="text-[#164D34] font-semibold uppercase tracking-wider">
              {article.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
            <span aria-hidden="true">·</span>
            <span>{article.publishDate}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onReadArticle(article.id)}
            className="font-editorial text-xl sm:text-2xl font-bold text-[#0A2619] leading-snug mb-3 cursor-pointer group-hover:text-[#184E36] transition-colors"
            style={{ textWrap: 'balance' }}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-[#2D4539] leading-relaxed line-clamp-3 mb-4">
            {article.excerpt}
          </p>
        </div>

        {/* Footer info: Author & Bookmark Button */}
        <div className="pt-4 border-t border-[#EDF4F0] flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#E5F0E9] text-[#0A2619] flex items-center justify-center font-editorial font-bold text-xs">
              {article.author.avatarInitials}
            </div>
            <span className="text-xs font-medium text-[#1E362A]">
              {article.author.name}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article.id);
            }}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
            className={`p-2 rounded-md transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-[#0A2619] text-white'
                : 'text-[#446252] hover:text-[#0A2619] hover:bg-[#F1F6F3]'
            }`}
            title={isBookmarked ? 'Saved to reading list' : 'Save for later'}
          >
            {isBookmarked ? <Check className="w-4 h-4 text-emerald-200" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </article>
  );
};
