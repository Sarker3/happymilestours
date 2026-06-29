import React, { useState } from "react";
import axios from "axios";
import { Phone, Mail, MapPin, MessageCircle, Send, Check } from "lucide-react";
import { toast, Toaster } from "sonner";
import { BRAND, PACKAGES } from "../lib/data";

const API = `${process.env.REACT_APP_BACKEND_URL || ""}/api`;

const INTERESTS = ["General Inquiry", "Car Rental", ...PACKAGES.map((p) => p.name)];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "General Inquiry", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.message) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/inquiries`, form);
      setSuccess(true);
      toast.success("Inquiry sent! We'll reach out within a few hours.");
      setForm({ name: "", email: "", phone: "", interest: "General Inquiry", message: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again or call us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <Toaster position="top-right" richColors />
      <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden">
        <img src="https://images.pexels.com/photos/33547415/pexels-photo-33547415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1000&w=1920" alt="" className="absolute inset-0 w-full h-full object-cover animate-slow-zoom" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F2E22]/85 via-[#0F2E22]/65 to-[#0F2E22]/40" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-white">
          <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold animate-fade-up">Get In Touch</p>
          <h1 className="font-serif-display text-5xl sm:text-6xl lg:text-7xl mt-5 max-w-3xl leading-[1] animate-fade-up delay-100">
            Let's plan your <span className="italic">Himalayan story.</span>
          </h1>
          <p className="mt-6 max-w-xl text-white/85 text-lg animate-fade-up delay-200">
            Send us a note or call directly. Our team in Siliguri replies within a few hours.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="reveal">
              <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">Reach Out</p>
              <h2 className="font-serif-display text-4xl text-[#163A2A] mt-3 leading-tight">We're here, every step of the journey.</h2>
            </div>
            {[
              { icon: Phone, title: "Call us", value: `+91 ${BRAND.phone}`, href: `tel:+91${BRAND.phone}`, testid: "contact-card-phone" },
              { icon: MessageCircle, title: "WhatsApp", value: `+91 ${BRAND.phone}`, href: `https://wa.me/${BRAND.whatsapp}`, testid: "contact-card-whatsapp" },
              { icon: Mail, title: "Email", value: BRAND.email, href: `mailto:${BRAND.email}`, testid: "contact-card-email" },
              { icon: MapPin, title: "Office", value: `${BRAND.location} — Gateway to North Bengal & Sikkim`, testid: "contact-card-location" },
            ].map((c, i) => (
              <a
                key={c.title}
                href={c.href || "#"}
                data-testid={c.testid}
                className="flex items-start gap-4 p-6 rounded-2xl bg-white hover:bg-[#163A2A] hover:text-white border border-[#163A2A]/8 transition-all duration-500 reveal group"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#E25E3E]/10 group-hover:bg-[#E25E3E] text-[#E25E3E] group-hover:text-white flex items-center justify-center transition-colors">
                  <c.icon size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-[#4A5D54] group-hover:text-white/70">{c.title}</div>
                  <div className="font-serif-display text-xl text-[#163A2A] group-hover:text-white mt-1">{c.value}</div>
                </div>
              </a>
            ))}
          </div>

          <div className="lg:col-span-7 reveal">
            <form
              onSubmit={onSubmit}
              data-testid="inquiry-form"
              className="bg-white p-8 lg:p-10 rounded-3xl shadow-[0_10px_40px_-12px_rgba(22,58,42,0.2)]"
            >
              <h3 className="font-serif-display text-3xl text-[#163A2A]">Send us an inquiry</h3>
              <p className="text-sm text-[#4A5D54] mt-2">All fields required. We'll get back within a few hours.</p>

              {success && (
                <div data-testid="inquiry-success" className="mt-6 p-4 rounded-xl bg-[#163A2A]/5 border border-[#163A2A]/10 flex items-start gap-3">
                  <Check className="text-[#163A2A] mt-0.5" size={18} />
                  <div className="text-sm text-[#163A2A]">Thanks! Your inquiry is in. We'll reach out shortly.</div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-5 mt-8">
                <Field label="Name" name="name" value={form.name} onChange={onChange} testid="input-name" />
                <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={onChange} testid="input-phone" />
                <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} testid="input-email" className="sm:col-span-2" />
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-[#4A5D54] font-semibold mb-2">I'm interested in</label>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={onChange}
                    data-testid="input-interest"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#163A2A]/15 bg-[#F8F9FA] focus:outline-none focus:border-[#E25E3E] focus:ring-2 focus:ring-[#E25E3E]/20 transition-all"
                  >
                    {INTERESTS.map((opt) => <option key={opt}>{opt}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-[#4A5D54] font-semibold mb-2">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={5}
                    placeholder="Tell us how many travellers, your travel dates, and what kind of experience you're dreaming of..."
                    data-testid="input-message"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#163A2A]/15 bg-[#F8F9FA] focus:outline-none focus:border-[#E25E3E] focus:ring-2 focus:ring-[#E25E3E]/20 transition-all resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                data-testid="inquiry-submit"
                className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full btn-orange font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : (<>Send Inquiry <Send size={16} /></>)}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

const Field = ({ label, className = "", testid, ...props }) => (
  <div className={className}>
    <label className="block text-xs uppercase tracking-widest text-[#4A5D54] font-semibold mb-2">{label}</label>
    <input
      data-testid={testid}
      {...props}
      className="w-full px-4 py-3.5 rounded-xl border border-[#163A2A]/15 bg-[#F8F9FA] focus:outline-none focus:border-[#E25E3E] focus:ring-2 focus:ring-[#E25E3E]/20 transition-all"
    />
  </div>
);
