
import React from 'react';

const Story: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Immersive Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=2000" 
          className="absolute inset-0 w-full h-full object-cover opacity-90 scale-105"
          alt="Artisan at work"
        />
        <div className="absolute inset-0 bg-stone-950/40" />
        <div className="relative text-center text-white px-4">
          <span className="text-gold text-xs font-bold tracking-[0.5em] uppercase mb-4 block">Since 1924</span>
          <h1 className="text-5xl md:text-7xl font-serif">A Century of Artistry</h1>
        </div>
      </section>

      {/* Heritage Section */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-serif text-stone-900">Our Heritage</h2>
            <div className="w-12 h-1 bg-gold" />
            <p className="text-stone-600 font-light leading-relaxed text-lg italic">
              "L'Art de la Pâtisserie began as a small family atelier in the heart of Paris. For four generations, we have guarded the secret of our sourdough and the precise temperature of our butter."
            </p>
            <p className="text-stone-500 font-light leading-relaxed">
              Founded by Jean-Luc Dupont in 1924, our philosophy remains unchanged: to treat every pastry as a masterpiece. We believe that the perfect croissant is not just baked; it is composed like a piece of classical music.
            </p>
          </div>
          <div className="relative aspect-square">
            <img 
              src="https://images.unsplash.com/photo-1512484491114-1e6a39a66c3f?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover rounded-2xl shadow-2xl"
              alt="Historical flour"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-8 rounded-xl shadow-xl hidden lg:block max-w-xs">
              <p className="text-xs font-bold tracking-widest text-gold uppercase mb-2">The Secret</p>
              <p className="text-stone-500 text-sm italic">"Precision is our only ingredient that cannot be measured."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-stone-900 py-32 text-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-gold">Terroir</h3>
            <p className="text-stone-400 font-light text-sm leading-relaxed">
              We source our butter from Normandy and our chocolate from the deep rainforests of Ecuador, ensuring every bite tells a story of its origin.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-gold">Patience</h3>
            <p className="text-stone-400 font-light text-sm leading-relaxed">
              Our dough rests for 72 hours. In a world of speed, we choose the slow path to develop the complex aromas that define our signature taste.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-gold">Innovation</h3>
            <p className="text-stone-400 font-light text-sm leading-relaxed">
              While we honor tradition, our pastry chefs are modern alchemists, using molecular techniques to create textures that defy gravity.
            </p>
          </div>
        </div>
      </section>

      {/* The Atelier Gallery */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-serif">Behind the Velvet Curtain</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
          <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600" className="aspect-square object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer" />
          <img src="https://images.unsplash.com/photo-1612203985729-7072695438d0?auto=format&fit=crop&q=80&w=600" className="aspect-square object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer" />
          <img src="https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=600" className="aspect-square object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer" />
          <img src="https://images.unsplash.com/photo-1495147466023-ac5c588e2e94?auto=format&fit=crop&q=80&w=600" className="aspect-square object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer" />
        </div>
      </section>
    </div>
  );
};

export default Story;
