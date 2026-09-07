import React from 'react';

export default function MarqueeBanner() {
  const items = [
    "🧊 ULTRA REFRESHING",
    "🍊 100% NATURAL JUICES",
    "🍓 HANDCRAFTED SMOOTHIES",
    "🥪 FRESH TOASTED SANDWICHES",
    "🍃 NO ADDED SUGAR",
    "⚡ INSTANT ENERGY BOOST",
    "❤️ HEALTHY CHOICE",
    "🥛 FRESH MALAI LASSI"
  ];

  return (
    <div className="relative w-full py-4 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 overflow-hidden shadow-lg border-y border-amber-400/30 rotate-[-1deg] my-8">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...items, ...items, ...items].map((text, index) => (
          <span
            key={index}
            className="inline-flex items-center text-slate-950 font-black text-sm sm:text-base tracking-widest uppercase mx-6"
          >
            {text}
            <span className="ml-6 text-slate-900/60">•</span>
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
