import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./Componenents/GoToTop/ScrollToTop";
import Home from "./Pages/Home/Home";
import Navbar from "./Componenents/Navbar/Navbar";
import Footer from "./Componenents/Footer/Footer";
import Contact from "./Pages/Contact/Contact";
import Privacy from "./Pages/Privacy/Privacy";
import AdminAuth from "./Pages/Admin/AdminAuth/AdminAuth";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";
import PricingPage from "./Pages/Pricing/PricingPage";
import Career from "./Pages/Career/Career";
import AdminForms from "./Pages/Admin/AdminForms/AdminForms";
import AdminCareer from "./Pages/Admin/AdminCareer/AdminCareer";
import AdminLayout from "./Pages/Admin/AdminLayout/AdminLayout";

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <ScrollToTop />
      {!isAdminRoute && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacypolicy" element={<Privacy />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/career" element={<Career />} />

        <Route path="/admin/login" element={<AdminAuth />} />
        
        {/* Admin routes with layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="forms" element={<AdminForms />} />
          <Route path="career" element={<AdminCareer />} />
        </Route>
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;