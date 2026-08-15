import React from 'react';

const IMAGES = [
  { src: '/images/1.png', bg: '#F4845F', name: 'FLAME BOY' },
  { src: '/images/2.png', bg: '#6BBF7A', name: 'LEAF GUARD' },
  { src: '/images/3.png', bg: '#E882B4', name: 'BUBBLE GUM' },
  { src: '/images/4.png', bg: '#6EB5FF', name: 'SKY WALKER' },
];

const noiseDataUri = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E";

export default function GalleryGrid() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-white overflow-hidden font-inter border-t-4 border-black">
      {/* Grain overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("${noiseDataUri}")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <h2 className="text-black font-anton text-[clamp(40px,6vw,90px)] leading-[0.9] tracking-[-0.02em] uppercase">
            THE<br/>COLLECTION
          </h2>
          <button className="rounded-full border-2 border-black px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-white transition-colors duration-300">
            View All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {IMAGES.map((img, idx) => (
            <div 
              key={idx} 
              className="group relative rounded-3xl aspect-[3/4] overflow-hidden cursor-pointer"
              style={{ backgroundColor: img.bg }}
            >
              {/* Card Grain */}
              <div 
                className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay"
                style={{
                  backgroundImage: `url("${noiseDataUri}")`,
                  backgroundSize: '200px 200px',
                  backgroundRepeat: 'repeat'
                }}
              />
              
              <div className="absolute top-6 left-6 z-20">
                <span className="text-white font-anton text-2xl tracking-wide opacity-90 drop-shadow-md">
                  {img.name}
                </span>
              </div>

              <div className="absolute inset-0 flex items-end justify-center pb-8 z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-4">
                <img 
                  src={img.src} 
                  alt={img.name} 
                  className="w-[80%] h-auto object-contain drop-shadow-2xl" 
                />
              </div>

              {/* Hover overlay text */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center">
                <span className="text-white font-bold uppercase tracking-widest border border-white px-6 py-2 rounded-full backdrop-blur-sm">
                  Quick View
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
