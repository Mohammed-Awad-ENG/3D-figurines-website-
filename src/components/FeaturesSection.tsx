

const noiseDataUri = "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E";

const features = [
  {
    title: "FLAWLESS CRAFT",
    description: "Every curve and edge is meticulously 3D printed with micron-level precision, ensuring the highest fidelity to the original design.",
  },
  {
    title: "HAND PAINTED",
    description: "Our artisans hand-paint every figurine using premium acrylics, bringing the character to life with vibrant, long-lasting colors.",
  },
  {
    title: "LIMITED EDITION",
    description: "Each run is strictly limited. Once a series sells out, the mold is retired forever. Own a piece of exclusive digital art made physical.",
  }
];

export default function FeaturesSection() {
  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#2D2D2D] overflow-hidden font-inter border-t-4 border-black">
      {/* Grain overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("${noiseDataUri}")`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat'
        }}
      />
      
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 flex flex-col md:flex-row gap-16 items-start">
        {/* Header Column */}
        <div className="md:w-1/3">
          <h2 className="text-white font-anton text-[clamp(50px,8vw,120px)] leading-[0.9] tracking-[-0.02em] uppercase mb-6">
            THE<br/>PROCESS
          </h2>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-sm">
            We don't just print models; we craft premium collectibles. Discover the journey from digital polygon to physical masterpiece.
          </p>
        </div>

        {/* Features Column */}
        <div className="md:w-2/3 flex flex-col gap-12">
          {features.map((feature, idx) => (
            <div key={idx} className="group flex flex-col gap-3 border-l-2 border-white/20 pl-6 hover:border-[#6BBF7A] transition-colors duration-300">
              <span className="text-[#6BBF7A] font-anton text-xl tracking-wider">0{idx + 1}</span>
              <h3 className="text-white font-bold uppercase text-2xl tracking-wide">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed max-w-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
