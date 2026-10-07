import React from 'react';
import { Article } from '../data/articles';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticleIds: string[];
  articles: Article[];
  onSelectArticle: (articleId: string) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  savedArticleIds,
  articles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  const bookmarkedArticles = articles.filter((a) => savedArticleIds.includes(a.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl border-l border-[#E3EBE6] flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E3EBE6] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <Bookmark className="w-5 h-5 text-[#0A2619]" />
            <h3 className="font-editorial text-xl font-bold text-[#0A2619]">
              Saved Reading List ({bookmarkedArticles.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#446252] hover:text-[#0A2619] hover:bg-[#F1F6F3] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#EDF4F0]">
          {bookmarkedArticles.length === 0 ? (
            <div className="py-16 text-center text-[#446252] space-y-3">
              <Bookmark className="w-10 h-10 mx-auto text-[#0A2619] stroke-1" />
              <p className="font-editorial text-lg text-[#0A2619]">
                Your reading list is empty
              </p>
              <p className="text-xs max-w-xs mx-auto">
                Click the bookmark icon on any article to save guides for your next shopping or care routine.
              </p>
            </div>
          ) : (
            bookmarkedArticles.map((art) => (
              <div key={art.id} className="py-4 flex items-start justify-between gap-3 group">
                <div 
                  onClick={() => {
                    onSelectArticle(art.id);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer"
                >
                  <span className="text-[11px] uppercase tracking-wider text-[#164D34] font-semibold block mb-0.5">
                    {art.category} · {art.readTime}
                  </span>
                  <h4 className="font-editorial text-base font-bold text-[#0A2619] group-hover:text-[#184E36] transition-colors leading-snug line-clamp-2">
                    {art.title}
                  </h4>
                  <span className="inline-flex items-center gap-1 text-xs text-[#446252] mt-2 group-hover:text-[#0A2619]">
                    Read guide <ArrowRight className="w-3 h-3" />
                  </span>
                </div>

                <button
                  onClick={() => onRemoveBookmark(art.id)}
                  aria-label="Remove from reading list"
                  className="p-1.5 text-[#88A394] hover:text-red-700 transition-colors cursor-pointer"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {bookmarkedArticles.length > 0 && (
          <div className="p-4 border-t border-[#E3EBE6] bg-[#F8FAF9] flex items-center justify-between">
            <span className="text-xs text-[#446252]">
              {bookmarkedArticles.length} {bookmarkedArticles.length === 1 ? 'article' : 'articles'} saved
            </span>
            <button
              onClick={onClearAll}
              className="text-xs font-semibold text-[#164D34] hover:text-red-700 transition-colors cursor-pointer"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
