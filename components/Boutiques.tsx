
import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const BOUTIQUES = [
  {
    city: 'Paris',
    name: 'Atelier Saint-Honoré',
    address: '12 Rue de la Paix, 75002 Paris',
    phone: '+33 1 23 45 67 89',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    hours: 'Mon-Sun: 08:00 - 20:00'
  },
  {
    city: 'Tokyo',
    name: 'Ginza Boutique',
    address: '4-Chome, Ginza, Chuo City, Tokyo',
    phone: '+81 3 1234 5678',
    image: 'https://images.unsplash.com/photo-1540959733332-e94e270b4d82?auto=format&fit=crop&q=80&w=800',
    hours: 'Mon-Sun: 10:00 - 21:00'
  },
  {
    city: 'New York',
    name: 'Fifth Avenue flagship',
    address: '712 5th Ave, New York, NY 10019',
    phone: '+1 212 555 0123',
    image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&q=80&w=800',
    hours: 'Mon-Sat: 09:00 - 20:00'
  }
];

const Boutiques: React.FC = () => {
  return (
    <div className="pt-20 bg-stone-50 min-h-screen">
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
          <h1 className="text-5xl font-serif text-stone-900">Our Boutiques</h1>
          <p className="text-stone-500 font-light tracking-widest uppercase text-xs">Find us in the world's most beautiful avenues</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {BOUTIQUES.map((store, idx) => (
            <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="relative h-64 overflow-hidden">
                <img src={store.image} alt={store.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {store.city}
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-2xl font-serif text-stone-800 mb-2">{store.name}</h3>
                  <div className="flex items-start space-x-3 text-stone-500 text-sm">
                    <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <p>{store.address}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-stone-100 space-y-3">
                  <div className="flex items-center space-x-3 text-stone-500 text-sm">
                    <Clock className="w-4 h-4 text-gold" />
                    <p>{store.hours}</p>
                  </div>
                  <div className="flex items-center space-x-3 text-stone-500 text-sm">
                    <Phone className="w-4 h-4 text-gold" />
                    <p>{store.phone}</p>
                  </div>
                </div>

                <button className="w-full mt-4 border border-stone-200 py-3 rounded-xl text-xs font-bold tracking-widest text-stone-900 hover:bg-stone-900 hover:text-white transition-all uppercase">
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Inquiries */}
      <section className="bg-white py-24 border-t border-stone-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
          <h2 className="text-3xl font-serif">Global Concierge</h2>
          <p className="text-stone-500 font-light">
            For international partnerships, private events, or corporate gifting, please reach out to our dedicated concierge team.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex items-center space-x-2 text-stone-900 font-medium">
              <Mail className="w-5 h-5 text-gold" />
              <span>concierge@lartpatisserie.fr</span>
            </div>
            <div className="flex items-center space-x-2 text-stone-900 font-medium">
              <Phone className="w-5 h-5 text-gold" />
              <span>+33 1 98 76 54 32</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Boutiques;
