import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Check, ArrowRight, Clock } from "lucide-react";
import { PACKAGES } from "../lib/data";

const FILTERS = ["All", "Bestseller", "Premium", "Adventure", "Couples"];

export default function PackagesPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PACKAGES : PACKAGES.filter((p) => p.badge === filter);

  return (
    <div data-testid="packages-page">
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <img src="https://images.pexels.com/photos/12174800/pexels-photo-12174800.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1920" alt="" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2E22]/85 via-[#0F2E22]/65 to-[#0F2E22]/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-white">
          <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold animate-fade-up">Tour Packages</p>
          <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl mt-5 max-w-3xl leading-[1] animate-fade-up delay-100">
            Crafted journeys for <span className="italic">every traveller.</span>
          </h1>
          <p className="mt-6 max-w-xl text-white/85 text-lg animate-fade-up delay-200">
            Ready-to-book itineraries across North Bengal & Sikkim. Each tour includes transport, stays, permits and 24/7 trip support.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white border-b border-[#163A2A]/10 sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-wrap gap-3">
          {FILTERS.map((f) => (
            <button
              key={f}
              data-testid={`filter-${f.toLowerCase()}`}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? "bg-[#163A2A] text-white shadow-md"
                  : "bg-[#F8F9FA] text-[#1A2521] hover:bg-[#163A2A] hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-10">
          {filtered.map((p, i) => (
            <article
              key={p.id}
              data-testid={`pkg-${p.id}`}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_-12px_rgba(22,58,42,0.18)] hover:shadow-[0_20px_60px_-12px_rgba(22,58,42,0.3)] transition-shadow duration-500 reveal ${
                i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="lg:col-span-5 relative min-h-[280px]">
                <img src={p.cover} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-[#E25E3E] text-white text-[10px] uppercase tracking-widest font-bold">{p.badge}</span>
              </div>
              <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#4A5D54] uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {p.duration}</span>
                  </div>
                  <h2 className="font-serif-display text-3xl sm:text-4xl text-[#163A2A] mt-3">{p.name}</h2>

                  <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[#E25E3E] font-semibold mb-2">Highlights</div>
                      <ul className="space-y-1.5 text-sm text-[#1A2521]">
                        {p.highlights.map((h) => (
                          <li key={h} className="flex gap-2"><Check size={14} className="text-[#163A2A] mt-1 flex-shrink-0" /> {h}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-[#E25E3E] font-semibold mb-2">Includes</div>
                      <ul className="space-y-1.5 text-sm text-[#1A2521]">
                        {p.includes.map((h) => (
                          <li key={h} className="flex gap-2"><Check size={14} className="text-[#163A2A] mt-1 flex-shrink-0" /> {h}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#163A2A]/10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-[#4A5D54]">Pricing</div>
                    <div className="font-serif-display text-3xl text-[#1E3A5F]">{p.price}</div>
                    <div className="text-xs text-[#4A5D54]">Tailored to your dates, group size & stay preferences</div>
                  </div>
                  <Link to="/contact" data-testid={`pkg-cta-${p.id}`} className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full btn-orange font-semibold">
                    Book this tour <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
