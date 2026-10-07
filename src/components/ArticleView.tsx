import React, { useState, useEffect } from 'react';
import { Article } from '../data/articles';
import { 
  ArrowLeft, 
  Bookmark, 
  Check, 
  Share2, 
  Clock, 
  Calendar, 
  Sparkles, 
  ThumbsUp, 
  MessageSquare, 
  Send,
  Type
} from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (articleId: string) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

interface Comment {
  id: string;
  name: string;
  text: string;
  date: string;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  isBookmarked,
  onToggleBookmark,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);
  const [hasVotedHelpful, setHasVotedHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(48);
  const [largeFont, setLargeFont] = useState(false);

  // Reader comments state
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      name: 'Camilla Roux',
      text: 'I used to take off my jewellery every single time I washed my hands because of horrible green rings from high street brands. Switching to Glitz n Glam 316L steel completely changed my morning routine!',
      date: '2 days ago',
    },
    {
      id: 'c2',
      name: 'Jessica T.',
      text: 'The explanation of PVD vacuum bonding vs electroplating was so insightful. I finally understand why my old gold plated pieces peeled after swimming.',
      date: '4 days ago',
    },
  ]);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const handleHelpfulVote = () => {
    if (!hasVotedHelpful) {
      setHasVotedHelpful(true);
      setHelpfulCount((prev) => prev + 1);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;

    const newComment: Comment = {
      id: Date.now().toString(),
      name: newCommentName.trim(),
      text: newCommentText.trim(),
      date: 'Just now',
    };

    setComments([newComment, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 3000);
  };

  // Curate related articles (same category or others, excluding current)
  const relatedArticles = allArticles
    .filter((a) => a.id !== article.id)
    .sort((a, b) => (a.category === article.category ? -1 : 1))
    .slice(0, 3);

  // Find previous and next article
  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-white pb-24 text-[#14281f]">
      {/* Sticky Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#0A2619] z-50 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Breadcrumb Navigation & Controls Bar */}
      <div className="bg-white border-b border-[#E3EBE6] sticky top-20 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#2D4539] hover:text-[#0A2619] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to all articles</span>
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Font size toggle */}
            <button
              onClick={() => setLargeFont(!largeFont)}
              className="p-2 text-[#2D4539] hover:text-[#0A2619] hover:bg-[#F1F6F3] rounded-lg transition-colors cursor-pointer"
              title={largeFont ? 'Switch to standard font' : 'Switch to larger reading font'}
            >
              <Type className={`w-4 h-4 ${largeFont ? 'text-[#0A2619] font-bold' : ''}`} />
            </button>

            {/* Share button */}
            <button
              onClick={handleShare}
              className="p-2 text-[#2D4539] hover:text-[#0A2619] hover:bg-[#F1F6F3] rounded-lg transition-colors cursor-pointer relative"
              title="Share article link"
            >
              <Share2 className="w-4 h-4" />
              {copiedShare && (
                <span className="absolute top-full right-0 mt-1.5 px-2.5 py-1 text-[11px] font-medium bg-[#0A2619] text-white rounded shadow-md whitespace-nowrap">
                  Link copied!
                </span>
              )}
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => onToggleBookmark(article.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-[#0A2619] text-white border-[#0A2619]'
                  : 'bg-transparent text-[#2D4539] border-[#D6E3DC] hover:text-[#0A2619] hover:border-[#0A2619]'
              }`}
            >
              {isBookmarked ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Save</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Article Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Unboxed Metadata */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#446252] mb-4">
          <span className="text-[#164D34] font-semibold tracking-wider uppercase">
            {article.category}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {article.publishDate}
          </span>
        </div>

        {/* Article Title */}
        <h1 
          className="font-editorial text-3xl sm:text-5xl lg:text-[52px] font-bold text-[#0A2619] leading-[1.12] mb-6 tracking-tight"
          style={{ textWrap: 'balance' }}
        >
          {article.title}
        </h1>

        {/* Subtitle / Deck */}
        <p className="text-lg sm:text-xl text-[#2D4539] leading-relaxed mb-8 font-serif italic">
          {article.subtitle}
        </p>

        {/* Author Bio Row */}
        <div className="flex items-center justify-between py-5 border-y border-[#E3EBE6] mb-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#0A2619] text-white flex items-center justify-center font-editorial font-bold text-base shadow-xs">
              {article.author.avatarInitials}
            </div>
            <div>
              <div className="text-sm font-bold text-[#0A2619]">
                {article.author.name}
              </div>
              <div className="text-xs text-[#446252]">
                {article.author.role}
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#446252]">
            <span>Glitz n Glam Editorial Board</span>
          </div>
        </div>

        {/* Lead Hero Image */}
        <div className="relative aspect-16/10 rounded-2xl overflow-hidden mb-12 shadow-sm border border-[#E3EBE6] bg-[#EEF5F1]">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 text-xs text-white/90">
            {article.imageAlt} — Photographed for Glitz n Glam Journal.
          </div>
        </div>

        {/* Table of Contents jump box */}
        <div className="mb-12 p-6 bg-[#F8FAF9] border border-[#E3EBE6] rounded-xl">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#164D34] mb-3">
            In This Article
          </h4>
          <ul className="space-y-2 text-sm text-[#1E362A]">
            <li>
              <a href="#introduction" className="hover:text-[#0A2619] transition-colors font-medium">
                Introduction: Setting the Standard
              </a>
            </li>
            {article.sections.map((sec, idx) => (
              <li key={idx}>
                <a 
                  href={`#section-${idx}`} 
                  className="hover:text-[#0A2619] transition-colors"
                >
                  {sec.heading}
                </a>
              </li>
            ))}
            <li>
              <a href="#conclusion" className="hover:text-[#0A2619] transition-colors font-medium">
                Final Verdict & Longevity Advice
              </a>
            </li>
          </ul>
        </div>

        {/* Article Body Content */}
        <div className={`prose max-w-none text-[#1A3326] ${largeFont ? 'text-lg sm:text-xl leading-[1.8]' : 'text-base sm:text-lg leading-[1.75]'}`}>
          {/* Introduction with drop cap */}
          <div id="introduction" className="mb-10 text-justify">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:font-editorial first-letter:float-left first-letter:mr-3 first-letter:text-[#0A2619] first-letter:leading-none">
              {article.introduction}
            </p>
          </div>

          {/* Sections */}
          {article.sections.map((section, idx) => (
            <section key={idx} id={`section-${idx}`} className="mb-12 pt-4">
              <h2 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A2619] mb-5 tracking-tight">
                {section.heading}
              </h2>

              <div className="space-y-4 mb-6">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx} className="text-[#254234]">
                    {p}
                  </p>
                ))}
              </div>

              {/* Styled Key Takeaway quote */}
              {section.keyTakeaway && (
                <div className="my-6 pl-5 border-l-2 border-[#0A2619] bg-[#F8FAF9] py-4 pr-5 rounded-r-lg">
                  <span className="block text-xs uppercase tracking-wider text-[#164D34] font-bold mb-1">
                    Editorial Takeaway
                  </span>
                  <p className="font-editorial text-lg text-[#0A2619] italic">
                    "{section.keyTakeaway}"
                  </p>
                </div>
              )}

              {/* Styled Pro Tip Box */}
              {section.proTip && (
                <div className="my-6 p-5 bg-[#F1F6F3] border border-[#CDE1D6] rounded-xl flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-[#0A2619] shrink-0 mt-0.5" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[#0A2619] font-bold mb-1">
                      Stylist & Care Pro Tip
                    </span>
                    <p className="text-sm sm:text-base text-[#1E362A]">
                      {section.proTip}
                    </p>
                  </div>
                </div>
              )}
            </section>
          ))}

          {/* Conclusion */}
          <div id="conclusion" className="mt-12 p-8 bg-[#0A2619] text-white border border-[#16432E] rounded-2xl shadow-lg">
            <h3 className="font-editorial text-2xl font-bold text-white mb-3">
              The Glitz n Glam Conclusion
            </h3>
            <p className="text-emerald-100/90 leading-relaxed">
              {article.conclusion}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-10 pt-6 border-t border-[#E3EBE6] flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wider text-[#446252] font-semibold mr-2">
            Keywords:
          </span>
          {article.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs text-[#1E362A] bg-[#EEF5F1] px-3 py-1 rounded-md"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Helpful Feedback Module */}
        <div className="mt-12 p-6 bg-[#F8FAF9] border border-[#E3EBE6] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm font-semibold text-[#0A2619]">
              Was this jewellery guide helpful to you?
            </h4>
            <p className="text-xs text-[#446252]">
              Your feedback helps our gemologists and stylists curate better guides.
            </p>
          </div>
          <button
            onClick={handleHelpfulVote}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
              hasVotedHelpful
                ? 'bg-[#0A2619] text-white'
                : 'bg-[#E5F0E9] text-[#0A2619] hover:bg-[#D6E7DC]'
            }`}
          >
            <ThumbsUp className="w-4 h-4" />
            <span>{hasVotedHelpful ? 'Thank you!' : `Helpful (${helpfulCount})`}</span>
          </button>
        </div>

        {/* Author Bio Footer Box */}
        <div className="mt-12 p-6 sm:p-8 bg-[#F8FAF9] border border-[#E3EBE6] rounded-2xl flex flex-col sm:flex-row items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-[#0A2619] text-white flex items-center justify-center font-editorial font-bold text-2xl shrink-0 shadow-sm">
            {article.author.avatarInitials}
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-[#164D34] font-semibold mb-1">
              About the Author
            </div>
            <h4 className="font-editorial text-xl font-bold text-[#0A2619] mb-2">
              {article.author.name}
            </h4>
            <p className="text-sm text-[#2D4539] leading-relaxed">
              Dr. Fontaine and our editorial team lead metallurgical research and product styling at Glitz n Glam. They rigorously test every piece against salt water, chlorine, sweat, and cosmetics to redefine modern everyday jewellery.
            </p>
          </div>
        </div>

        {/* Next / Prev Navigation */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevArticle ? (
            <button
              onClick={() => onSelectArticle(prevArticle.id)}
              className="text-left p-5 rounded-xl border border-[#E3EBE6] hover:border-[#0A2619] hover:bg-[#F8FAF9] transition-all cursor-pointer group"
            >
              <span className="text-[11px] uppercase tracking-wider text-[#446252] block mb-1">
                ← Previous Article
              </span>
              <span className="font-editorial text-lg font-bold text-[#0A2619] group-hover:text-[#184E36] transition-colors line-clamp-1">
                {prevArticle.title}
              </span>
            </button>
          ) : <div />}

          {nextArticle ? (
            <button
              onClick={() => onSelectArticle(nextArticle.id)}
              className="text-right p-5 rounded-xl border border-[#E3EBE6] hover:border-[#0A2619] hover:bg-[#F8FAF9] transition-all cursor-pointer group"
            >
              <span className="text-[11px] uppercase tracking-wider text-[#446252] block mb-1">
                Next Article →
              </span>
              <span className="font-editorial text-lg font-bold text-[#0A2619] group-hover:text-[#184E36] transition-colors line-clamp-1">
                {nextArticle.title}
              </span>
            </button>
          ) : <div />}
        </div>

        {/* Community Discussion & Reader Reactions */}
        <section className="mt-16 pt-10 border-t border-[#E3EBE6]">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-[#164D34]" />
            <h3 className="font-editorial text-2xl font-bold text-[#0A2619]">
              Reader Reflections ({comments.length})
            </h3>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleAddComment} className="mb-8 p-6 bg-[#F8FAF9] border border-[#E3EBE6] rounded-xl space-y-4">
            <h4 className="text-sm font-semibold text-[#0A2619]">
              Share your thoughts or ask a jewellery question
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name (e.g. Sarah M.)"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6E3DC] rounded-lg focus:outline-none focus:border-[#0A2619]"
              />
            </div>
            <textarea
              placeholder="What has your experience been with anti-tarnish jewellery?"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              required
              rows={3}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D6E3DC] rounded-lg focus:outline-none focus:border-[#0A2619]"
            />
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A2619] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#184E36] transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Comment</span>
              </button>
              {commentSubmitted && (
                <span className="text-xs text-emerald-800 font-medium">
                  Your comment was published!
                </span>
              )}
            </div>
          </form>

          {/* Comment List */}
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="p-5 bg-white border border-[#E3EBE6] rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-[#0A2619]">{c.name}</span>
                  <span className="text-xs text-[#446252]">{c.date}</span>
                </div>
                <p className="text-sm text-[#254234] leading-relaxed">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Articles Section */}
        <section className="mt-20 pt-10 border-t border-[#E3EBE6]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-[#0A2619]">
              Related Articles & Guides
            </h3>
            <span className="text-xs uppercase tracking-wider text-[#164D34] font-semibold">
              Curated for you
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onSelectArticle(rel.id)}
                className="group cursor-pointer flex flex-col bg-white border border-[#E3EBE6] rounded-xl overflow-hidden hover:border-[#0A2619] hover:shadow-md transition-all"
              >
                <div className="aspect-4/3 overflow-hidden bg-stone-100">
                  <img
                    src={rel.image}
                    alt={rel.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-[#164D34] font-semibold mb-1">
                      {rel.category}
                    </div>
                    <h4 className="font-editorial text-base font-bold text-[#0A2619] group-hover:text-[#184E36] transition-colors line-clamp-2 mb-2">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="text-xs text-[#446252] pt-2 border-t border-[#EDF4F0]">
                    {rel.readTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};
