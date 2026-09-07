import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Leaf, Zap } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { playIceClink, playLiquidSplash } from '../audio/summerSounds';

export default function HeroSection({ onExploreMenu, onOrderWhatsApp }) {
  return (
    <section id="top" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Live Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel-orange border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold mb-6 animate-float shadow-lg">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          <span>Pure Taste, Pure Health • Open Now in Rawalpindi</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight max-w-4xl mx-auto leading-[1.15] mb-6">
          ICED FRESH <span className="gradient-text-sun">JUICES</span> & <br />
          TROPICAL <span className="gradient-text-mint">SMOOTHIES</span>
        </h1>

        {/* Hand-script Slogan */}
        <p className="font-script text-3xl sm:text-4xl text-amber-300 mb-8 font-bold">
          "{STORE_INFO.slogan}"
        </p>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Crafted with 100% real fruits, chilled mountain ice, dates, and organic natural sweetening. Experience Pakistan’s most refreshing beverage store.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => {
              playLiquidSplash();
              onExploreMenu();
            }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 font-black text-base flex items-center gap-3 shadow-xl shadow-orange-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <span>Explore 3D Menu</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={() => {
              playIceClink();
              onOrderWhatsApp();
            }}
            className="px-8 py-4 rounded-2xl glass-panel border border-emerald-500/40 text-emerald-400 font-bold text-base flex items-center gap-3 hover:bg-emerald-500/10 hover:border-emerald-400 transition-all"
          >
            <span className="text-lg">💬</span>
            <span>Order on WhatsApp</span>
          </button>
        </div>

        {/* Key Guarantees Badges (From Menu Image) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {STORE_INFO.badges.map((badge, idx) => (
            <div
              key={idx}
              className="glass-panel p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 hover:border-amber-400/40 transition-all group"
            >
              <span className="text-3xl group-hover:scale-125 transition-transform duration-300">
                {badge.icon}
              </span>
              <span className="text-xs font-black tracking-wider text-slate-200 uppercase">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
