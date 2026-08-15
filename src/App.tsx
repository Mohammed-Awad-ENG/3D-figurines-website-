import React, { useState } from 'react';
import HeroCarousel from './components/HeroCarousel';
import FeaturesSection from './components/FeaturesSection';
import GalleryGrid from './components/GalleryGrid';
import Footer from './components/Footer';
import SplashCursor from './components/SplashCursor';

function App() {
  const [heroColor, setHeroColor] = useState('#F4845F');

  return (
    <main className="w-full bg-black min-h-screen">
      <SplashCursor 
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING={true}
        RAINBOW_MODE={false}
        COLOR={heroColor}
      />
      {/* 
        HeroCarousel acts as our landing viewport. 
        It has h-screen so it will take exactly one full viewport height. 
      */}
      <HeroCarousel onColorChange={setHeroColor} />
      
      {/* New sections we added to expand the website */}
      <FeaturesSection />
      
      <GalleryGrid />
      
      <Footer />
    </main>
  );
}

export default App;
