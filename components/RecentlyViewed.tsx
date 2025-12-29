import React from 'react';
import { Pastry } from '../types.ts';
import { PASTRIES } from '../constants.tsx';
import { Clock } from 'lucide-react';

interface RecentlyViewedProps {
  ids: string[];
  onSelectPastry: (id: string) => void;
}

const RecentlyViewed: React.FC<RecentlyViewedProps> = ({ ids, onSelectPastry }) => {
  if (ids.length === 0) return null;

  const viewedPastries = ids
    .map(id => PASTRIES.find(p => p.id === id))
    .filter((p): p is Pastry => !!p);

  return (
    <section className="bg-stone-50 py-24 border-t border-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gold">
              <Clock className="w-3 h-3" />
              <span className="text-[9px] font-bold tracking-[0.4em] uppercase">Your History</span>
            </div>
            <h2 className="text-3xl font-serif text-stone-900">Recent Discoveries</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {viewedPastries.map((pastry) => (
            <div 
              key={pastry.id}
              onClick={() => onSelectPastry(pastry.id)}
              className="group cursor-pointer space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1">
                <img 
                  src={pastry.image} 
                  alt={pastry.name}
                  className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/5 transition-colors" />
              </div>
              
              <div className="space-y-1">
                <span className="text-[8px] font-bold tracking-widest text-gold uppercase">{pastry.category}</span>
                <h3 className="text-sm font-serif text-stone-800 group-hover:text-gold transition-colors truncate">
                  {pastry.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;