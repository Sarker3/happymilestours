import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions } from "./FloatingActions";

export const Layout = () => {
  const location = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [location.pathname]);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] text-[#1A2521]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
};
