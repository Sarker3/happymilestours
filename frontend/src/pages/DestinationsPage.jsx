import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { DESTINATIONS } from "../lib/data";

const PageHeader = ({ overline, title, subtitle, image }) => (
  <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
    <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />
    <div className="absolute inset-0 bg-gradient-to-r from-[#0F2E22]/85 via-[#0F2E22]/65 to-[#0F2E22]/40" />
    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-white">
      <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold animate-fade-up">{overline}</p>
      <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl mt-5 max-w-3xl leading-[1] animate-fade-up delay-100">{title}</h1>
      <p className="mt-6 max-w-xl text-white/85 text-lg animate-fade-up delay-200">{subtitle}</p>
    </div>
  </section>
);

export default function DestinationsPage() {
  return (
    <div data-testid="destinations-page">
      <PageHeader
        overline="Destinations"
        title="The Himalayas, in six unforgettable chapters."
        subtitle="From Darjeeling's tea-scented slopes to Lachung's snowy meadows — handpicked corners of North Bengal & Sikkim."
        image="https://images.pexels.com/photos/14916663/pexels-photo-14916663.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1920"
      />

      <section className="py-20 md:py-28 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-24">
          {DESTINATIONS.map((d, i) => (
            <div
              key={d.id}
              data-testid={`destination-detail-${d.id}`}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center reveal ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="lg:col-span-7">
                <div className="relative aspect-[16/11] rounded-3xl overflow-hidden">
                  <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]" />
                  <span className="absolute top-5 left-5 px-3 py-1 rounded-full bg-white/90 text-[#163A2A] text-xs font-semibold flex items-center gap-1.5">
                    <MapPin size={12} /> {d.region}
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5">
                <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">{d.tagline}</p>
                <h2 className="font-serif-display text-4xl sm:text-5xl text-[#163A2A] mt-4 leading-tight">{d.name}</h2>
                <p className="mt-5 text-[#4A5D54] leading-relaxed">{d.description}</p>
                <div className="mt-7">
                  <div className="text-xs uppercase tracking-widest text-[#4A5D54] mb-3">Top experiences</div>
                  <ul className="space-y-2">
                    {d.highlights.map((h) => (
                      <li key={h} className="text-[#1A2521] flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E25E3E]" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link to="/packages" data-testid={`destination-cta-${d.id}`} className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#163A2A] text-white font-semibold hover:bg-[#E25E3E] transition-colors">
                  See tours in {d.name.split(" ")[0]} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
