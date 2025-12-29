import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsFading(true), 500);
          setTimeout(onComplete, 1300); // Wait for slide up animation
          return 100;
        }
        const diff = Math.random() * 15;
        return Math.min(oldProgress + diff, 100);
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[200] bg-stone-950 flex flex-col items-center justify-center transition-transform duration-1000 ease-[cubic-bezier(0.85,0,0.15,1)] ${
        isFading ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="relative flex flex-col items-center space-y-8 px-6 text-center">
        {/* Decorative Badge */}
        <div className="animate-in fade-in zoom-in duration-1000 delay-150">
           <span className="text-[9px] text-gold font-bold tracking-[0.5em] uppercase border border-gold/30 px-4 py-1.5 rounded-full mb-8 inline-block">
             Depuis 1924
           </span>
        </div>

        {/* Brand Name with Expansion Animation */}
        <div className="overflow-hidden">
          <h1 className="text-white text-4xl md:text-6xl font-serif tracking-widest animate-[tracking_2.5s_ease-out_forwards]">
            L'ART DE LA PÂTISSERIE
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-stone-500 text-[10px] font-bold tracking-[0.6em] uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          Crafting Culinary Excellence
        </p>

        {/* Percentage Counter */}
        <div className="pt-12">
          <span className="text-stone-600 font-serif italic text-3xl tabular-nums">
            {Math.floor(progress)}%
          </span>
        </div>
      </div>

      {/* Minimal Progress Line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-stone-900">
        <div 
          className="h-full bg-gold transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <style>{`
        @keyframes tracking {
          0% { letter-spacing: -0.2em; opacity: 0; filter: blur(10px); }
          50% { opacity: 1; filter: blur(0); }
          100% { letter-spacing: 0.25em; opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Preloader;