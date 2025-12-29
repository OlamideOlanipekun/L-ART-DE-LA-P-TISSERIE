import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types.ts';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
        <div className="p-8 border-b border-stone-50 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ShoppingBag className="w-6 h-6 text-stone-900" />
            <div>
              <h2 className="text-2xl font-serif">Boutique Bag</h2>
              <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest mt-1">L'Art de la Pâtisserie</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-300 space-y-6">
              <ShoppingBag className="w-16 h-16 opacity-10" />
              <p className="font-light italic text-lg">Your bag is currently empty.</p>
              <button 
                onClick={onClose} 
                className="text-gold font-bold text-[10px] tracking-[0.3em] uppercase hover:text-stone-900 transition-colors"
              >
                Discover the Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-6 animate-in fade-in slide-in-from-right-8 duration-500">
                <div className="w-24 h-28 bg-stone-50 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl text-stone-900">{item.name}</h3>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-4 bg-stone-50 rounded-xl px-3 py-1.5 border border-stone-100">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:text-gold transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm font-bold w-5 text-center text-stone-900">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:text-gold transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <span className="text-lg font-light text-stone-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-10 border-t border-stone-100 bg-stone-50/50 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-stone-400 text-[10px] font-bold tracking-[0.2em] uppercase">
                <span>Atelier Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-stone-900 font-serif text-3xl pt-2">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-stone-900 text-gold py-5 rounded-2xl font-bold tracking-[0.3em] text-[10px] hover:bg-stone-800 transition-all shadow-2xl shadow-stone-200 uppercase">
              Secure Checkout
            </button>
            
            <div className="flex items-center justify-center space-x-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <p className="text-[9px] text-stone-400 font-bold uppercase tracking-widest">
                Complimentary luxury packaging included
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;