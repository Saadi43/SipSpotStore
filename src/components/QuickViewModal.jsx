import React, { useState } from 'react';
import { X, Star, Plus, Minus, ShieldCheck } from 'lucide-react';
import { playLiquidSplash, playIceClink } from '../audio/summerSounds';

export default function QuickViewModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('regular');
  const [sugarLevel, setSugarLevel] = useState('100%');
  const [iceLevel, setIceLevel] = useState('Normal Ice');

  const basePrice = product.price;
  const sizeExtra = size === 'jumbo' ? 60 : 0;
  const unitPrice = basePrice + sizeExtra;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    playLiquidSplash();
    onAddToCart({
      ...product,
      cartId: `${product.id}-${size}-${sugarLevel}-${iceLevel}`,
      size,
      sugarLevel,
      iceLevel,
      price: unitPrice,
      quantity
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden border border-stone-200 shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            playIceClink();
            onClose();
          }}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-stone-100 text-stone-600 hover:text-stone-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="md:w-1/2 relative bg-stone-100 min-h-[220px] md:min-h-full flex items-center justify-center p-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded-2xl shadow-sm"
          />
        </div>

        <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-yellow-400 text-slate-950 font-black text-[10px] uppercase">
                {product.badge || 'THE SIP SPOT'}
              </span>
              <span className="text-xs font-bold text-stone-500 flex items-center gap-1 font-mono">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                {product.rating}
              </span>
            </div>

            <h2 className="text-xl font-black text-stone-900 font-heading mb-1">{product.name}</h2>
            <p className="text-stone-500 text-xs leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Size */}
            <div className="mb-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-1.5 font-heading">
                Size
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSize('regular')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                    size === 'regular'
                      ? 'bg-zinc-900 border-zinc-900 text-white'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <span>Regular</span>
                  <span className="font-mono">Rs. {basePrice}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSize('jumbo')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                    size === 'jumbo'
                      ? 'bg-zinc-900 border-zinc-900 text-white'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                  }`}
                >
                  <span>Jumbo</span>
                  <span className="font-mono">+Rs. 60</span>
                </button>
              </div>
            </div>

            {/* Sweetness */}
            <div className="mb-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-1.5 font-heading">
                Sweetness
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['100%', '50% Less', 'Zero Sugar'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSugarLevel(opt)}
                    className={`py-1.5 px-2 rounded-xl border text-xs font-bold transition-all text-center ${
                      sugarLevel === opt
                        ? 'bg-zinc-900 border-zinc-900 text-white'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Ice */}
            <div className="mb-3">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-stone-700 mb-1.5 font-heading">
                Ice Level
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {['Normal Ice', 'Extra Ice', 'No Ice'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setIceLevel(opt)}
                    className={`py-1.5 px-2 rounded-xl border text-xs font-bold transition-all text-center ${
                      iceLevel === opt
                        ? 'bg-zinc-900 border-zinc-900 text-white'
                        : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-lg bg-white text-stone-700 font-bold shadow-sm flex items-center justify-center"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center font-black text-xs font-mono">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 rounded-lg bg-white text-stone-700 font-bold shadow-sm flex items-center justify-center"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-black text-xs uppercase tracking-wider flex items-center justify-between transition-colors shadow-md"
            >
              <span>Add to Order</span>
              <span className="font-mono">Rs. {totalPrice}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
