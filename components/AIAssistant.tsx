
import React, { useState } from 'react';
import { X, Sparkles, Loader2, Utensils } from 'lucide-react';
import { getPastryRecommendation } from '../services/geminiService';
import { AIRecommendation } from '../types';

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
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="bg-stone-950 p-6 text-white flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-gold" />
            <h2 className="text-xl font-serif">Pastry Sommelier</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:text-gold transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {!result ? (
            <div className="space-y-6">
              <p className="text-stone-500 text-sm italic">"Allow our AI artisan to craft a recommendation suited for your current spirit."</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-2 uppercase tracking-widest">How are you feeling?</label>
                  <input 
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    placeholder="e.g. Melancholic yet curious, celebratory..."
                    className="w-full border-b border-stone-200 py-2 focus:border-gold outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-2 uppercase tracking-widest">Flavour Palate Preferences</label>
                  <input 
                    value={pref}
                    onChange={(e) => setPref(e.target.value)}
                    placeholder="e.g. Sharp citrus, earthy nuts, deep dark chocolate..."
                    className="w-full border-b border-stone-200 py-2 focus:border-gold outline-none transition-colors"
                  />
                </div>
              </div>

              <button 
                onClick={handleAsk}
                disabled={loading || !mood || !pref}
                className="w-full bg-stone-900 text-white py-4 rounded-xl font-medium flex items-center justify-center space-x-2 hover:bg-stone-800 transition-colors disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>CONSULT THE SOMMELIER</span>}
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
              <div className="text-center pb-4 border-b border-stone-100">
                <span className="text-xs text-gold font-bold uppercase tracking-widest">Our Selection for You</span>
                <h3 className="text-3xl font-serif mt-2">{result.pastryName}</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-bold text-stone-400 uppercase mb-2">The Philosophy</h4>
                  <p className="text-stone-700 leading-relaxed italic">"{result.reason}"</p>
                </div>
                <div className="bg-stone-50 p-4 rounded-lg flex items-start space-x-3">
                  <Utensils className="w-5 h-5 text-gold mt-1" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900 uppercase">Suggested Pairing</h4>
                    <p className="text-sm text-stone-600">{result.pairing}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setResult(null)}
                className="w-full border border-stone-200 py-3 rounded-xl text-stone-500 text-sm hover:border-gold hover:text-gold transition-all"
              >
                ASK AGAIN
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
