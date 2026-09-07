import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, MessageCircle } from 'lucide-react';
import { STORE_INFO } from '../data/menuData';
import { playLiquidSplash, playIceClink } from '../audio/summerSounds';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout
}) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  const handleApplyPromo = () => {
    playIceClink();
    if (promoCode.trim().toUpperCase() === 'SUMMER20') {
      setDiscountPercent(20);
      setPromoApplied(true);
    } else {
      alert('Invalid Promo Code! Use code SUMMER20 for 20% OFF.');
    }
  };

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const deliveryFee = rawSubtotal > 1000 || rawSubtotal === 0 ? 0 : 100;
  const finalTotal = rawSubtotal - discountAmount + deliveryFee;

  // Generate WhatsApp Order Message
  const generateWhatsAppMessage = () => {
    const itemsList = cartItems
      .map(
        (i) =>
          `• ${i.name} (${i.customization?.size || 'Regular'}) x${i.quantity} = Rs. ${
            i.price * i.quantity
          }`
      )
      .join('%0A');
    const msg = `*NEW ORDER - THE SIP SPOT*%0A%0A${itemsList}%0A%0A*Subtotal:* Rs. ${rawSubtotal}%0A*Discount:* -Rs. ${discountAmount}%0A*Delivery:* Rs. ${deliveryFee}%0A*Total:* Rs. ${finalTotal}%0A%0A*Location:* ${STORE_INFO.location}`;
    return `https://wa.me/${STORE_INFO.phone.replace(/[^0-9]/g, '')}?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-slate-700/80 flex flex-col justify-between shadow-2xl">
          
          {/* Cart Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-xl">
                🥤
              </div>
              <div>
                <h2 className="text-xl font-black text-white">YOUR ORDER</h2>
                <p className="text-xs text-slate-400">
                  {cartItems.length} unique items in cart
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playIceClink();
                onClose();
              }}
              className="p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-slate-600 stroke-[1]" />
                <p className="text-base font-extrabold text-white mb-1">
                  Your cart is empty
                </p>
                <p className="text-xs text-slate-500 mb-6">
                  Add a refreshing shake or juice to get started!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl glass-panel border border-slate-800 flex gap-4 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-700"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">
                      {item.name}
                    </h4>
                    <p className="text-[11px] text-amber-400 font-medium">
                      Rs. {item.price} {item.customization?.size && `• ${item.customization.size}`}
                    </p>
                    {item.customization?.ice && (
                      <p className="text-[10px] text-slate-400 truncate">
                        {item.customization.ice}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center glass-panel rounded-lg px-2 py-1 gap-1">
                      <button
                        onClick={() => {
                          playIceClink();
                          onUpdateQuantity(idx, item.quantity - 1);
                        }}
                        className="text-slate-400 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => {
                          playIceClink();
                          onUpdateQuantity(idx, item.quantity + 1);
                        }}
                        className="text-slate-400 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        playIceClink();
                        onRemoveItem(idx);
                      }}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-4">
              {/* Promo Code Box */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Promo Code (e.g. SUMMER20)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-xl glass-panel text-xs text-white uppercase focus:outline-none focus:border-amber-400"
                />
                <button
                  onClick={handleApplyPromo}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 text-xs font-bold"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  SUMMER20 Applied! 20% discount added.
                </p>
              )}

              {/* Pricing Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {rawSubtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-bold">
                    <span>Discount (20%)</span>
                    <span>-Rs. {discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery (Rawalpindi)</span>
                  <span>{deliveryFee === 0 ? 'FREE 🚚' : `Rs. ${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                  <span>Total Amount</span>
                  <span className="text-amber-400">Rs. {finalTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noreferrer"
                  onClick={playLiquidSplash}
                  className="py-3 px-3 rounded-2xl bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 hover:brightness-110 active:scale-95 transition-all text-decoration-none"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    playLiquidSplash();
                    onOpenCheckout();
                  }}
                  className="py-3 px-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/25 hover:brightness-110 active:scale-95 transition-all"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
