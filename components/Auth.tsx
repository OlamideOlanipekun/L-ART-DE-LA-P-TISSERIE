import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { View } from '../types.ts';

interface AuthProps {
  onSuccess: (user: { name: string }) => void;
  onNavigate: (view: View) => void;
}

const Auth: React.FC<AuthProps> = ({ onSuccess, onNavigate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess({ name: formData.name || 'Artisan Guest' });
      onNavigate(View.HOME);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center py-24 px-6">
      <div className="max-w-5xl w-full bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[650px] animate-in fade-in zoom-in duration-700">
        
        {/* Visual Narrative Side */}
        <div className="md:w-1/2 relative bg-stone-900 overflow-hidden hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80&w=1000" 
            alt="Artisan Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40" />
          <div className="absolute inset-0 p-16 flex flex-col justify-between text-white">
            <div className="space-y-4">
              <span className="text-gold text-[10px] font-bold tracking-[0.5em] uppercase">Private Member Access</span>
              <h2 className="text-5xl font-serif leading-tight">Join the <br /> Circle of <br /> <span className="italic text-gold">Connoisseurs</span></h2>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase">Early Access</h4>
                  <p className="text-stone-400 text-[10px] mt-1 uppercase tracking-wider">Priority reservation for limited seasonal releases.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-1" />
                <div>
                  <h4 className="text-xs font-bold tracking-widest uppercase">Artisan Perks</h4>
                  <p className="text-stone-400 text-[10px] mt-1 uppercase tracking-wider">Complimentary gift box on your birthday.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Side */}
        <div className="flex-1 p-10 md:p-20 flex flex-col justify-center">
          <div className="mb-12 text-center md:text-left">
            <h1 className="text-4xl font-serif text-stone-900 mb-4">
              {isLogin ? 'Welcome Back' : 'Create an Account'}
            </h1>
            <p className="text-stone-400 text-sm font-light italic">
              {isLogin ? 'Please enter your credentials to access the atelier.' : 'Begin your culinary journey with L\'Art de la Pâtisserie.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {!isLogin && (
              <div className="space-y-2 group">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest group-focus-within:text-gold transition-colors">Full Name</label>
                <div className="flex items-center border-b border-stone-200 focus-within:border-gold transition-all py-2">
                  <User className="w-4 h-4 text-stone-300 mr-3" />
                  <input 
                    required 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="flex-1 bg-transparent outline-none text-stone-900 font-light" 
                    placeholder="Jean Dupont" 
                  />
                </div>
              </div>
            )}

            <div className="space-y-2 group">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest group-focus-within:text-gold transition-colors">Email Address</label>
              <div className="flex items-center border-b border-stone-200 focus-within:border-gold transition-all py-2">
                <Mail className="w-4 h-4 text-stone-300 mr-3" />
                <input 
                  required 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="flex-1 bg-transparent outline-none text-stone-900 font-light" 
                  placeholder="artisan@lartpatisserie.fr" 
                />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest group-focus-within:text-gold transition-colors">Password</label>
              <div className="flex items-center border-b border-stone-200 focus-within:border-gold transition-all py-2">
                <Lock className="w-4 h-4 text-stone-300 mr-3" />
                <input 
                  required 
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="flex-1 bg-transparent outline-none text-stone-900 font-light" 
                  placeholder="••••••••" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-stone-900 text-gold py-5 rounded-2xl font-bold text-[10px] tracking-[0.4em] uppercase hover:bg-gold hover:text-white transition-all duration-700 shadow-xl shadow-stone-100 flex items-center justify-center space-x-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Sparkles className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Join the Atelier'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.2em] hover:text-gold transition-colors"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already a member? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;