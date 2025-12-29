
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h2 className="text-2xl font-serif tracking-widest">L'ART DE LA PÂTISSERIE</h2>
            <p className="text-stone-400 font-light max-w-sm leading-relaxed">
              Crafting moments of pure indulgence through the rigorous pursuit of culinary excellence. Our atelier transforms the simplest ingredients into extraordinary experiences.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-gold uppercase">Contact</h4>
            <ul className="text-stone-400 space-y-2 text-sm font-light">
              <li>12 Rue de la Paix, Paris</li>
              <li>+33 1 23 45 67 89</li>
              <li>concierge@lartpatisserie.fr</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold tracking-widest text-gold uppercase">Opening Hours</h4>
            <ul className="text-stone-400 space-y-2 text-sm font-light">
              <li>Mon — Fri: 08:00 — 20:00</li>
              <li>Sat: 09:00 — 21:00</li>
              <li>Sun: 09:00 — 18:00</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-stone-500 font-bold tracking-widest uppercase space-y-4 md:space-y-0">
          <p>© 2024 L'Art de la Pâtisserie. All Rights Reserved.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
