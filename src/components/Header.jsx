import React, { useState } from 'react';
import { ShoppingBag, Volume2, VolumeX, Search, Phone, MapPin, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { playIceClink } from '../audio/summerSounds';

export default function Header({
  cartCount,
  onOpenCart,
  onOpenSearch,
  soundEnabled,
  onToggleSound
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'glass-panel py-3 shadow-xl' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Tagline */}
        <a
          href="#top"
          onClick={playIceClink}
          className="flex items-center gap-3 group text-decoration-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-emerald-400 p-[2px] shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-2xl">
              🍹
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white font-heading">
                THE SIP <span className="gradient-text-sun">SPOT</span>
              </h1>
              <span className="text-[10px] uppercase tracking-widest font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Fresh
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">
              {STORE_INFO.subtitle}
            </p>
          </div>
        </a>

        {/* Desktop Quick Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
          <a href="#menu" onClick={playIceClink} className="hover:text-amber-400 transition-colors">
            Full Menu
          </a>
          <a href="#popular" onClick={playIceClink} className="hover:text-amber-400 transition-colors">
            Popular Shakes
          </a>
          <a href="#badges" onClick={playIceClink} className="hover:text-emerald-400 transition-colors">
            100% Natural
          </a>
          <a href="#location" onClick={playIceClink} className="hover:text-amber-400 transition-colors flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            Rawalpindi
          </a>
        </nav>

        {/* Action Controls (Search, Audio, Phone, Cart) */}
        <div className="flex items-center gap-3">
          {/* Phone Quick Call */}
          <a
            href={`tel:${STORE_INFO.phone}`}
            onClick={playIceClink}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-xs font-semibold text-amber-400 hover:border-amber-400/50 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{STORE_INFO.phone}</span>
          </a>

          {/* Sound Effect Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              playIceClink();
            }}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-amber-400 hover:border-amber-400/50 transition-all"
            title={soundEnabled ? 'Disable Audio FX' : 'Enable Audio FX'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => {
              onOpenSearch();
              playIceClink();
            }}
            className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-amber-400 hover:border-amber-400/50 transition-all"
            title="Search Menu"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Shopping Cart Drawer Trigger */}
          <button
            onClick={() => {
              onOpenCart();
              playIceClink();
            }}
            className="relative px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-lg shadow-orange-500/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4 fill-slate-950" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-xs font-black flex items-center justify-center border border-amber-400/40">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
