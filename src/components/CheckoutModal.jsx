import React, { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, MapPin, Phone, User, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';
import { STORE_INFO } from '../data/menuData';
import { playSuccessChime, playIceClink } from '../audio/summerSounds';

export default function CheckoutModal({ isOpen, onClose, cartItems, onClearCart }) {
  if (!isOpen) return null;

  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: 'Lane 5 Near Nisar Hospital, Rawalpindi',
    paymentMethod: 'cod',
    notes: ''
  });

  const totalAmount = cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    playSuccessChime();

    // Trigger colorful summer confetti explosion!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF9900', '#00E676', '#00E5FF', '#FF3366', '#FFD700']
    });

    setStep('success');
  };

  const handleFinish = () => {
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg glass-panel rounded-3xl overflow-hidden shadow-2xl border border-slate-700/80 p-6 sm:p-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'form' ? (
          <div>
            <div className="mb-6">
              <span className="badge-pill bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] mb-2">
                🔒 FAST & SECURE CHECKOUT
              </span>
              <h2 className="text-2xl font-black text-white">COMPLETE YOUR ORDER</h2>
              <p className="text-xs text-slate-400">
                Fresh preparation begins as soon as you confirm.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-300 mb-1">
                  FULL NAME
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Usman Khan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-300 mb-1">
                  PHONE NUMBER (FOR DELIVERY CALL)
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="0315-9320765"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-300 mb-1">
                  DELIVERY ADDRESS (RAWALPINDI / ISLAMABAD)
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Street, House No, Sector/Area"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-panel text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold uppercase text-slate-300 mb-2">
                  PAYMENT METHOD
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      playIceClink();
                      setFormData({ ...formData, paymentMethod: 'cod' });
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                      formData.paymentMethod === 'cod'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    💵 Cash on Delivery
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playIceClink();
                      setFormData({ ...formData, paymentMethod: 'easypaisa' });
                    }}
                    className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 ${
                      formData.paymentMethod === 'easypaisa'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    📱 JazzCash / EasyPaisa
                  </button>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-sm shadow-xl shadow-orange-500/25 hover:brightness-110 active:scale-95 transition-all"
                >
                  PLACE ORDER • Rs. {totalAmount}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">ORDER CONFIRMED!</h2>
            <p className="text-xs text-slate-300 max-w-sm mx-auto mb-6">
              Thank you <strong className="text-amber-400">{formData.name}</strong>! Your freshly prepared juices/smoothies are now being handcrafted at{' '}
              <strong>The Sip Spot</strong>. Our delivery driver will contact you at{' '}
              <span className="text-emerald-400 font-bold">{formData.phone}</span>.
            </p>

            <div className="p-4 rounded-2xl glass-panel text-left text-xs space-y-1 mb-6 border border-slate-800">
              <div className="flex justify-between font-bold text-white">
                <span>Order Status:</span>
                <span className="text-emerald-400">🟢 Preparing Fresh</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Estimated Time:</span>
                <span>20-30 Mins</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Total Paid:</span>
                <span className="text-amber-400 font-bold">Rs. {totalAmount}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="w-full py-3 rounded-xl bg-amber-500 text-slate-950 font-black text-xs"
            >
              Back to Home
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
