import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    FiCalendar,
    FiClock,
    FiSave,
    FiX,
    FiCheck,
    FiLoader,
    FiSun,
    FiMoon,
    FiAlertCircle,
    FiTrash2,
    FiEdit2,
    FiPlus,
    FiList,
    FiGrid,
    FiChevronDown,
    FiFilter
} from 'react-icons/fi';
import './AdminSchedule.scss';

const AdminSchedule = () => {
    // Form state
    const [selectedDate, setSelectedDate] = useState('');
    const [isOff, setIsOff] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState([]);
    const [existingSchedule, setExistingSchedule] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [allTimeSlots, setAllTimeSlots] = useState([]);
    const [bookedSlots, setBookedSlots] = useState([]);

    // Schedule list state
    const [allSchedules, setAllSchedules] = useState([]);
    const [isLoadingSchedules, setIsLoadingSchedules] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    // Filter state
    const [dateFilter, setDateFilter] = useState({
        startDate: '',
        endDate: ''
    });
    const [activeFilter, setActiveFilter] = useState('all');

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Get date range for this week
    const getThisWeekRange = () => {
        const today = new Date();
        const start = new Date(today);
        start.setDate(today.getDate() - today.getDay());
        const end = new Date(today);
        end.setDate(today.getDate() + (6 - today.getDay()));

        return {
            startDate: start.toISOString().split('T')[0],
            endDate: end.toISOString().split('T')[0]
        };
    };

    // Get date range for this month
    const getThisMonthRange = () => {
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        return {
            startDate: start.toISOString().split('T')[0],
            endDate: end.toISOString().split('T')[0]
        };
    };

    // Get auth token
    const getToken = () => {
        return localStorage.getItem('adminToken');
    };

    // Fetch all schedules on mount
    useEffect(() => {
        fetchAllSchedules();
        fetchAllTimeSlots();
    }, []);

    // Fetch schedule when date changes
    useEffect(() => {
        if (selectedDate) {
            fetchScheduleForDate(selectedDate);
            fetchBookedSlotsForDate(selectedDate);
        } else {
            setExistingSchedule(null);
            setIsOff(false);
            setSelectedSlots([]);
            setBookedSlots([]);
        }
    }, [selectedDate]);



    // Add this useEffect after your other useEffects
    useEffect(() => {
        if (showAddForm) {
            // Small delay to ensure the form is rendered in DOM
            setTimeout(() => {
                document.querySelector('.schedule-form-section')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }, [showAddForm]); // Runs when showAddForm changes

    // Also add this for edit functionality
    useEffect(() => {
        if (selectedDate && showAddForm) {
            // If we have a selected date and form is open, ensure we scroll
            setTimeout(() => {
                document.querySelector('.schedule-form-section')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
        }
    }, [selectedDate, showAddForm]);




    // Fetch all schedules with filters
    const fetchAllSchedules = async () => {
        try {
            setIsLoadingSchedules(true);
            const token = getToken();

            let url = `${import.meta.env.VITE_API_URL}/admin/schedule`;

            if (activeFilter === 'custom' && dateFilter.startDate && dateFilter.endDate) {
                url += `?startDate=${dateFilter.startDate}&endDate=${dateFilter.endDate}`;
            } else if (activeFilter === 'week') {
                const weekRange = getThisWeekRange();
                url += `?startDate=${weekRange.startDate}&endDate=${weekRange.endDate}`;
            } else if (activeFilter === 'month') {
                const monthRange = getThisMonthRange();
                url += `?startDate=${monthRange.startDate}&endDate=${monthRange.endDate}`;
            }

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (data.success) {
                setAllSchedules(data.data);
            }
        } catch (error) {
            console.error('Error fetching schedules:', error);
            toast.error('Failed to load schedules');
        } finally {
            setIsLoadingSchedules(false);
        }
    };

    // Fetch all time slots
    const fetchAllTimeSlots = async () => {
        try {
            const token = getToken();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/all-time-slots`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setAllTimeSlots(data.data);
            }
        } catch (error) {
            console.error('Error fetching time slots:', error);
        }
    };

    // Fetch schedule for selected date
    const fetchScheduleForDate = async (date) => {
        try {
            setIsLoading(true);
            const token = getToken();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/schedule?date=${date}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await response.json();

            if (data.success && data.data.length > 0) {
                const schedule = data.data[0];
                setExistingSchedule(schedule);
                setIsOff(schedule.isOff);
                setSelectedSlots(schedule.customSlots || []);
            } else {
                setExistingSchedule(null);
                setIsOff(false);
                setSelectedSlots([]);
            }
        } catch (error) {
            console.error('Error fetching schedule:', error);
            toast.error('Failed to load schedule');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch booked slots for selected date
    const fetchBookedSlotsForDate = async (date) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/appointments/slots/${date}`);
            const data = await response.json();
            if (data.success) {
                setBookedSlots(data.data.bookedSlots || []);
            }
        } catch (error) {
            console.error('Error fetching booked slots:', error);
        }
    };

    // Handle date change
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    // Toggle day off
    const handleToggleOff = () => {
        setIsOff(!isOff);
        if (!isOff) {
            setSelectedSlots([]);
        }
    };

    // Toggle slot selection
    const handleSlotToggle = (slot) => {
        if (isOff) return;

        setSelectedSlots(prev => {
            if (prev.includes(slot)) {
                return prev.filter(s => s !== slot);
            } else {
                if (prev.length >= 20) {
                    toast.warning('Maximum 20 slots can be selected');
                    return prev;
                }
                return [...prev, slot];
            }
        });
    };

    // Check if slot is booked
    const isSlotBooked = (slot) => {
        return bookedSlots.includes(slot);
    };

    // Check if slot is selected
    const isSlotSelected = (slot) => {
        return selectedSlots.includes(slot);
    };

    // Handle save schedule
    const handleSaveSchedule = async () => {
        if (!selectedDate) {
            toast.error('Please select a date');
            return;
        }

        if (!isOff && selectedSlots.length === 0) {
            toast.error('Please select at least 1 time slot or mark day as off');
            return;
        }

        setIsSaving(true);

        try {
            const token = getToken();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/schedule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    date: selectedDate,
                    isOff,
                    customSlots: selectedSlots
                })
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message);
                await fetchScheduleForDate(selectedDate);
                await fetchAllSchedules();
            } else {
                toast.error(data.message || 'Failed to save schedule');
            }
        } catch (error) {
            console.error('Error saving schedule:', error);
            toast.error('Failed to save schedule');
        } finally {
            setIsSaving(false);
        }
    };

    // Handle delete schedule
    const handleDeleteSchedule = async (dateToDelete = selectedDate) => {
        if (!dateToDelete) return;

        if (!window.confirm('Are you sure you want to delete this schedule?')) {
            return;
        }

        try {
            const token = getToken();
            const response = await fetch(`${import.meta.env.VITE_API_URL}/admin/schedule/${dateToDelete}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (data.success) {
                toast.success(data.message);

                if (dateToDelete === selectedDate) {
                    handleClearForm();
                }

                await fetchAllSchedules();
            } else {
                toast.error(data.message || 'Failed to delete schedule');
            }
        } catch (error) {
            console.error('Error deleting schedule:', error);
            toast.error('Failed to delete schedule');
        }
    };

    // Handle edit schedule
    const handleEditSchedule = (schedule) => {
        setSelectedDate(schedule.date);
        setExistingSchedule(schedule);
        setIsOff(schedule.isOff);
        setSelectedSlots(schedule.customSlots || []);
        setShowAddForm(true);
        // document.querySelector('.schedule-form-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Handle add new
    const handleAddNew = () => {
        handleClearForm();
        setShowAddForm(true);
        // document.querySelector('.schedule-form-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Clear form
    const handleClearForm = () => {
        setSelectedDate('');
        setIsOff(false);
        setSelectedSlots([]);
        setExistingSchedule(null);
    };

    // Handle filter change
    const handleFilterChange = (filterType) => {
        setActiveFilter(filterType);
        if (filterType === 'custom') {
            setShowFilters(true);
        } else {
            setShowFilters(false);
            setTimeout(() => fetchAllSchedules(), 100);
        }
    };

    // Apply custom filter
    const handleApplyCustomFilter = () => {
        if (!dateFilter.startDate || !dateFilter.endDate) {
            toast.error('Please select both start and end dates');
            return;
        }
        setActiveFilter('custom');
        fetchAllSchedules();
    };

    // Reset filters
    const handleResetFilters = () => {
        setDateFilter({ startDate: '', endDate: '' });
        setActiveFilter('all');
        setShowFilters(false);
        setTimeout(() => fetchAllSchedules(), 100);
    };

    // Group time slots
    const groupedSlots = {
        Night: allTimeSlots.filter(slot => {
            const hour = parseInt(slot.split(':')[0]);
            return hour >= 0 && hour < 6;
        }),
        Morning: allTimeSlots.filter(slot => {
            const hour = parseInt(slot.split(':')[0]);
            return hour >= 6 && hour < 12;
        }),
        Afternoon: allTimeSlots.filter(slot => {
            const hour = parseInt(slot.split(':')[0]);
            return hour >= 12 && hour < 18;
        }),
        Evening: allTimeSlots.filter(slot => {
            const hour = parseInt(slot.split(':')[0]);
            return hour >= 18 && hour < 24;
        })
    };

    const periodIcons = {
        Night: <FiMoon />,
        Morning: <FiSun />,
        Afternoon: <FiSun />,
        Evening: <FiMoon />
    };

    // Format date for display - works with YYYY-MM-DD strings
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatShortDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <>
            <ToastContainer position="top-right" theme="colored" />
            <motion.div
                className="admin-schedule"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="schedule-header">
                    {/* <motion.span
                        className="schedule-pill"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Admin Panel
                    </motion.span> */}
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Schedule <span>Management</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Manage custom time slots for all dates
                    </motion.p>
                </div>

                {/* SCHEDULES LIST */}
                <motion.div
                    className="schedules-list-section"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="schedules-header">
                        <div className="schedules-title">
                            <FiList className="title-icon" />
                            <h3>Scheduled Dates</h3>
                        </div>

                        <div className="schedules-actions">
                            {/* Filter Dropdown */}
                            <div className="filter-dropdown">
                                <button
                                    className="filter-btn"
                                    onClick={() => setShowFilters(!showFilters)}
                                >
                                    <FiFilter />
                                    <span>Filter</span>
                                    <FiChevronDown className={`chevron ${showFilters ? 'open' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {showFilters && (
                                        <motion.div
                                            className="filter-menu"
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                        >
                                            <button
                                                className={`filter-option ${activeFilter === 'all' ? 'active' : ''}`}
                                                onClick={() => handleFilterChange('all')}
                                            >
                                                All Dates
                                            </button>
                                            <button
                                                className={`filter-option ${activeFilter === 'week' ? 'active' : ''}`}
                                                onClick={() => handleFilterChange('week')}
                                            >
                                                This Week
                                            </button>
                                            <button
                                                className={`filter-option ${activeFilter === 'month' ? 'active' : ''}`}
                                                onClick={() => handleFilterChange('month')}
                                            >
                                                This Month
                                            </button>
                                            <button
                                                className={`filter-option ${activeFilter === 'custom' ? 'active' : ''}`}
                                                onClick={() => handleFilterChange('custom')}
                                            >
                                                Custom Range
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Custom Filters */}
                            <AnimatePresence>
                                {activeFilter === 'custom' && (
                                    <motion.div
                                        className="custom-filters"
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: 'auto' }}
                                        exit={{ opacity: 0, width: 0 }}
                                    >
                                        <input
                                            type="date"
                                            value={dateFilter.startDate}
                                            onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
                                        />
                                        <span>to</span>
                                        <input
                                            type="date"
                                            value={dateFilter.endDate}
                                            onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
                                        />
                                        <button onClick={handleApplyCustomFilter} className="apply-filter-btn">
                                            Apply
                                        </button>
                                        <button onClick={handleResetFilters} className="reset-filter-btn">
                                            Reset
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* View Toggle */}
                            <div className="view-toggle-group">
                                <button
                                    className={`view-toggle ${viewMode === 'grid' ? 'active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    <FiGrid />
                                </button>
                                <button
                                    className={`view-toggle ${viewMode === 'list' ? 'active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    <FiList />
                                </button>
                            </div>

                            {/* Add New Button */}
                            <motion.button
                                className="add-new-btn"
                                onClick={handleAddNew}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FiPlus /> Add Schedule
                            </motion.button>
                        </div>
                    </div>

                    {/* Schedules Grid/List */}
                    {isLoadingSchedules ? (
                        <div className="schedules-loading">
                            <FiLoader className="spinner" />
                            <p>Loading schedules...</p>
                        </div>
                    ) : allSchedules.length === 0 ? (
                        <div className="no-schedules">
                            <FiAlertCircle />
                            <p>No schedules found</p>
                        </div>
                    ) : (
                        <motion.div
                            className={`schedules-${viewMode}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {allSchedules.map((schedule) => (
                                <motion.div
                                    key={schedule.id}
                                    className={`schedule-card ${schedule.isOff ? 'off-day' : ''} ${existingSchedule?.id === schedule.id ? 'active' : ''}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="schedule-card-header">
                                        <span className="schedule-date">{formatShortDate(schedule.date)}</span>
                                        {schedule.isOff ? (
                                            <span className="off-badge">Day Off</span>
                                        ) : (
                                            <span className="slots-badge">{schedule.slotCount} slots</span>
                                        )}
                                    </div>

                                    {!schedule.isOff && (
                                        <div className="schedule-slots-preview">
                                            {schedule.customSlots?.slice(0, 5).map((slot, idx) => (
                                                <span key={idx} className="slot-pill">{slot}</span>
                                            ))}
                                            {schedule.customSlots?.length > 5 && (
                                                <span className="more-badge">+{schedule.customSlots.length - 5}</span>
                                            )}
                                        </div>
                                    )}

                                    <div className="schedule-card-footer">
                                        <span className="schedule-status">
                                            {schedule.isOff ? 'Closed' : 'Custom Schedule'}
                                        </span>
                                        <div className="schedule-card-actions">
                                            <motion.button
                                                className="edit-btn"
                                                onClick={() => handleEditSchedule(schedule)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                title="Edit schedule"
                                            >
                                                <FiEdit2 />
                                            </motion.button>
                                            <motion.button
                                                className="delete-btn"
                                                onClick={() => handleDeleteSchedule(schedule.date)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                title="Delete schedule"
                                            >
                                                <FiTrash2 />
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>

                {/* ADD/EDIT FORM */}
                <AnimatePresence>
                    {showAddForm && (
                        <motion.div
                            className="schedule-form-section"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="form-section-header">
                                <h3>{existingSchedule ? 'Edit Schedule' : 'Add New Schedule'}</h3>
                                <motion.button
                                    className="close-form-btn"
                                    onClick={() => setShowAddForm(false)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <FiX />
                                </motion.button>
                            </div>

                            <div className="schedule-content">
                                {/* Left Panel */}
                                <motion.div
                                    className="schedule-controls"
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="controls-card">
                                        <div className="date-input-group">
                                            <label><FiCalendar /> Select Date *</label>
                                            <div className="date-input-wrapper">
                                                <FiCalendar className="input-icon" />
                                                <input
                                                    type="date"
                                                    value={selectedDate}
                                                    onChange={handleDateChange}
                                                    min={getTodayDate()}
                                                    className="date-input"
                                                />
                                            </div>
                                        </div>

                                        {selectedDate && (
                                            <motion.div
                                                className="selected-date-info"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                            >
                                                <span className="date-display">{formatDate(selectedDate)}</span>
                                                {existingSchedule && (
                                                    <span className="schedule-badge">
                                                        {existingSchedule.isOff ? 'Day Off' : 'Custom Schedule'}
                                                    </span>
                                                )}
                                            </motion.div>
                                        )}

                                        <div className="off-toggle">
                                            <label className="toggle-label">
                                                <span>Mark as Day Off</span>
                                                <div className={`toggle-switch ${isOff ? 'active' : ''}`} onClick={handleToggleOff}>
                                                    <div className="toggle-handle"></div>
                                                </div>
                                            </label>
                                            {isOff && (
                                                <motion.div
                                                    className="off-warning"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                >
                                                    <FiAlertCircle /> No time slots will be available on this date
                                                </motion.div>
                                            )}
                                        </div>

                                        <div className="slot-info">
                                            <div className="info-item">
                                                <span>Selected Slots:</span>
                                                <strong>{selectedSlots.length} / 20</strong>
                                            </div>
                                            <div className="info-item">
                                                <span>Booked Slots:</span>
                                                <strong>{bookedSlots.length}</strong>
                                            </div>
                                        </div>

                                        <div className="action-buttons">
                                            <motion.button
                                                className="save-btn"
                                                onClick={handleSaveSchedule}
                                                disabled={!selectedDate || isSaving || (!isOff && selectedSlots.length === 0)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {isSaving ? <><FiLoader className="spinner" /> Saving...</> : <><FiSave /> {existingSchedule ? 'Update' : 'Save'}</>}
                                            </motion.button>

                                            {existingSchedule && (
                                                <motion.button
                                                    className="delete-btn"
                                                    onClick={() => handleDeleteSchedule()}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <FiTrash2 /> Delete
                                                </motion.button>
                                            )}

                                            <motion.button
                                                className="clear-btn"
                                                onClick={handleClearForm}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <FiX /> Clear
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Right Panel - Time Slots */}
                                <motion.div
                                    className="schedule-slots"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="slots-card">
                                        <div className="slots-header">
                                            <h3><FiClock /> 24-Hour Time Slots</h3>
                                            <div className="slot-legend">
                                                <span className="legend-item available">Available</span>
                                                <span className="legend-item selected">Selected</span>
                                                <span className="legend-item booked">Booked</span>
                                            </div>
                                        </div>

                                        {isLoading ? (
                                            <div className="loading-slots">
                                                <FiLoader className="spinner" />
                                                <p>Loading time slots...</p>
                                            </div>
                                        ) : (
                                            <div className="slots-grid-container">
                                                {Object.entries(groupedSlots).map(([period, slots]) => (
                                                    slots.length > 0 && (
                                                        <div key={period} className="period-group">
                                                            <div className="period-header">
                                                                {periodIcons[period]} {period}
                                                            </div>
                                                            <div className="period-slots">
                                                                {slots.map(slot => {
                                                                    const isBooked = isSlotBooked(slot);
                                                                    const isSelected = isSlotSelected(slot);

                                                                    return (
                                                                        <motion.button
                                                                            key={slot}
                                                                            className={`time-slot 
                                                                                ${isSelected ? 'selected' : ''} 
                                                                                ${isBooked ? 'booked' : ''}
                                                                                ${isOff ? 'disabled' : ''}
                                                                            `}
                                                                            onClick={() => handleSlotToggle(slot)}
                                                                            disabled={isOff || isBooked}
                                                                            whileHover={!isOff && !isBooked ? { scale: 1.05 } : {}}
                                                                            whileTap={!isOff && !isBooked ? { scale: 0.95 } : {}}
                                                                            title={isBooked ? 'This slot already has bookings' : ''}
                                                                        >
                                                                            <span className="slot-time">{slot}</span>
                                                                            {isSelected && <FiCheck className="slot-check" />}
                                                                            {isBooked && <span className="booked-badge">Booked</span>}
                                                                        </motion.button>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    )
                                                ))}
                                            </div>
                                        )}

                                        {!isLoading && selectedSlots.length > 0 && (
                                            <motion.div
                                                className="selected-summary"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <h4>Selected Slots:</h4>
                                                <div className="selected-tags">
                                                    {selectedSlots.sort().map(slot => (
                                                        <span key={slot} className="selected-tag">
                                                            {slot}
                                                            <FiX onClick={() => handleSlotToggle(slot)} />
                                                        </span>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </>
    );
};

export default AdminSchedule;