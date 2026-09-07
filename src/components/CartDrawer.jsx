import React, { useState, useEffect } from 'react';
import {
  X,
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

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOrderSuccess,
  selectedOrderType = 'pickup',
  selectedBranch = { name: 'The Sip Spot — Westridge 1' },
  savedDeliveryAddress = ''
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
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

  if (!isOpen) return null;

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
        setIsCheckingOut(false);
        setOrderComplete(false);
        setIsSubmitting(false);
        onClose();
      }, 1500);

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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col justify-between border-l border-amber-200">
          
          {/* Top Header */}
          <div className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-white p-5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-6 h-6" />
              <h2 className="text-xl font-black font-heading tracking-wide uppercase">
                Your Cart
              </h2>
              {cartItems.length > 0 && (
                <span className="w-6 h-6 rounded-full bg-white text-orange-600 font-mono text-xs font-black flex items-center justify-center shadow-xs">
                  {cartItems.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body Scroll */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
            
            {cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-20 h-20 mx-auto rounded-full bg-amber-50 text-amber-500 flex items-center justify-center border border-amber-200">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-lg font-black text-slate-900 font-heading">
                  Your cart is empty!
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Add fresh milkshakes, cold juices & toasted paninis from our menu.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-2xl bg-orange-500 text-white font-black text-xs uppercase tracking-wider shadow-md hover:bg-orange-600 transition-colors"
                >
                  Explore Menu
                </button>
              </div>
            ) : orderComplete ? (
              /* Professional Confirmation Screen */
              <div className="py-16 text-center space-y-4 animate-fadeIn">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-black text-slate-900 font-heading">
                  Order {createdOrderNumber} Confirmed!
                </h3>
                <p className="text-xs text-slate-600 font-medium max-w-xs mx-auto">
                  Thank you for ordering with The Sip Spot! We are now redirecting you to complete your order details.
                </p>
                <div className="pt-2 text-[11px] text-amber-700 font-bold uppercase tracking-wider">
                  Preparing your fresh drinks...
                </div>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form View */
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs space-y-1">
                  <span className="font-extrabold text-orange-600 uppercase">Order Details</span>
                  <p className="text-slate-800 font-bold">
                    {selectedOrderType.toUpperCase()} — {selectedBranch.name}
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-slate-700">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-stone-300 bg-white text-xs font-medium focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black uppercase text-slate-700">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="03XX-XXXXXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-stone-300 bg-white text-xs font-medium focus:border-orange-500 focus:outline-none font-mono"
                  />
                </div>

                {selectedOrderType === 'delivery' && (
                  <div className="space-y-1">
                    <label className="text-xs font-black uppercase text-slate-700">Delivery Address *</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Enter street, house/apartment number..."
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-2xl border border-stone-300 bg-white text-xs font-medium focus:border-orange-500 focus:outline-none"
                    />
                  </div>
                )}

                {/* Rider Note / Special Instructions */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1 text-xs font-black uppercase text-slate-700">
                    <MessageSquare className="w-3.5 h-3.5 text-orange-500" />
                    <span>Note for Rider / Special Instructions</span>
                  </div>
                  <textarea
                    rows={2}
                    placeholder="e.g. Extra napkins, less ice, ring doorbell upon arrival..."
                    value={riderNote}
                    onChange={(e) => setRiderNote(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl border border-stone-300 bg-white text-xs font-medium focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setIsCheckingOut(false)}
                    className="flex-1 py-3 rounded-2xl bg-stone-200 text-slate-800 font-black text-xs uppercase"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-2 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-xs uppercase shadow-md hover:scale-102 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? 'Confirming Order...' : 'Complete Order'}
                  </button>
                </div>
              </form>
            ) : (
              /* Cart Items List with Delete Entire Item Button */
              <div className="space-y-6">
                
                {/* Item Cards */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div
                      key={item.cartId || item.id}
                      className="bg-white rounded-3xl p-4 border border-stone-200/80 shadow-xs flex items-center justify-between gap-3 relative group"
                    >
                      {/* Image Thumbnail */}
                      <div className="w-16 h-16 rounded-2xl bg-amber-50/60 p-1 flex items-center justify-center border border-amber-100 shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      {/* Info & Price */}
                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="text-sm font-black text-slate-900 font-heading truncate">
                          {item.name}
                        </h4>
                        <p className="text-xs font-black text-slate-900 font-mono mt-0.5">
                          Rs. {item.price * item.quantity}
                        </p>
                      </div>

                      {/* Right Side Actions: Quantity Controls + Direct Delete Item Button */}
                      <div className="flex items-center gap-2 shrink-0">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full border border-stone-200">
                          <button
                            onClick={() => onUpdateQuantity(item.cartId || item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded-full bg-white text-slate-700 flex items-center justify-center hover:bg-stone-200 transition-colors shadow-xs"
                            title="Decrease Quantity"
                          >
                            <Minus className="w-3 h-3 stroke-[2.5]" />
                          </button>

                          <span className="w-5 text-center font-black text-xs font-mono text-slate-900">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => onUpdateQuantity(item.cartId || item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded-full bg-white text-orange-600 flex items-center justify-center hover:bg-orange-50 transition-colors shadow-xs"
                            title="Increase Quantity"
                          >
                            <Plus className="w-3 h-3 stroke-[2.5]" />
                          </button>
                        </div>

                        {/* Direct Delete Entire Item Button matching User Request */}
                        <button
                          onClick={() => {
                            playIceClink();
                            onRemoveItem(item.cartId || item.id);
                          }}
                          className="w-8 h-8 rounded-full bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white border border-rose-200 hover:border-rose-500 flex items-center justify-center transition-all duration-200 shadow-xs"
                          title="Remove entire item from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

                {/* Dashed Add More Items Button */}
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-2xl border-2 border-dashed border-teal-400 text-teal-700 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-teal-50/50 transition-colors"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Add More Items</span>
                </button>

                {/* Upsell Cross-sell Carousel */}
                {upsellItems.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-black text-slate-900 font-heading">
                        <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                        <span>Popular with your order</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
                      {upsellItems.map((p) => (
                        <div
                          key={p.id}
                          className="w-32 bg-white rounded-2xl p-2.5 border border-stone-200 shrink-0 flex flex-col justify-between space-y-2 relative shadow-xs"
                        >
                          <div className="w-full h-20 rounded-xl overflow-hidden bg-amber-50">
                            <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                          </div>

                          <div>
                            <h5 className="text-[11px] font-bold text-slate-900 line-clamp-1 leading-tight">
                              {p.name}
                            </h5>
                            <span className="text-xs font-black text-slate-900 font-mono">
                              Rs. {p.price}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              playLiquidSplash();
                              onUpdateQuantity(p.id, 1);
                            }}
                            className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-teal-500 text-white flex items-center justify-center shadow-xs hover:scale-110 transition-transform"
                          >
                            <Plus className="w-3.5 h-3.5 stroke-[3]" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>

          {/* Drawer Footer & Bill Summary */}
          {cartItems.length > 0 && !isCheckingOut && !orderComplete && (
            <div className="p-5 bg-white border-t border-stone-200 space-y-4">
              
              {/* Summary Box */}
              <div className="p-4 rounded-2xl bg-teal-50/40 border border-teal-100 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                  <span>Subtotal</span>
                  <span className="font-bold font-mono text-slate-900">Rs. {subtotal}</span>
                </div>

                {deliveryFee > 0 && (
                  <div className="flex items-center justify-between text-xs text-slate-600 font-medium">
                    <span>Delivery Fee</span>
                    <span className="font-bold font-mono text-slate-900">Rs. {deliveryFee}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-teal-200/60 flex items-center justify-between text-base font-black text-slate-900">
                  <span className="font-heading uppercase">Grand Total</span>
                  <span className="text-teal-700 font-mono">Rs. {grandTotal}</span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-600 text-white font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:scale-102 active:scale-95 transition-all"
              >
                <span>Checkout</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Ready Time Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 font-medium text-center">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                <span>Ready for {selectedOrderType === 'delivery' ? 'Delivery' : 'Pickup'} in ~25 mins at </span>
                <span className="px-2 py-0.5 rounded-full bg-teal-100 text-teal-900 font-extrabold font-mono text-[10px]">
                  {getEstimatedTime()}
                </span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
