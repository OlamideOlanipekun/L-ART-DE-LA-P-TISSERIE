import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Use scrollY as it is standard in modern browsers
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 lg:bottom-12 right-6 lg:right-12 z-[120] group flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500"
      aria-label="Back to top"
    >
      <div className="relative">
        <div className="absolute -inset-4 bg-gold/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-stone-900/90 backdrop-blur-xl border border-white/10 text-gold p-4 rounded-full shadow-2xl transition-all duration-300 group-hover:bg-gold group-hover:text-white group-hover:-translate-y-2">
          <ChevronUp className="w-5 h-5" />
        </div>
      </div>
      <span className="mt-2 text-[7px] font-bold tracking-[0.4em] text-stone-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Return
      </span>
    </button>
  );
};

export default BackToTop;