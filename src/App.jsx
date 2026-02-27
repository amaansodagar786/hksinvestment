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
import PricingPage from "./Pages/Pricing/PricingPage";
import Career from "./Pages/Career/Career";
import AdminForms from "./Pages/Admin/AdminForms/AdminForms";
import AdminCareer from "./Pages/Admin/AdminCareer/AdminCareer";
import AdminLayout from "./Pages/Admin/AdminLayout/AdminLayout";
import AdminSchedule from "./Pages/Admin/AdminSchedule/AdminSchedule";
import AdminAppointments from "./Pages/Admin/ApproveReject/AdminAppointments";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
// import AdminSchedule from "./Pages/Admin/AdminAppointsments/AdminSchedule";
import SmoothCursor from "./Componenents/Cursor/SmoothCursor"

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <SmoothCursor />
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
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="forms" element={<AdminForms />} />
          <Route path="career" element={<AdminCareer />} />
          <Route path="schedule" element={< AdminSchedule />} />
          <Route path="appointments" element={< AdminAppointments />} />
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