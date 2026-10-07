import React from 'react';
import { X, ShieldCheck, Droplets, HeartHandshake, Sparkles } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E3EBE6] overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#E3EBE6] flex items-center justify-between bg-white">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#164D34] font-bold block mb-0.5">
              Brand Philosophy & Standards
            </span>
            <h3 className="font-editorial text-2xl font-bold text-[#0A2619]">
              The Story of Glitz n Glam
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#446252] hover:text-[#0A2619] hover:bg-[#F1F6F3] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-[#2D4539] text-sm sm:text-base leading-relaxed">
          <p className="font-editorial text-xl sm:text-2xl text-[#0A2619] leading-snug">
            "We founded Glitz n Glam out of a shared frustration: buying jewellery that looked breathtaking on day one, only to turn green and tarnish on day fourteen."
          </p>

          <p>
            Traditional fashion jewellery treats gold as a flimsy cosmetic coating sprayed over cheap brass or copper alloys. When exposed to body sweat, humidity, or chlorine, these base metals corrode rapidly, leaching nickel and copper onto your skin.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
            <div className="p-4 bg-[#F8FAF9] border border-[#E3EBE6] rounded-xl flex items-start gap-3">
              <Droplets className="w-5 h-5 text-[#0A2619] shrink-0 mt-1" />
              <div>
                <h4 className="font-editorial text-base font-bold text-[#0A2619]">100% Waterproof</h4>
                <p className="text-xs text-[#446252] mt-1">
                  Wear your pieces in the shower, beach, spa, or swimming pool without removing them.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAF9] border border-[#E3EBE6] rounded-xl flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#0A2619] shrink-0 mt-1" />
              <div>
                <h4 className="font-editorial text-base font-bold text-[#0A2619]">18K PVD Deposition</h4>
                <p className="text-xs text-[#446252] mt-1">
                  Solid 18K gold vaporized in high-vacuum plasma chambers to fuse directly into the metal lattice.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAF9] border border-[#E3EBE6] rounded-xl flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#0A2619] shrink-0 mt-1" />
              <div>
                <h4 className="font-editorial text-base font-bold text-[#0A2619]">Zero Green Skin</h4>
                <p className="text-xs text-[#446252] mt-1">
                  Certified 100% nickel-free and lead-free. Biocompatible with the most sensitive ears and collarbones.
                </p>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAF9] border border-[#E3EBE6] rounded-xl flex items-start gap-3">
              <HeartHandshake className="w-5 h-5 text-[#0A2619] shrink-0 mt-1" />
              <div>
                <h4 className="font-editorial text-base font-bold text-[#0A2619]">Circular Longevity</h4>
                <p className="text-xs text-[#446252] mt-1">
                  Recycled surgical steel core designed to replace dozens of disposable fast-fashion pieces.
                </p>
              </div>
            </div>
          </div>

          <p>
            Through this journal, our metallurgists and editorial stylists unpack the science, care, and layering techniques that empower you to wear fine anti-tarnish jewellery with total confidence.
          </p>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#E3EBE6] bg-[#F8FAF9] flex items-center justify-between">
          <span className="text-xs text-[#446252]">
            Glitz n Glam · Engineered in Precision, Styled in Paris & New York
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#0A2619] text-white text-xs font-semibold uppercase tracking-wider rounded-lg hover:bg-[#184E36] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
