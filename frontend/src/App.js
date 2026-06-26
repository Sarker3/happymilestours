import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import HomePage from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";
import PackagesPage from "./pages/PackagesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminInquiriesPage from "./pages/AdminInquiriesPage";
import { AdminAuthProvider, ProtectedAdminRoute } from "./lib/adminAuth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AdminAuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/packages" element={<PackagesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route
              path="/admin/inquiries"
              element={
                <ProtectedAdminRoute>
                  <AdminInquiriesPage />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
        </AdminAuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
