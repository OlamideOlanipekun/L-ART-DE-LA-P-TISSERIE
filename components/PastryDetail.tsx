import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Quote, CheckCircle2, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Pastry } from '../types.ts';

interface PastryDetailProps {
  pastry: Pastry;
  onBack: () => void;
  onAddToCart: (pastry: Pastry) => void;
}

const PastryDetail: React.FC<PastryDetailProps> = ({ pastry, onBack, onAddToCart }) => {
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <button 
          onClick={onBack}
          className="group flex items-center space-x-3 text-stone-400 hover:text-stone-900 transition-all mb-16 text-[10px] font-bold tracking-[0.3em] uppercase"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-2" />
          <span>Return to Atelier</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 xl:gap-32 items-start">
          <div className="space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-3xl bg-stone-50">
              <img 
                src={pastry.image} 
                alt={pastry.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-8 left-8">
                <span className="bg-stone-900/90 backdrop-blur-md text-white px-6 py-2 text-[10px] font-bold tracking-[0.3em] rounded-full uppercase border border-white/10">
                  {pastry.category}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-stone-50/50 p-8 rounded-3xl border border-stone-100 flex flex-col items-center text-center space-y-3">
                 <Star className="w-6 h-6 text-gold" />
                 <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-900">Daily Batch</span>
                 <p className="text-xs text-stone-400 font-light italic">Artisanal production limited to 50 units daily</p>
              </div>
              <div className="bg-stone-50/50 p-8 rounded-3xl border border-stone-100 flex flex-col items-center text-center space-y-3">
                 <ShoppingBag className="w-6 h-6 text-gold" />
                 <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-stone-900">Boutique Box</span>
                 <p className="text-xs text-stone-400 font-light italic">Signature gold-embossed presentation</p>
              </div>
            </div>
          </div>

          <div className="space-y-16 animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl font-serif text-stone-900 leading-[1.1]">
                {pastry.name}
              </h1>
              <div className="flex items-center space-x-6">
                <span className="text-4xl font-light text-stone-900">
                  ${pastry.price.toFixed(2)}
                </span>
                <div className="h-8 w-px bg-stone-200" />
                <span className="text-stone-400 text-[10px] font-bold tracking-[0.3em] uppercase">L'Art Selection</span>
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-4">
                <h3 className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase">The Composition</h3>
                <p className="text-2xl text-stone-600 font-light leading-relaxed italic">
                  "{pastry.description}"
                </p>
              </div>

              <section className="relative bg-stone-900 p-10 md:p-12 rounded-[2rem] text-white shadow-2xl overflow-hidden">
                <Quote className="absolute -top-4 -right-4 w-32 h-32 text-white/5 pointer-events-none" />
                
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center border border-gold/30">
                    <Quote className="w-4 h-4 text-gold" />
                  </div>
                  <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-gold">Chef's Perspective</h4>
                </div>

                <div className={`relative transition-all duration-700 ease-in-out ${isNoteExpanded ? 'max-h-[600px]' : 'max-h-[100px]'} overflow-hidden`}>
                  <p className="text-stone-300 font-light italic leading-loose text-xl pr-6">
                    "{pastry.chefsNote}"
                  </p>
                  {!isNoteExpanded && (
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-stone-900 to-transparent" />
                  )}
                </div>

                <button
                  onClick={() => setIsNoteExpanded(!isNoteExpanded)}
                  className="mt-8 flex items-center space-x-3 text-[10px] font-bold tracking-[0.3em] text-gold uppercase hover:text-white transition-colors"
                >
                  <span>{isNoteExpanded ? 'Conceal Details' : 'Read Full Narrative'}</span>
                  {isNoteExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </section>

              <div className="space-y-8">
                <h3 className="text-stone-400 text-[10px] font-bold tracking-[0.4em] uppercase">Flavor Anatomy</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {pastry.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center space-x-4 group">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/40 group-hover:bg-gold transition-all" />
                      <span className="text-sm text-stone-600 font-light tracking-wide">{ing}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-12 border-t border-stone-100 flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => onAddToCart(pastry)}
                className="flex-1 bg-stone-900 text-gold py-6 rounded-2xl font-bold text-[10px] tracking-[0.3em] uppercase hover:bg-gold hover:text-white transition-all duration-700 shadow-2xl shadow-stone-200"
              >
                ADD TO BOUTIQUE BAG
              </button>
              <button className="px-12 py-6 rounded-2xl border border-stone-200 font-bold text-[10px] tracking-[0.3em] uppercase text-stone-400 hover:border-stone-900 hover:text-stone-900 transition-all">
                GIFT ARTISTRY
              </button>
            </div>

            <p className="text-[9px] text-center sm:text-left text-stone-300 font-bold uppercase tracking-[0.2em] leading-relaxed">
              * Same-day courier delivery available within city limits. <br />
              All creations contain organic heritage grains and artisanal butter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PastryDetail;