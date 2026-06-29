import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";

const NotFoundPage = () => (
  <section className="min-h-[70vh] bg-[#F8F9FA] pt-36 pb-20">
    <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
      <p className="text-xs uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">Page not found</p>
      <h1 className="font-serif-display text-4xl sm:text-5xl text-[#163A2A] mt-5 leading-tight">
        This trip route is not on the map.
      </h1>
      <p className="text-[#4A5D54] text-lg mt-5 leading-relaxed">
        The page may have moved, or the address may be mistyped. Start from the homepage or explore the current tour packages.
      </p>
      <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full btn-orange font-semibold"
        >
          <Home size={18} /> Go home
        </Link>
        <Link
          to="/packages"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-[#163A2A] text-[#163A2A] font-semibold hover:bg-[#163A2A] hover:text-white transition-all"
        >
          View packages <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  </section>
);

export default NotFoundPage;
