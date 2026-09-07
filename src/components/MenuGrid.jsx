import React, { useState } from 'react';
import { MENU_CATEGORIES, PRODUCTS } from '../data/menuData';
import MenuCard from './MenuCard';
import { playIceClink } from '../audio/summerSounds';
import { Search } from 'lucide-react';

export default function MenuGrid({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onQuickView,
  onAddToCart
}) {
  // Filter products by active category and search query
  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory =
      activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="menu" className="py-20 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="badge-pill bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
          🥤 CRAFTED TO ORDER
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
          EXPLORE <span className="gradient-text-sun">THE SIP SPOT</span> MENU
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          From 100% natural cold-pressed juices to thick banana date shakes and toasted paninis.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="max-w-md mx-auto mb-10 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Peach Juice, Oreo Shake, Tikka Sandwich..."
          className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-panel text-white placeholder-slate-400 focus:outline-none focus:border-amber-400/60 transition-all text-sm shadow-xl"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-amber-400"
          >
            CLEAR
          </button>
        )}
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-3 overflow-x-auto pb-4 mb-12 no-scrollbar">
        {MENU_CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                playIceClink();
                onSelectCategory(cat.id);
              }}
              className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 whitespace-nowrap transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-orange-500/30 scale-105'
                  : 'glass-panel text-slate-300 hover:text-white hover:border-amber-400/40'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <MenuCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass-panel rounded-3xl max-w-lg mx-auto">
          <span className="text-5xl block mb-4">🍹</span>
          <h3 className="text-xl font-bold text-white mb-2">No Items Found</h3>
          <p className="text-slate-400 text-sm mb-6">
            We couldn't find any drinks or food matching "{searchQuery}".
          </p>
          <button
            onClick={() => {
              onSearchChange('');
              onSelectCategory('all');
            }}
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
          >
            Show All Menu Items
          </button>
        </div>
      )}

    </section>
  );
}
