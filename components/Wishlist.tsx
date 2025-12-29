import React from 'react';
import { Heart, ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { Pastry, View } from '../types.ts';
import { PASTRIES } from '../constants.tsx';

interface WishlistProps {
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
  onAddToCart: (pastry: Pastry) => void;
  onNavigate: (view: View) => void;
  onSelectPastry: (id: string) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ 
  wishlistIds, 
  onToggleWishlist, 
  onAddToCart, 
  onNavigate,
  onSelectPastry
}) => {
  const favoritePastries = PASTRIES.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="bg-white min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-6 md:space-y-0">
          <div className="space-y-4">
            <span className="text-gold text-[10px] font-bold tracking-[0.5em] uppercase">Private Selection</span>
            <h1 className="text-5xl md:text-6xl font-serif text-stone-900">My Favorites</h1>
          </div>
          <button 
            onClick={() => onNavigate(View.MENU)}
            className="flex items-center space-x-3 text-stone-400 hover:text-stone-900 transition-colors text-[10px] font-bold tracking-[0.3em] uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Exploring</span>
          </button>
        </div>

        {favoritePastries.length === 0 ? (
          <div className="py-32 text-center space-y-8 animate-in fade-in duration-1000">
            <div className="relative inline-block">
              <Heart className="w-20 h-20 text-stone-100 mx-auto" />
              <Heart className="w-8 h-8 text-gold/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="space-y-4">
              <p className="text-2xl font-serif text-stone-400 italic">"Your curated collection is currently empty."</p>
              <p className="text-stone-400 text-sm font-light max-w-sm mx-auto leading-relaxed">
                Save the creations that speak to your palate and review them here at your leisure.
              </p>
            </div>
            <button 
              onClick={() => onNavigate(View.MENU)}
              className="bg-stone-900 text-gold px-10 py-4 rounded-full text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-gold hover:text-white transition-all duration-500 shadow-xl shadow-stone-100"
            >
              Discover the Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {favoritePastries.map((pastry) => (
              <div 
                key={pastry.id} 
                className="group relative bg-stone-50 rounded-[2.5rem] overflow-hidden border border-stone-100 animate-in fade-in slide-in-from-bottom-8 duration-700"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={pastry.image} 
                    alt={pastry.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-stone-900/5 group-hover:bg-stone-900/10 transition-colors" />
                  
                  <button 
                    onClick={() => onToggleWishlist(pastry.id)}
                    className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-gold hover:text-stone-300 transition-all active:scale-90"
                    aria-label="Remove from Favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-10 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[9px] text-gold font-bold tracking-[0.3em] uppercase">{pastry.category}</span>
                    <h3 
                      onClick={() => onSelectPastry(pastry.id)}
                      className="text-2xl font-serif text-stone-900 cursor-pointer hover:text-gold transition-colors"
                    >
                      {pastry.name}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-stone-200/50">
                    <span className="text-xl font-light text-stone-900">${pastry.price.toFixed(2)}</span>
                    <button 
                      onClick={() => onAddToCart(pastry)}
                      className="flex items-center space-x-3 bg-stone-900 text-white px-6 py-3 rounded-xl text-[9px] font-bold tracking-[0.2em] uppercase hover:bg-gold transition-all duration-500"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Narrative Section */}
      <section className="bg-stone-50 py-24 border-t border-stone-100">
        <div className="max-w-3xl mx-auto px-6 text-center space-y-8">
           <Heart className="w-6 h-6 text-gold mx-auto opacity-50" />
           <p className="text-xl text-stone-400 font-light italic leading-relaxed">
             "A curation of one's favorites is a map of their soul's sweetest desires. Each selection here represents a moment of planned indulgence."
           </p>
        </div>
      </section>
    </div>
  );
};

export default Wishlist;