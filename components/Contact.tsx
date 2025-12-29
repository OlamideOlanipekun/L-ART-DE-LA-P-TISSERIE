import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Twitter, CheckCircle2 } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover"
          alt="Atelier"
        />
        <div className="absolute inset-0 bg-stone-950/50" />
        <div className="relative text-center text-white px-6">
          <span className="text-gold text-[10px] font-bold tracking-[0.5em] uppercase mb-4 block animate-in fade-in duration-1000">Get in Touch</span>
          <h1 className="text-5xl md:text-7xl font-serif animate-in slide-in-from-bottom-8 duration-1000">Concierge Services</h1>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          {/* Left Side: Info */}
          <div className="space-y-16">
            <div className="space-y-6">
              <h2 className="text-4xl font-serif text-stone-900">Let us Compose <br /> Your Experience</h2>
              <p className="text-stone-500 font-light leading-relaxed max-w-md italic text-lg">
                "Whether it is a private event in Paris, a bespoke order for a loved one, or simply a question about our seasonal ingredients—our team is here to assist you."
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gold">
                  <MapPin className="w-5 h-5" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">The Atelier</span>
                </div>
                <p className="text-stone-600 text-sm font-light">
                  12 Rue de la Paix <br />
                  75002 Paris, France
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gold">
                  <Mail className="w-5 h-5" />
                  <span className="text-[10px] font-bold tracking-widest uppercase">Concierge</span>
                </div>
                <p className="text-stone-600 text-sm font-light">
                  concierge@lartpatisserie.fr <br />
                  +33 1 23 45 67 89
                </p>
              </div>
            </div>

            <div className="pt-12 border-t border-stone-100 space-y-8">
              <h3 className="text-[10px] font-bold tracking-[0.3em] text-stone-400 uppercase">Follow Our Creations</h3>
              <div className="flex space-x-8">
                <a href="#" className="group flex items-center space-x-2 text-stone-900">
                  <Instagram className="w-5 h-5 group-hover:text-gold transition-colors" />
                  <span className="text-xs font-medium border-b border-stone-200 pb-0.5">Instagram</span>
                </a>
                <a href="#" className="group flex items-center space-x-2 text-stone-900">
                  <Facebook className="w-5 h-5 group-hover:text-gold transition-colors" />
                  <span className="text-xs font-medium border-b border-stone-200 pb-0.5">Facebook</span>
                </a>
                <a href="#" className="group flex items-center space-x-2 text-stone-900">
                  <Twitter className="w-5 h-5 group-hover:text-gold transition-colors" />
                  <span className="text-xs font-medium border-b border-stone-200 pb-0.5">Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <div className="bg-stone-50 p-12 rounded-[2.5rem] border border-stone-100 shadow-sm relative">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-700 py-12">
                <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-3xl font-serif text-stone-900">Message Received</h3>
                <p className="text-stone-500 font-light italic">Thank you for reaching out. Our concierge will contact you within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase border-b border-gold/30 hover:border-gold transition-all">Send Another Inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Full Name</label>
                    <input required className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-gold outline-none transition-colors text-stone-900 font-light" placeholder="e.g. Julianne Vasseur" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Email Address</label>
                    <input required type="email" className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-gold outline-none transition-colors text-stone-900 font-light" placeholder="julianne@lifestyle.com" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Nature of Inquiry</label>
                  <select className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-gold outline-none transition-colors text-stone-900 font-light appearance-none cursor-pointer">
                    <option>Private Event / Catering</option>
                    <option>Corporate Gifting</option>
                    <option>Press & Media</option>
                    <option>General Feedback</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Your Message</label>
                  <textarea required rows={4} className="w-full bg-transparent border-b border-stone-200 py-3 focus:border-gold outline-none transition-colors text-stone-900 font-light resize-none" placeholder="How may we assist you today?" />
                </div>

                <button type="submit" className="w-full bg-stone-900 text-gold py-6 rounded-2xl font-bold text-[10px] tracking-[0.4em] uppercase hover:bg-gold hover:text-white transition-all duration-700 flex items-center justify-center space-x-3">
                  <span>DISPATCH MESSAGE</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Corporate Map / Secondary Info */}
      <section className="bg-stone-950 py-32 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            <div className="space-y-6">
              <h4 className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase">Press Relations</h4>
              <p className="text-stone-400 text-sm font-light leading-relaxed">For all media inquiries and high-resolution assets, please contact our press office at press@lartpatisserie.fr</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase">Private Tastings</h4>
              <p className="text-stone-400 text-sm font-light leading-relaxed">Book a personalized tasting experience at our Paris atelier for wedding or gala planning. Limited availability.</p>
            </div>
            <div className="space-y-6">
              <h4 className="text-gold text-[10px] font-bold tracking-[0.4em] uppercase">Career Opportunities</h4>
              <p className="text-stone-400 text-sm font-light leading-relaxed">We are always seeking passionate artisans. Submit your portfolio to talents@lartpatisserie.fr</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;