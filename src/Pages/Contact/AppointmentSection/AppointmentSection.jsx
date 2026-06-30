import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    FiUser,
    FiPhone,
    FiMail,
    FiCalendar,
    FiClock,
    FiArrowRight,
    FiCheckCircle,
    FiXCircle,
    FiLoader,
    FiEdit3,
    FiAlertCircle,
    FiInfo
} from "react-icons/fi";
import "./AppointmentSection.scss";

const AppointmentSection = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [allSlots, setAllSlots] = useState([]);
    const [isOff, setIsOff] = useState(false);
    const [scheduleType, setScheduleType] = useState('default');
    const [slotCount, setSlotCount] = useState(0);

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const todayDate = getTodayDate();

    // ========== NEW: Get max selectable date - Next 15 days from today ==========
    const getMaxDate = () => {
        const today = new Date();
        today.setDate(today.getDate() + 14); // +14 because today is day 1 (total 15 days)
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Generate all possible default time slots (10 AM to 6 PM)
    const getAllDefaultTimeSlots = () => {
        const slots = [];
        for (let hour = 10; hour < 18; hour++) {
            const timeStr = `${hour.toString().padStart(2, '0')}:00`;
            slots.push(timeStr);
        }
        return slots;
    };

    // Fetch available slots when date is selected
    useEffect(() => {
        if (selectedDate) {
            fetchAvailableSlots(selectedDate);
        } else {
            setBookedSlots([]);
            setAvailableSlots([]);
            setAllSlots([]);
            setIsOff(false);
            setSelectedTime(null);
        }
    }, [selectedDate]);

    // Fetch available slots from API
    const fetchAvailableSlots = async (date) => {
        try {
            setIsLoadingSlots(true);
            toast.dismiss();

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/appointments/slots/${date}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch time slots');
            }

            const data = await response.json();

            if (data.success) {
                const booked = data.data.bookedSlots || [];
                const available = data.data.availableSlots || [];

                setBookedSlots(booked);
                setAvailableSlots(available);
                setIsOff(data.data.isOff || false);
                setScheduleType(data.data.scheduleType || 'default');
                setSlotCount(available.length || 0);

                // Create combined slots array with all slots and their status
                let combinedSlots = [];

                if (data.data.isOff) {
                    combinedSlots = getAllDefaultTimeSlots().map(time => ({
                        time,
                        status: 'unavailable',
                        reason: 'day_off'
                    }));
                } else if (data.data.scheduleType === 'custom' && data.data.customSlotCount > 0) {
                    const allCustomSlots = [...new Set([...available, ...booked])].sort();
                    combinedSlots = allCustomSlots.map(time => ({
                        time,
                        status: booked.includes(time) ? 'booked' : 'available'
                    }));
                } else {
                    combinedSlots = getAllDefaultTimeSlots().map(time => ({
                        time,
                        status: booked.includes(time) ? 'booked' :
                            available.includes(time) ? 'available' : 'unavailable'
                    }));
                }

                // ========== If selected date is today, mark past slots as unavailable ==========
                let finalSlots = combinedSlots;
                let finalAvailable = available;
                let finalBooked = booked;

                if (date === todayDate) {
                    const currentHour = new Date().getHours(); // 0-23

                    finalSlots = combinedSlots.map(slot => {
                        const slotHour = parseInt(slot.time.split(':')[0]);
                        if (slotHour <= currentHour) {
                            // Override status to 'unavailable' for past slots
                            return { ...slot, status: 'unavailable' };
                        }
                        return slot;
                    });

                    // Recalculate booked and available based on updated statuses
                    finalAvailable = finalSlots.filter(s => s.status === 'available').map(s => s.time);
                    finalBooked = finalSlots.filter(s => s.status === 'booked').map(s => s.time);
                }

                setAllSlots(finalSlots);
                setBookedSlots(finalBooked);
                setAvailableSlots(finalAvailable);
                setSlotCount(finalAvailable.length);

                // Reset selected time if it's now unavailable
                if (selectedTime) {
                    if (finalBooked.includes(selectedTime) || !finalAvailable.includes(selectedTime)) {
                        setSelectedTime(null);
                    }
                }
            } else {
                throw new Error(data.message || 'Failed to fetch slots');
            }
        } catch (error) {
            console.error('Error fetching slots:', error);
            toast.error('Failed to load available time slots. Please try again.', {
                position: "top-right",
                autoClose: 3000
            });
            setBookedSlots([]);
            setAvailableSlots([]);
            setAllSlots([]);
        } finally {
            setIsLoadingSlots(false);
        }
    };

    // Handle date change
    const handleDateChange = (e) => {
        const newDate = e.target.value;
        const min = getMinDate();
        const max = getMaxDate();

        // ========== NEW: Validate date range - Next 15 days ==========
        if (newDate && (newDate < min || newDate > max)) {
            toast.dismiss();
            toast.error(`Please select a date within the next 15 days (${min} to ${max})`, {
                position: "top-right",
                autoClose: 3000
            });
            setSelectedDate("");
        } else {
            setSelectedDate(newDate);
        }
        setSelectedTime(null);
    };

    // Handle time slot selection
    const handleTimeSlotClick = (time) => {
        const slot = allSlots.find(s => s.time === time);
        if (slot && slot.status === 'available') {
            setSelectedTime(time);
        }
    };

    // Form validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .min(2, "Name must be at least 2 characters"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string()
            .matches(/^[0-9\-\+ ]+$/, "Invalid phone number")
            .required("Phone number is required")
            .min(8, "Phone number must be at least 8 digits")
    });

    // Initial form values
    const initialValues = {
        name: "",
        email: "",
        phone: ""
    };

    // Handle form submission with API call
    const handleSubmit = async (values, { resetForm }) => {
        if (!selectedDate) {
            toast.error("Please select a date", {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

        if (!selectedTime) {
            toast.error("Please select a time slot", {
                position: "top-right",
                autoClose: 3000
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const appointmentData = {
                ...values,
                date: selectedDate,
                time: selectedTime,
                reason: "Financial Consultation",
                message: ""
            };

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/appointments/book`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(appointmentData)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to book appointment');
            }

            if (data.success) {
                toast.dismiss();
                toast.success(
                    `Thank you! We'll review your request and update you shortly.`,
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    }
                );

                resetForm();
                setSelectedDate("");
                setSelectedTime(null);
                setBookedSlots([]);
                setAvailableSlots([]);
                setAllSlots([]);
            } else {
                throw new Error(data.message || 'Booking failed');
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.message || 'Failed to book appointment. Please try again.', {
                position: "top-right",
                autoClose: 5000
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const [year, month, day] = dateString.split('-');
        const date = new Date(year, month - 1, day);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getMinDate = () => {
        return todayDate;
    };

    // Get time range string from time slot
    const getTimeRange = (time) => {
        const hour = parseInt(time.split(':')[0]);
        const nextHour = hour + 1;
        const nextHourStr = `${nextHour.toString().padStart(2, '0')}:00`;
        return `${time} - ${nextHourStr}`;
    };

    // Get slot status display info
    const getSlotStatusInfo = (status) => {
        switch (status) {
            case 'booked':
                return {
                    icon: <FiXCircle />,
                    text: 'Booked',
                    className: 'booked'
                };
            case 'unavailable':
                return {
                    icon: <FiXCircle />,
                    text: 'Unavailable',
                    className: 'unavailable'
                };
            case 'available':
                return {
                    icon: null,
                    text: 'Available',
                    className: 'available'
                };
            default:
                return {
                    icon: <FiAlertCircle />,
                    text: 'Not Available',
                    className: 'unavailable'
                };
        }
    };

    // Get display message based on schedule type
    const getScheduleMessage = () => {
        if (isOff) {
            return "No appointments available on this date";
        }
        if (scheduleType === 'custom') {
            const availableCount = allSlots.filter(s => s.status === 'available').length;
            const bookedCount = allSlots.filter(s => s.status === 'booked').length;
            return `${availableCount} available, ${bookedCount} booked`;
        }
        return "Select a 1-hour time slot (10:00 AM - 6:00 PM)";
    };

    return (
        <>
            <ToastContainer />
            <motion.section
                className="appointment-section"
                id="appointment-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1,
                            delayChildren: 0.2
                        }
                    }
                }}
            >
                <div className="appointment-header">
                    <motion.span
                        className="appointment-pill"
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                    >
                        Book Appointment
                    </motion.span>
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                        Schedule Your Free <span>Financial Consultation</span>
                    </motion.h2>
                    <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                        Select a convenient time for<span className="mobile-br"><br /></span> your personalized financial<span className="mobile-br"><br /></span> planning session.
                    </motion.p>
                </div>

                <div className="appointment-content">
                    {/* LEFT SIDE - FORM */}
                    <motion.div
                        className="appointment-form-section"
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                    >
                        <div className="appointment-form-container">
                            <div className="form-header">
                                <div className="form-header-icon">
                                    <FiEdit3 />
                                </div>
                                <div className="form-header-content">
                                    <h3>Personal Information</h3>
                                    <p>Quick details to confirm your appointment.</p>
                                </div>
                            </div>

                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form className="appointment-form">
                                        <div className="form-group">
                                            <label htmlFor="name">
                                                <FiUser /> Full Name *
                                            </label>
                                            <Field
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Enter your full name"
                                                className={`form-input ${errors.name && touched.name ? 'error' : ''}`}
                                            />
                                            <ErrorMessage name="name" component="div" className="error-message" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email">
                                                <FiMail /> Email Address *
                                            </label>
                                            <Field
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                className={`form-input ${errors.email && touched.email ? 'error' : ''}`}
                                            />
                                            <ErrorMessage name="email" component="div" className="error-message" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone">
                                                <FiPhone /> Phone Number *
                                            </label>
                                            <Field
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                placeholder="Enter your phone number"
                                                className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`}
                                            />
                                            <ErrorMessage name="phone" component="div" className="error-message" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="date">
                                                <FiCalendar /> Select Date *
                                            </label>
                                            <div className="date-picker-wrapper">
                                                <div className="date-input-container">
                                                    <FiCalendar className="date-input-icon" />
                                                    <input
                                                        type="date"
                                                        id="date"
                                                        name="date"
                                                        min={getMinDate()}
                                                        max={getMaxDate()}
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        className="form-input date-picker-input"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            {!selectedDate && <div className="error-message">Please select a date</div>}
                                        </div>

                                        {/* ========== NEW: 15 DAYS NOTE ========== */}
                                        <div className="booking-note">
                                            <div className="booking-note-icon">
                                                <FiInfo />
                                            </div>
                                            <div className="booking-note-content">
                                                <p className="booking-note-title">Booking Information</p>
                                                <p className="booking-note-text">
                                                    Bookings are available for the next 15 calendar days (including today).
                                                    For dates beyond this period, please check back tomorrow.
                                                </p>
                                            </div>
                                        </div>

                                        {selectedDate && (
                                            <motion.div
                                                className="selected-date-display"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="selected-date-icon">
                                                    <FiCheckCircle />
                                                </div>
                                                <div className="selected-date-text">
                                                    <strong>Selected Date:</strong> {formatDate(selectedDate)}
                                                </div>
                                            </motion.div>
                                        )}

                                        <button type="submit" style={{ display: 'none' }} />
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - TIME SLOTS */}
                    <motion.div
                        className="appointment-time-section"
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
                    >
                        <div className="time-slots-container">
                            <div className="time-slots-header">
                                <h3>
                                    <FiClock /> Available Time Slots
                                </h3>
                                {selectedDate ? (
                                    <p>{getScheduleMessage()}</p>
                                ) : (
                                    <p>Please select a date first</p>
                                )}

                                {isLoadingSlots && (
                                    <div className="loading-slots">
                                        <FiLoader className="spinner" /> Loading available slots...
                                    </div>
                                )}

                                {isOff && selectedDate && (
                                    <div className="off-message">
                                        <FiAlertCircle /> This date is not available for appointments
                                    </div>
                                )}
                            </div>

                            {/* Time Slots Grid - Shows ALL slots with their status */}
                            {!isLoadingSlots && selectedDate && allSlots.length > 0 && (
                                <div className={`time-slots-grid ${allSlots.length > 8 ? 'scrollable' : ''}`}>
                                    {allSlots.map((slot, index) => {
                                        const statusInfo = getSlotStatusInfo(slot.status);
                                        const isSelected = selectedTime === slot.time;
                                        const isDisabled = slot.status !== 'available';
                                        const timeRange = getTimeRange(slot.time);

                                        return (
                                            <motion.button
                                                key={index}
                                                type="button"
                                                className={`time-slot ${statusInfo.className} ${isSelected ? 'selected' : ''}`}
                                                onClick={() => handleTimeSlotClick(slot.time)}
                                                disabled={isDisabled}
                                                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                                                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                            >
                                                <div className="time-slot-content">
                                                    <div className="time-range">
                                                        <span className="time">{timeRange}</span>
                                                    </div>
                                                    <div className="time-slot-status">
                                                        {statusInfo.icon}
                                                        <span>{statusInfo.text}</span>
                                                    </div>
                                                </div>
                                                {isSelected && (
                                                    <motion.div
                                                        className="time-slot-indicator"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: "spring", stiffness: 200 }}
                                                    />
                                                )}
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            )}

                            {/* No Slots Message */}
                            {!isLoadingSlots && selectedDate && allSlots.length === 0 && (
                                <div className="no-slots-message">
                                    <FiAlertCircle />
                                    <p>No time slots available on this date</p>
                                </div>
                            )}

                            {/* Selected Time Display */}
                            {selectedTime && (
                                <motion.div
                                    className="selected-time-display"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="selected-time-content">
                                        <div className="time-icon">
                                            <FiClock />
                                        </div>
                                        <div className="time-details">
                                            <h4>Selected Time Slot</h4>
                                            <p className="time-slot-detail">
                                                {getTimeRange(selectedTime)}
                                            </p>
                                            {selectedDate && (
                                                <p className="time-date-detail">
                                                    On {formatDate(selectedDate)}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <motion.button
                                type="button"
                                className="appointment-submit-btn"
                                onClick={() => {
                                    if (!selectedDate || !selectedTime) {
                                        toast.dismiss();
                                        toast.error("Please select both date and time", {
                                            position: "top-right",
                                            autoClose: 3000
                                        });
                                        return;
                                    }
                                    const form = document.querySelector('.appointment-form');
                                    if (form) {
                                        const submitEvent = new Event('submit', {
                                            cancelable: true,
                                            bubbles: true
                                        });
                                        form.dispatchEvent(submitEvent);
                                    }
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting || !selectedDate || !selectedTime || isOff}
                            >
                                {isSubmitting ? (
                                    <><FiLoader className="submit-spinner" /> Submitting...</>
                                ) : (
                                    "Request Appointment"
                                )}
                                <span><FiArrowRight /></span>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </>
    );
};

export default AppointmentSection;