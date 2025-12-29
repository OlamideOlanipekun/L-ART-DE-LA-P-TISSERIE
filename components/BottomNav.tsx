import React from 'react';
import { Home, Utensils, Heart, ShoppingBag, Sparkles } from 'lucide-react';
import { View } from '../types.ts';

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onOpenCart: () => void;
  onOpenAI: () => void;
  cartCount: number;
  wishlistCount: number;
}

const BottomNav: React.FC<BottomNavProps> = ({ 
  currentView, 
  onNavigate, 
  onOpenCart, 
  onOpenAI,
  cartCount,
  wishlistCount
}) => {
  return (
    <nav className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[90] w-[92%] max-w-sm">
      <div className="bg-stone-900/90 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-2xl shadow-stone-950/40">
        <button 
          onClick={() => onNavigate(View.HOME)}
          className={`flex flex-col items-center space-y-1 transition-all ${currentView === View.HOME ? 'text-gold scale-110' : 'text-stone-400'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[7px] font-bold uppercase tracking-widest">Atelier</span>
        </button>

        <button 
          onClick={() => onNavigate(View.MENU)}
          className={`flex flex-col items-center space-y-1 transition-all ${currentView === View.MENU ? 'text-gold scale-110' : 'text-stone-400'}`}
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[7px] font-bold uppercase tracking-widest">Menu</span>
        </button>

        <button 
          onClick={onOpenAI}
          className="relative -top-6 bg-gold text-white p-4 rounded-full shadow-xl shadow-gold/20 active:scale-95 transition-transform"
        >
          <Sparkles className="w-6 h-6" />
        </button>

        <button 
          onClick={() => onNavigate(View.WISHLIST)}
          className={`relative flex flex-col items-center space-y-1 transition-all ${currentView === View.WISHLIST ? 'text-gold scale-110' : 'text-stone-400'}`}
        >
          <Heart className={`w-5 h-5 ${currentView === View.WISHLIST ? 'fill-gold' : ''}`} />
          {wishlistCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-gold rounded-full border border-stone-900" />
          )}
          <span className="text-[7px] font-bold uppercase tracking-widest">Saved</span>
        </button>

        <button 
          onClick={onOpenCart}
          className="relative flex flex-col items-center space-y-1 text-stone-400 active:scale-95 transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gold text-stone-900 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold border border-stone-900">
              {cartCount}
            </span>
          )}
          <span className="text-[7px] font-bold uppercase tracking-widest">Bag</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;