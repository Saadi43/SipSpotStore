import React from 'react';
import { MapPin, Phone, ArrowUp, Sparkles, Clock, Navigation, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { playIceClink } from '../audio/summerSounds';

export default function Footer() {
  const scrollToTop = () => {
    playIceClink();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'The Sip Spot Lane 5 Westridge 1 Peshawar Road Rawalpindi'
  )}`;

  return (
    <footer className="mt-16 bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EE] to-[#FFF5E5] border-t border-amber-200/80 pt-16 pb-12 relative overflow-hidden">
      
      {/* Subtle Background Glow Spheres */}
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Top Grid: Brand Showcase + Location Card + Contact Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Brand & Slogan Showcase */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="THE SIP SPOT Logo"
                className="w-16 h-16 object-contain drop-shadow-md hover:scale-105 transition-transform"
              />
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 font-heading">
                  THE SIP{' '}
                  <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
                    SPOT
                  </span>
                </h2>
                <p className="text-xs font-extrabold text-slate-500 tracking-wider uppercase">
                  {STORE_INFO.subtitle}
                </p>
              </div>
            </div>

            {/* Slogan Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xs shadow-md shadow-orange-500/20">
              <Sparkles className="w-4 h-4" />
              <span>"{STORE_INFO.slogan}"</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              Rawalpindi's finest fresh juices, creamy milkshakes, cold-pressed fruit blends, and grilled toasted paninis.
            </p>
          </div>

          {/* Column 2: Interactive Location Card */}
          <div className="bg-white/80 backdrop-blur-sm border border-amber-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-amber-300 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20 shrink-0">
                  <MapPin className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-700 font-heading">
                    OUR LOCATION
                  </h3>
                  <p className="text-sm font-black text-slate-900">
                    Westridge 1, Rawalpindi
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {STORE_INFO.location}
              </p>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playIceClink}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-2xl bg-amber-500/10 hover:bg-amber-500 text-amber-900 hover:text-white border border-amber-500/20 font-extrabold text-xs transition-all duration-200 group"
            >
              <Navigation className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform" />
              <span>Get Directions on Google Maps</span>
            </a>
          </div>

          {/* Column 3: Contact & Daily Hours Card */}
          <div className="bg-white/80 backdrop-blur-sm border border-emerald-200/80 rounded-3xl p-6 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20 shrink-0">
                  <Phone className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-wider text-emerald-700 font-heading">
                    ORDER & DELIVERY
                  </h3>
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="text-lg font-black text-slate-900 font-mono hover:text-emerald-600 transition-colors"
                  >
                    {STORE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-600 font-medium bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-extrabold text-emerald-800">Open Daily: </span>
                  <span>10:00 AM - 12:00 AM</span>
                </div>
              </div>
            </div>

            <a
              href={`https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playIceClink}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 hover:scale-102 active:scale-95 transition-all"
            >
              <span>WhatsApp Direct Order</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar Divider */}
        <div className="pt-6 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <span>© {new Date().getFullYear()} THE SIP SPOT. Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>in Rawalpindi, Pakistan.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-4 h-4 stroke-[3]" />
          </button>
        </div>

      </div>
    </footer>
  );
}
