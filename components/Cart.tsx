
import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

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
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-6 h-6 text-stone-900" />
            <h2 className="text-xl font-serif">Your Boutique Bag</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-stone-50 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
              <ShoppingBag className="w-12 h-12 opacity-20" />
              <p className="font-light italic">Your bag is currently empty.</p>
              <button onClick={onClose} className="text-gold font-bold text-xs tracking-widest uppercase hover:underline">Start Browsing</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex space-x-4 animate-in fade-in slide-in-from-right-4">
                <div className="w-20 h-24 bg-stone-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-serif text-stone-900">{item.name}</h3>
                    <p className="text-xs text-stone-400 uppercase tracking-tighter">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 bg-stone-50 rounded-lg px-2 py-1">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:text-gold"><Minus className="w-3 h-3" /></button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:text-gold"><Plus className="w-3 h-3" /></button>
                    </div>
                    <span className="text-sm font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-8 border-t border-stone-100 bg-stone-50 space-y-4">
            <div className="flex justify-between items-center text-stone-500 text-sm">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-stone-900 font-serif text-xl">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold tracking-widest text-xs hover:bg-stone-800 transition-colors">
              PROCEED TO CHECKOUT
            </button>
            <p className="text-[10px] text-center text-stone-400 uppercase tracking-widest">Complimentary boutique packaging included</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
