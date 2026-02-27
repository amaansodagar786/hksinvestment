import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FiCalendar,
    FiMail,
    FiBriefcase,
    FiUsers,
    FiClock,
    FiCheckCircle,
    FiXCircle,
    FiAlertCircle,
    FiTrendingUp,
    FiDownload,
    FiRefreshCw,
    FiEye,
    FiPhone,
    FiUser,
    FiMessageSquare,
    FiPieChart,
    FiBarChart2
} from 'react-icons/fi';
import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line
} from 'recharts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx';
import './Dashboard.scss';

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [selectedType, setSelectedType] = useState(null);
    const [detailsData, setDetailsData] = useState([]);
    const [loadingDetails, setLoadingDetails] = useState(false);

    const COLORS = {
        pending: '#f59e0b',
        approved: '#10b981',
        rejected: '#ef4444',
        contacted: '#3b82f6',
        resolved: '#8b5cf6',
        reviewed: '#6366f1',
        hired: '#059669'
    };

    // Fetch all stats on component mount
    useEffect(() => {
        fetchDashboardStats();
    }, []);

    // Fetch details when tab changes
    useEffect(() => {
        if (activeTab !== 'overview') {
            fetchDetails(activeTab);
        }
    }, [activeTab]);

    const fetchDashboardStats = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');

            const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/stats`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (data.success) {
                setStats(data.data);
            } else {
                toast.error('Failed to load dashboard stats');
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
            toast.error('Error loading dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const fetchDetails = async (type) => {
        try {
            setLoadingDetails(true);
            const token = localStorage.getItem('adminToken');

            const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/${type}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (data.success) {
                setDetailsData(data.data);
            }
        } catch (error) {
            console.error('Error fetching details:', error);
            toast.error(`Failed to load ${type} details`);
        } finally {
            setLoadingDetails(false);
        }
    };

    const updateStatus = async (type, id, newStatus) => {
        try {
            const token = localStorage.getItem('adminToken');

            const response = await fetch(`${import.meta.env.VITE_API_URL}/dashboard/${type}/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Status updated successfully!');
                // Refresh data
                fetchDashboardStats();
                if (activeTab !== 'overview') {
                    fetchDetails(activeTab);
                }
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Error updating status');
        }
    };

    const exportToExcel = () => {
        try {
            // Prepare data based on active tab
            let exportData = [];
            let fileName = '';

            if (activeTab === 'overview') {
                // Export overview stats
                const overviewData = [
                    ['Section', 'Metric', 'Value'],
                    ['Appointments', 'Total', stats?.appointments?.total || 0],
                    ['Appointments', 'Today', stats?.appointments?.today || 0],
                    ['Appointments', 'This Week', stats?.appointments?.thisWeek || 0],
                    ['Appointments', 'Pending', stats?.appointments?.byStatus?.pending || 0],
                    ['Appointments', 'Approved', stats?.appointments?.byStatus?.approved || 0],
                    ['Appointments', 'Rejected', stats?.appointments?.byStatus?.rejected || 0],
                    [],
                    ['Contacts', 'Total', stats?.contacts?.total || 0],
                    ['Contacts', 'Pending', stats?.contacts?.byStatus?.pending || 0],
                    ['Contacts', 'Contacted', stats?.contacts?.byStatus?.contacted || 0],
                    ['Contacts', 'Resolved', stats?.contacts?.byStatus?.resolved || 0],
                    [],
                    ['Careers', 'Total', stats?.careers?.total || 0],
                    ['Careers', 'LLQP Yes', stats?.careers?.llqpStats?.yes || 0],
                    ['Careers', 'LLQP No', stats?.careers?.llqpStats?.no || 0],
                    ...Object.entries(stats?.careers?.byStatus || {}).map(([status, count]) => ['Careers', status, count]),
                    [],
                    ['Service Inquiries', 'Total', stats?.serviceInquiries?.total || 0],
                    ['Service Inquiries', 'Pending', stats?.serviceInquiries?.byStatus?.pending || 0],
                    ['Service Inquiries', 'Contacted', stats?.serviceInquiries?.byStatus?.contacted || 0],
                    ['Service Inquiries', 'Resolved', stats?.serviceInquiries?.byStatus?.resolved || 0],
                    [],
                    ['General Inquiries', ...(stats?.generalInquiries?.byReason || []).map(item => [item._id, `Total: ${item.count}`, `Pending: ${item.pending}`, `Contacted: ${item.contacted}`, `Resolved: ${item.resolved}`]).flat()]
                ];
                exportData = overviewData;
                fileName = `dashboard-overview-${new Date().toISOString().split('T')[0]}.xlsx`;
            } else {
                // Export detailed data
                const headers = Object.keys(detailsData[0] || {}).filter(key => key !== '_id' && key !== '__v');
                const rows = detailsData.map(item => headers.map(header => {
                    if (header === 'createdAt' || header === 'updatedAt' || header === 'reviewedAt') {
                        return item[header] ? new Date(item[header]).toLocaleString() : 'N/A';
                    }
                    return item[header] || 'N/A';
                }));
                exportData = [headers, ...rows];
                fileName = `${activeTab}-${new Date().toISOString().split('T')[0]}.xlsx`;
            }

            // Create workbook and worksheet
            const worksheet = XLSX.utils.aoa_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

            // Download file
            XLSX.writeFile(workbook, fileName);
            toast.success('Excel file downloaded successfully!');
        } catch (error) {
            console.error('Error exporting to Excel:', error);
            toast.error('Failed to export data');
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <FiRefreshCw className="spinner" />
                <p>Loading dashboard...</p>
            </div>
        );
    }

    return (
        <>
            <ToastContainer position="top-right" theme="colored" />
            <motion.div
                className="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className="dashboard-header">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* <span className="dashboard-pill">Admin Panel</span> */}
                        <h1>Dashboard <span>Overview</span></h1>
                        <p>Welcome back! Here's your complete overview.</p>
                    </motion.div>
                    <div className="header-actions">
                        <motion.button
                            className="refresh-btn"
                            onClick={fetchDashboardStats}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiRefreshCw className={loading ? 'spinner' : ''} /> Refresh
                        </motion.button>
                        <motion.button
                            className="export-btn"
                            onClick={exportToExcel}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiDownload /> Export Excel
                        </motion.button>
                    </div>
                </div>

                {/* Quick Stats Cards */}
                <div className="stats-grid">
                    <motion.div
                        className="stat-card appointments"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="stat-icon">
                            <FiCalendar />
                        </div>
                        <div className="stat-content">
                            <h3>Appointments</h3>
                            <div className="stat-numbers">
                                <span className="total">{stats?.quickStats?.appointments?.total || 0}</span>
                                <span className="badge pending">
                                    {stats?.quickStats?.appointments?.pending || 0} pending
                                </span>
                            </div>
                            <div className="stat-footer">
                                <FiClock /> {stats?.appointments?.today || 0} today
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card contacts"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="stat-icon">
                            <FiMail />
                        </div>
                        <div className="stat-content">
                            <h3>Contacts</h3>
                            <div className="stat-numbers">
                                <span className="total">{stats?.quickStats?.contacts?.total || 0}</span>
                                <span className="badge pending">
                                    {stats?.quickStats?.contacts?.pending || 0} pending
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card careers"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="stat-icon">
                            <FiBriefcase />
                        </div>
                        <div className="stat-content">
                            <h3>Careers</h3>
                            <div className="stat-numbers">
                                <span className="total">{stats?.quickStats?.careers?.total || 0}</span>
                                <span className="badge pending">
                                    {stats?.quickStats?.careers?.pending || 0} pending
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="stat-card inquiries"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ y: -5 }}
                    >
                        <div className="stat-icon">
                            <FiUsers />
                        </div>
                        <div className="stat-content">
                            <h3>Inquiries</h3>
                            <div className="stat-numbers">
                                <span className="total">{stats?.quickStats?.inquiries?.total || 0}</span>
                                <span className="badge pending">
                                    {stats?.quickStats?.inquiries?.pending || 0} pending
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Tabs Navigation */}
                <div className="dashboard-tabs">
                    <motion.button
                        className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                        onClick={() => setActiveTab('overview')}
                        whileHover={{ y: -2 }}
                    >
                        <FiPieChart /> Overview
                    </motion.button>
                    <motion.button
                        className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
                        onClick={() => setActiveTab('appointments')}
                        whileHover={{ y: -2 }}
                    >
                        <FiCalendar /> Appointments
                    </motion.button>
                    <motion.button
                        className={`tab-btn ${activeTab === 'contacts' ? 'active' : ''}`}
                        onClick={() => setActiveTab('contacts')}
                        whileHover={{ y: -2 }}
                    >
                        <FiMail /> Contacts
                    </motion.button>
                    <motion.button
                        className={`tab-btn ${activeTab === 'careers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('careers')}
                        whileHover={{ y: -2 }}
                    >
                        <FiBriefcase /> Careers
                    </motion.button>
                    <motion.button
                        className={`tab-btn ${activeTab === 'service-inquiries' ? 'active' : ''}`}
                        onClick={() => setActiveTab('service-inquiries')}
                        whileHover={{ y: -2 }}
                    >
                        <FiTrendingUp /> Services
                    </motion.button>
                    <motion.button
                        className={`tab-btn ${activeTab === 'general-inquiries' ? 'active' : ''}`}
                        onClick={() => setActiveTab('general-inquiries')}
                        whileHover={{ y: -2 }}
                    >
                        <FiMessageSquare /> General
                    </motion.button>
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="tab-content"
                    >
                        {activeTab === 'overview' && (
                            <div className="overview-tab">
                                {/* Appointments Analytics */}
                                <div className="analytics-section">
                                    <h2>📅 Appointments Analytics</h2>
                                    <div className="analytics-grid">
                                        <div className="analytics-card">
                                            <h4>Total Appointments</h4>
                                            <p className="big-number">{stats?.appointments?.total || 0}</p>
                                        </div>
                                        <div className="analytics-card">
                                            <h4>Today</h4>
                                            <p className="big-number">{stats?.appointments?.today || 0}</p>
                                        </div>
                                        <div className="analytics-card">
                                            <h4>This Week</h4>
                                            <p className="big-number">{stats?.appointments?.thisWeek || 0}</p>
                                        </div>
                                    </div>
                                    <div className="status-breakdown">
                                        <h4>Status Breakdown</h4>
                                        <div className="status-bars">
                                            <div className="status-bar">
                                                <span>Pending</span>
                                                <div className="bar">
                                                    <div
                                                        className="fill pending"
                                                        style={{ width: `${(stats?.appointments?.byStatus?.pending / stats?.appointments?.total * 100) || 0}%` }}
                                                    />
                                                </div>
                                                <span>{stats?.appointments?.byStatus?.pending || 0}</span>
                                            </div>
                                            <div className="status-bar">
                                                <span>Approved</span>
                                                <div className="bar">
                                                    <div
                                                        className="fill approved"
                                                        style={{ width: `${(stats?.appointments?.byStatus?.approved / stats?.appointments?.total * 100) || 0}%` }}
                                                    />
                                                </div>
                                                <span>{stats?.appointments?.byStatus?.approved || 0}</span>
                                            </div>
                                            <div className="status-bar">
                                                <span>Rejected</span>
                                                <div className="bar">
                                                    <div
                                                        className="fill rejected"
                                                        style={{ width: `${(stats?.appointments?.byStatus?.rejected / stats?.appointments?.total * 100) || 0}%` }}
                                                    />
                                                </div>
                                                <span>{stats?.appointments?.byStatus?.rejected || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Forms Analytics */}
                                <div className="analytics-section">
                                    <h2>📞 Contact Forms Analytics</h2>
                                    <div className="analytics-grid">
                                        <div className="analytics-card">
                                            <h4>Total Contacts</h4>
                                            <p className="big-number">{stats?.contacts?.total || 0}</p>
                                        </div>
                                    </div>
                                    <div className="status-breakdown">
                                        <h4>Status Breakdown</h4>
                                        <div className="status-bars">
                                            <div className="status-bar">
                                                <span>Pending</span>
                                                <div className="bar">
                                                    <div
                                                        className="fill pending"
                                                        style={{ width: `${(stats?.contacts?.byStatus?.pending / stats?.contacts?.total * 100) || 0}%` }}
                                                    />
                                                </div>
                                                <span>{stats?.contacts?.byStatus?.pending || 0}</span>
                                            </div>
                                            <div className="status-bar">
                                                <span>Contacted</span>
                                                <div className="bar">
                                                    <div
                                                        className="fill contacted"
                                                        style={{ width: `${(stats?.contacts?.byStatus?.contacted / stats?.contacts?.total * 100) || 0}%` }}
                                                    />
                                                </div>
                                                <span>{stats?.contacts?.byStatus?.contacted || 0}</span>
                                            </div>
                                            <div className="status-bar">
                                                <span>Resolved</span>
                                                <div className="bar">
                                                    <div
                                                        className="fill resolved"
                                                        style={{ width: `${(stats?.contacts?.byStatus?.resolved / stats?.contacts?.total * 100) || 0}%` }}
                                                    />
                                                </div>
                                                <span>{stats?.contacts?.byStatus?.resolved || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Career Applications */}
                                <div className="analytics-section">
                                    <h2>💼 Career Applications</h2>
                                    <div className="analytics-grid">
                                        <div className="analytics-card">
                                            <h4>Total Applications</h4>
                                            <p className="big-number">{stats?.careers?.total || 0}</p>
                                        </div>
                                        <div className="analytics-card">
                                            <h4>LLQP Holders</h4>
                                            <p className="big-number">{stats?.careers?.llqpStats?.yes || 0}</p>
                                        </div>
                                        <div className="analytics-card">
                                            <h4>Non-LLQP</h4>
                                            <p className="big-number">{stats?.careers?.llqpStats?.no || 0}</p>
                                        </div>
                                    </div>
                                    <div className="status-breakdown">
                                        <h4>Status Breakdown</h4>
                                        <div className="status-bars">
                                            {Object.entries(stats?.careers?.byStatus || {}).map(([status, count]) => (
                                                <div className="status-bar" key={status}>
                                                    <span className="capitalize">{status}</span>
                                                    <div className="bar">
                                                        <div
                                                            className={`fill ${status}`}
                                                            style={{ width: `${(count / stats?.careers?.total * 100) || 0}%` }}
                                                        />
                                                    </div>
                                                    <span>{count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Service Inquiries - UPDATED to match Contact Forms style */}
                                <div className="analytics-section">
                                    <h2>📊 Service Inquiries</h2>
                                    <div className="analytics-grid">
                                        <div className="analytics-card">
                                            <h4>Total Service Inquiries</h4>
                                            <p className="big-number">{stats?.serviceInquiries?.total || 0}</p>
                                        </div>
                                    </div>
                                    <div className="status-breakdown">
                                        <h4>Status Breakdown</h4>
                                        <div className="status-bars">
                                            <div className="status-bar">
                                                <span>Pending</span>
                                                <div className="bar">
                                                    <div
                                                        className="fill pending"
                                                        style={{ width: `${(stats?.serviceInquiries?.byStatus?.pending / stats?.serviceInquiries?.total * 100) || 0}%` }}
                                                    />
                                                </div>
                                                <span>{stats?.serviceInquiries?.byStatus?.pending || 0}</span>
                                            </div>
                                            <div className="status-bar">
                                                <span>Contacted</span>
                                                <div className="bar">
                                                    <div
                                                        className="fill contacted"
                                                        style={{ width: `${(stats?.serviceInquiries?.byStatus?.contacted / stats?.serviceInquiries?.total * 100) || 0}%` }}
                                                    />
                                                </div>
                                                <span>{stats?.serviceInquiries?.byStatus?.contacted || 0}</span>
                                            </div>
                                            <div className="status-bar">
                                                <span>Resolved</span>
                                                <div className="bar">
                                                    <div
                                                        className="fill resolved"
                                                        style={{ width: `${(stats?.serviceInquiries?.byStatus?.resolved / stats?.serviceInquiries?.total * 100) || 0}%` }}
                                                    />
                                                </div>
                                                <span>{stats?.serviceInquiries?.byStatus?.resolved || 0}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* General Inquiries */}
                                <div className="analytics-section">
                                    <h2>📝 General Inquiries</h2>
                                    <div className="reasons-grid">
                                        {(stats?.generalInquiries?.byReason || []).map((item, index) => (
                                            <div className="reason-card" key={index}>
                                                <h4>{item._id}</h4>
                                                <p className="total">{item.count}</p>
                                                <div className="reason-stats">
                                                    <span className="pending">{item.pending} pending</span>
                                                    <span className="contacted">{item.contacted} contacted</span>
                                                    <span className="resolved">{item.resolved} resolved</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab !== 'overview' && (
                            <div className="details-tab">
                                {loadingDetails ? (
                                    <div className="details-loading">
                                        <FiRefreshCw className="spinner" />
                                    </div>
                                ) : (
                                    <div className="details-table-container">
                                        <table className="details-table">
                                            <thead>
                                                <tr>
                                                    {activeTab === 'appointments' && (
                                                        <>
                                                            <th>Reference</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                            <th>Date</th>
                                                            <th>Time</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </>
                                                    )}
                                                    {activeTab === 'contacts' && (
                                                        <>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                            <th>Message</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </>
                                                    )}
                                                    {activeTab === 'careers' && (
                                                        <>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                            <th>LLQP</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </>
                                                    )}
                                                    {activeTab === 'service-inquiries' && (
                                                        <>
                                                            <th>Name</th>
                                                            <th>Service</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </>
                                                    )}
                                                    {activeTab === 'general-inquiries' && (
                                                        <>
                                                            <th>Name</th>
                                                            <th>Reason</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                            <th>Status</th>
                                                            <th>Actions</th>
                                                        </>
                                                    )}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {detailsData.map((item, index) => (
                                                    <motion.tr
                                                        key={item._id || index}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: index * 0.05 }}
                                                    >
                                                        {activeTab === 'appointments' && (
                                                            <>
                                                                <td>{item.referenceId}</td>
                                                                <td>{item.name}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.date}</td>
                                                                <td>{item.time}</td>
                                                                <td>
                                                                    <span className={`status-badge ${item.status}`}>
                                                                        {item.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <select
                                                                        value={item.status}
                                                                        onChange={(e) => updateStatus('appointment', item._id, e.target.value)}
                                                                        className="status-select"
                                                                    >
                                                                        <option value="pending">Pending</option>
                                                                        <option value="approved">Approved</option>
                                                                        <option value="rejected">Rejected</option>
                                                                    </select>
                                                                </td>
                                                            </>
                                                        )}
                                                        {activeTab === 'contacts' && (
                                                            <>
                                                                <td>{item.name}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.phone}</td>
                                                                <td>{item.message?.substring(0, 30)}...</td>
                                                                <td>
                                                                    <span className={`status-badge ${item.status}`}>
                                                                        {item.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <select
                                                                        value={item.status}
                                                                        onChange={(e) => updateStatus('contact', item._id, e.target.value)}
                                                                        className="status-select"
                                                                    >
                                                                        <option value="pending">Pending</option>
                                                                        <option value="contacted">Contacted</option>
                                                                        <option value="resolved">Resolved</option>
                                                                    </select>
                                                                </td>
                                                            </>
                                                        )}
                                                        {activeTab === 'careers' && (
                                                            <>
                                                                <td>{item.firstName} {item.lastName}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.phone}</td>
                                                                <td>
                                                                    <span className={`llqp-badge ${item.llqpLicense}`}>
                                                                        {item.llqpLicense === 'yes' ? '✅ Yes' : '❌ No'}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <span className={`status-badge ${item.status}`}>
                                                                        {item.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <select
                                                                        value={item.status}
                                                                        onChange={(e) => updateStatus('career', item._id, e.target.value)}
                                                                        className="status-select"
                                                                    >
                                                                        <option value="pending">Pending</option>
                                                                        <option value="reviewed">Reviewed</option>
                                                                        <option value="contacted">Contacted</option>
                                                                        <option value="rejected">Rejected</option>
                                                                        <option value="hired">Hired</option>
                                                                    </select>
                                                                </td>
                                                            </>
                                                        )}
                                                        {activeTab === 'service-inquiries' && (
                                                            <>
                                                                <td>{item.name}</td>
                                                                <td>{item.service}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.phone}</td>
                                                                <td>
                                                                    <span className={`status-badge ${item.status}`}>
                                                                        {item.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <select
                                                                        value={item.status}
                                                                        onChange={(e) => updateStatus('service', item._id, e.target.value)}
                                                                        className="status-select"
                                                                    >
                                                                        <option value="pending">Pending</option>
                                                                        <option value="contacted">Contacted</option>
                                                                        <option value="resolved">Resolved</option>
                                                                    </select>
                                                                </td>
                                                            </>
                                                        )}
                                                        {activeTab === 'general-inquiries' && (
                                                            <>
                                                                <td>{item.name}</td>
                                                                <td>{item.reason}</td>
                                                                <td>{item.email}</td>
                                                                <td>{item.phone}</td>
                                                                <td>
                                                                    <span className={`status-badge ${item.status}`}>
                                                                        {item.status}
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    <select
                                                                        value={item.status}
                                                                        onChange={(e) => updateStatus('general', item._id, e.target.value)}
                                                                        className="status-select"
                                                                    >
                                                                        <option value="pending">Pending</option>
                                                                        <option value="contacted">Contacted</option>
                                                                        <option value="resolved">Resolved</option>
                                                                    </select>
                                                                </td>
                                                            </>
                                                        )}
                                                    </motion.tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default Dashboard;