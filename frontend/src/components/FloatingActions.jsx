import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { BRAND } from "../lib/data";

export const FloatingActions = () => {
  const waMessage = encodeURIComponent("Hi HappyMilesTours! I'd like to know more about your North Bengal & Sikkim packages.");
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={`https://wa.me/${BRAND.whatsapp}?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-floating-button"
        aria-label="Chat on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl animate-pulse-ring hover:scale-110 transition-transform"
      >
        <MessageCircle size={26} />
      </a>
      <a
        href={`tel:+91${BRAND.phone}`}
        data-testid="call-floating-button"
        aria-label="Call us"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-[#E25E3E] text-white shadow-2xl hover:scale-110 transition-transform"
      >
        <Phone size={22} />
      </a>
    </div>
  );
};
