import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { View } from '../types.ts';

interface HeaderProps {
  cartCount: number;
  currentView: View;
  onNavigate: (view: View) => void;
  onOpenCart: () => void;
  onOpenAI: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, currentView, onNavigate, onOpenCart, onOpenAI }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-stone-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-12">
          <button 
            onClick={() => onNavigate(View.HOME)}
            className="text-xl font-serif tracking-[0.25em] text-stone-900 group"
          >
            L'ART DE LA <span className="text-gold group-hover:text-stone-900 transition-colors">PÂTISSERIE</span>
          </button>
          <nav className="hidden lg:flex space-x-10 text-[10px] font-bold tracking-[0.3em] text-stone-400">
            {[View.MENU, View.STORY, View.BOUTIQUES].map((view) => (
              <button 
                key={view}
                onClick={() => onNavigate(view)} 
                className={`hover:text-stone-900 transition-all uppercase relative py-1 ${
                  currentView === view ? 'text-stone-900' : ''
                }`}
              >
                {view}
                {currentView === view && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold animate-in fade-in zoom-in duration-300" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-8">
          <button 
            onClick={onOpenAI}
            className="flex items-center space-x-2 bg-stone-900 text-white px-5 py-2.5 rounded-full text-[10px] font-bold tracking-widest hover:bg-gold transition-all duration-500 shadow-xl shadow-stone-200 uppercase"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span className="hidden sm:inline">Sommelier</span>
          </button>
          
          <button onClick={onOpenCart} className="relative group text-stone-900 p-1">
            <ShoppingBag className="w-6 h-6 group-hover:text-gold transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-stone-900 text-gold text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold border border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;