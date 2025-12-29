import React, { useState, useMemo } from 'react';
import { PASTRIES, CATEGORIES } from '../constants.tsx';
import { Category, Pastry } from '../types.ts';
import { Plus, Check, Filter, Heart, ShoppingBag } from 'lucide-react';
import StarRating from './StarRating.tsx';

interface MenuProps {
  onAddToCart: (pastry: Pastry) => void;
  onSelectPastry: (id: string) => void;
  wishlistIds: string[];
  onToggleWishlist: (id: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onAddToCart, onSelectPastry, wishlistIds, onToggleWishlist }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const allIngredients = useMemo(() => {
    const ingredients = new Set<string>();
    PASTRIES.forEach(p => p.ingredients.forEach(ing => ingredients.add(ing)));
    return Array.from(ingredients).sort();
  }, []);

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev => 
      prev.includes(ingredient) 
        ? prev.filter(i => i !== ingredient) 
        : [...prev, ingredient]
    );
  };

  const filteredPastries = useMemo(() => {
    return PASTRIES.filter(pastry => {
      const matchesCategory = activeCategory === 'All' || pastry.category === activeCategory;
      const matchesIngredients = selectedIngredients.length === 0 || 
        selectedIngredients.every(selected => pastry.ingredients.includes(selected));
      return matchesCategory && matchesIngredients;
    });
  }, [activeCategory, selectedIngredients]);

  return (
    <section id="menu" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 space-y-4">
          <span className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase">The Portfolio</span>
          <h2 className="text-5xl md:text-6xl font-serif">Seasonal Collections</h2>
          <div className="w-16 h-px bg-stone-200 mx-auto mt-8" />
        </div>

        <div className="space-y-12 mb-20">
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-10 py-3 rounded-full text-[9px] font-bold tracking-[0.3em] transition-all duration-500 border ${
                activeCategory === 'All' 
                  ? 'bg-stone-900 text-white border-stone-900 shadow-2xl shadow-stone-200' 
                  : 'bg-transparent text-stone-400 border-stone-200 hover:border-stone-900 hover:text-stone-900'
              }`}
            >
              ALL CREATIONS
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-10 py-3 rounded-full text-[9px] font-bold tracking-[0.3em] transition-all duration-500 border ${
                  activeCategory === cat 
                    ? 'bg-stone-900 text-white border-stone-900 shadow-2xl shadow-stone-200' 
                    : 'bg-transparent text-stone-400 border-stone-200 hover:border-stone-900 hover:text-stone-900'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          <div className="max-w-4xl mx-auto border-t border-stone-50 pt-10">
            <div className="flex items-center justify-center space-x-3 mb-8">
              <Filter className="w-3 h-3 text-gold" />
              <span className="text-[9px] font-bold tracking-[0.3em] text-stone-400 uppercase">Anatomy Filter</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {allIngredients.map(ing => (
                <button
                  key={ing}
                  onClick={() => toggleIngredient(ing)}
                  className={`group flex items-center space-x-3 px-5 py-2.5 rounded-xl text-[11px] transition-all duration-300 border ${
                    selectedIngredients.includes(ing)
                      ? 'bg-stone-50 border-gold text-stone-900'
                      : 'bg-white border-stone-100 text-stone-400 hover:border-stone-300'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full transition-colors ${
                    selectedIngredients.includes(ing) ? 'bg-gold' : 'bg-stone-100'
                  }`} />
                  <span className="font-medium">{ing}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20">
          {filteredPastries.map((pastry) => (
            <div 
              key={pastry.id} 
              onClick={() => onSelectPastry(pastry.id)}
              className="group cursor-pointer animate-fade-up"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-stone-100 mb-8 shadow-sm group-hover:shadow-3xl transition-all duration-700">
                <img 
                  src={pastry.image} 
                  alt={pastry.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/10 transition-colors duration-700" />
                
                <div className="absolute top-6 right-6 z-10">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(pastry.id);
                    }}
                    className={`p-3 rounded-full backdrop-blur-md shadow-xl transition-all duration-500 transform ${
                      wishlistIds.includes(pastry.id) 
                        ? 'bg-white text-gold scale-110 opacity-100' 
                        : 'bg-white/30 text-white lg:opacity-0 group-hover:opacity-100 hover:bg-white hover:text-gold'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${wishlistIds.includes(pastry.id) ? 'fill-gold' : ''}`} />
                  </button>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(pastry);
                    }}
                    className="bg-white text-stone-900 px-10 py-4 rounded-full shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-700 font-bold text-[10px] tracking-[0.2em] hover:bg-gold hover:text-white uppercase"
                  >
                    ADD TO BAG
                  </button>
                </div>

                <div className="absolute top-6 left-6">
                   <span className="bg-white/95 backdrop-blur px-4 py-1.5 text-[9px] font-bold tracking-[0.3em] rounded-full shadow-lg uppercase text-stone-900">
                      {pastry.category}
                   </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <h3 className="text-2xl font-serif text-stone-900 group-hover:text-gold transition-colors duration-500">
                    {pastry.name}
                  </h3>
                  <span className="text-xl font-light text-stone-900">
                    ${pastry.price.toFixed(2)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b border-stone-50">
                   <StarRating pastryId={pastry.id} />
                   <p className="text-[10px] font-bold tracking-widest text-stone-300 uppercase">Available Today</p>
                </div>

                <p className="text-sm text-stone-400 font-light leading-relaxed pr-6 line-clamp-2 italic">
                  "{pastry.description}"
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {pastry.ingredients.slice(0, 3).map((ing, i) => (
                    <span 
                      key={i} 
                      className="text-[8px] border border-stone-100 bg-stone-50/50 text-stone-400 px-2 py-0.5 rounded uppercase font-bold tracking-widest"
                    >
                      {ing}
                    </span>
                  ))}
                  {pastry.ingredients.length > 3 && (
                    <span className="text-[8px] text-stone-300 font-bold tracking-widest">+{pastry.ingredients.length - 3} MORE</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;