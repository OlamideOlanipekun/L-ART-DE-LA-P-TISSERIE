import React from 'react';
import { ShoppingBag, Sparkles, Menu as MenuIcon, Heart } from 'lucide-react';
import { View } from '../types.ts';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  currentView: View;
  onNavigate: (view: View) => void;
  onOpenCart: () => void;
  onOpenAI: () => void;
  onOpenMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  cartCount, 
  wishlistCount,
  currentView, 
  onNavigate, 
  onOpenCart, 
  onOpenAI, 
  onOpenMobileMenu 
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-stone-900 text-white py-2 px-6 text-center overflow-hidden border-b border-white/5">
        <p className="text-[9px] font-bold tracking-[0.3em] uppercase animate-pulse">
          Complimentary signature gift box with every seasonal collection order
        </p>
      </div>

      <header className="bg-white/90 backdrop-blur-xl border-b border-stone-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-6 lg:space-x-12">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 -ml-2 text-stone-900 hover:text-gold transition-colors"
              aria-label="Open Menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            <button 
              onClick={() => onNavigate(View.HOME)}
              className="text-lg lg:text-xl font-serif tracking-[0.2em] lg:tracking-[0.25em] text-stone-900 group whitespace-nowrap"
            >
              L'ART DE LA <span className="text-gold group-hover:text-stone-900 transition-colors">PÂTISSERIE</span>
            </button>
            
            <nav className="hidden lg:flex space-x-10 text-[10px] font-bold tracking-[0.3em] text-stone-400">
              {[View.MENU, View.STORY, View.BOUTIQUES, View.CONTACT].map((view) => (
                <button 
                  key={view}
                  onClick={() => onNavigate(view)} 
                  className={`hover:text-stone-900 transition-all uppercase relative py-1 ${
                    currentView === view ? 'text-stone-900' : ''
                  }`}
                >
                  {view === View.STORY ? 'About' : view}
                  {currentView === view && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gold animate-in fade-in zoom-in duration-300" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-3 lg:space-x-8">
            <button 
              onClick={onOpenAI}
              className="flex items-center space-x-2 bg-stone-900 text-white px-3 lg:px-5 py-2 lg:py-2.5 rounded-full text-[9px] lg:text-[10px] font-bold tracking-widest hover:bg-gold transition-all duration-500 shadow-xl shadow-stone-200 uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span className="hidden sm:inline">Sommelier</span>
            </button>
            
            <div className="flex items-center space-x-1 lg:space-x-4">
              <button 
                onClick={() => onNavigate(View.WISHLIST)}
                className={`relative group p-2 transition-colors ${currentView === View.WISHLIST ? 'text-gold' : 'text-stone-900 hover:text-gold'}`}
              >
                <Heart className={`w-5 h-5 ${currentView === View.WISHLIST ? 'fill-gold' : 'group-hover:fill-gold/10'}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full border border-white" />
                )}
              </button>

              <button onClick={onOpenCart} className="relative group text-stone-900 p-2">
                <ShoppingBag className="w-5 h-5 group-hover:text-gold transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-stone-900 text-gold text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;