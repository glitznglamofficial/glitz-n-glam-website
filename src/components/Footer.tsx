import React, { useState } from 'react';
import { ArrowRight, Check, Droplets, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { CategoryType } from '../data/articles';

interface FooterProps {
  onSelectCategory: (category: CategoryType) => void;
  onAboutClick: () => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onAboutClick,
  onNavigateHome,
}) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#06180F] text-white pt-16 pb-12 border-t border-[#123624]">
      {/* Brand Guarantees Ticker */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-[#143B27]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <Droplets className="w-5 h-5 text-[#E6C687] shrink-0" />
            <div>
              <h5 className="font-editorial text-base font-bold text-white">100% Waterproof</h5>
              <p className="text-xs text-emerald-200/70 mt-0.5">Shower, swim & sweat without worry</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#E6C687] shrink-0" />
            <div>
              <h5 className="font-editorial text-base font-bold text-white">18K PVD Fusion</h5>
              <p className="text-xs text-emerald-200/70 mt-0.5">Vacuum plasma atomic bonding</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#E6C687] shrink-0" />
            <div>
              <h5 className="font-editorial text-base font-bold text-white">Hypoallergenic Core</h5>
              <p className="text-xs text-emerald-200/70 mt-0.5">Medical 316L surgical steel</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <Heart className="w-5 h-5 text-[#E6C687] shrink-0" />
            <div>
              <h5 className="font-editorial text-base font-bold text-white">Zero Green Skin</h5>
              <p className="text-xs text-emerald-200/70 mt-0.5">100% nickel-free & lead-free</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={onNavigateHome}
              className="text-left cursor-pointer group"
            >
              <span className="font-editorial text-3xl font-bold tracking-tight text-white uppercase group-hover:text-[#E6C687] transition-colors">
                Glitz n Glam
              </span>
              <span className="block text-[11px] tracking-[0.25em] text-emerald-300/70 uppercase font-sans font-medium mt-0.5">
                The Anti-Tarnish Journal
              </span>
            </button>
            <p className="text-sm text-emerald-100/80 leading-relaxed max-w-sm">
              Dedicated to liberating modern jewellery from the fear of tarnishing. Real 18K gold fused onto biocompatible 316L surgical steel for eternal brilliance.
            </p>
            <div className="pt-2 text-xs text-emerald-300/60">
              Published by Glitz n Glam Research & Style Bureau.
            </div>
          </div>

          {/* Column 2: Journal Categories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#E6C687] font-semibold">
              Editorial Sections
            </h4>
            <ul className="space-y-2 text-sm text-emerald-100/80">
              <li>
                <button
                  onClick={() => onSelectCategory('Science & Innovation')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Science & PVD Innovation
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Materials & Metals')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  316L Steel vs Brass
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Style & Layering')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Necklace & Ring Styling
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Everyday Staples')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  The Everyday Capsule
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('Jewellery Care')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Cleaning & Care Hacks
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Newsletter Club */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#E6C687] font-semibold">
              The Glitz Gazette
            </h4>
            <p className="text-xs text-emerald-100/80 leading-relaxed">
              Receive fortnightly guides on necklace stacking, anti-tarnish science, and early access to limited capsule releases.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-3 py-2 text-xs bg-[#0B2518] border border-emerald-800 text-white rounded-lg focus:outline-none focus:border-[#E6C687]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-[#0A2619] hover:bg-[#E6C687] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  Join
                </button>
              </div>
              {isSubscribed && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-300">
                  <Check className="w-3.5 h-3.5" />
                  <span>Welcome to the Glitz n Glam VIP list!</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#143B27] flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-300/60 gap-4">
          <p>© 2026 Glitz n Glam Ltd. All rights reserved. Registered trademark.</p>
          <div className="flex items-center gap-6">
            <button onClick={onAboutClick} className="hover:text-white transition-colors cursor-pointer">
              Our Material Standards
            </button>
            <button onClick={onAboutClick} className="hover:text-white transition-colors cursor-pointer">
              Ethics & Circularity
            </button>
            <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
              Journal Home
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
