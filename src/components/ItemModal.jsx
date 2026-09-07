import React, { useState } from 'react';
import { X, Star, Plus, Minus, Check, Flame } from 'lucide-react';
import { playLiquidSplash, playIceClink } from '../audio/summerSounds';

export default function ItemModal({ product, onClose, onAddToCart }) {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Regular');
  const [iceLevel, setIceLevel] = useState('Regular Ice 🧊');
  const [sweetness, setSweetness] = useState('No Added Sugar 🍯');
  const [selectedAddons, setSelectedAddons] = useState([]);

  const sizes = [
    { label: 'Regular', modifier: 0 },
    { label: 'Large (500ml)', modifier: 70 },
    { label: 'Jumbo Bowl (750ml)', modifier: 140 }
  ];

  const addonsList = [
    { id: 'boba', name: 'Extra Tapioca Boba', price: 60 },
    { id: 'chia', name: 'Organic Chia Seeds', price: 40 },
    { id: 'mint', name: 'Mint Leaf Burst', price: 30 },
    { id: 'icecream', name: 'Vanilla Ice Cream Scoop', price: 80 }
  ];

  const toggleAddon = (id) => {
    playIceClink();
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Calculate live subtotal
  const sizeObj = sizes.find((s) => s.label === selectedSize);
  const sizePrice = sizeObj ? sizeObj.modifier : 0;
  const addonsTotal = selectedAddons.reduce((acc, currId) => {
    const item = addonsList.find((a) => a.id === currId);
    return acc + (item ? item.price : 0);
  }, 0);

  const unitPrice = product.price + sizePrice + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    playLiquidSplash();
    const customizedItem = {
      ...product,
      price: unitPrice,
      customization: {
        size: selectedSize,
        ice: iceLevel,
        sweetness: sweetness,
        addons: selectedAddons.map((id) => addonsList.find((a) => a.id === id)?.name)
      }
    };
    onAddToCart(customizedItem, quantity);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 max-h-[90vh] flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={() => {
            playIceClink();
            onClose();
          }}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-900/80 text-slate-300 hover:text-white border border-slate-700/80"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="overflow-y-auto p-6 space-y-6">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-36 h-36 rounded-2xl object-cover shadow-xl border border-slate-700/60 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="badge-pill bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px]">
                  {product.category.replace('_', ' ').toUpperCase()}
                </span>
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  {product.calories}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mb-2">{product.name}</h2>
              <p className="text-slate-300 text-xs leading-relaxed mb-3">
                {product.description}
              </p>
              <div className="text-amber-400 text-xl font-black">
                Rs. {unitPrice} <span className="text-xs font-normal text-slate-400">/ portion</span>
              </div>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3">
              SELECT SIZE
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {sizes.map((s) => (
                <button
                  key={s.label}
                  onClick={() => {
                    playIceClink();
                    setSelectedSize(s.label);
                  }}
                  className={`p-3 rounded-2xl border text-xs font-bold text-center transition-all ${
                    selectedSize === s.label
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div>{s.label}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {s.modifier > 0 ? `+Rs. ${s.modifier}` : 'Standard'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Ice & Sweetness Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2">
                ICE LEVEL 🧊
              </h3>
              <select
                value={iceLevel}
                onChange={(e) => setIceLevel(e.target.value)}
                className="w-full p-3 rounded-xl glass-panel text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
              >
                <option value="Regular Ice 🧊">Regular Ice 🧊</option>
                <option value="Less Ice 🧊">Less Ice 🧊</option>
                <option value="Extra Frosty 🧊">Extra Frosty 🧊</option>
                <option value="No Ice ❌">No Ice ❌</option>
              </select>
            </div>

            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-2">
                SWEETNESS LEVEL 🍯
              </h3>
              <select
                value={sweetness}
                onChange={(e) => setSweetness(e.target.value)}
                className="w-full p-3 rounded-xl glass-panel text-xs font-semibold text-white focus:outline-none focus:border-amber-400"
              >
                <option value="No Added Sugar 🍯">No Added Sugar (Natural) 🍯</option>
                <option value="100% Full Sweet">100% Full Sweetness</option>
                <option value="50% Less Sweet">50% Half Sweetness</option>
                <option value="Honey Sweetened">Organic Honey Sweetened</option>
              </select>
            </div>
          </div>

          {/* Optional Add-ons */}
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-3">
              EXTRA TOPPINGS & ADD-ONS
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {addonsList.map((addon) => {
                const isSelected = selectedAddons.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span>{addon.name}</span>
                    <span className="font-extrabold">+Rs. {addon.price}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 glass-panel px-3 py-1.5 rounded-xl">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-black text-sm text-white w-6 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-300"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleAdd}
            className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 hover:brightness-110 active:scale-95 transition-all"
          >
            <span>ADD TO ORDER</span>
            <span>•</span>
            <span>Rs. {totalPrice}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
