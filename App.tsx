
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Menu from './components/Menu.tsx';
import Story from './components/Story.tsx';
import Boutiques from './components/Boutiques.tsx';
import PastryDetail from './components/PastryDetail.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import Cart from './components/Cart.tsx';
import Footer from './components/Footer.tsx';
import BackToTop from './components/BackToTop.tsx';
import { CartItem, Pastry, View } from './types.ts';
import { PASTRIES } from './constants.tsx';

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedPastryId, setSelectedPastryId] = useState<string | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const addToCart = (pastry: Pastry) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === pastry.id);
      if (existing) {
        return prev.map(item => item.id === pastry.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...pastry, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const openPastryDetail = (id: string) => {
    setSelectedPastryId(id);
    setCurrentView(View.PASTRY_DETAIL);
  };

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <>
            <Hero onScrollToMenu={() => setCurrentView(View.MENU)} />
            <div id="home-menu-preview">
               <Menu onAddToCart={addToCart} onSelectPastry={openPastryDetail} />
            </div>
            <section className="bg-stone-50 py-24 border-y border-stone-100">
              <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
                <span className="text-gold text-xs font-bold tracking-[0.4em] uppercase">Etoile Michelin</span>
                <blockquote className="text-3xl md:text-4xl font-serif text-stone-800 italic leading-relaxed">
                  "A symphony of textures and flavors. The Ispahan Croissant is a spiritual experience that lingers long after the last bite."
                </blockquote>
                <cite className="block text-stone-400 font-bold uppercase tracking-widest text-xs">— Gaston M. • Culinary Critic</cite>
              </div>
            </section>
          </>
        );
      case View.MENU:
        return <div className="pt-20"><Menu onAddToCart={addToCart} onSelectPastry={openPastryDetail} /></div>;
      case View.STORY:
        return <Story />;
      case View.BOUTIQUES:
        return <Boutiques />;
      case View.PASTRY_DETAIL:
        const pastry = PASTRIES.find(p => p.id === selectedPastryId);
        if (!pastry) return <Hero onScrollToMenu={() => setCurrentView(View.MENU)} />;
        return <PastryDetail pastry={pastry} onBack={() => setCurrentView(View.MENU)} onAddToCart={addToCart} />;
      default:
        return <Hero onScrollToMenu={() => setCurrentView(View.MENU)} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
        currentView={currentView}
        onNavigate={setCurrentView}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAI={() => setIsAIOpen(true)}
      />
      
      <main className="animate-in fade-in duration-700">
        {renderView()}
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />

      <AIAssistant 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
      />

      <BackToTop />
    </div>
  );
};

export default App;
