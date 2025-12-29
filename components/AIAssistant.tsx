import React, { useState } from 'react';
import { X, Sparkles, Loader2, Utensils } from 'lucide-react';
import { getPastryRecommendation } from '../services/geminiService.ts';
import { AIRecommendation } from '../types.ts';

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ isOpen, onClose }) => {
  const [mood, setMood] = useState('');
  const [pref, setPref] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIRecommendation | null>(null);

  const handleAsk = async () => {
    if (!mood || !pref) return;
    setLoading(true);
    const recommendation = await getPastryRecommendation(mood, pref);
    setResult(recommendation);
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-500">
        <div className="bg-stone-900 p-8 text-white flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-5 h-5 text-gold animate-pulse" />
            <div>
              <h2 className="text-xl font-serif">Pastry Sommelier</h2>
              <p className="text-[9px] text-stone-400 font-bold uppercase tracking-[0.2em] mt-1">Intelligence d'Artisan</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-10">
          {!result ? (
            <div className="space-y-8">
              <p className="text-stone-500 text-sm italic font-light leading-relaxed">
                "Our artificial intelligence has been trained on the flavor profiles of our century-old heritage. Describe your mood, and let us compose your perfect indulgence."
              </p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 mb-3 uppercase tracking-[0.2em]">Current Temperament</label>
                  <input 
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="e.g. Melancholic yet curious..."
                    className="w-full border-b border-stone-200 py-3 focus:border-gold outline-none transition-colors bg-transparent placeholder:text-stone-300 text-stone-800"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-stone-400 mb-3 uppercase tracking-[0.2em]">Flavor Palate</label>
                  <input 
                    value={pref}
                    onChange={(e) => setPref(e.target.value)}
                    placeholder="e.g. Sharp citrus, earthy nuts..."
                    className="w-full border-b border-stone-200 py-3 focus:border-gold outline-none transition-colors bg-transparent placeholder:text-stone-300 text-stone-800"
                  />
                </div>
              </div>

              <button 
                onClick={handleAsk}
                disabled={loading || !mood || !pref}
                className="w-full bg-stone-900 text-gold py-5 rounded-2xl font-bold text-[10px] tracking-[0.3em] flex items-center justify-center space-x-3 hover:bg-stone-800 transition-all disabled:opacity-50 shadow-xl shadow-stone-100 uppercase"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>CONSULT THE ATELIER</span>}
              </button>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-bottom-6 duration-700">
              <div className="text-center pb-6 border-b border-stone-100">
                <span className="text-[10px] text-gold font-bold uppercase tracking-[0.3em]">The Selection</span>
                <h3 className="text-4xl font-serif mt-3 text-stone-900">{result.pastryName}</h3>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-3">The Narrative</h4>
                  <p className="text-stone-700 leading-relaxed italic font-light text-lg">"{result.reason}"</p>
                </div>
                <div className="bg-stone-50 p-6 rounded-2xl flex items-start space-x-4 border border-stone-100">
                  <Utensils className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <h4 className="text-[10px] font-bold text-stone-900 uppercase tracking-widest mb-1">Sommelier Pairing</h4>
                    <p className="text-sm text-stone-500 font-light italic">{result.pairing}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setResult(null)}
                className="w-full border border-stone-200 py-4 rounded-xl text-stone-400 text-[10px] font-bold tracking-[0.2em] hover:border-gold hover:text-gold transition-all uppercase"
              >
                Seek Another Composition
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;