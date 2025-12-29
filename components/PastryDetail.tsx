
import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Quote, CheckCircle2, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Pastry } from '../types';

interface PastryDetailProps {
  pastry: Pastry;
  onBack: () => void;
  onAddToCart: (pastry: Pastry) => void;
}

const PastryDetail: React.FC<PastryDetailProps> = ({ pastry, onBack, onAddToCart }) => {
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="group flex items-center space-x-2 text-stone-400 hover:text-stone-900 transition-colors mb-12 text-xs font-bold tracking-widest uppercase"
          aria-label="Return to pastry collection"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Visual Showcase */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-700">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl bg-stone-100">
              <img 
                src={pastry.image} 
                alt={pastry.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className="bg-stone-900/90 backdrop-blur text-white px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] rounded-full uppercase">
                  {pastry.category}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-stone-50 p-6 rounded-2xl flex flex-col items-center text-center space-y-2">
                 <Star className="w-5 h-5 text-gold" aria-hidden="true" />
                 <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400">Limited Daily</span>
                 <p className="text-xs text-stone-600">Freshly baked at 4 AM</p>
              </div>
              <div className="bg-stone-50 p-6 rounded-2xl flex flex-col items-center text-center space-y-2">
                 <ShoppingBag className="w-5 h-5 text-gold" aria-hidden="true" />
                 <span className="text-[10px] font-bold tracking-widest uppercase text-stone-400">Packaging</span>
                 <p className="text-xs text-stone-600">Luxury gold-embossed box</p>
              </div>
            </div>
          </div>

          {/* Content Details */}
          <div className="space-y-12 animate-in fade-in slide-in-from-right duration-700 delay-100">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-serif text-stone-900 leading-tight">
                {pastry.name}
              </h1>
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-medium text-stone-900">
                  ${pastry.price.toFixed(2)}
                </span>
                <div className="h-6 w-px bg-stone-200" aria-hidden="true" />
                <span className="text-stone-400 text-sm font-light">Per Masterpiece</span>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-gold">The Flavor Profile</h3>
                <p className="text-xl text-stone-600 font-light leading-relaxed">
                  {pastry.description}
                </p>
              </div>

              {/* Enhanced Chef's Note Block */}
              <section 
                className="relative bg-stone-50 p-8 md:p-10 rounded-3xl border-l-4 border-l-gold border-y border-r border-stone-100 shadow-sm"
                aria-labelledby="chefs-note-heading"
              >
                <Quote className="absolute top-6 right-8 w-12 h-12 text-gold/5" aria-hidden="true" />
                
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                    <Quote className="w-3 h-3 text-gold" aria-hidden="true" />
                  </div>
                  <h4 id="chefs-note-heading" className="text-[10px] font-bold tracking-widest uppercase text-stone-900">
                    The Artisan's Perspective
                  </h4>
                </div>

                <div 
                  id="chefs-note-content"
                  className={`relative overflow-hidden transition-all duration-500 ease-in-out ${isNoteExpanded ? 'max-h-[500px]' : 'max-h-[80px]'}`}
                >
                  <p className="text-stone-600 font-light italic leading-loose text-lg pr-4">
                    "{pastry.chefsNote}"
                  </p>
                  {!isNoteExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-stone-50 to-transparent" />
                  )}
                </div>

                <div className="mt-4 flex flex-col space-y-6">
                  <button
                    onClick={() => setIsNoteExpanded(!isNoteExpanded)}
                    aria-expanded={isNoteExpanded}
                    aria-controls="chefs-note-content"
                    aria-label={isNoteExpanded ? "Collapse chef's note" : "Expand chef's note"}
                    className="flex items-center space-x-2 text-[10px] font-bold tracking-[0.2em] text-gold uppercase hover:text-stone-900 transition-colors w-fit"
                  >
                    <span>{isNoteExpanded ? 'Read Less' : 'Read Full Perspective'}</span>
                    {isNoteExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                  </button>

                  <div className="flex items-center space-x-4 pt-4 border-t border-stone-200/60">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-900">Chef de Cuisine</span>
                      <span className="text-[9px] font-medium tracking-[0.1em] uppercase text-stone-400">Atelier L'Art de la Pâtisserie, Paris</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Ingredients List */}
              <div className="space-y-6">
                <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-stone-400">Core Anatomy</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pastry.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center space-x-3 group">
                      <CheckCircle2 className="w-4 h-4 text-gold/40 group-hover:text-gold transition-colors" aria-hidden="true" />
                      <span className="text-sm text-stone-600 font-light">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onAddToCart(pastry)}
                className="flex-1 bg-stone-900 text-white py-5 rounded-full font-bold text-xs tracking-[0.2em] uppercase hover:bg-gold transition-all duration-500 shadow-xl shadow-stone-200"
                aria-label={`Add ${pastry.name} to boutique bag`}
              >
                ADD TO BOUTIQUE BAG
              </button>
              <button 
                className="px-10 py-5 rounded-full border border-stone-200 font-bold text-xs tracking-[0.2em] uppercase text-stone-500 hover:border-stone-900 hover:text-stone-900 transition-all"
                aria-label={`Gift ${pastry.name} to someone`}
              >
                GIFT THIS ITEM
              </button>
            </div>

            <p className="text-[10px] text-center sm:text-left text-stone-400 font-bold uppercase tracking-widest leading-relaxed">
              Same-day local delivery available for orders placed before 10:00 AM. <br className="hidden md:block" />
              Signature temperature-controlled packaging included.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastryDetail;
