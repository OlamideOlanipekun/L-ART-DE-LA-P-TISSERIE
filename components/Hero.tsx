import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onScrollToMenu: () => void;
}

const Hero: React.FC<HeroProps> = ({ onScrollToMenu }) => {
  return (
    <section className="relative h-[90vh] lg:h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax-like feel */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=2000" 
          alt="Luxury Pastry Background" 
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-stone-950/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl text-white space-y-6 lg:space-y-8">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="inline-block px-4 py-1.5 border border-white/30 rounded-full text-[9px] lg:text-[10px] font-bold tracking-[0.3em] uppercase mb-4 lg:mb-6 backdrop-blur-sm">
              Parisian Tradition • Modern Alchemy
            </span>
            <h1 className="text-5xl md:text-8xl font-serif leading-[1.1] mb-6 lg:mb-8">
              The Poetry <br className="hidden sm:block" /> of <span className="italic text-gold">Sugar</span>
            </h1>
            <p className="text-base lg:text-xl text-stone-200 font-light max-w-lg leading-relaxed mb-8 lg:mb-10">
              Where artisan craftsmanship meets contemporary flavor. Discover our collection of delicate viennoiserie and avant-garde entremets.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={onScrollToMenu}
                className="group bg-white text-stone-900 px-8 py-4 lg:py-5 rounded-full font-bold text-[10px] tracking-widest hover:bg-gold hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                EXPLORE COLLECTION
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="text-white border-b border-white/30 pb-1 text-[10px] font-bold tracking-widest hover:border-white transition-all uppercase text-center sm:text-left">
                Our Story
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Side Text */}
      <div className="absolute right-8 bottom-24 hidden xl:block">
        <span className="text-white/10 text-[10rem] font-serif select-none pointer-events-none whitespace-nowrap rotate-90 origin-right">
          Boulangerie 2024
        </span>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-0.5 h-12 bg-gradient-to-b from-white/10 to-white/60" />
      </div>
    </section>
  );
};

export default Hero;