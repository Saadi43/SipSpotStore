import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Phone, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { playIceClink } from '../audio/summerSounds';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim()) return;

    playIceClink();
    setIsSubmitted(true);
    setTimeout(() => {
      if (onLoginSuccess) {
        onLoginSuccess({ name: name || 'Customer', phone });
      }
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 p-6 text-slate-950 text-center relative flex flex-col items-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-950/15 hover:bg-slate-950/25 text-slate-950 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 rounded-full bg-slate-950/10 text-slate-950 flex items-center justify-center mb-2">
            <User className="w-6 h-6 stroke-[2.5]" />
          </div>

          <h2 className="text-xl font-black font-heading uppercase tracking-wide text-slate-950">
            Customer Login
          </h2>
          <p className="text-xs font-bold text-slate-900 mt-0.5">
            Sign in to track orders & save address
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3 animate-fadeIn">
              <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto animate-bounce" />
              <h3 className="text-xl font-black text-slate-950 font-heading">Welcome, {name || 'Customer'}!</h3>
              <p className="text-xs font-bold text-slate-600">Logged in successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-950">
                  Full Name (Optional)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-stone-300 text-xs font-bold text-slate-950 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black uppercase tracking-wider text-slate-950">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="03XX-XXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl border-2 border-stone-300 text-xs font-bold font-mono text-slate-950 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-amber-400/30 hover:scale-102 transition-all mt-2"
              >
                <span>Login / Continue</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
