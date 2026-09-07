import React from 'react';
import { STORE_INFO } from '../data/menuData';

export default function BadgesBanner() {
  const details = [
    {
      title: "100% NATURAL",
      icon: "🌱",
      desc: "Pure real fruit extracts cold-pressed daily without artificial flavors or colorings.",
      color: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30"
    },
    {
      title: "NO ADDED SUGAR",
      icon: "🍯",
      desc: "Sweetened naturally with premium Khajur dates, organic raw honey, or natural banana fructose.",
      color: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/30"
    },
    {
      title: "FRESH & HYGIENIC",
      icon: "✨",
      desc: "Sanitized state-of-the-art blenders, double-filtered ice, and food-grade sealed packaging.",
      color: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/30"
    },
    {
      title: "HEALTHY CHOICE",
      icon: "❤️",
      desc: "Nutrient-packed smoothie formulas rich in Vitamin C, antioxidants, fiber, and natural electrolyte hydration.",
      color: "from-rose-500/20 to-pink-500/10",
      border: "border-rose-500/30"
    }
  ];

  return (
    <section id="badges" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="badge-pill bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
          ✨ OUR PROMISE
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          PURE TASTE, <span className="gradient-text-mint">PURE HEALTH</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {details.map((item, idx) => (
          <div
            key={idx}
            className={`p-6 rounded-3xl glass-panel bg-gradient-to-br ${item.color} border ${item.border} hover-glow transition-all flex flex-col justify-between`}
          >
            <div>
              <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center text-3xl mb-4 shadow-lg">
                {item.icon}
              </div>
              <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>
              <p className="text-slate-300 text-xs leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
