import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div className={`menu-container ${open ? "open" : ""}`}>
      <div className="menu-header" onClick={() => setOpen(!open)}>
        <span className={`menu-icon ${open ? "open" : ""}`}>
          <i></i>
          <i></i>
          <i></i>
        </span>
        <span className="menu-text">menu</span>
      </div>

      <div className="menu-links">
        <NavLink to="/" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
        <NavLink to="/privacypolicy" onClick={closeMenu}>Privacy Policy</NavLink>
      </div>
    </div>
  );
};

export default Navbar;
