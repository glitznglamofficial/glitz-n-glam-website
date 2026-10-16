import React, { useEffect, useState, useRef } from 'react';

interface TooltipState {
  text: string;
  x: number;
  y: number;
  maxWidth: number;
  placement: 'inside-bottom' | 'below' | 'above';
  visible: boolean;
}

export const ImageAltTooltip: React.FC = () => {
  const [tooltip, setTooltip] = useState<TooltipState>({
    text: '',
    x: 0,
    y: 0,
    maxWidth: 380,
    placement: 'inside-bottom',
    visible: false,
  });

  const activeImgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const updatePosition = (img: HTMLImageElement) => {
      const alt = img.getAttribute('alt') || img.alt;
      if (!alt || !alt.trim()) {
        setTooltip((prev) => ({ ...prev, visible: false }));
        return;
      }

      const rect = img.getBoundingClientRect();
      // Only show if image is rendered and visible in viewport
      if (rect.width === 0 || rect.height === 0) return;
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Position centered horizontally over the image, safe inside screen bounds
      const centerX = rect.left + rect.width / 2;
      const safeX = Math.max(16, Math.min(centerX, viewportWidth - 16));
      
      // Responsive max-width
      const calculatedMaxWidth = Math.min(
        Math.max(rect.width - 24, 200),
        Math.min(viewportWidth - 32, 420)
      );

      let targetY: number;
      let placement: 'inside-bottom' | 'below' | 'above';

      if (rect.height >= 110) {
        // Overlay nicely over the inside bottom edge of the image
        targetY = rect.bottom - 12;
        placement = 'inside-bottom';
      } else if (rect.bottom + 65 <= viewportHeight) {
        // Place right below the image (for small thumbnails)
        targetY = rect.bottom + 8;
        placement = 'below';
      } else {
        // Place above the image
        targetY = Math.max(12, rect.top - 8);
        placement = 'above';
      }

      setTooltip({
        text: alt.trim(),
        x: safeX,
        y: targetY,
        maxWidth: calculatedMaxWidth,
        placement,
        visible: true,
      });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      let img: HTMLImageElement | null = null;
      if (target instanceof HTMLImageElement) {
        img = target;
      } else {
        // Check if target is inside a picture tag or image container
        img = target.closest('picture')?.querySelector('img') || target.querySelector('img');
      }

      if (img && (img.getAttribute('alt') || img.alt)) {
        activeImgRef.current = img;
        updatePosition(img);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (activeImgRef.current) {
        const related = e.relatedTarget as HTMLElement | null;
        if (!related || (related !== activeImgRef.current && !activeImgRef.current.contains(related))) {
          // If we also left any picture/container wrapping activeImg
          const picture = activeImgRef.current.closest('picture');
          if (picture && related && picture.contains(related)) {
            return;
          }
          activeImgRef.current = null;
          setTooltip((prev) => ({ ...prev, visible: false }));
        }
      }
    };

    const handleScrollOrResize = () => {
      if (activeImgRef.current) {
        updatePosition(activeImgRef.current);
      } else {
        setTooltip((prev) => ({ ...prev, visible: false }));
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  if (!tooltip.text) return null;

  const baseYOffset = tooltip.placement === 'below' ? '0%' : '-100%';

  return (
    <div
      role="tooltip"
      aria-live="polite"
      className={`fixed z-[999999] pointer-events-none transition-all duration-300 ease-out ${
        tooltip.visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        left: `${tooltip.x}px`,
        top: `${tooltip.y}px`,
        maxWidth: `${tooltip.maxWidth}px`,
        transform: `translate(-50%, ${baseYOffset}) translateY(${tooltip.visible ? '0px' : '6px'}) scale(${tooltip.visible ? 1 : 0.96})`,
        transformOrigin: tooltip.placement === 'below' ? 'top center' : 'bottom center',
        transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="bg-[#071D13]/94 backdrop-blur-md text-white px-3.5 py-2.5 rounded-xl border border-emerald-500/30 shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 shadow-sm animate-pulse" />
          <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-300 font-sans">
            Image Alt Text
          </span>
        </div>
        <p className="text-xs text-white leading-relaxed font-sans font-normal selection:bg-none">
          {tooltip.text}
        </p>
      </div>
    </div>
  );
};
