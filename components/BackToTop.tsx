
import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
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
      className="fixed bottom-8 right-8 z-[60] group flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500"
      aria-label="Back to top"
    >
      <div className="relative">
        <div className="absolute -inset-2 bg-gold/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative bg-stone-900 border border-stone-800 text-gold p-3 rounded-full shadow-2xl transition-all duration-300 group-hover:bg-gold group-hover:text-white group-hover:-translate-y-1">
          <ChevronUp className="w-5 h-5" />
        </div>
      </div>
      <span className="mt-2 text-[8px] font-bold tracking-[0.3em] text-stone-400 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Top
      </span>
    </button>
  );
};

export default BackToTop;
