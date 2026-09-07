import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { MENU_CATEGORIES } from '../data/menuData';
import { playIceClink } from '../audio/summerSounds';

export default function MarqueeBanner({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  isDarkMode
}) {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    playIceClink();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    playIceClink();
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full space-y-6 my-4">
      
      {/* Summer Arch Category Navigation Bar with Animated Arrows */}
      <div className={`relative w-full py-4 border-y transition-colors duration-300 ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-[#FFFDF9] border-amber-200/80'
      }`}>
        <div className="max-w-7xl mx-auto px-4 relative flex items-center">
          
          {/* Animated Scroll Left Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollLeft}
            className={`absolute left-1 sm:-left-2 z-20 w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-colors border ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-amber-200 text-slate-800 hover:bg-amber-50'
            }`}
            title="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </motion.button>

          {/* Arched Category Icon List */}
          <div
            ref={scrollContainerRef}
            className="w-full flex items-center justify-start sm:justify-center gap-3 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-8 sm:px-12 scroll-smooth"
          >
            {MENU_CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;

              return (
                <motion.button
                  key={cat.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    playIceClink();
                    onSelectCategory(cat.id);
                  }}
                  className={`relative flex flex-col items-center group cursor-pointer transition-all duration-200 shrink-0 p-2.5 rounded-2xl ${
                    isSelected
                      ? 'text-white shadow-lg scale-105'
                      : isDarkMode
                      ? 'bg-transparent text-slate-200 hover:bg-slate-800/60'
                      : 'bg-transparent text-slate-800 hover:bg-amber-50'
                  }`}
                >
                  {/* Framer Motion Active Box Background */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeCategoryBox"
                      className="absolute inset-0 bg-gradient-to-b from-orange-500 to-amber-600 rounded-2xl shadow-lg border-2 border-orange-500 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}

                  {/* Arched Background Dome */}
                  <div
                    style={{ backgroundColor: cat.archBg || '#EA580C' }}
                    className="w-14 h-16 sm:w-16 sm:h-20 rounded-t-full relative flex items-end justify-center overflow-visible shadow-md transition-transform group-hover:scale-105"
                  >
                    {/* Cutout Image */}
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-11 h-14 sm:w-14 sm:h-18 object-cover rounded-t-full drop-shadow-md mb-1 transition-transform group-hover:scale-110"
                    />
                  </div>

                  {/* Category Label Underneath */}
                  <span
                    className={`mt-2 text-xs sm:text-sm font-extrabold font-heading text-center tracking-tight leading-tight ${
                      isSelected
                        ? 'text-white font-black'
                        : isDarkMode
                        ? 'text-slate-200 group-hover:text-orange-400'
                        : 'text-slate-900 group-hover:text-orange-600'
                    }`}
                  >
                    {cat.label}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Animated Scroll Right Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollRight}
            className={`absolute right-1 sm:-right-2 z-20 w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-colors border ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                : 'bg-white border-amber-200 text-slate-800 hover:bg-amber-50'
            }`}
            title="Scroll Right"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </motion.button>

        </div>
      </div>

      {/* Centered Search Bar in Summer Amber Theme */}
      <div className="max-w-xl mx-auto px-4">
        <div className={`relative flex items-center w-full rounded-full border-2 shadow-xs p-1.5 transition-colors ${
          isDarkMode
            ? 'bg-slate-900 border-slate-700 focus-within:border-orange-500'
            : 'bg-white border-amber-200 focus-within:border-orange-500'
        }`}>
          <Search className="w-4 h-4 text-orange-500 ml-3 shrink-0" />
          <input
            type="text"
            placeholder="Search for Vanilla, Mango, Shakes, Paninis..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={`w-full px-3 py-1.5 text-xs sm:text-sm bg-transparent focus:outline-none font-medium ${
              isDarkMode ? 'text-white placeholder-slate-500' : 'text-slate-900 placeholder-slate-400'
            }`}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs"
          >
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </motion.button>
        </div>
      </div>

    </div>
  );
}
