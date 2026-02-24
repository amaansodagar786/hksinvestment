import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './AdminLayout.scss';
import AdminSidebar from '../Sidebar/AdminSidebar';

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="admin-layout">
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className={`admin-content ${collapsed ? 'collapsed' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;