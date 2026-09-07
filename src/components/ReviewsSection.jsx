import React from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '../data/menuData';

export default function ReviewsSection() {
  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="badge-pill bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
          ⭐ CUSTOMER LOVE
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          WHAT <span className="gradient-text-sun">RAWALPINDI</span> SAYS
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((review) => (
          <div
            key={review.id}
            className="p-6 rounded-3xl glass-panel border border-slate-800 hover:border-amber-400/40 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic">
                "{review.comment}"
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover border border-amber-400/40"
              />
              <div>
                <h4 className="text-sm font-bold text-white">{review.name}</h4>
                <p className="text-[11px] text-slate-400">{review.location}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
