import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Trash2, Phone, Mail, MessageCircle, Search, RefreshCw, Inbox, Calendar, TrendingUp } from "lucide-react";
import { toast, Toaster } from "sonner";
import { listInquiries, deleteInquiry, adminStats } from "../lib/adminApi";
import { useAdminAuth } from "../lib/adminAuth";
import { Logo } from "../components/Logo";

const fmt = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, last_7_days: 0 });
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const { user, logout } = useAdminAuth();
  const nav = useNavigate();

  const refresh = async () => {
    setLoading(true);
    try {
      const [items, s] = await Promise.all([listInquiries(), adminStats()]);
      setInquiries(items);
      setStats(s);
      if (items.length && !selected) setSelected(items[0]);
    } catch (e) {
      toast.error(e?.response?.data?.detail || "Failed to fetch inquiries");
    } finally { setLoading(false); }
  };

  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, []);

  const onLogout = () => { logout(); nav("/admin/login"); };

  const onDelete = async (id) => {
    if (!window.confirm("Delete this inquiry permanently?")) return;
    try {
      await deleteInquiry(id);
      toast.success("Inquiry deleted");
      const next = inquiries.filter((i) => i.id !== id);
      setInquiries(next);
      if (selected?.id === id) setSelected(next[0] || null);
      setStats((s) => ({ ...s, total: Math.max(0, s.total - 1) }));
    } catch (e) { toast.error("Could not delete"); }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return inquiries;
    return inquiries.filter((i) =>
      [i.name, i.email, i.phone, i.interest, i.message].some((v) => v?.toLowerCase().includes(q))
    );
  }, [inquiries, query]);

  return (
    <div data-testid="admin-inquiries-page" className="min-h-screen bg-[#F8F9FA] flex flex-col">
      <Toaster position="top-right" richColors />
      <header className="bg-[#0F2E22] text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <Logo light />
            <span className="hidden md:inline-block text-xs uppercase tracking-[0.32em] text-white/60 pl-5 border-l border-white/15">Admin · Inquiries</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/" data-testid="admin-back-to-site" className="text-sm text-white/80 hover:text-white">View Site</Link>
            <span className="hidden sm:block text-sm text-white/70">{user?.email}</span>
            <button onClick={onLogout} data-testid="admin-logout-btn" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 hover:bg-white/10 text-sm">
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 lg:px-8 py-10">
        {/* Stats */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
          {[
            { label: "Total inquiries", value: stats.total, icon: Inbox, accent: "#163A2A" },
            { label: "Last 7 days", value: stats.last_7_days, icon: TrendingUp, accent: "#E25E3E" },
            { label: "Filtered", value: filtered.length, icon: Calendar, accent: "#1E3A5F" },
          ].map((s) => (
            <div key={s.label} data-testid={`admin-stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`} className="bg-white rounded-2xl p-6 border border-[#163A2A]/8 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#4A5D54]">{s.label}</div>
                <div className="font-serif-display text-4xl mt-2" style={{ color: s.accent }}>{s.value}</div>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: `${s.accent}15`, color: s.accent }}>
                <s.icon size={22} />
              </div>
            </div>
          ))}
        </section>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-xl">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4A5D54]" />
            <input
              data-testid="admin-search"
              placeholder="Search by name, email, phone, message…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#163A2A]/12 focus:outline-none focus:border-[#E25E3E]"
            />
          </div>
          <button data-testid="admin-refresh" onClick={refresh} className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#163A2A] text-white text-sm font-medium hover:bg-[#E25E3E] transition-colors">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>

        {/* List + detail */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white rounded-2xl border border-[#163A2A]/8 overflow-hidden">
            {loading ? (
              <div className="p-12 text-center text-[#4A5D54]">Loading…</div>
            ) : filtered.length === 0 ? (
              <div data-testid="admin-empty" className="p-12 text-center text-[#4A5D54]">
                <Inbox className="mx-auto mb-3" size={28} />
                No inquiries {query ? "match your search." : "yet."}
              </div>
            ) : (
              <ul className="divide-y divide-[#163A2A]/8 max-h-[680px] overflow-y-auto">
                {filtered.map((i) => (
                  <li key={i.id}>
                    <button
                      data-testid={`admin-row-${i.id}`}
                      onClick={() => setSelected(i)}
                      className={`w-full text-left p-5 flex flex-col gap-1 hover:bg-[#F8F9FA] transition-colors ${selected?.id === i.id ? "bg-[#F8F9FA]" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#163A2A]">{i.name}</span>
                        <span className="text-[10px] uppercase tracking-widest text-[#E25E3E] font-semibold">{i.interest}</span>
                      </div>
                      <div className="text-sm text-[#4A5D54] line-clamp-1">{i.message}</div>
                      <div className="text-[11px] text-[#4A5D54] mt-1">{fmt(i.created_at)}</div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-7">
            {selected ? (
              <article data-testid="admin-detail" className="bg-white rounded-2xl border border-[#163A2A]/8 p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.32em] text-[#E25E3E] font-semibold">{selected.interest}</div>
                    <h2 className="font-serif-display text-3xl text-[#163A2A] mt-2">{selected.name}</h2>
                    <div className="text-xs text-[#4A5D54] mt-1">{fmt(selected.created_at)}</div>
                  </div>
                  <button
                    data-testid="admin-delete-btn"
                    onClick={() => onDelete(selected.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>

                <div className="mt-6 grid sm:grid-cols-2 gap-3">
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-3 p-4 rounded-xl bg-[#F8F9FA] hover:bg-[#163A2A] hover:text-white transition-colors group">
                    <Phone size={16} className="text-[#E25E3E]" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#4A5D54] group-hover:text-white/70">Phone</div>
                      <div className="font-medium">{selected.phone}</div>
                    </div>
                  </a>
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-3 p-4 rounded-xl bg-[#F8F9FA] hover:bg-[#163A2A] hover:text-white transition-colors group">
                    <Mail size={16} className="text-[#E25E3E]" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#4A5D54] group-hover:text-white/70">Email</div>
                      <div className="font-medium">{selected.email}</div>
                    </div>
                  </a>
                  <a href={`https://wa.me/91${(selected.phone || '').replace(/\D/g, '').replace(/^91/, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-4 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white transition-colors group sm:col-span-2">
                    <MessageCircle size={16} className="text-[#25D366] group-hover:text-white" />
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#4A5D54] group-hover:text-white/70">Reply on WhatsApp</div>
                      <div className="font-medium text-[#163A2A] group-hover:text-white">Open chat</div>
                    </div>
                  </a>
                </div>

                <div className="mt-8">
                  <div className="text-xs uppercase tracking-widest text-[#4A5D54] font-semibold mb-3">Message</div>
                  <p className="text-[#1A2521] leading-relaxed whitespace-pre-wrap bg-[#F8F9FA] p-5 rounded-xl">{selected.message}</p>
                </div>
              </article>
            ) : (
              <div className="bg-white rounded-2xl border border-[#163A2A]/8 p-12 text-center text-[#4A5D54]">
                Select an inquiry to view details.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
