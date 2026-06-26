import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { NAV_LINKS, BRAND } from "../lib/data";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const isHome = location.pathname === "/";
  const transparent = isHome && !scrolled;

  return (
    <header
      data-testid="navbar"
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        transparent
          ? "bg-transparent border-transparent"
          : "bg-white/85 backdrop-blur-xl border-b border-[#163A2A]/10 shadow-[0_4px_20px_-12px_rgba(22,58,42,0.18)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo light={transparent} />
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              data-testid={`nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={({ isActive }) =>
                `relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                  transparent ? "text-white/90 hover:text-white" : "text-[#1A2521] hover:text-[#163A2A]"
                } ${isActive ? "after:scale-x-100" : "after:scale-x-0"}
                after:absolute after:left-4 after:right-4 after:-bottom-0.5 after:h-[2px] after:origin-left
                after:transition-transform after:duration-300 after:bg-[#E25E3E]`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:+91${BRAND.phone}`}
            data-testid="nav-call-btn"
            className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all border ${
              transparent
                ? "text-white border-white/40 hover:bg-white/15"
                : "text-[#163A2A] border-[#163A2A]/20 hover:bg-[#163A2A] hover:text-white"
            }`}
          >
            <Phone size={14} /> {BRAND.phone}
          </a>
          <Link
            to="/contact"
            data-testid="nav-book-btn"
            className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-full btn-orange"
          >
            Plan My Trip
          </Link>
        </div>

        <button
          aria-label="Menu"
          data-testid="nav-menu-toggle"
          className={`lg:hidden p-2 rounded-md ${transparent ? "text-white" : "text-[#163A2A]"}`}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-[#163A2A]/10 shadow-lg">
          <div className="px-6 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                data-testid={`mobile-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                className={({ isActive }) =>
                  `py-3 px-3 rounded-md text-base font-medium ${
                    isActive ? "bg-[#163A2A] text-white" : "text-[#1A2521] hover:bg-[#F1F2ED]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <a
              href={`tel:+91${BRAND.phone}`}
              data-testid="mobile-nav-call"
              className="mt-2 inline-flex items-center justify-center gap-2 py-3 rounded-full border border-[#163A2A]/20 text-[#163A2A] font-medium"
            >
              <Phone size={16} /> Call +91 {BRAND.phone}
            </a>
            <Link
              to="/contact"
              data-testid="mobile-nav-book"
              className="inline-flex items-center justify-center py-3 rounded-full btn-orange font-semibold"
            >
              Plan My Trip
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
