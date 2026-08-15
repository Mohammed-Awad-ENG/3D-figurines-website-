import React from 'react';

const noiseDataUri = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E";

export default function Footer() {
  return (
    <footer className="relative w-full py-20 bg-black overflow-hidden font-inter border-t-4 border-[#2D2D2D]">
      {/* Grain overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-40 mix-blend-overlay"
        style={{
          backgroundImage: `url("${noiseDataUri}")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row justify-between items-center md:items-end gap-12 text-center md:text-left">
        
        {/* Left side: Newsletter & Branding */}
        <div className="flex flex-col gap-6 md:w-1/2">
          <h2 className="text-white font-anton text-[clamp(40px,5vw,70px)] leading-[1] tracking-[-0.02em] uppercase">
            JOIN THE<br/>WAITLIST
          </h2>
          <p className="text-white/70 max-w-sm mx-auto md:mx-0">
            Be the first to know when a new series of 3D figurines drops. No spam, just pure art.
          </p>
          <div className="flex w-full max-w-md mx-auto md:mx-0">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="bg-transparent border-2 border-white/30 text-white px-6 py-3 w-full focus:outline-none focus:border-[#F4845F] transition-colors rounded-l-full font-bold placeholder-white/30 tracking-wider uppercase text-sm"
            />
            <button className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-[#F4845F] hover:text-white transition-colors duration-300 rounded-r-full border-2 border-white hover:border-[#F4845F]">
              Submit
            </button>
          </div>
        </div>

        {/* Right side: Links & Social */}
        <div className="flex flex-col gap-8 md:w-1/2 items-center md:items-end">
          <span className="text-white text-2xl font-bold uppercase tracking-[0.25em] opacity-90">
            3D FIGURINES
          </span>
          
          <div className="flex gap-8 text-white/70 font-bold uppercase tracking-wider text-sm">
            <a href="#" onClick={e => e.preventDefault()} className="hover:text-white transition-colors">Instagram</a>
            <a href="#" onClick={e => e.preventDefault()} className="hover:text-white transition-colors">Twitter</a>
            <a href="#" onClick={e => e.preventDefault()} className="hover:text-white transition-colors">Discord</a>
          </div>

          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} 3D FIGURINES INC. ALL RIGHTS RESERVED.
          </p>
        </div>

      </div>
    </footer>
  );
}
