import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, MapPin, Volume2, VolumeX, ChevronRight, Sun, Moon } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { playIceClink } from '../audio/summerSounds';

export default function Header({
  cartCount,
  onOpenCart,
  soundEnabled,
  onToggleSound,
  isDarkMode,
  onToggleDarkMode,
  selectedOrderType = 'pickup',
  selectedBranch = { name: 'The Sip Spot — Westridge 1' },
  onOpenLocationModal
}) {
  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 py-3 shadow-sm ${
        isDarkMode
          ? 'bg-slate-950/90 border-slate-800 text-white'
          : 'bg-[#FFFDF9]/90 border-amber-200/60 text-slate-900'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <a
          href="#top"
          onClick={playIceClink}
          className="flex items-center gap-3.5 group text-decoration-none shrink-0"
        >
          <div className="relative">
            <img
              src="/images/logo.png"
              alt="THE SIP SPOT Logo"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain group-hover:scale-108 group-hover:rotate-2 transition-all duration-300 drop-shadow-sm"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
          </div>

          <div>
            <h1 className={`text-xl sm:text-2xl font-black tracking-tight font-heading ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              THE SIP{' '}
              <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                SPOT
              </span>
            </h1>
            <p className={`text-[10px] font-extrabold tracking-widest uppercase mt-0.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {STORE_INFO.subtitle}
            </p>
          </div>
        </a>

        {/* Center: Location Selector Pill */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => {
              playIceClink();
              onOpenLocationModal();
            }}
            className={`flex items-center gap-2.5 px-4 py-2 rounded-full border shadow-xs transition-all cursor-pointer group text-left ${
              isDarkMode
                ? 'bg-slate-900 border-slate-700 hover:border-amber-400'
                : 'bg-white border-amber-300 hover:border-amber-400'
            }`}
          >
            <div className="w-7 h-7 rounded-full bg-amber-400/20 text-amber-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>

            <div className="min-w-0 pr-1">
              <span className="block text-[9px] font-black uppercase tracking-wider text-amber-600 leading-none">
                {selectedOrderType === 'delivery' ? 'DELIVERY' : 'PICKUP'}
              </span>
              <span className={`block text-xs font-black truncate max-w-[180px] leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {selectedBranch.name || 'Westridge 1, ISB/RWP'}
              </span>
            </div>

            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        </div>

        {/* Right Side: Theme Toggler, Audio Toggle & Golden Cart Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Animated Theme Toggler Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              playIceClink();
              onToggleDarkMode();
            }}
            className={`p-2.5 rounded-2xl border shadow-xs transition-colors ${
              isDarkMode
                ? 'bg-slate-900 text-amber-400 border-slate-700 hover:bg-slate-800'
                : 'bg-amber-50 text-slate-800 border-amber-200 hover:bg-amber-100'
            }`}
            title={isDarkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
          >
            <motion.div
              initial={false}
              animate={{ rotate: isDarkMode ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </motion.div>
          </motion.button>

          {/* Sound Toggle Button */}
          <button
            onClick={onToggleSound}
            className={`p-2.5 rounded-2xl border transition-colors shadow-xs ${
              isDarkMode
                ? 'bg-slate-900 border-slate-700 text-amber-400'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
            title={soundEnabled ? 'Mute Summer Audio' : 'Unmute Summer Audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-amber-500" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Golden Sunny Yellow Cart Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              onOpenCart();
              playIceClink();
            }}
            className="relative px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center gap-2.5 shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 transition-all duration-200 overflow-hidden group"
          >
            <span className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />

            <ShoppingBag className="w-4 h-4 stroke-[2.5] text-slate-950 relative z-10" />
            <span className="hidden sm:inline font-heading tracking-wide relative z-10 text-slate-950">My Cart</span>

            <motion.span
              key={cartCount}
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              className="relative z-10 w-5 h-5 rounded-full bg-slate-950 text-amber-400 text-[11px] font-black flex items-center justify-center font-mono shadow-xs"
            >
              {cartCount}
            </motion.span>
          </motion.button>

        </div>

      </div>
    </header>
  );
}
