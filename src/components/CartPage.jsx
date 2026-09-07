import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Flame,
  Clock,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import { PRODUCTS, STORE_INFO } from '../data/menuData';
import { playLiquidSplash, playIceClink } from '../audio/summerSounds';

export default function CartPage({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
  onBackToStore,
  selectedOrderType = 'pickup',
  selectedBranch = { name: 'The Sip Spot — Westridge 1' },
  savedDeliveryAddress = '',
  isDarkMode
}) {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState(savedDeliveryAddress || '');
  const [riderNote, setRiderNote] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [createdOrderNumber, setCreatedOrderNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (savedDeliveryAddress) {
      setCustomerAddress(savedDeliveryAddress);
    }
  }, [savedDeliveryAddress]);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = selectedOrderType === 'delivery' ? 100 : 0;
  const grandTotal = subtotal + deliveryFee;

  // Recommended upsell items (popular additions not currently in cart)
  const upsellItems = PRODUCTS.filter(
    (p) => !cartItems.some((item) => item.id === p.id)
  ).slice(0, 5);

  const handleCheckoutSubmit = async (e) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) return;

    try {
      setIsSubmitting(true);
      playLiquidSplash();

      // Submit order payload to Backend REST API
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerPhone,
          orderType: selectedOrderType,
          branchName: selectedBranch.name,
          deliveryAddress: customerAddress,
          riderNote,
          items: cartItems.map((i) => ({
            id: i.id,
            name: i.name,
            price: i.price,
            quantity: i.quantity
          })),
          subtotal,
          deliveryFee,
          grandTotal
        })
      });

      const data = await response.json();
      const orderNum = data.success ? data.order.orderNumber : `#SIP-${Math.floor(1000 + Math.random() * 9000)}`;
      setCreatedOrderNumber(orderNum);

      setOrderComplete(true);
      if (onOrderSuccess) onOrderSuccess();

      // Format WhatsApp message receipt professionally
      const itemsText = cartItems
        .map((item) => `• ${item.name} x${item.quantity} - Rs. ${item.price * item.quantity}`)
        .join('%0A');

      const whatsappMessage = `*NEW ORDER ${orderNum} - THE SIP SPOT*%0A%0A` +
        `*Customer:* ${encodeURIComponent(customerName)}%0A` +
        `*Phone:* ${encodeURIComponent(customerPhone)}%0A` +
        `*Order Type:* ${selectedOrderType.toUpperCase()}%0A` +
        `*Branch:* ${encodeURIComponent(selectedBranch.name)}%0A` +
        (selectedOrderType === 'delivery' ? `*Address:* ${encodeURIComponent(customerAddress)}%0A` : '') +
        (riderNote.trim() ? `*Rider Note / Instructions:* ${encodeURIComponent(riderNote)}%0A` : '') +
        `%0A*ORDER ITEMS:*%0A${itemsText}%0A%0A` +
        `*Subtotal:* Rs. ${subtotal}%0A` +
        (deliveryFee > 0 ? `*Delivery Fee:* Rs. ${deliveryFee}%0A` : '') +
        `*GRAND TOTAL:* Rs. ${grandTotal}%0A%0A` +
        `Thank you for choosing The Sip Spot!`;

      setTimeout(() => {
        window.open(`https://wa.me/${STORE_INFO.whatsapp.replace('+', '')}?text=${whatsappMessage}`, '_blank');
        onClearCart();
        setOrderComplete(false);
        setIsSubmitting(false);
        onBackToStore();
      }, 1800);

    } catch (err) {
      console.error('Failed to dispatch order:', err);
      setIsSubmitting(false);
    }
  };

  const getEstimatedTime = () => {
    const date = new Date(Date.now() + 25 * 60000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-body ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-[#FFFDF9] text-slate-900'
    }`}>
      
      {/* Main Cart Page Body Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBackToStore}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider border shadow-xs transition-all ${
              isDarkMode
                ? 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                : 'bg-white border-stone-200 text-slate-700 hover:bg-amber-50 hover:border-amber-400'
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-amber-500" />
            <span>Back to Menu</span>
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-5">
            <div className="w-24 h-24 mx-auto rounded-full bg-amber-400/20 text-amber-600 flex items-center justify-center border border-amber-400/30">
              <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
            </div>
            <h2 className="text-2xl font-black font-heading uppercase">Your cart is empty!</h2>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Explore our menu to add fresh milkshakes, cold-pressed fruit juices, brewed teas, and grilled toasted paninis.
            </p>
            <button
              onClick={onBackToStore}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-400/30 hover:scale-105 transition-all"
            >
              Explore Menu Items
            </button>
          </div>
        ) : orderComplete ? (
          /* Confirmation Screen */
          <div className="py-24 text-center max-w-md mx-auto space-y-4 animate-fadeIn">
            <CheckCircle2 className="w-20 h-20 text-emerald-500 mx-auto animate-bounce" />
            <h2 className="text-3xl font-black font-heading uppercase">Order {createdOrderNumber} Confirmed!</h2>
            <p className="text-sm text-slate-600 font-medium">
              Thank you for ordering with The Sip Spot! Redirecting to complete your order details on WhatsApp...
            </p>
            <div className="pt-2 text-xs font-black text-amber-600 uppercase tracking-widest">
              Preparing your fresh drinks...
            </div>
          </div>
        ) : (
          /* 2-Column Desktop Grid Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2">
            
            {/* Left Column (7/12): Items List & Upsell Carousel */}
            <div className="lg:col-span-7 space-y-8">
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
                  <h2 className="text-lg font-black font-heading uppercase">Selected Items ({cartItems.length})</h2>
                  <button
                    onClick={onClearCart}
                    className="text-xs font-bold text-rose-500 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Cart</span>
                  </button>
                </div>

                {/* Items List Cards */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartId || item.id}
                      className={`p-4 rounded-3xl border shadow-xs flex items-center justify-between gap-4 transition-all ${
                        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
                      }`}
                    >
                      {/* Thumbnail */}
                      <div className="w-20 h-20 rounded-2xl bg-amber-50/60 p-1 flex items-center justify-center border border-amber-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                      </div>

                      {/* Info & Price */}
                      <div className="flex-1 min-w-0 pr-2">
                        <h3 className="text-base font-black font-heading truncate">{item.name}</h3>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.description}</p>
                        <span className="text-sm font-black font-mono text-amber-600 dark:text-amber-400 mt-1 block">
                          Rs. {item.price * item.quantity}
                        </span>
                      </div>

                      {/* High-Contrast Quantity Controls Pill + Clean Red Trash Button */}
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-amber-100 dark:bg-slate-800 border border-amber-300 dark:border-slate-700 shadow-xs">
                          <button
                            onClick={() => onUpdateQuantity(item.cartId || item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full bg-white dark:bg-slate-700 text-slate-900 dark:text-white flex items-center justify-center font-black hover:bg-amber-200 dark:hover:bg-slate-600 transition-colors shadow-xs"
                            title="Decrease"
                          >
                            <Minus className="w-3.5 h-3.5 stroke-[3]" />
                          </button>

                          <span className="w-6 text-center font-black text-sm font-mono text-slate-950 dark:text-white">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => onUpdateQuantity(item.cartId || item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center font-black hover:scale-105 transition-all shadow-xs"
                            title="Increase"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>

                        {/* Direct Delete Entire Item Button */}
                        <button
                          onClick={() => onRemoveItem(item.cartId || item.id)}
                          className="w-9 h-9 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 border border-rose-300 dark:border-rose-900/60 flex items-center justify-center transition-all shadow-xs"
                          title="Remove entire item"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Add More Items Dashed Button in Golden Sunny Theme */}
                <button
                  onClick={onBackToStore}
                  className="w-full py-3.5 rounded-2xl border-2 border-dashed border-amber-400 text-amber-700 dark:text-amber-400 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-amber-50/50 transition-colors"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add More Items From Menu</span>
                </button>
              </div>

              {/* Popular Upsell Items Carousel */}
              {upsellItems.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-amber-200/60">
                  <div className="flex items-center gap-2 text-sm font-black font-heading">
                    <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <span>Popular Additions With Your Order</span>
                  </div>

                  <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-2">
                    {upsellItems.map((p) => (
                      <div
                        key={p.id}
                        className={`w-40 rounded-3xl p-3 border shrink-0 flex flex-col justify-between space-y-3 relative shadow-xs ${
                          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-stone-200'
                        }`}
                      >
                        <div className="w-full h-24 rounded-2xl overflow-hidden bg-amber-50">
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                        </div>

                        <div>
                          <h5 className="text-xs font-bold line-clamp-1">{p.name}</h5>
                          <span className="text-xs font-black font-mono text-amber-600 dark:text-amber-400">Rs. {p.price}</span>
                        </div>

                        <button
                          onClick={() => {
                            playLiquidSplash();
                            onUpdateQuantity(p.id, 1);
                          }}
                          className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-[11px] uppercase tracking-wider shadow-xs flex items-center justify-center gap-1 hover:scale-102 transition-transform"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          <span>Add</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Right Column (5/12): Checkout & Bill Summary with High-Contrast Solid Black Text */}
            <div className="lg:col-span-5 space-y-6">
              
              <div className={`p-6 rounded-3xl border shadow-md space-y-6 sticky top-8 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-200'
              }`}>
                <h2 className="text-lg font-black font-heading uppercase border-b border-stone-200 dark:border-slate-800 pb-3 text-slate-950 dark:text-white">
                  Checkout & Order Details
                </h2>

                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  
                  {/* Order Type & Branch Summary in High Contrast Solid Black Text */}
                  <div className="p-4 rounded-2xl bg-amber-100 border-2 border-amber-300 text-xs space-y-1">
                    <span className="font-black text-amber-900 uppercase block tracking-wider">Selected Order Type</span>
                    <p className="font-black text-slate-950 text-sm">
                      {selectedOrderType.toUpperCase()} — {selectedBranch.name}
                    </p>
                  </div>

                  {/* Full Name Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-2xl border-2 text-xs font-bold focus:border-amber-400 focus:outline-none ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-400' : 'bg-white border-stone-300 text-slate-950 placeholder:text-stone-400'
                      }`}
                    />
                  </div>

                  {/* Phone Number Input */}
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="03XX-XXXXXXX"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className={`w-full px-4 py-3 rounded-2xl border-2 text-xs font-bold font-mono focus:border-amber-400 focus:outline-none ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-400' : 'bg-white border-stone-300 text-slate-950 placeholder:text-stone-400'
                      }`}
                    />
                  </div>

                  {selectedOrderType === 'delivery' && (
                    <div className="space-y-1">
                      <label className="text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white">
                        Delivery Address *
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Enter house, street, landmark..."
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className={`w-full px-4 py-3 rounded-2xl border-2 text-xs font-bold focus:border-amber-400 focus:outline-none ${
                          isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-400' : 'bg-white border-stone-300 text-slate-950 placeholder:text-stone-400'
                        }`}
                      />
                    </div>
                  )}

                  {/* Rider Note */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs font-black uppercase tracking-wider text-slate-950 dark:text-white">
                      <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                      <span>Rider Note / Special Instructions</span>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="e.g. Ring doorbell, less ice, extra napkins..."
                      value={riderNote}
                      onChange={(e) => setRiderNote(e.target.value)}
                      className={`w-full px-4 py-3 rounded-2xl border-2 text-xs font-bold focus:border-amber-400 focus:outline-none ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white placeholder:text-slate-400' : 'bg-white border-stone-300 text-slate-950 placeholder:text-stone-400'
                      }`}
                    />
                  </div>

                  {/* 100% Solid Black Text High-Contrast Grand Total Card */}
                  <div className="p-5 rounded-3xl bg-amber-100 border-2 border-amber-400 shadow-sm space-y-3">
                    <div className="flex items-center justify-between text-xs font-black text-slate-950">
                      <span className="text-slate-950 font-black">Subtotal</span>
                      <span className="font-mono text-slate-950 text-sm font-black">Rs. {subtotal}</span>
                    </div>

                    {deliveryFee > 0 && (
                      <div className="flex items-center justify-between text-xs font-black text-slate-950">
                        <span className="text-slate-950 font-black">Delivery Fee</span>
                        <span className="font-mono text-slate-950 text-sm font-black">Rs. {deliveryFee}</span>
                      </div>
                    )}

                    <div className="pt-3 border-t-2 border-amber-400 flex items-center justify-between">
                      <span className="font-heading uppercase text-sm font-black text-slate-950">
                        Grand Total
                      </span>
                      <span className="text-2xl font-black font-mono text-slate-950">
                        Rs. {grandTotal}
                      </span>
                    </div>
                  </div>

                  {/* Golden Sunny Complete Order Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 hover:scale-102 active:scale-95 transition-all"
                  >
                    <span>{isSubmitting ? 'Confirming Order...' : 'Complete Order'}</span>
                    <ArrowRight className="w-5 h-5 stroke-[2.5]" />
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 font-bold text-center">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Ready for {selectedOrderType === 'delivery' ? 'Delivery' : 'Pickup'} in ~25 mins at {getEstimatedTime()}</span>
                  </div>

                </form>
              </div>

            </div>

          </div>
        )}

      </main>

    </div>
  );
}
