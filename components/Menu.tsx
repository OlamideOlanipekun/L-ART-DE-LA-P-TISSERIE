
import React, { useState, useMemo } from 'react';
import { PASTRIES, CATEGORIES } from '../constants';
import { Category, Pastry } from '../types';
import { Plus, Check, Filter, Quote, ArrowRight } from 'lucide-react';
import StarRating from './StarRating';

interface MenuProps {
  onAddToCart: (pastry: Pastry) => void;
  onSelectPastry: (id: string) => void;
}

const Menu: React.FC<MenuProps> = ({ onAddToCart, onSelectPastry }) => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // Extract unique ingredients across all pastries
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
    <section id="menu" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Our Seasonal Collections</h2>
          <p className="text-stone-500 max-w-xl mx-auto font-light leading-relaxed">
            Handcrafted daily with the finest ingredients sourced from sustainable French farms.
          </p>
        </div>

        <div className="space-y-8 mb-16">
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            <button 
              onClick={() => setActiveCategory('All')}
              className={`px-8 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all duration-300 border ${
                activeCategory === 'All' 
                  ? 'bg-stone-900 text-white border-stone-900 shadow-lg shadow-stone-200' 
                  : 'bg-transparent text-stone-400 border-stone-200 hover:border-stone-400'
              }`}
            >
              ALL COLLECTIONS
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-8 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] transition-all duration-300 border ${
                  activeCategory === cat 
                    ? 'bg-stone-900 text-white border-stone-900 shadow-lg shadow-stone-200' 
                    : 'bg-transparent text-stone-400 border-stone-200 hover:border-stone-400'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Ingredients Filter */}
          <div className="max-w-4xl mx-auto border-t border-stone-100 pt-8">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Filter className="w-3 h-3 text-gold" />
              <span className="text-[10px] font-bold tracking-widest text-stone-400 uppercase">Filter by Ingredients</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {allIngredients.map(ing => (
                <button
                  key={ing}
                  onClick={() => toggleIngredient(ing)}
                  className={`group flex items-center space-x-2 px-4 py-2 rounded-lg text-xs transition-all duration-200 border ${
                    selectedIngredients.includes(ing)
                      ? 'bg-gold/5 border-gold text-gold'
                      : 'bg-white border-stone-100 text-stone-500 hover:border-stone-300'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full transition-colors ${
                    selectedIngredients.includes(ing) ? 'bg-gold' : 'bg-stone-200 group-hover:bg-stone-300'
                  }`} />
                  <span className="font-medium">{ing}</span>
                  {selectedIngredients.includes(ing) && <Check className="w-3 h-3" />}
                </button>
              ))}
              {selectedIngredients.length > 0 && (
                <button 
                  onClick={() => setSelectedIngredients([])}
                  className="text-[10px] font-bold text-stone-400 hover:text-stone-900 transition-colors uppercase tracking-widest ml-4 self-center"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {filteredPastries.length > 0 ? (
            filteredPastries.map((pastry) => (
              <div 
                key={pastry.id} 
                onClick={() => onSelectPastry(pastry.id)}
                className="group cursor-pointer animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <img 
                    src={pastry.image} 
                    alt={pastry.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/20 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex flex-col items-center space-y-3">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(pastry);
                        }}
                        className="bg-white text-stone-900 px-8 py-3 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 font-bold text-[10px] tracking-widest hover:bg-gold hover:text-white"
                      >
                        ADD TO BAG
                      </button>
                      <span className="text-white text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                        VIEW DETAILS
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                     <span className="bg-white/90 backdrop-blur px-3 py-1 text-[9px] font-bold tracking-[0.2em] rounded-full shadow-sm uppercase">
                        {pastry.category}
                     </span>
                  </div>
                </div>
                
                <div className="flex justify-between items-start">
                  <div className="space-y-1 flex-1">
                    <h3 className="text-xl font-serif text-stone-800 group-hover:text-gold transition-colors duration-300 flex items-center">
                      {pastry.name}
                      <ArrowRight className="w-4 h-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-gold" />
                    </h3>
                    
                    <div className="flex items-center justify-between mt-1 mb-2">
                       <StarRating pastryId={pastry.id} />
                       <span className="text-lg font-medium text-stone-900">
                        ${pastry.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-sm text-stone-500 font-light leading-relaxed pr-4 line-clamp-2">
                      {pastry.description}
                    </p>
                    
                    {/* Chef's Note Section */}
                    <div className="mt-4 pt-4 border-t border-stone-50 group-hover:border-stone-100 transition-colors">
                      <div className="flex items-center space-x-2 mb-2">
                        <Quote className="w-3 h-3 text-gold opacity-50" />
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Chef's Note Preview</span>
                      </div>
                      <p className="text-xs text-stone-400 font-light italic leading-relaxed line-clamp-1">
                        {pastry.chefsNote}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {pastry.ingredients.map((ing, i) => (
                    <span 
                      key={i} 
                      className="text-[9px] border border-stone-100 bg-stone-50 text-stone-400 px-2 py-0.5 rounded-md uppercase font-bold tracking-tighter"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center space-y-4">
              <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mx-auto">
                <Filter className="w-6 h-6 text-stone-200" />
              </div>
              <p className="text-stone-400 font-serif italic text-xl">No pastries found matching these specific filters.</p>
              <button 
                onClick={() => {
                  setActiveCategory('All');
                  setSelectedIngredients([]);
                }}
                className="text-gold font-bold text-[10px] tracking-widest uppercase hover:underline"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menu;
