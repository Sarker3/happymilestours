import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart, Mountain, Users, Award } from "lucide-react";
import { STATS, BRAND } from "../lib/data";

export default function AboutPage() {
  return (
    <div data-testid="about-page">
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <img src="https://images.pexels.com/photos/35151733/pexels-photo-35151733.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1920" alt="" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2E22]/85 via-[#0F2E22]/65 to-[#0F2E22]/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-white">
          <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold animate-fade-up">About Us</p>
          <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl mt-5 max-w-3xl leading-[1] animate-fade-up delay-100">
            Born in Siliguri.<br /><span className="italic">Made for the mountains.</span>
          </h1>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          <div className="lg:col-span-7 reveal">
            <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">Our Story</p>
            <h2 className="font-serif-display text-4xl sm:text-5xl text-[#163A2A] mt-4 leading-tight">A family of mountain people, on a mission.</h2>
            <div className="mt-6 space-y-5 text-[#4A5D54] leading-relaxed">
              <p>HappyMilesTours was born from the simple belief that the Himalayas deserve more than a hurried itinerary. We grew up here — drinking sunrise chai at Tiger Hill, riding through Teesta gorges, and watching prayer flags flutter at 12,000 feet.</p>
              <p>From our base in Siliguri — the gateway to North Bengal & Sikkim — we craft every trip with the care of a friend hosting you in their own backyard. Our drivers are family. Our partner hotels are vetted. Our pace is yours.</p>
              <p>Whether you're a solo traveller chasing Kanchenjunga, a couple on a quiet honeymoon, or a 12-person group on a corporate retreat — we'll match you with the perfect car, the perfect route, and the perfect chai stop.</p>
            </div>
          </div>
          <div className="lg:col-span-5 reveal delay-200">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <img src="https://images.pexels.com/photos/37494566/pexels-photo-37494566.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=800" alt="Sikkim monastery" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-x-6 bottom-6 p-6 rounded-2xl bg-white/95 backdrop-blur-md">
                <Heart className="text-[#E25E3E]" />
                <div className="mt-3 font-serif-display text-xl text-[#163A2A]">"Travel slow. Travel kind."</div>
                <div className="text-xs text-[#4A5D54] mt-1">— Our team motto</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#163A2A] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {STATS.map((s, i) => (
            <div key={s.label} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="font-serif-display text-5xl lg:text-6xl text-[#E25E3E]">{s.value}</div>
              <div className="text-xs uppercase tracking-widest text-white/75 mt-3">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto reveal">
            <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">What we stand for</p>
            <h2 className="font-serif-display text-4xl sm:text-5xl text-[#163A2A] mt-4">Three promises, every trip.</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              { icon: Mountain, title: "Authentic", text: "No tourist traps. Just the real mountains, real food, real warmth." },
              { icon: Users, title: "People-first", text: "We pay our drivers and partners fairly, and we treat you like family." },
              { icon: Award, title: "Reliable", text: "Newer cars, vetted stays, real-time support — every kilometre of the way." },
            ].map((v, i) => (
              <div
                key={v.title}
                className="p-8 rounded-2xl bg-[#F8F9FA] hover:bg-[#163A2A] hover:text-white transition-all duration-500 group reveal"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#E25E3E]/10 group-hover:bg-[#E25E3E] flex items-center justify-center text-[#E25E3E] group-hover:text-white transition-colors">
                  <v.icon size={22} />
                </div>
                <h3 className="font-serif-display text-2xl mt-5">{v.title}</h3>
                <p className="text-sm mt-2 text-[#4A5D54] group-hover:text-white/80 leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center reveal">
            <Link to="/contact" data-testid="about-cta-contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full btn-orange font-semibold">
              Start planning with us <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
