import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Pastry } from '../types.ts';
import { PASTRIES } from '../constants.tsx';

interface FeaturedCarouselProps {
  onSelectPastry: (id: string) => void;
}

const FeaturedCarousel: React.FC<FeaturedCarouselProps> = ({ onSelectPastry }) => {
  const featuredItems = PASTRIES.filter(p => ['2', '5', '6'].includes(p.id));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const currentItem = featuredItems[currentIndex];

  return (
    <section className="bg-white py-24 overflow-hidden border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="space-y-4">
            <span className="text-gold text-[10px] font-bold tracking-[0.5em] uppercase">Selection de Saison</span>
            <h2 className="text-4xl md:text-5xl font-serif text-stone-900">Chef's Highlights</h2>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={prevSlide}
              className="p-4 rounded-full border border-stone-100 hover:border-gold hover:text-gold transition-all duration-300"
              aria-label="Previous Highlight"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-4 rounded-full border border-stone-100 hover:border-gold hover:text-gold transition-all duration-300"
              aria-label="Next Highlight"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative bg-stone-50 rounded-[3rem] overflow-hidden min-h-[500px] flex flex-col lg:flex-row">
          {/* Image Side */}
          <div className="lg:w-1/2 relative overflow-hidden h-[300px] lg:h-auto">
            {featuredItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                  index === currentIndex 
                    ? 'opacity-100 scale-100 translate-x-0' 
                    : 'opacity-0 scale-110 translate-x-12'
                }`}
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-stone-900/5" />
              </div>
            ))}
          </div>

          {/* Content Side */}
          <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center space-y-8 relative">
            <div className="space-y-4">
               <span className="text-[10px] font-bold tracking-[0.3em] text-gold uppercase block animate-in fade-in duration-700">
                 {currentItem.category}
               </span>
               <h3 className="text-4xl lg:text-6xl font-serif text-stone-900 leading-tight">
                 {currentItem.name}
               </h3>
               <p className="text-stone-500 font-light italic text-lg leading-relaxed max-w-md">
                 "{currentItem.description}"
               </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 pt-4">
              <button 
                onClick={() => onSelectPastry(currentItem.id)}
                className="group flex items-center space-x-3 bg-stone-900 text-white px-8 py-4 rounded-full text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-gold transition-all duration-500 shadow-xl shadow-stone-200"
              >
                <span>Discover Details</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-2xl font-light text-stone-400">
                ${currentItem.price.toFixed(2)}
              </span>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 right-12 flex space-x-3">
              {featuredItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-1 transition-all duration-500 rounded-full ${
                    index === currentIndex ? 'w-12 bg-gold' : 'w-4 bg-stone-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;