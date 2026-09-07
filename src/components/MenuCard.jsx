import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { playLiquidSplash, playIceClink } from '../audio/summerSounds';

export default function MenuCard({
  product,
  onQuickView,
  onAddToCart,
  onUpdateQuantity,
  itemQuantity = 0,
  isDarkMode
}) {
  const [localQty, setLocalQty] = useState(itemQuantity);

  useEffect(() => {
    setLocalQty(itemQuantity);
  }, [itemQuantity]);

  const handleAddFirstTime = (e) => {
    e.stopPropagation();
    playLiquidSplash();
    setLocalQty(1);
    onAddToCart(product);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    playIceClink();
    const newQty = localQty + 1;
    setLocalQty(newQty);
    if (onUpdateQuantity) {
      onUpdateQuantity(product.id, newQty);
    } else {
      onAddToCart(product);
    }
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    playIceClink();
    const newQty = Math.max(0, localQty - 1);
    setLocalQty(newQty);
    if (onUpdateQuantity) {
      onUpdateQuantity(product.id, newQty);
    }
  };

  const handleRemoveEntireItem = (e) => {
    e.stopPropagation();
    playIceClink();
    setLocalQty(0);
    if (onUpdateQuantity) {
      onUpdateQuantity(product.id, 0);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={() => {
        playIceClink();
        onQuickView(product);
      }}
      className={`relative rounded-3xl p-5 flex flex-col justify-between gap-4 border shadow-xs hover:shadow-md cursor-pointer transition-all group overflow-hidden ${
        isDarkMode
          ? 'bg-slate-900 border-slate-800 hover:border-amber-400/80 text-white'
          : 'bg-white border-amber-200/80 hover:border-amber-400 text-slate-900'
      }`}
    >
      {/* Top Tag Badge */}
      {product.tags && product.tags.length > 0 && (
        <span className="absolute top-4 right-4 z-10 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider shadow-xs">
          {product.tags[0]}
        </span>
      )}

      <div className="flex items-center justify-between gap-4">
        {/* Left Info Column */}
        <div className="flex-1 min-w-0 pr-2">
          <h3 className={`text-base sm:text-lg font-black group-hover:text-amber-500 transition-colors font-heading truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {product.name}
          </h3>

          {product.description && (
            <p className={`text-xs line-clamp-2 mt-1 leading-relaxed font-normal ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {product.description}
            </p>
          )}

          <div className="mt-3">
            <span className={`text-lg font-black font-mono ${isDarkMode ? 'text-amber-400' : 'text-slate-900'}`}>
              Rs. {product.price}
            </span>
          </div>
        </div>

        {/* Right Drink Thumbnail */}
        <div className="relative shrink-0">
          <div className={`w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-1 flex items-center justify-center border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-amber-50/60 border-amber-100'}`}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300 drop-shadow-xs"
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Golden Sunny Yellow Button matching User Image */}
      <div className="pt-2">
        <AnimatePresence mode="wait">
          {localQty === 0 ? (
            /* Default: White button -> Golden Sunny Yellow gradient on Hover */
            <motion.button
              key="add-btn"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleAddFirstTime}
              className={`w-full py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border shadow-xs transition-all duration-300 group/btn ${
                isDarkMode
                  ? 'bg-slate-800 text-white border-slate-700 hover:bg-gradient-to-r hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 hover:text-slate-950 hover:border-amber-400'
                  : 'bg-white text-slate-900 border-stone-300 hover:bg-gradient-to-r hover:from-amber-400 hover:via-yellow-400 hover:to-amber-500 hover:text-slate-950 hover:border-amber-400'
              }`}
            >
              <Plus className="w-4 h-4 stroke-[3] group-hover/btn:rotate-90 transition-transform duration-300" />
              <span>ADD TO CART</span>
            </motion.button>
          ) : (
            /* Quantity Control Pill with Sunny Gold Theme */
            <motion.div
              key="qty-pill"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-full py-1.5 px-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs shadow-md flex items-center justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-1">
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={handleDecrement}
                  className="w-7 h-7 rounded-xl bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 flex items-center justify-center transition-colors"
                  title="Decrease"
                >
                  <Minus className="w-3.5 h-3.5 stroke-[3]" />
                </motion.button>

                <span className="w-6 text-center font-mono text-sm font-black text-slate-950">
                  {localQty}
                </span>

                <motion.button
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={handleIncrement}
                  className="w-7 h-7 rounded-xl bg-slate-950/20 hover:bg-slate-950/30 text-slate-950 flex items-center justify-center transition-colors"
                  title="Increase"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                </motion.button>
              </div>

              {/* Direct Delete Entire Item Trash Button */}
              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={handleRemoveEntireItem}
                className="w-7 h-7 rounded-xl bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center transition-colors shadow-xs ml-2"
                title="Remove entire item from cart"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}
