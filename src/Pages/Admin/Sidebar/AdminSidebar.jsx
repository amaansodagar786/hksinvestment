import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiMail, FiBriefcase, FiLogOut, FiMenu, FiChevronLeft } from 'react-icons/fi';
import './AdminSidebar.scss';

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/admin/login';
  };

  return (
    <motion.div 
      className={`admin-sidebar ${collapsed ? 'collapsed' : ''}`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sidebar-header">
        {!collapsed && <h2>Admin</h2>}
        <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <FiMenu /> : <FiChevronLeft />}
        </button>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FiHome className="nav-icon" />
          {!collapsed && <span>Dashboard</span>}
        </NavLink>

        <NavLink to="/admin/forms" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FiMail className="nav-icon" />
          {!collapsed && <span>Forms</span>}
        </NavLink>

        <NavLink to="/admin/career" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FiBriefcase className="nav-icon" />
          {!collapsed && <span>Career</span>}
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-btn">
          <FiLogOut className="nav-icon" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default AdminSidebar;