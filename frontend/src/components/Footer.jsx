import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { BRAND, NAV_LINKS, PACKAGES } from "../lib/data";

export const Footer = () => {
  return (
    <footer data-testid="footer" className="bg-[#0F2E22] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Logo light />
            <p className="mt-6 text-white/70 max-w-md leading-relaxed">
              Hand-crafted journeys across North Bengal & Sikkim. Born in the foothills of the Himalayas, we drive you to the places we love most.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <a href={`tel:+91${BRAND.phone}`} data-testid="footer-phone" className="flex items-center gap-3 text-white/85 hover:text-[#E25E3E] transition-colors">
                <Phone size={16} className="text-[#E25E3E]" /> +91 {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} data-testid="footer-email" className="flex items-center gap-3 text-white/85 hover:text-[#E25E3E] transition-colors">
                <Mail size={16} className="text-[#E25E3E]" /> {BRAND.email}
              </a>
              <div className="flex items-center gap-3 text-white/85">
                <MapPin size={16} className="text-[#E25E3E]" /> {BRAND.location}
              </div>
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="font-serif-display text-lg mb-5">Explore</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.path}>
                  <Link
                    to={l.path}
                    data-testid={`footer-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/75 hover:text-[#E25E3E] transition-colors text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="font-serif-display text-lg mb-5">Popular Tours</h4>
            <ul className="space-y-3">
              {PACKAGES.slice(0, 4).map((p) => (
                <li key={p.id}>
                  <Link
                    to="/packages"
                    className="text-white/75 hover:text-[#E25E3E] transition-colors text-sm flex items-center justify-between gap-4"
                  >
                    <span>{p.name}</span>
                    <span className="text-[#E25E3E]/80 text-xs">{p.duration}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 mt-8">
              <a href="#" aria-label="Instagram" className="p-2.5 rounded-full bg-white/10 hover:bg-[#E25E3E] transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="p-2.5 rounded-full bg-white/10 hover:bg-[#E25E3E] transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" aria-label="YouTube" className="p-2.5 rounded-full bg-white/10 hover:bg-[#E25E3E] transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/55">© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
          <p className="text-xs text-white/55">Crafted with care in the foothills of Kanchenjunga.</p>
        </div>
      </div>
    </footer>
  );
};
