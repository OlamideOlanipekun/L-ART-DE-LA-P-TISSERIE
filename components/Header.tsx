
import React from 'react';
import { ShoppingBag, Sparkles } from 'lucide-react';
import { View } from '../types';

interface HeaderProps {
  cartCount: number;
  currentView: View;
  onNavigate: (view: View) => void;
  onOpenCart: () => void;
  onOpenAI: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, currentView, onNavigate, onOpenCart, onOpenAI }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <button 
            onClick={() => onNavigate(View.HOME)}
            className="text-2xl font-serif tracking-widest text-stone-800"
          >
            L'ART DE LA <span className="text-gold">PÂTISSERIE</span>
          </button>
          <nav className="hidden md:flex space-x-8 text-[10px] font-bold tracking-[0.2em] text-stone-400">
            <button 
              onClick={() => onNavigate(View.MENU)} 
              className={`hover:text-stone-900 transition-colors uppercase ${currentView === View.MENU ? 'text-stone-900 border-b-2 border-gold pb-1' : ''}`}
            >
              MENU
            </button>
            <button 
              onClick={() => onNavigate(View.STORY)} 
              className={`hover:text-stone-900 transition-colors uppercase ${currentView === View.STORY ? 'text-stone-900 border-b-2 border-gold pb-1' : ''}`}
            >
              STORY
            </button>
            <button 
              onClick={() => onNavigate(View.BOUTIQUES)} 
              className={`hover:text-stone-900 transition-colors uppercase ${currentView === View.BOUTIQUES ? 'text-stone-900 border-b-2 border-gold pb-1' : ''}`}
            >
              BOUTIQUES
            </button>
          </nav>
        </div>

        <div className="flex items-center space-x-6">
          <button 
            onClick={onOpenAI}
            className="flex items-center space-x-2 bg-stone-900 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-gold transition-all duration-300 shadow-lg shadow-stone-200"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">PASTRY SOMMELIER</span>
          </button>
          
          <button onClick={onOpenCart} className="relative p-2 text-stone-700 hover:text-gold transition-colors">
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
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
