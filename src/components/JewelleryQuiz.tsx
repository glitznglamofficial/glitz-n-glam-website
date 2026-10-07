import React, { useState } from 'react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

interface JewelleryQuizProps {
  onSelectArticle: (articleId: string) => void;
}

export const JewelleryQuiz: React.FC<JewelleryQuizProps> = ({ onSelectArticle }) => {
  const [selectedPersona, setSelectedPersona] = useState<number | null>(null);

  const personas = [
    {
      id: 0,
      title: 'The 24/7 Active Wearer',
      description: 'You shower, work out, swim, and sleep in your jewels with zero desire to remove them daily.',
      recommendedArticleId: '3', // 7-Piece Everyday Capsule
      articleTitle: 'The 7-Piece Everyday Jewellery Capsule',
      badge: 'Capsule Routine',
    },
    {
      id: 1,
      title: 'The Sensitive Skin Seeker',
      description: 'Tired of red itchy earlobes, contact rashes, or dark green discoloration on your skin.',
      recommendedArticleId: '5', // Hypoallergenic Guide
      articleTitle: 'Hypoallergenic & Sensitive Skin Guide',
      badge: 'Medical-Grade Purity',
    },
    {
      id: 2,
      title: 'The Style & Layering Enthusiast',
      description: 'You love stacking rings, mixing chain weights, and mastering tangle-free necklace stacks.',
      recommendedArticleId: '6', // Art of Necklace Layering
      articleTitle: 'Mastering the Art of Necklace Layering',
      badge: 'Pro Styling Tips',
    },
    {
      id: 3,
      title: 'The Materials & Science Inquirer',
      description: 'You want the hard facts: atomic bonding, PVD vacuum chambers, and 10x durability proof.',
      recommendedArticleId: '1', // PVD Science
      articleTitle: 'The Science of Anti-Tarnish & PVD Coating',
      badge: 'Metallurgy Focus',
    },
  ];

  return (
    <section className="my-16 py-12 px-6 sm:px-10 bg-[#0A2619] border border-[#16432E] rounded-2xl max-w-7xl mx-auto text-white shadow-xl">
      <div className="max-w-3xl mb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#E6C687] font-bold mb-2">
          <Sparkles className="w-4 h-4 text-[#E6C687]" />
          <span>Interactive Formula Finder</span>
        </div>
        <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
          What Is Your Anti-Tarnish Jewellery Priority?
        </h3>
        <p className="text-sm sm:text-base text-emerald-100/90">
          Select your everyday wear lifestyle to instantly receive curated editorial insights and care recommendations from our metallurgists.
        </p>
      </div>

      {/* Persona Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {personas.map((p) => {
          const isSelected = selectedPersona === p.id;
          return (
            <div
              key={p.id}
              onClick={() => setSelectedPersona(p.id)}
              className={`p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-white border-[#E6C687] shadow-xl ring-2 ring-[#E6C687] text-[#14281f]'
                  : 'bg-white/95 border-emerald-800/40 hover:bg-white hover:border-[#E6C687] text-[#14281f]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#164D34]">
                    {p.badge}
                  </span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-[#0A2619]" />}
                </div>
                <h4 className="font-editorial text-lg font-bold text-[#0A2619] mb-2 leading-tight">
                  {p.title}
                </h4>
                <p className="text-xs text-[#2D4539] leading-relaxed mb-4">
                  {p.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#EDF4F0] mt-auto">
                <span className="text-[11px] text-[#446252] block mb-1">
                  Matched Guide:
                </span>
                <span className="text-xs font-semibold text-[#0A2619] line-clamp-1">
                  {p.articleTitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Recommendation Box */}
      {selectedPersona !== null ? (
        <div className="p-5 bg-white border border-[#E6C687] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in duration-200 text-[#14281f] shadow-lg">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#164D34] font-bold block mb-1">
              Your Recommended Reading
            </span>
            <h4 className="font-editorial text-lg sm:text-xl font-bold text-[#0A2619]">
              {personas[selectedPersona].articleTitle}
            </h4>
          </div>
          <button
            onClick={() => onSelectArticle(personas[selectedPersona].recommendedArticleId)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0A2619] text-white hover:bg-[#184E36] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer whitespace-nowrap shadow-sm"
          >
            <span>Read Recommended Guide</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="text-center py-2 text-xs text-emerald-200/70">
          Click any card above to reveal your tailored guide.
        </div>
      )}
    </section>
  );
};
