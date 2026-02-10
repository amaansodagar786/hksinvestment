import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import ScrollToTop from "./Componenents/GoToTop/ScrollToTop";
import Home from "./Pages/Home/Home";
import Navbar from "./Componenents/Navbar/Navbar";
import Footer from "./Componenents/Footer/Footer";
import Contact from "./Pages/Contact/Contact";
import Privacy from "./Pages/Privacy/Privacy";
import AdminAuth from "./Pages/Admin/AdminAuth/AdminAuth";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";

function App() {

  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacypolicy" element={<Privacy />} />



        <Route path="/admin/login" element={<AdminAuth />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />



      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
