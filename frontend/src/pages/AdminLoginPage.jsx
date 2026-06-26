import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Lock, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { toast, Toaster } from "sonner";
import { login } from "../lib/adminApi";
import { useAdminAuth } from "../lib/adminAuth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const { setUser } = useAdminAuth();
  const from = location.state?.from?.pathname || "/admin/inquiries";

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }
    setLoading(true);
    try {
      const user = await login(email.trim(), password);
      setUser(user);
      toast.success("Welcome back, " + user.name);
      nav(from, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="admin-login-page" className="min-h-screen flex items-center justify-center bg-[#0F2E22] relative overflow-hidden p-6">
      <Toaster position="top-right" richColors />
      <img src="https://images.pexels.com/photos/12174800/pexels-photo-12174800.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1920" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F2E22]/95 via-[#0F2E22]/85 to-[#163A2A]/95" />

      <div className="relative w-full max-w-md">
        <Link to="/" data-testid="admin-back-home" className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6">
          <ArrowLeft size={14} /> Back to site
        </Link>
        <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl">
          <div className="flex items-center gap-3 mb-1">
            <span className="w-10 h-10 rounded-full bg-[#163A2A] text-white flex items-center justify-center">
              <Lock size={18} />
            </span>
            <div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">HappyMilesTours</div>
              <div className="font-serif-display text-2xl text-[#163A2A] leading-none mt-1">Admin Sign-in</div>
            </div>
          </div>
          <p className="text-sm text-[#4A5D54] mt-4">Access your inquiries dashboard.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5" data-testid="admin-login-form">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#4A5D54] font-semibold mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5D54]" />
                <input
                  data-testid="admin-input-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#163A2A]/15 bg-[#F8F9FA] focus:outline-none focus:border-[#E25E3E] focus:ring-2 focus:ring-[#E25E3E]/20"
                  placeholder="admin@happymilestours.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#4A5D54] font-semibold mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5D54]" />
                <input
                  data-testid="admin-input-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-[#163A2A]/15 bg-[#F8F9FA] focus:outline-none focus:border-[#E25E3E] focus:ring-2 focus:ring-[#E25E3E]/20"
                  placeholder="••••••••••"
                />
              </div>
            </div>
            <button
              type="submit"
              data-testid="admin-login-submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full btn-orange font-semibold disabled:opacity-60"
            >
              {loading ? "Signing in…" : (<>Sign in <ArrowRight size={16} /></>)}
            </button>
          </form>

          <p className="mt-6 text-xs text-[#4A5D54] text-center">
            Protected area · Only authorised staff. Contact owner to reset access.
          </p>
        </div>
      </div>
    </div>
  );
}
