import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const IMAGES = [
  { src: '/images/1.png', bg: '#F4845F', panel: '#F79B7F' },
  { src: '/images/2.png', bg: '#6BBF7A', panel: '#85CC92' },
  { src: '/images/3.png', bg: '#E882B4', panel: '#ED9DC4' },
  { src: '/images/4.png', bg: '#6EB5FF', panel: '#8DC4FF' },
];

const ANIMATION_DURATION = 650;

export default function HeroCarousel({ onColorChange }: { onColorChange?: (color: string) => void }) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Notify parent of color change
  useEffect(() => {
    if (onColorChange) {
      onColorChange(IMAGES[activeIndex].bg);
    }
  }, [activeIndex, onColorChange]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check mobile with debounce
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 640);
      }, 150);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  // Preload images
  useEffect(() => {
    IMAGES.forEach((img) => {
      const image = new Image();
      image.src = img.src;
    });
  }, []);

  const navigate = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    
    if (direction === 'next') {
      setActiveIndex((prev) => (prev + 1) % 4);
    } else {
      setActiveIndex((prev) => (prev + 3) % 4);
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, ANIMATION_DURATION);
  }, [isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const getRole = (index: number) => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex + 3) % 4) return 'left';
    if (index === (activeIndex + 1) % 4) return 'right';
    return 'back';
  };

  const getStyleForRole = (role: string): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      transition: `transform ${ANIMATION_DURATION}ms cubic-bezier(0.4,0,0.2,1), filter ${ANIMATION_DURATION}ms cubic-bezier(0.4,0,0.2,1), opacity ${ANIMATION_DURATION}ms cubic-bezier(0.4,0,0.2,1), left ${ANIMATION_DURATION}ms cubic-bezier(0.4,0,0.2,1), bottom ${ANIMATION_DURATION}ms cubic-bezier(0.4,0,0.2,1), height ${ANIMATION_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
      willChange: 'transform, filter, opacity, left, bottom, height',
    };

    switch (role) {
      case 'center':
        return {
          ...baseStyle,
          transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
          filter: 'blur(0px)',
          opacity: 1,
          zIndex: 20,
          left: '50%',
          height: isMobile ? '60%' : '92%',
          bottom: isMobile ? '22%' : '0%',
        };
      case 'left':
        return {
          ...baseStyle,
          transform: `translateX(-50%) scale(1)`,
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '20%' : '30%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
        };
      case 'right':
        return {
          ...baseStyle,
          transform: `translateX(-50%) scale(1)`,
          filter: 'blur(2px)',
          opacity: 0.85,
          zIndex: 10,
          left: isMobile ? '80%' : '70%',
          height: isMobile ? '16%' : '28%',
          bottom: isMobile ? '32%' : '12%',
        };
      case 'back':
        return {
          ...baseStyle,
          transform: `translateX(-50%) scale(1)`,
          filter: 'blur(4px)',
          opacity: 1,
          zIndex: 5,
          left: '50%',
          height: isMobile ? '13%' : '22%',
          bottom: isMobile ? '32%' : '12%',
        };
      default:
        return baseStyle;
    }
  };

  const noiseDataUri = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E";

  return (
    <div 
      className="relative w-full overflow-hidden font-inter"
      style={{
        backgroundColor: IMAGES[activeIndex].bg,
        transition: `background-color ${ANIMATION_DURATION}ms cubic-bezier(0.4,0,0.2,1)`,
      }}
    >
      <div className="relative w-full overflow-hidden h-screen min-h-[600px]">
        
        {/* 1. Grain overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-50 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url("${noiseDataUri}")`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat'
          }}
        />

        {/* 2. Giant ghost text */}
        <div 
          className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-10 top-[18%]"
          aria-hidden="true"
        >
          <span className="text-white uppercase font-black font-anton text-[clamp(90px,28vw,380px)] leading-none tracking-[-0.02em] opacity-100 whitespace-nowrap">
            3D SHAPE
          </span>
        </div>

        {/* 3. Top-left brand label (Will move to Navbar in App.tsx later, but kept for standalone for now) */}
        <div className="absolute top-6 left-4 sm:left-8 z-50">
          <span className="text-white text-xs font-semibold uppercase tracking-[0.18em] opacity-90">
            3D FIGURINES
          </span>
        </div>

        {/* 4. Carousel */}
        <div className="absolute inset-0 z-20">
          {IMAGES.map((img, index) => {
            const role = getRole(index);
            const style = getStyleForRole(role);
            return (
              <div 
                key={index}
                className="absolute aspect-[0.6/1]"
                style={style}
              >
                <img 
                  src={img.src}
                  alt={`Character ${index + 1}`}
                  draggable={false}
                  className="w-full h-full object-contain object-bottom"
                />
              </div>
            );
          })}
        </div>

        {/* 5. Bottom-left text + nav buttons */}
        <div className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 z-50 max-w-[320px]">
          <p className="text-white font-bold uppercase tracking-[0.02em] mb-2 sm:mb-3 text-base sm:text-[22px] opacity-95">
            3D FIGURINES
          </p>
          <p className="hidden sm:block text-white text-xs sm:text-sm opacity-85 leading-relaxed mb-4 sm:mb-5">
            The artwork is stunning, shipped fully prepared. The finish is a vision, the 3D craft is flawless. Many thanks! Wishing you the win. Order now.
          </p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('prev')}
              className="flex items-center justify-center rounded-full border-2 border-white w-12 h-12 sm:w-16 sm:h-16 text-white bg-transparent transition-all duration-150 hover:scale-[1.08] hover:bg-white/10"
              aria-label="Previous character"
            >
              <ArrowLeft size={26} strokeWidth={2.25} />
            </button>
            <button 
              onClick={() => navigate('next')}
              className="flex items-center justify-center rounded-full border-2 border-white w-12 h-12 sm:w-16 sm:h-16 text-white bg-transparent transition-all duration-150 hover:scale-[1.08] hover:bg-white/10"
              aria-label="Next character"
            >
              <ArrowRight size={26} strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* 6. Bottom-right link */}
        <div className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 z-50">
          <button 
            onClick={(e) => { e.preventDefault(); console.log('Discover clicked'); }}
            className="flex items-center text-white uppercase opacity-95 hover:opacity-100 transition-opacity duration-200 group font-anton text-[clamp(20px,4vw,56px)] leading-none tracking-[-0.02em] font-normal"
          >
            DISCOVER IT
            <ArrowRight className="ml-2 w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
          </button>
        </div>

      </div>
    </div>
  );
}
