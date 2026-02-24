import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as XLSX from 'xlsx'; // <-- ADD THIS IMPORT
import {
    FiMail,
    FiPhone,
    FiUser,
    FiCalendar,
    FiMessageCircle,
    FiCheckCircle,
    FiXCircle,
    FiFilter,
    FiDownload,
    FiRefreshCw,
    FiChevronLeft,
    FiChevronRight,
    FiEye,
    FiInbox
} from 'react-icons/fi';
import './AdminForms.scss';

const AdminForms = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('contact');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0,
        pages: 1
    });
    const [filters, setFilters] = useState({
        status: '',
        startDate: '',
        endDate: ''
    });
    const [showFilters, setShowFilters] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [showDetails, setShowDetails] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || 'https://hksinvenstmentbackend.onrender.com/api';

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
    }, [activeTab, pagination.page, filters]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            let endpoint = '';

            switch (activeTab) {
                case 'contact':
                    endpoint = '/contact/all';
                    break;
                case 'general':
                    endpoint = '/general-inquiry/all';
                    break;
                case 'service':
                    endpoint = '/service-inquiry/all';
                    break;
                default:
                    endpoint = '/contact/all';
            }

            const queryParams = new URLSearchParams({
                page: pagination.page,
                limit: pagination.limit,
                ...(filters.status && { status: filters.status }),
                ...(filters.startDate && { startDate: filters.startDate }),
                ...(filters.endDate && { endDate: filters.endDate })
            });

            const response = await fetch(`${API_URL}${endpoint}?${queryParams}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
                return;
            }

            const result = await response.json();

            if (result.success) {
                setData(result.data);
                if (result.pagination) {
                    setPagination(result.pagination);
                }
            } else {
                toast.error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        setUpdatingId(id);
        try {
            const token = localStorage.getItem('adminToken');
            let endpoint = '';

            switch (activeTab) {
                case 'contact':
                    endpoint = `/contact/${id}/status`;
                    break;
                case 'general':
                    endpoint = `/general-inquiry/${id}/status`;
                    break;
                case 'service':
                    endpoint = `/service-inquiry/${id}/status`;
                    break;
            }

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
                return;
            }

            const result = await response.json();

            if (result.success) {
                toast.success('Status updated successfully');
                setData(prevData =>
                    prevData.map(item =>
                        item._id === id ? { ...item, status: newStatus } : item
                    )
                );
                if (selectedItem && selectedItem._id === id) {
                    setSelectedItem({ ...selectedItem, status: newStatus });
                }
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Something went wrong');
        } finally {
            setUpdatingId(null);
        }
    };

    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    const resetFilters = () => {
        setFilters({
            status: '',
            startDate: '',
            endDate: ''
        });
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    // REPLACE exportToCSV with exportToExcel
    const exportToExcel = () => {
        const headers = ['Name', 'Email', 'Status', 'Date'];
        const rows = data.map(item => [
            getItemName(item),
            item.email,
            item.status,
            new Date(item.createdAt).toLocaleDateString()
        ]);

        const worksheetData = [headers, ...rows];
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Submissions');

        const fileName = `${activeTab}-${new Date().toISOString().split('T')[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };

    const getItemName = (item) => {
        switch (activeTab) {
            case 'service':
                return item.firstName && item.lastName
                    ? `${item.firstName} ${item.lastName}`
                    : item.name || 'Unknown';
            default:
                return item.name || 'Unknown';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'status-pending';
            case 'contacted': return 'status-contacted';
            case 'resolved': return 'status-resolved';
            default: return '';
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            

            <motion.div
                className="admin-forms"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                {/* Header */}
                <motion.div className="admin-header" variants={itemVariants}>
                    <h1>
                        <FiMail className="header-icon" />
                        Forms Management
                    </h1>
                    <p>Manage all contact form submissions and inquiries</p>
                </motion.div>

                {/* Page Toggle Buttons */}
                <motion.div className="page-tabs" variants={itemVariants}>
                    <button
                        className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('contact');
                            setPagination(prev => ({ ...prev, page: 1 }));
                        }}
                    >
                        <FiMessageCircle /> Contact
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('general');
                            setPagination(prev => ({ ...prev, page: 1 }));
                        }}
                    >
                        <FiUser /> General Inquiry
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'service' ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab('service');
                            setPagination(prev => ({ ...prev, page: 1 }));
                        }}
                    >
                        <FiCheckCircle /> Service Inquiry
                    </button>
                </motion.div>

                {/* Controls Bar */}
                <motion.div className="controls-bar" variants={itemVariants}>
                    <div className="left-controls">
                        <button
                            className={`filter-btn ${showFilters ? 'active' : ''}`}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <FiFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
                        </button>
                        <button className="export-btn" onClick={exportToExcel}>
                            <FiDownload /> Export Excel
                        </button>
                    </div>
                    <div className="right-controls">
                        <button className="refresh-btn" onClick={fetchData}>
                            <FiRefreshCw /> Refresh
                        </button>
                    </div>
                </motion.div>

                {/* Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            className="filters-panel"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <div className="filters-row">
                                <div className="filter-group">
                                    <label>Status</label>
                                    <select
                                        value={filters.status}
                                        onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
                                    >
                                        <option value="">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="contacted">Contacted</option>
                                        <option value="resolved">Resolved</option>
                                    </select>
                                </div>
                                <div className="filter-group">
                                    <label>Start Date</label>
                                    <input
                                        type="date"
                                        value={filters.startDate}
                                        onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value, page: 1 }))}
                                    />
                                </div>
                                <div className="filter-group">
                                    <label>End Date</label>
                                    <input
                                        type="date"
                                        value={filters.endDate}
                                        onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value, page: 1 }))}
                                    />
                                </div>
                                <div className="filter-group filter-actions">
                                    <button className="reset-filters-btn" onClick={resetFilters}>
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Table Title */}
                <motion.div className="table-title" variants={itemVariants}>
                    <h2>
                        {activeTab === 'contact' && 'Contact Form Submissions'}
                        {activeTab === 'general' && 'General Inquiries'}
                        {activeTab === 'service' && 'Service Inquiries'}
                    </h2>
                    <span className="total-count">Total: {pagination.total}</span>
                </motion.div>

                {/* Table */}
                <motion.div className="table-container" variants={itemVariants}>
                    {loading ? (
                        <div className="loading-state">
                            <div className="spinner"></div>
                            <p>Loading data...</p>
                        </div>
                    ) : data.length === 0 ? (
                        <div className="empty-state">
                            <FiInbox className="empty-icon" />
                            <h3>No submissions found</h3>
                            <p>No records match your criteria.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <motion.tr
                                            key={item._id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className={updatingId === item._id ? 'updating' : ''}
                                        >
                                            <td data-label="Name" className="name-cell">
                                                <FiUser className="cell-icon" />
                                                {getItemName(item)}
                                            </td>
                                            <td data-label="Email" className="email-cell">
                                                <FiMail className="cell-icon" />
                                                {item.email}
                                            </td>
                                            <td data-label="Status">
                                                <select
                                                    className={`status-select ${getStatusColor(item.status)}`}
                                                    value={item.status}
                                                    onChange={(e) => handleStatusUpdate(item._id, e.target.value)}
                                                    disabled={updatingId === item._id}
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="resolved">Resolved</option>
                                                </select>
                                            </td>
                                            <td data-label="Date" className="date-cell">
                                                <FiCalendar className="cell-icon" />
                                                {new Date(item.createdAt).toLocaleDateString()}
                                            </td>
                                            <td data-label="Actions" className="actions-cell">
                                                <button
                                                    className="view-btn"
                                                    onClick={() => {
                                                        setSelectedItem(item);
                                                        setShowDetails(true);
                                                    }}
                                                    title="View Details"
                                                >
                                                    <FiEye />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </motion.div>

                {/* Pagination */}
                {!loading && data.length > 0 && (
                    <motion.div className="pagination" variants={itemVariants}>
                        <button
                            className="page-btn"
                            onClick={() => handlePageChange(pagination.page - 1)}
                            disabled={pagination.page === 1}
                        >
                            <FiChevronLeft />
                        </button>
                        <span className="page-info">
                            Page {pagination.page} of {pagination.pages}
                        </span>
                        <button
                            className="page-btn"
                            onClick={() => handlePageChange(pagination.page + 1)}
                            disabled={pagination.page === pagination.pages}
                        >
                            <FiChevronRight />
                        </button>
                    </motion.div>
                )}

                {/* Details Modal */}
                <AnimatePresence>
                    {showDetails && selectedItem && (
                        <motion.div
                            className="modal-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDetails(false)}
                        >
                            <motion.div
                                className="details-modal"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="modal-header">
                                    <h3>Submission Details</h3>
                                    <button className="close-btn" onClick={() => setShowDetails(false)}>
                                        <FiXCircle />
                                    </button>
                                </div>
                                <div className="modal-content">
                                    {/* all detail rows (unchanged) */}
                                    <div className="detail-row">
                                        <label>Name:</label>
                                        <span>{getItemName(selectedItem)}</span>
                                    </div>
                                    <div className="detail-row">
                                        <label>Email:</label>
                                        <span>{selectedItem.email}</span>
                                    </div>
                                    <div className="detail-row">
                                        <label>Phone:</label>
                                        <span>{selectedItem.phone || 'Not provided'}</span>
                                    </div>

                                    {activeTab === 'service' && selectedItem.service && (
                                        <div className="detail-row">
                                            <label>Service:</label>
                                            <span>{selectedItem.service}</span>
                                        </div>
                                    )}
                                    {activeTab === 'general' && selectedItem.reason && (
                                        <div className="detail-row">
                                            <label>Reason:</label>
                                            <span>{selectedItem.reason}</span>
                                        </div>
                                    )}

                                    {selectedItem.message && (
                                        <div className="detail-row message-row">
                                            <label>Message:</label>
                                            <p>{selectedItem.message}</p>
                                        </div>
                                    )}

                                    <div className="detail-row">
                                        <label>Status:</label>
                                        <select
                                            className={`status-select ${getStatusColor(selectedItem.status)}`}
                                            value={selectedItem.status}
                                            onChange={(e) => {
                                                handleStatusUpdate(selectedItem._id, e.target.value);
                                                setSelectedItem({ ...selectedItem, status: e.target.value });
                                            }}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="contacted">Contacted</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </div>

                                    <div className="detail-row">
                                        <label>Submitted:</label>
                                        <span>{new Date(selectedItem.createdAt).toLocaleString()}</span>
                                    </div>
                                    <div className="detail-row">
                                        <label>Last Updated:</label>
                                        <span>{new Date(selectedItem.updatedAt).toLocaleString()}</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default AdminForms;