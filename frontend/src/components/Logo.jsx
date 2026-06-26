import React from "react";
import { Link } from "react-router-dom";

export const Logo = ({ light = false, compact = false }) => {
  const dark = light ? "#FFFFFF" : "#163A2A";
  const accent = "#E25E3E";
  return (
    <Link to="/" data-testid="brand-logo" className="flex items-center gap-2 group">
      <span className="relative inline-flex items-center justify-center w-10 h-10 rounded-full" style={{ background: dark }}>
        <span className="absolute inset-[3px] rounded-full border border-white/40" />
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20" aria-hidden="true">
          <path d="M3 18l5-8 4 5 3-4 6 7" stroke={accent} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="17" cy="6" r="2" fill={accent} />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className="font-serif-display text-xl tracking-tight"
            style={{ color: dark, letterSpacing: "-0.01em" }}
          >
            Happy<span style={{ color: accent }}>Miles</span>Tours
          </span>
          <span
            className="text-[10px] uppercase tracking-[0.32em] font-medium mt-0.5"
            style={{ color: light ? "rgba(255,255,255,0.7)" : "#4A5D54" }}
          >
            Siliguri · Since 2024
          </span>
        </span>
      )}
    </Link>
  );
};
