import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
    FiLogOut, 
    FiFilter, 
    FiCheck, 
    FiX, 
    FiClock, 
    FiUser, 
    FiPhone, 
    FiMail, 
    FiCalendar,
    FiSearch,
    FiRefreshCw,
    FiMessageSquare
} from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AdminDashboard.scss';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);
    const [filters, setFilters] = useState({
        status: 'all',
        search: '',
        date: '',
        bookedByAdmin: 'all'
    });

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    // Check if admin is logged in
    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin/login');
        }
    }, [navigate]);

    // Fetch appointments
    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('adminToken');
            
            const response = await fetch(`${API_URL}/admin/appointments`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                handleLogout();
                return;
            }

            const data = await response.json();
            
            if (data.success) {
                setAppointments(data.data);
                setFilteredAppointments(data.data);
            } else {
                toast.error('Failed to fetch appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error('Error loading appointments');
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchAppointments();
    }, []);

    // Apply filters
    useEffect(() => {
        let filtered = [...appointments];

        // Filter by status
        if (filters.status !== 'all') {
            filtered = filtered.filter(appt => appt.status === filters.status);
        }

        // Filter by admin booking
        if (filters.bookedByAdmin !== 'all') {
            const isAdminBooking = filters.bookedByAdmin === 'true';
            filtered = filtered.filter(appt => appt.bookedByAdmin === isAdminBooking);
        }

        // Filter by date
        if (filters.date) {
            filtered = filtered.filter(appt => {
                const apptDate = new Date(appt.date).toISOString().split('T')[0];
                return apptDate === filters.date;
            });
        }

        // Filter by search
        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(appt => 
                appt.name.toLowerCase().includes(searchTerm) ||
                appt.email.toLowerCase().includes(searchTerm) ||
                appt.phone.includes(searchTerm)
            );
        }

        setFilteredAppointments(filtered);
    }, [filters, appointments]);

    // Handle approve appointment
    const handleApprove = async (id) => {
        try {
            setProcessingId(id);
            const token = localStorage.getItem('adminToken');
            
            const response = await fetch(`${API_URL}/admin/appointments/${id}/approve`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401) {
                handleLogout();
                return;
            }

            const data = await response.json();
            
            if (data.success) {
                toast.success('Appointment approved successfully!');
                
                // Update local state
                setAppointments(prev => prev.map(appt => 
                    appt.id === id ? { ...appt, status: 'confirmed' } : appt
                ));
            } else {
                toast.error(data.message || 'Failed to approve appointment');
            }
        } catch (error) {
            console.error('Error approving appointment:', error);
            toast.error('Error approving appointment');
        } finally {
            setProcessingId(null);
        }
    };

    // Handle reject appointment
    const handleReject = async (id) => {
        try {
            setProcessingId(id);
            const token = localStorage.getItem('adminToken');
            
            const response = await fetch(`${API_URL}/admin/appointments/${id}/reject`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 401) {
                handleLogout();
                return;
            }

            const data = await response.json();
            
            if (data.success) {
                toast.success('Appointment rejected successfully!');
                
                // Update local state
                setAppointments(prev => prev.map(appt => 
                    appt.id === id ? { ...appt, status: 'cancelled' } : appt
                ));
            } else {
                toast.error(data.message || 'Failed to reject appointment');
            }
        } catch (error) {
            console.error('Error rejecting appointment:', error);
            toast.error('Error rejecting appointment');
        } finally {
            setProcessingId(null);
        }
    };

    // Handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Clear filters
    const clearFilters = () => {
        setFilters({
            status: 'all',
            search: '',
            date: '',
            bookedByAdmin: 'all'
        });
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminData');
        toast.info('Logged out successfully');
        navigate('/admin/login');
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Get status badge class
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'pending': return 'status-pending';
            case 'confirmed': return 'status-confirmed';
            case 'cancelled': return 'status-cancelled';
            case 'completed': return 'status-completed';
            default: return 'status-pending';
        }
    };

    // Get status text
    const getStatusText = (status) => {
        switch (status) {
            case 'pending': return 'Pending';
            case 'confirmed': return 'Confirmed';
            case 'cancelled': return 'Cancelled';
            case 'completed': return 'Completed';
            default: return 'Pending';
        }
    };

    return (
        <div className="admin-dashboard">
            <ToastContainer position="top-right" autoClose={3000} />
            
            {/* Header */}
            <header className="dashboard-header">
                <div className="header-left">
                    <h1>HKS Investment Admin</h1>
                    <p>Manage Appointments & Bookings</p>
                </div>
                
                <div className="header-right">
                    <button 
                        className="refresh-btn"
                        onClick={fetchAppointments}
                        disabled={loading}
                    >
                        <FiRefreshCw className={loading ? 'spinning' : ''} />
                        Refresh
                    </button>
                    
                    <button className="logout-btn" onClick={handleLogout}>
                        <FiLogOut />
                        Logout
                    </button>
                </div>
            </header>

            {/* Filters Section */}
            <div className="filters-section">
                <div className="filters-header">
                    <h2><FiFilter /> Filters</h2>
                    <div className="results-count">
                        {filteredAppointments.length} appointment(s) found
                    </div>
                </div>
                
                <div className="filter-row">
                    {/* Status Filter */}
                    <div className="filter-group">
                        <label>Status</label>
                        <select 
                            name="status" 
                            value={filters.status}
                            onChange={handleFilterChange}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="cancelled">Cancelled</option>
                            {/* <option value="completed">Completed</option>  */}
                        </select>
                    </div>

                    {/* Admin Booking Filter */}
                    <div className="filter-group">
                        <label>Booking Type</label>
                        <select 
                            name="bookedByAdmin" 
                            value={filters.bookedByAdmin}
                            onChange={handleFilterChange}
                        >
                            <option value="all">All Bookings</option>
                            <option value="true">Admin Bookings</option>
                            <option value="false">User Bookings</option>
                        </select>
                    </div>

                    {/* Date Filter */}
                    <div className="filter-group">
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                        />
                    </div>

                    {/* Search Filter */}
                    <div className="filter-group search-group">
                        <label>Search</label>
                        <div className="search-input">
                            <FiSearch />
                            <input
                                type="text"
                                name="search"
                                placeholder="Search by name, email or phone"
                                value={filters.search}
                                onChange={handleFilterChange}
                            />
                        </div>
                    </div>

                    {/* Clear Filters Button */}
                    <div className="filter-group clear-group">
                        <label>&nbsp;</label>
                        <button className="clear-filters" onClick={clearFilters}>
                            Clear All
                        </button>
                    </div>
                </div>
            </div>

            {/* Appointments Section */}
            <div className="appointments-section">
                <div className="section-header">
                    <h2>Appointments</h2>
                    <div className="section-stats">
                        <span className="stat-item">
                            <span className="stat-count">{appointments.filter(a => a.status === 'pending').length}</span>
                            <span className="stat-label">Pending</span>
                        </span>
                        <span className="stat-item">
                            <span className="stat-count">{appointments.filter(a => a.status === 'confirmed').length}</span>
                            <span className="stat-label">Confirmed</span>
                        </span>
                        <span className="stat-item">
                            <span className="stat-count">{appointments.length}</span>
                            <span className="stat-label">Total</span>
                        </span>
                    </div>
                </div>

                {loading ? (
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading appointments...</p>
                    </div>
                ) : filteredAppointments.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">
                            <FiCalendar size={48} />
                        </div>
                        <h3>No appointments found</h3>
                        <p>Try adjusting your filters or check back later.</p>
                        <button onClick={clearFilters} className="clear-filters-btn">
                            Clear all filters
                        </button>
                    </div>
                ) : (
                    <div className="appointments-table-container">
                        <table className="appointments-table">
                            <thead>
                                <tr>
                                    <th>Client Details</th>
                                    <th>Appointment</th>
                                    <th>Status</th>
                                    <th>Booking Type</th>
                                    <th>Created On</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((appt) => (
                                    <motion.tr 
                                        key={appt.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {/* Client Details */}
                                        <td className="client-details">
                                            <div className="client-main">
                                               
                                                <div className="client-info">
                                                    <h4 className="client-name">{appt.name}</h4>
                                                    <div className="client-contact">
                                                        <span className="contact-item">
                                                            <FiMail /> {appt.email} - {appt.phone}
                                                        </span>
                                                        <span className="contact-item">
                                                            <FiPhone /> {appt.phone}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {appt.message && (
                                                <div className="client-message">
                                                    <FiMessageSquare />
                                                    <span>{appt.message}</span>
                                                </div>
                                            )}
                                        </td>
                                        
                                        {/* Appointment Details */}
                                        <td className="appointment-details">
                                            <div className="appointment-date">
                                                <FiCalendar />
                                                <div>
                                                    <div className="date-display">{formatDate(appt.date)}</div>
                                                    <div className="time-display">
                                                        <FiClock /> {appt.time} - {parseInt(appt.time.split(':')[0]) + 1}:00
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        
                                        {/* Status */}
                                        <td>
                                            <span className={`status-badge ${getStatusBadgeClass(appt.status)}`}>
                                                {getStatusText(appt.status)}
                                            </span>
                                        </td>
                                        
                                        {/* Booking Type */}
                                        <td>
                                            {appt.bookedByAdmin ? (
                                                <div className="admin-booking">
                                                    <span className="admin-badge">
                                                        🔴 Admin
                                                    </span>
                                                    {appt.adminEmail && (
                                                        <small>{appt.adminEmail}</small>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="user-booking">
                                                    👤 User
                                                </span>
                                            )}
                                        </td>
                                        
                                        {/* Created Date */}
                                        <td className="created-date">
                                            <div className="date-created">
                                                {new Date(appt.createdAt).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                            <div className="time-created">
                                                {new Date(appt.createdAt).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </td>
                                        
                                        {/* Actions */}
                                        <td className="actions">
                                            {appt.status === 'pending' && !appt.bookedByAdmin ? (
                                                <div className="action-buttons">
                                                    <motion.button
                                                        className="approve-btn"
                                                        onClick={() => handleApprove(appt.id)}
                                                        disabled={processingId === appt.id}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {processingId === appt.id ? (
                                                            <div className="btn-spinner"></div>
                                                        ) : (
                                                            <>
                                                                <FiCheck />
                                                                <span>Approve</span>
                                                            </>
                                                        )}
                                                    </motion.button>
                                                    
                                                    <motion.button
                                                        className="reject-btn"
                                                        onClick={() => handleReject(appt.id)}
                                                        disabled={processingId === appt.id}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                    >
                                                        {processingId === appt.id ? (
                                                            <div className="btn-spinner"></div>
                                                        ) : (
                                                            <>
                                                                <FiX />
                                                                <span>Reject</span>
                                                            </>
                                                        )}
                                                    </motion.button>
                                                </div>
                                            ) : (
                                                <div className="no-actions">
                                                    {appt.bookedByAdmin ? 'Admin booking' : 'Action completed'}
                                                </div>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="dashboard-footer">
                <div className="footer-content">
                    <div className="footer-logo">
                        <h3>HKS Investment</h3>
                        <p>Admin Portal</p>
                    </div>
                    <div className="footer-info">
                        <p>© {new Date().getFullYear()} All rights reserved.</p>
                        <p className="footer-stats">
                            Total: {appointments.length} | 
                            Pending: {appointments.filter(a => a.status === 'pending').length} | 
                            Confirmed: {appointments.filter(a => a.status === 'confirmed').length}
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default AdminDashboard;