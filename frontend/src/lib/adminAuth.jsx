import React, { useEffect, useState, createContext, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { me, clearToken, getToken } from "./adminApi";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (!getToken()) { setLoading(false); return; }
      try {
        const u = await me();
        setUser(u);
      } catch {
        clearToken();
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ user, setUser, loading, logout: () => { clearToken(); setUser(null); } }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);

export const ProtectedAdminRoute = ({ children }) => {
  const ctx = useAdminAuth();
  const location = useLocation();
  if (!ctx || ctx.loading) {
    return (
      <div data-testid="admin-loading" className="min-h-screen flex items-center justify-center bg-[#0F2E22] text-white">
        <div className="font-serif-display text-2xl">Loading…</div>
      </div>
    );
  }
  if (!ctx.user) return <Navigate to="/admin/login" state={{ from: location }} replace />;
  return children;
};
