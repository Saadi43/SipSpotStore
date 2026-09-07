import React from 'react';
import { Star, Plus, Eye, Flame } from 'lucide-react';
import { playLiquidSplash, playIceClink } from '../audio/summerSounds';

export default function MenuCard({ product, onQuickView, onAddToCart }) {
  return (
    <div
      className="group relative glass-panel rounded-3xl overflow-hidden p-4 flex flex-col justify-between hover-glow transition-all duration-300 border border-slate-800 hover:border-amber-400/50"
    >
      {/* Product Image Container */}
      <div className="relative w-full h-48 sm:h-52 rounded-2xl overflow-hidden mb-4 bg-slate-900">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {product.tags.map((tag, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950/80 text-amber-400 border border-amber-400/30 backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Popular Flame Icon */}
        {product.popular && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-orange-500 text-slate-950 flex items-center justify-center font-bold text-xs shadow-lg shadow-orange-500/50 animate-bounce">
            🔥
          </div>
        )}

        {/* Quick View Floating Overlay Button */}
        <button
          onClick={() => {
            playIceClink();
            onQuickView(product);
          }}
          className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-slate-900/90 text-slate-200 border border-slate-700/60 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-amber-400 hover:scale-110"
          title="Quick View 3D Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Content Section */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            {product.calories}
          </span>
          <div className="flex items-center gap-1 text-amber-400 text-xs font-black">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>{product.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mb-1">
          {product.name}
        </h3>

        <p className="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Footer Price & Add Action */}
      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between mt-auto">
        <div>
          <span className="text-[10px] text-slate-400 block font-semibold">PRICE</span>
          <span className="text-xl font-black text-amber-400">
            Rs. {product.price}
          </span>
        </div>

        <button
          onClick={() => {
            playLiquidSplash();
            onAddToCart(product);
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-lg shadow-orange-500/20 hover:brightness-110 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>ADD</span>
        </button>
      </div>

    </div>
  );
}
