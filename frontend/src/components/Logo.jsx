import React from "react";
import { Link } from "react-router-dom";

export const Logo = ({ light = false, compact = false }) => {
  return (
    <Link to="/" data-testid="brand-logo" className="flex items-center gap-3 group">
      <span
        className={`inline-flex items-center justify-center rounded-2xl overflow-hidden transition-all ${
          light
            ? "bg-white shadow-lg ring-1 ring-white/30"
            : "bg-white shadow-sm ring-1 ring-[#163A2A]/8"
        }`}
        style={{ width: 56, height: 56 }}
      >
        <img
          src="/logo-happymiles.jpg"
          alt="HappyMilesTours Logo"
          className="w-full h-full object-contain"
          loading="eager"
        />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className="font-serif-display text-xl tracking-tight"
            style={{ color: light ? "#FFFFFF" : "#163A2A", letterSpacing: "-0.01em" }}
          >
            Happy<span style={{ color: "#E25E3E" }}>Miles</span>Tours
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.32em] font-medium mt-1"
            style={{ color: light ? "rgba(255,255,255,0.7)" : "#4A5D54" }}
          >
            Tours &amp; Travel · Siliguri
          </span>
        </span>
      )}
    </Link>
  );
};
