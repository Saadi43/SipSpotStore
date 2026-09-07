import React from 'react';
import { Star, MapPin, ShieldCheck } from 'lucide-react';
import { REVIEWS } from '../data/menuData';

export default function ReviewsSection() {
  return (
    <section className="py-12 bg-white border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-700 font-extrabold text-[10px] uppercase tracking-widest border border-stone-200">
            Rawalpindi & Islamabad Ratings
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 tracking-tight mt-3 mb-2 font-heading">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm font-medium">
            Real customer reviews for The Sip Spot near Nisar Hospital, Westridge 1, Rawalpindi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-stone-50 p-6 rounded-2xl border border-stone-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-1 text-yellow-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 mt-4 border-t border-stone-200">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-9 h-9 rounded-full object-cover border border-stone-300"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-xs font-extrabold text-stone-900 font-heading">{rev.name}</h4>
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[11px] text-stone-500 flex items-center gap-1 font-medium">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    {rev.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
