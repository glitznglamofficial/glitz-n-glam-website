import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../data/articles';
import { Search, X, ArrowRight, BookOpen } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.subtitle.toLowerCase().includes(query.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(query.toLowerCase()) ||
          a.category.toLowerCase().includes(query.toLowerCase()) ||
          a.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : articles.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E3EBE6] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E3EBE6] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#0A2619]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search all 10 articles by topic, material, or keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-base text-[#14281f] bg-transparent focus:outline-none placeholder:text-[#88A394]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#446252] hover:text-[#0A2619]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#446252] hover:text-[#0A2619] border border-[#E3EBE6] rounded-md"
          >
            Esc
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6 divide-y divide-[#EDF4F0]">
          <div className="text-xs uppercase tracking-wider text-[#164D34] font-semibold pb-3">
            {query.trim()
              ? `Results found (${filtered.length})`
              : 'Popular Articles & Investigations'}
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-[#446252]">
              <p className="text-base font-editorial text-[#0A2619]">No articles matched "{query}"</p>
              <p className="text-xs mt-1">Try searching for "PVD", "shower", "steel", "rings", or "hypoallergenic".</p>
            </div>
          ) : (
            filtered.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art.id);
                  onClose();
                }}
                className="py-3.5 group cursor-pointer flex items-center justify-between gap-4 hover:bg-[#F1F6F3] px-3 rounded-lg transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-md bg-[#EEF5F1] shrink-0 overflow-hidden mt-0.5">
                    <img
                      src={art.image}
                      alt=""
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-[#446252]">
                      <span className="text-[#164D34] font-semibold uppercase">
                        {art.category}
                      </span>
                      <span>·</span>
                      <span>{art.readTime}</span>
                    </div>
                    <h4 className="font-editorial text-base sm:text-lg font-bold text-[#0A2619] group-hover:text-[#184E36] transition-colors leading-snug">
                      {art.title}
                    </h4>
                  </div>
                </div>

                <div className="shrink-0 text-[#446252] group-hover:text-[#0A2619] group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-3 bg-[#F8FAF9] border-t border-[#E3EBE6] text-xs text-[#446252] flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5 text-[#0A2619]" />
            10 articles available across 5 jewellery disciplines
          </span>
          <span>Click any article to read</span>
        </div>
      </div>
    </div>
  );
};
