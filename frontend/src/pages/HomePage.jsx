import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, MapPin, Clock, Mountain, Compass, ShieldCheck, BadgeCheck, ReceiptIndianRupee, Award, Snowflake, Sun, Sparkles } from "lucide-react";
import { DESTINATIONS, PACKAGES, FLEET, TESTIMONIALS, STATS, WHY_US, GALLERY, BRAND } from "../lib/data";

const ICONS = { MapPin, ShieldCheck, BadgeCheck, ReceiptIndianRupee };

const Hero = () => (
  <section data-testid="hero-section" className="relative min-h-[100svh] w-full overflow-hidden">
    <div className="absolute inset-0">
      <img
        src="https://images.pexels.com/photos/12174800/pexels-photo-12174800.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1920"
        alt="Kanchenjunga at sunrise"
        className="w-full h-full object-cover animate-slow-zoom"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F2E22]/85 via-[#0F2E22]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F2E22]/70 via-transparent to-[#0F2E22]/40" />
    </div>

    <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-40 pb-24 min-h-[100svh] flex flex-col justify-center">
      <div className="max-w-3xl">
        <span data-testid="hero-overline" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold animate-fade-up">
          <Sparkles size={14} /> North Bengal · Sikkim · Bhutan border
        </span>
        <h1 className="font-serif-display text-white text-5xl sm:text-6xl lg:text-7xl xl:text-[88px] leading-[0.95] mt-6 animate-fade-up delay-100">
          Where every mile
          <span className="block italic text-[#E25E3E]">turns into a memory.</span>
        </h1>
        <p className="text-white/85 text-lg lg:text-xl mt-7 max-w-2xl leading-relaxed animate-fade-up delay-200">
          Tailor-made tours and chauffeur-driven cars across Darjeeling, Gangtok, Pelling, Lachung & beyond — crafted by a family of Himalayan locals from Siliguri.
        </p>

        <div className="mt-10 flex flex-wrap gap-4 animate-fade-up delay-300">
          <Link to="/packages" data-testid="hero-cta-explore" className="inline-flex items-center gap-2 px-7 py-4 rounded-full btn-orange font-semibold text-base">
            Explore Packages <ArrowRight size={18} />
          </Link>
          <Link to="/contact" data-testid="hero-cta-rent" className="inline-flex items-center gap-2 px-7 py-4 rounded-full btn-ghost-light font-semibold text-base">
            <Compass size={18} /> Rent a Car
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl animate-fade-up delay-500">
          {STATS.map((s) => (
            <div key={s.label} data-testid={`hero-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}>
              <div className="font-serif-display text-3xl lg:text-4xl text-white">{s.value}</div>
              <div className="text-xs uppercase tracking-widest text-white/70 mt-2 leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <a href="#destinations" className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center text-white/70 animate-floaty">
      <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
      <span className="w-px h-12 bg-white/40 mt-2" />
    </a>
  </section>
);

const Destinations = () => (
  <section id="destinations" data-testid="destinations-section" className="py-24 md:py-32 bg-[#F8F9FA] relative">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 reveal">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">Curated Destinations</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-[#163A2A] mt-4 leading-tight">
            Six valleys. <span className="italic">One unforgettable journey.</span>
          </h2>
        </div>
        <p className="text-[#4A5D54] max-w-md">
          Hand-picked corners of North Bengal & Sikkim — from tea-scented Darjeeling mornings to glacial mirrors at 12,400 ft.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-6">
        {DESTINATIONS.map((d, i) => {
          const span =
            i === 0 ? "md:col-span-7 md:row-span-2 md:h-[640px]" :
            i === 1 ? "md:col-span-5 md:h-[310px]" :
            i === 2 ? "md:col-span-5 md:h-[310px]" :
            i === 3 ? "md:col-span-4 md:h-[340px]" :
            i === 4 ? "md:col-span-4 md:h-[340px]" :
                     "md:col-span-4 md:h-[340px]";
          return (
            <Link
              to="/destinations"
              key={d.id}
              data-testid={`destination-card-${d.id}`}
              className={`group relative overflow-hidden rounded-2xl bg-[#163A2A] h-[280px] ${span} reveal`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img src={d.image} alt={d.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
              <div className="absolute inset-0 gradient-scrim" />
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end text-white">
                <span className="text-[10px] uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">{d.region}</span>
                <h3 className={`font-serif-display mt-2 ${i === 0 ? "text-4xl lg:text-5xl" : "text-2xl lg:text-3xl"}`}>{d.name}</h3>
                <p className="text-white/80 mt-2 text-sm max-w-md">{d.tagline}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-white/90 group-hover:text-[#E25E3E] transition-colors">
                  Discover <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

const NorthBengalSikkim = () => (
  <section data-testid="north-bengal-sikkim-section" className="py-24 md:py-32 bg-[#0F2E22] text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
    <div className="absolute -left-32 top-1/4 w-96 h-96 rounded-full bg-[#E25E3E]/10 blur-3xl" />
    <div className="absolute -right-32 bottom-1/4 w-96 h-96 rounded-full bg-[#1E3A5F]/40 blur-3xl" />

    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16">
        <div className="lg:col-span-7 reveal">
          <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold flex items-center gap-2">
            <Mountain size={14} /> Our Backyard
          </p>
          <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl mt-5 leading-[1.02]">
            North Bengal & Sikkim,<br />
            <span className="italic text-[#E25E3E]">from the people who live here.</span>
          </h2>
        </div>
        <div className="lg:col-span-5 text-white/75 leading-relaxed reveal delay-200">
          Between the snowy crown of Kanchenjunga and the green corridors of the Teesta, lies a world few have truly seen. We grew up here. Let us show you our home.
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5">
        {GALLERY.map((src, i) => (
          <div
            key={i}
            data-testid={`gallery-tile-${i}`}
            className={`relative overflow-hidden rounded-2xl group reveal ${i % 3 === 0 ? "row-span-2 h-[420px]" : "h-[200px]"}`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <img src={src} alt={`Himalayan scene ${i + 1}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 reveal">
        <div className="flex items-center gap-6 text-white/80">
          <div className="flex items-center gap-2"><Sun size={16} className="text-[#E25E3E]" /> Spring blooms</div>
          <div className="flex items-center gap-2"><Snowflake size={16} className="text-[#E25E3E]" /> Snow at Zero Point</div>
          <div className="hidden md:flex items-center gap-2"><Award size={16} className="text-[#E25E3E]" /> UNESCO heritage trails</div>
        </div>
        <Link to="/destinations" data-testid="cta-view-all-destinations" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#163A2A] font-semibold hover:bg-[#E25E3E] hover:text-white transition-all">
          View all destinations <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

const Packages = () => (
  <section data-testid="packages-section" className="py-24 md:py-32 bg-[#F8F9FA]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center mb-16 reveal">
        <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">Tour Packages</p>
        <h2 className="font-serif-display text-4xl sm:text-5xl text-[#163A2A] mt-4">Crafted journeys for every traveller</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        {PACKAGES.slice(0, 6).map((p, i) => (
          <article
            key={p.id}
            data-testid={`package-card-${p.id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-[0_8px_30px_-12px_rgba(22,58,42,0.18)] hover:shadow-[0_20px_50px_-12px_rgba(22,58,42,0.28)] hover:-translate-y-1 transition-all duration-500 reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="relative h-56 overflow-hidden">
              <img src={p.cover} alt={p.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms]" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#E25E3E] text-white text-[10px] uppercase tracking-widest font-bold">{p.badge}</span>
              <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/95 text-[#163A2A] text-xs font-semibold">{p.duration}</span>
            </div>
            <div className="p-6">
              <h3 className="font-serif-display text-2xl text-[#163A2A]">{p.name}</h3>
              <ul className="mt-4 space-y-1.5">
                {p.highlights.slice(0, 3).map((h) => (
                  <li key={h} className="text-sm text-[#4A5D54] flex gap-2"><span className="text-[#E25E3E]">•</span> {h}</li>
                ))}
              </ul>
              <div className="mt-6 pt-5 border-t border-[#163A2A]/10 flex items-end justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[#4A5D54]">Starting</div>
                  <div className="font-serif-display text-2xl text-[#1E3A5F]">{p.price}</div>
                  <div className="text-[11px] text-[#4A5D54]">{p.perPerson ? "per person" : "per couple"}</div>
                </div>
                <Link to="/contact" data-testid={`package-cta-${p.id}`} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#1E3A5F] text-white text-sm font-medium hover:bg-[#163A2A] transition-colors">
                  Book <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="text-center mt-14 reveal">
        <Link to="/packages" data-testid="cta-view-all-packages" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[#163A2A] text-[#163A2A] font-semibold hover:bg-[#163A2A] hover:text-white transition-all">
          View all tour packages <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

const WhyUs = () => (
  <section data-testid="why-us-section" className="py-24 md:py-32 bg-white relative">
    <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
      <div className="lg:col-span-5 relative reveal">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
          <img src="https://images.pexels.com/photos/35353704/pexels-photo-35353704.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800" alt="SUV on mountain road" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2E22]/70 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <div className="text-xs uppercase tracking-widest text-[#E25E3E]">Mountain-tested</div>
            <div className="font-serif-display text-2xl mt-1">Trusted by 8,500+ travellers</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 absolute -bottom-8 -right-6 bg-white rounded-2xl shadow-2xl px-6 py-5 border border-[#163A2A]/10">
          <div className="w-12 h-12 rounded-full bg-[#E25E3E]/10 flex items-center justify-center"><Star className="text-[#E25E3E]" /></div>
          <div>
            <div className="font-serif-display text-xl text-[#163A2A]">4.9 / 5</div>
            <div className="text-xs text-[#4A5D54]">Avg. traveller rating</div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="reveal">
          <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">Why HappyMilesTours</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl text-[#163A2A] mt-4 leading-tight">
            Local roots. <span className="italic">Premium standards.</span>
          </h2>
        </div>
        <div className="mt-10 grid sm:grid-cols-2 gap-6">
          {WHY_US.map((w, i) => {
            const Icon = ICONS[w.icon] || MapPin;
            return (
              <div
                key={w.title}
                data-testid={`why-us-${i}`}
                className="p-6 rounded-2xl bg-[#F8F9FA] hover:bg-[#163A2A] hover:text-white transition-all duration-500 group reveal"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-11 h-11 rounded-xl bg-[#E25E3E]/10 group-hover:bg-[#E25E3E] text-[#E25E3E] group-hover:text-white flex items-center justify-center transition-colors">
                  <Icon size={20} />
                </div>
                <h4 className="font-serif-display text-xl mt-5">{w.title}</h4>
                <p className="text-sm mt-2 leading-relaxed text-[#4A5D54] group-hover:text-white/80 transition-colors">{w.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </section>
);

const Fleet = () => (
  <section data-testid="fleet-section" className="py-24 md:py-32 bg-[#1E3A5F] text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-grain opacity-15" />
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 reveal">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">Mountain-ready Fleet</p>
          <h2 className="font-serif-display text-4xl sm:text-5xl mt-4 leading-tight">Pick your ride for the hills</h2>
        </div>
        <p className="max-w-md text-white/75">Newer-model, fully insured vehicles driven by chauffeurs who know every hairpin from Sevoke to Yumthang.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FLEET.map((f, i) => (
          <div
            key={f.name}
            data-testid={`fleet-card-${f.name.toLowerCase().replace(/\s+/g, "-")}`}
            className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl overflow-hidden hover:bg-white/10 hover:-translate-y-1 transition-all duration-500 reveal"
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <div className="h-44 overflow-hidden">
              <img src={f.image} alt={f.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="p-6">
              <div className="text-[10px] uppercase tracking-widest text-[#E25E3E]">{f.ideal}</div>
              <h4 className="font-serif-display text-2xl mt-1">{f.name}</h4>
              <p className="text-white/70 text-sm mt-1">{f.model}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-white/80">
                <span className="flex items-center gap-1.5"><Compass size={12} /> {f.seats}</span>
                <span>{f.luggage}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center reveal">
        <Link to="/contact" data-testid="cta-rent-car" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full btn-orange font-semibold">
          Rent a Car <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section data-testid="testimonials-section" className="py-24 md:py-32 bg-[#F8F9FA]">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="text-center reveal max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">Traveller Stories</p>
        <h2 className="font-serif-display text-4xl sm:text-5xl text-[#163A2A] mt-4">Kindness, on every mile.</h2>
      </div>
      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-7">
        {TESTIMONIALS.map((t, i) => (
          <div
            key={t.name}
            data-testid={`testimonial-${i}`}
            className="p-8 rounded-2xl bg-white border border-[#163A2A]/8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 reveal"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="flex gap-0.5 text-[#E25E3E]">
              {Array.from({ length: t.rating }).map((_, k) => <Star key={k} size={14} fill="#E25E3E" />)}
            </div>
            <p className="mt-5 text-[#1A2521] font-serif-display text-xl leading-snug">"{t.text}"</p>
            <div className="mt-6 pt-5 border-t border-[#163A2A]/10">
              <div className="font-semibold text-[#163A2A]">{t.name}</div>
              <div className="text-xs text-[#4A5D54] mt-0.5">{t.place}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTA = () => (
  <section data-testid="home-cta-section" className="relative py-24 md:py-32 overflow-hidden">
    <img src="https://images.pexels.com/photos/12174800/pexels-photo-12174800.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1920" alt="" className="absolute inset-0 w-full h-full object-cover" />
    <div className="absolute inset-0 bg-[#0F2E22]/85" />
    <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center text-white reveal">
      <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">Ready when you are</p>
      <h2 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl mt-5 leading-tight">
        Your Himalayan story <span className="italic text-[#E25E3E]">starts here.</span>
      </h2>
      <p className="text-white/80 mt-6 max-w-xl mx-auto">
        Tell us where you'd like to go. We'll handle the rest — permits, stays, drivers, even the perfect chai stop.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
        <Link to="/contact" data-testid="home-cta-plan" className="inline-flex items-center gap-2 px-7 py-4 rounded-full btn-orange font-semibold">
          Plan my trip <ArrowRight size={16} />
        </Link>
        <a href={`tel:+91${BRAND.phone}`} data-testid="home-cta-call" className="inline-flex items-center gap-2 px-7 py-4 rounded-full btn-ghost-light font-semibold">
          Call +91 {BRAND.phone}
        </a>
      </div>
    </div>
  </section>
);

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <Hero />
      <Destinations />
      <NorthBengalSikkim />
      <Packages />
      <WhyUs />
      <Fleet />
      <Testimonials />
      <CTA />
    </div>
  );
}
