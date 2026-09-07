import React from 'react';
import { MapPin, Phone, Clock, Send, Heart } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { playIceClink, playLiquidSplash } from '../audio/summerSounds';

export default function Footer() {
  const handleNewsletter = (e) => {
    e.preventDefault();
    playLiquidSplash();
    alert('Thank you for subscribing to THE SIP SPOT Summer Offers!');
  };

  return (
    <footer id="location" className="relative z-10 bg-slate-950 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Brand Info */}
          <div className="space-y-4 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-xl shadow-lg">
                🍹
              </div>
              <h3 className="text-xl font-black text-white font-heading">
                THE SIP <span className="gradient-text-sun">SPOT</span>
              </h3>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              {STORE_INFO.subtitle} — {STORE_INFO.tagline}. Freshly blended with 100% natural ingredients in Rawalpindi.
            </p>
            <p className="font-script text-amber-300 text-xl font-bold">
              "{STORE_INFO.slogan}"
            </p>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3 lg:col-span-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-400">
              LOCATION & CONTACT
            </h4>
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{STORE_INFO.location}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href={`tel:${STORE_INFO.phone}`} className="hover:text-amber-400 font-bold">
                {STORE_INFO.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{STORE_INFO.hours}</span>
            </div>
          </div>

          {/* Direct Links */}
          <div className="space-y-3 lg:col-span-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-400">
              QUICK MENU
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <a href="#menu" onClick={playIceClink} className="hover:text-amber-300">
                  🥤 Apple & Dates Milkshakes
                </a>
              </li>
              <li>
                <a href="#menu" onClick={playIceClink} className="hover:text-amber-300">
                  🍹 Mint Margarita & ABC Juice
                </a>
              </li>
              <li>
                <a href="#menu" onClick={playIceClink} className="hover:text-amber-300">
                  🥪 Spicy Chicken Tikka Sandwiches
                </a>
              </li>
              <li>
                <a href="#menu" onClick={playIceClink} className="hover:text-amber-300">
                  🥛 Special Arabic & Sweet Lassi
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3 lg:col-span-1">
            <h4 className="text-xs font-black uppercase tracking-widest text-amber-400">
              GET SUMMER DEALS
            </h4>
            <p className="text-xs text-slate-400">
              Subscribe for exclusive 20% discount vouchers and seasonal fruit alerts.
            </p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="flex-1 px-3 py-2.5 rounded-xl glass-panel text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs hover:bg-amber-400"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 THE SIP SPOT. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Handcrafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Summer Refreshment
          </p>
        </div>

      </div>
    </footer>
  );
}
