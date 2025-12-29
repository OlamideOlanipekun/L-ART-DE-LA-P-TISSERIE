import React from 'react';
import { X, Instagram, Facebook, Twitter, MapPin } from 'lucide-react';
import { View } from '../types.ts';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: View) => void;
  currentView: View;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onNavigate, currentView }) => {
  if (!isOpen) return null;

  const navItems = [
    { label: 'Collection', view: View.MENU },
    { label: 'My Favorites', view: View.WISHLIST },
    { label: 'Our Story', view: View.STORY },
    { label: 'Boutiques', view: View.BOUTIQUES },
    { label: 'Contact', view: View.CONTACT },
  ];

  return (
    <div className="fixed inset-0 z-[110] flex lg:hidden">
      <div 
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div className="relative w-[85%] max-w-sm bg-stone-900 h-full flex flex-col animate-in slide-in-from-left duration-500 ease-out shadow-2xl">
        {/* Header */}
        <div className="p-8 flex items-center justify-between border-b border-white/5">
          <span className="text-white font-serif tracking-[0.2em] text-sm">L'ART DE LA PÂTISSERIE</span>
          <button onClick={onClose} className="text-white hover:text-gold transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-8 space-y-12 mt-8">
          <div className="space-y-8">
            <button 
              onClick={() => onNavigate(View.HOME)}
              className={`block text-4xl font-serif text-left transition-colors ${
                currentView === View.HOME ? 'text-gold' : 'text-white'
              }`}
            >
              Home
            </button>
            {navItems.map((item) => (
              <button 
                key={item.view}
                onClick={() => onNavigate(item.view)}
                className={`block text-4xl font-serif text-left transition-colors ${
                  currentView === item.view ? 'text-gold' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-12 border-t border-white/5 space-y-6">
            <div className="flex items-center space-x-3 text-stone-400">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="text-[10px] font-bold tracking-widest uppercase">12 Rue de la Paix, Paris</span>
            </div>
            <div className="flex space-x-6">
              <Instagram className="w-5 h-5 text-stone-400 hover:text-white transition-colors cursor-pointer" />
              <Facebook className="w-5 h-5 text-stone-400 hover:text-white transition-colors cursor-pointer" />
              <Twitter className="w-5 h-5 text-stone-400 hover:text-white transition-colors cursor-pointer" />
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-8 bg-white/5">
          <p className="text-[8px] text-stone-500 font-bold tracking-[0.3em] uppercase text-center">
            Handcrafted in Paris since 1924
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;