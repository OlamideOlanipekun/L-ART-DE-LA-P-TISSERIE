import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Menu from './components/Menu.tsx';
import Story from './components/Story.tsx';
import Boutiques from './components/Boutiques.tsx';
import Contact from './components/Contact.tsx';
import Wishlist from './components/Wishlist.tsx';
import PastryDetail from './components/PastryDetail.tsx';
import AIAssistant from './components/AIAssistant.tsx';
import Cart from './components/Cart.tsx';
import Footer from './components/Footer.tsx';
import BackToTop from './components/BackToTop.tsx';
import MobileMenu from './components/MobileMenu.tsx';
import Preloader from './components/Preloader.tsx';
import FeaturedCarousel from './components/FeaturedCarousel.tsx';
import RecentlyViewed from './components/RecentlyViewed.tsx';
import BottomNav from './components/BottomNav.tsx';
import { CartItem, Pastry, View } from './types.ts';
import { PASTRIES } from './constants.tsx';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedPastryId, setSelectedPastryId] = useState<string | null>(null);

  // Persistence: Wishlist & History
  useEffect(() => {
    const savedWishlist = localStorage.getItem('lart-wishlist');
    if (savedWishlist) setWishlistIds(JSON.parse(savedWishlist));

    const savedHistory = localStorage.getItem('lart-recently-viewed');
    if (savedHistory) setRecentlyViewedIds(JSON.parse(savedHistory));
  }, []);

  useEffect(() => {
    localStorage.setItem('lart-wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    localStorage.setItem('lart-recently-viewed', JSON.stringify(recentlyViewedIds));
  }, [recentlyViewedIds]);

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

  const toggleWishlist = (id: string) => {
    setWishlistIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
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
    // Update Recently Viewed history
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(vId => vId !== id);
      return [id, ...filtered].slice(0, 4);
    });
    
    setSelectedPastryId(id);
    setCurrentView(View.PASTRY_DETAIL);
  };

  const renderView = () => {
    switch (currentView) {
      case View.HOME:
        return (
          <>
            <Hero onScrollToMenu={() => setCurrentView(View.MENU)} />
            <FeaturedCarousel onSelectPastry={openPastryDetail} />
            <div id="home-menu-preview">
               <Menu 
                 onAddToCart={addToCart} 
                 onSelectPastry={openPastryDetail} 
                 wishlistIds={wishlistIds}
                 onToggleWishlist={toggleWishlist}
               />
            </div>
            <RecentlyViewed ids={recentlyViewedIds} onSelectPastry={openPastryDetail} />
            <section className="bg-stone-50 py-16 lg:py-24 border-y border-stone-100 mb-20 lg:mb-0">
              <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
                <span className="text-gold text-xs font-bold tracking-[0.4em] uppercase">Etoile Michelin</span>
                <blockquote className="text-2xl md:text-4xl font-serif text-stone-800 italic leading-relaxed">
                  "A symphony of textures and flavors. The Ispahan Croissant is a spiritual experience that lingers long after the last bite."
                </blockquote>
                <cite className="block text-stone-400 font-bold uppercase tracking-widest text-[10px]">— Gaston M. • Culinary Critic</cite>
              </div>
            </section>
          </>
        );
      case View.MENU:
        return (
          <div className="pt-24 lg:pt-28 pb-20 lg:pb-0">
            <Menu 
              onAddToCart={addToCart} 
              onSelectPastry={openPastryDetail} 
              wishlistIds={wishlistIds}
              onToggleWishlist={toggleWishlist}
            />
          </div>
        );
      case View.STORY:
        return <div className="pt-24 lg:pt-28 pb-20 lg:pb-0"><Story /></div>;
      case View.BOUTIQUES:
        return <div className="pt-24 lg:pt-28 pb-20 lg:pb-0"><Boutiques /></div>;
      case View.CONTACT:
        return <div className="pt-24 lg:pt-28 pb-20 lg:pb-0"><Contact /></div>;
      case View.WISHLIST:
        return (
          <div className="pt-24 lg:pt-28 pb-20 lg:pb-0">
            <Wishlist 
              wishlistIds={wishlistIds}
              onToggleWishlist={toggleWishlist}
              onAddToCart={addToCart}
              onNavigate={setCurrentView}
              onSelectPastry={openPastryDetail}
            />
          </div>
        );
      case View.PASTRY_DETAIL:
        const pastry = PASTRIES.find(p => p.id === selectedPastryId);
        if (!pastry) return <Hero onScrollToMenu={() => setCurrentView(View.MENU)} />;
        return (
          <div className="pt-24 lg:pt-28 pb-20 lg:pb-0">
            <PastryDetail 
              pastry={pastry} 
              onBack={() => setCurrentView(View.MENU)} 
              onAddToCart={addToCart} 
              wishlistIds={wishlistIds}
              onToggleWishlist={toggleWishlist}
            />
          </div>
        );
      default:
        return <Hero onScrollToMenu={() => setCurrentView(View.MENU)} />;
    }
  };

  return (
    <div className="min-h-screen">
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      
      {!isLoading && (
        <div className="animate-in fade-in duration-1000">
          <Header 
            cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} 
            wishlistCount={wishlistIds.length}
            currentView={currentView}
            onNavigate={setCurrentView}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAI={() => setIsAIOpen(true)}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />
          
          <main>
            {renderView()}
          </main>

          <Footer />

          <MobileMenu 
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            onNavigate={(view) => {
              setCurrentView(view);
              setIsMobileMenuOpen(false);
            }}
            currentView={currentView}
          />

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

          <BottomNav 
            currentView={currentView}
            onNavigate={setCurrentView}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenAI={() => setIsAIOpen(true)}
            cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)}
            wishlistCount={wishlistIds.length}
          />

          <BackToTop />
        </div>
      )}
    </div>
  );
};

export default App;