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
    FiEdit3
} from "react-icons/fi";
import "./AppointmentSection.scss";

const AppointmentSection = () => {
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [bookedSlots, setBookedSlots] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Generate 1-hour time slots from 10:00 to 18:00
    const generateAllTimeSlots = () => {
        const slots = [];
        for (let hour = 10; hour < 18; hour++) {
            const timeString = `${hour.toString().padStart(2, '0')}:00`;
            slots.push(timeString);
        }
        return slots;
    };

    const allTimeSlots = generateAllTimeSlots();
    const todayDate = getTodayDate();

    // Fetch booked slots when date is selected
    useEffect(() => {
        if (selectedDate) {
            fetchBookedSlots(selectedDate);
        } else {
            setBookedSlots([]);
            setAvailableSlots(allTimeSlots);
        }
    }, [selectedDate]);

    // Fetch booked slots from API
    const fetchBookedSlots = async (date) => {
        try {
            setIsLoadingSlots(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/appointments/slots/${date}`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch time slots');
            }

            const data = await response.json();

            if (data.success) {
                setBookedSlots(data.data.bookedSlots);
                setAvailableSlots(data.data.availableSlots);
            } else {
                throw new Error(data.message || 'Failed to fetch slots');
            }
        } catch (error) {
            console.error('Error fetching booked slots:', error);
            toast.error('Failed to load available time slots. Please try again.', {
                position: "top-right",
                autoClose: 3000
            });
            // Fallback to all slots as available
            setBookedSlots([]);
            setAvailableSlots(allTimeSlots);
        } finally {
            setIsLoadingSlots(false);
        }
    };

    // Check if a time slot is booked
    const isTimeSlotBooked = (time) => {
        return bookedSlots.includes(time);
    };

    // Check if a time slot is available
    const isTimeSlotAvailable = (time) => {
        return availableSlots.includes(time);
    };

    // Handle date change
    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
        setSelectedTime(null);
    };

    // Handle time slot selection
    const handleTimeSlotClick = (time) => {
        if (isTimeSlotAvailable(time)) {
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
                toast.success(
                    `Appointment booked successfully! Reference: ${data.data.referenceId}`,
                    {
                        position: "top-right",
                        autoClose: 5000,
                    }
                );

                resetForm();
                setSelectedDate("");
                setSelectedTime(null);
                setBookedSlots([]);
                setAvailableSlots(allTimeSlots);
            } else {
                throw new Error(data.message || 'Booking failed');
            }
        } catch (error) {
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
        const date = new Date(dateString);
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
                    <motion.span className="appointment-pill" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                        Book Appointment
                    </motion.span>
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                        Schedule Your Free <span>Financial Consultation</span>
                    </motion.h2>
                    <motion.p variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                        Select a convenient time for your personalized financial planning session.
                    </motion.p>
                </div>

                <div className="appointment-content">
                    {/* LEFT SIDE - FORM */}
                    <motion.div className="appointment-form-section" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                        <div className="appointment-form-container">
                            <div className="form-header">
                                <div className="form-header-icon">
                                    <FiEdit3 />
                                </div>
                                <div className="form-header-content">
                                    <h3>Personal Information</h3>
                                    <p>Quick details to confirm your appointment</p>                                </div>
                            </div>

                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                                {({ errors, touched }) => (
                                    <Form className="appointment-form">
                                        <div className="form-group">
                                            <label htmlFor="name"><FiUser /> Full Name *</label>
                                            <Field type="text" id="name" name="name" placeholder="Enter your full name" className={`form-input ${errors.name && touched.name ? 'error' : ''}`} />
                                            <ErrorMessage name="name" component="div" className="error-message" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="email"><FiMail /> Email Address *</label>
                                            <Field type="email" id="email" name="email" placeholder="Enter your email" className={`form-input ${errors.email && touched.email ? 'error' : ''}`} />
                                            <ErrorMessage name="email" component="div" className="error-message" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="phone"><FiPhone /> Phone Number *</label>
                                            <Field type="tel" id="phone" name="phone" placeholder="Enter your phone number" className={`form-input ${errors.phone && touched.phone ? 'error' : ''}`} />
                                            <ErrorMessage name="phone" component="div" className="error-message" />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="date"><FiCalendar /> Select Date *</label>
                                            <div className="date-picker-wrapper">
                                                <div className="date-input-container">
                                                    <FiCalendar className="date-input-icon" />
                                                    <input type="date" id="date" name="date" min={getMinDate()} value={selectedDate} onChange={handleDateChange} className="form-input date-picker-input" required />
                                                </div>
                                            </div>
                                            {!selectedDate && <div className="error-message">Please select a date</div>}
                                        </div>

                                        {selectedDate && (
                                            <motion.div className="selected-date-display" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                                                <div className="selected-date-icon"><FiCheckCircle /></div>
                                                <div className="selected-date-text"><strong>Selected Date:</strong> {formatDate(selectedDate)}</div>
                                            </motion.div>
                                        )}

                                        <button type="submit" style={{ display: 'none' }} />
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - TIME SLOTS */}
                    <motion.div className="appointment-time-section" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}>
                        <div className="time-slots-container">
                            <div className="time-slots-header">
                                <h3><FiClock /> Available Time Slots</h3>
                                {selectedDate ? <p>Select a 1-hour time slot for {formatDate(selectedDate)}</p> : <p>Please select a date first</p>}
                                {isLoadingSlots && <div className="loading-slots"><FiLoader className="spinner" /> Loading available slots...</div>}
                            </div>

                            <div className="time-slots-grid">
                                {allTimeSlots.map((time, index) => {
                                    const isBooked = isTimeSlotBooked(time);
                                    const isAvailable = isTimeSlotAvailable(time);
                                    const isSelected = selectedTime === time;
                                    const nextHour = `${(parseInt(time.split(':')[0]) + 1).toString().padStart(2, '0')}:00`;
                                    const isDisabled = !selectedDate || isBooked || !isAvailable;

                                    return (
                                        <motion.button
                                            key={index}
                                            type="button"
                                            className={`time-slot ${isSelected ? 'selected' : ''} ${isBooked ? 'booked' : ''} ${!isAvailable ? 'unavailable' : ''}`}
                                            onClick={() => handleTimeSlotClick(time)}
                                            disabled={isDisabled}
                                            whileHover={!isDisabled ? { scale: 1.05 } : {}}
                                            whileTap={!isDisabled ? { scale: 0.95 } : {}}
                                        >
                                            <div className="time-slot-content">
                                                <div className="time-range">
                                                    <span className="time">{time}</span>
                                                    <span className="separator">-</span>
                                                    <span className="time">{nextHour}</span>
                                                </div>
                                                <div className="time-slot-status">
                                                    {isBooked ? <><FiXCircle /><span>Booked</span></> :
                                                        !isAvailable ? <><FiXCircle /><span>Unavailable</span></> :
                                                            isSelected ? <><FiCheckCircle /><span>Selected</span></> :
                                                                <span>Available</span>}
                                                </div>
                                            </div>
                                            {isSelected && <motion.div className="time-slot-indicator" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} />}
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {selectedTime && (
                                <motion.div className="selected-time-display" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                                    <div className="selected-time-content">
                                        <div className="time-icon"><FiClock /></div>
                                        <div className="time-details">
                                            <h4>Selected Time Slot</h4>
                                            <p className="time-slot-detail">{selectedTime} - {`${(parseInt(selectedTime.split(':')[0]) + 1).toString().padStart(2, '0')}:00`}</p>
                                            {selectedDate && <p className="time-date-detail">On {formatDate(selectedDate)}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <motion.button
                                type="button"
                                className="appointment-submit-btn"
                                onClick={() => {
                                    if (!selectedDate || !selectedTime) {
                                        toast.error("Please select both date and time", { position: "top-right", autoClose: 3000 });
                                        return;
                                    }
                                    const form = document.querySelector('.appointment-form');
                                    if (form) {
                                        const submitEvent = new Event('submit', { cancelable: true, bubbles: true });
                                        form.dispatchEvent(submitEvent);
                                    }
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting || !selectedDate || !selectedTime}
                            >
                                {isSubmitting ? <><FiLoader className="submit-spinner" /> Booking...</> : "Confirm Appointment"}
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