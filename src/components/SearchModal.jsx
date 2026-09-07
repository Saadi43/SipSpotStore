import React, { useState } from 'react';
import { X, Search, Star, Plus } from 'lucide-react';
import { PRODUCTS, MENU_CATEGORIES } from '../data/menuData';
import { playIceClink, playLiquidSplash } from '../audio/summerSounds';

export default function SearchModal({ isOpen, onClose, onQuickView, onAddToCart }) {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesQuery =
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.description.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-2xl flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400" />
          <input
            type="text"
            placeholder="Search Amrood, Annar, Apple, Imli Aloo Bukhara, Milk Sodas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-stone-900 placeholder-stone-400 font-medium text-sm focus:outline-none"
          />
          <button
            onClick={() => {
              playIceClink();
              onClose();
            }}
            className="p-2 rounded-full bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-2.5 bg-stone-50 border-b border-stone-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playIceClink();
                setSelectedCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider ${
                selectedCategory === cat.id
                  ? 'bg-zinc-900 text-white'
                  : 'bg-white border border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-stone-400 text-xs font-medium uppercase tracking-wider">
              No drinks found for "{query}".
            </div>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-3 rounded-2xl bg-white border border-stone-200 hover:border-stone-400 flex items-center justify-between gap-3 transition-all group shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 rounded-xl object-cover bg-stone-100"
                  />
                  <div className="min-w-0">
                    <h4 className="text-xs font-extrabold text-stone-900 truncate font-heading group-hover:text-amber-600">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-semibold mt-0.5">
                      <span className="text-stone-900 font-bold font-mono">Rs. {product.price}</span>
                      <span>•</span>
                      <span className="flex items-center gap-0.5 font-mono">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playIceClink();
                      onQuickView(product);
                      onClose();
                    }}
                    className="px-3 py-1.5 rounded-full bg-stone-100 text-stone-700 font-bold text-xs hover:bg-stone-200 transition-colors uppercase tracking-wider"
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      playLiquidSplash();
                      onAddToCart(product);
                    }}
                    className="p-2 rounded-full bg-zinc-900 text-white font-bold text-xs hover:bg-zinc-800 transition-colors"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
