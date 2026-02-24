// ServiceInquiryModal.jsx (UPDATED with real API)
import React from "react";
import { FiArrowRight, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ServiceInquiryModal.scss";

const ServiceInquiryModal = ({ isOpen, onClose }) => {
    const API_URL = import.meta.env.VITE_API_URL;

    // Service options from the Services section
    const serviceOptions = [
        "Financial Advising",
        "Systematic Investment Plan",
        "Market-Based Research Plan",
        "Registered Retirement Saving Plan",
        "Wealth Account Management",
        "Tax Optimization"
    ];

    // Validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .min(2, "Name must be at least 2 characters"),
        phone: Yup.string()
            .required("Phone number is required")
            .matches(/^[0-9+\-\s()]*$/, "Phone number is not valid"),
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email address"),
        service: Yup.string()
            .required("Please select a service"),
        message: Yup.string()
            .max(500, "Message must be 500 characters or less")
    });

    // Animation variants
    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            y: -20
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 20,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 }
    };

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await fetch(`${API_URL}/service-inquiry/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            // Handle non-JSON responses
            const text = await response.text();
            let data;
            try {
                data = JSON.parse(text);
            } catch (e) {
                console.error('Invalid JSON response:', text);
                throw new Error('Server returned invalid response');
            }

            if (!response.ok) {
                if (response.status === 429) {
                    toast.warning(data.message || 'Please wait 48 hours between service inquiries');
                    return;
                }
                throw new Error(data.message || 'Failed to submit inquiry');
            }

            if (data.success) {
                toast.success(`Thank you for your interest in ${values.service}! Our team will contact you within 24 hours.`);
                resetForm();
                onClose();
            } else {
                toast.error(data.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Error submitting inquiry:', error);
            toast.error(error.message || 'Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="service-modal-overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                    />

                    <motion.div
                        className="service-modal"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <button
                            className="service-modal-close-btn"
                            onClick={onClose}
                            type="button"
                        >
                            <FiX />
                        </button>

                        <h3 className="service-modal-title">Service Inquiry</h3>
                        <p className="service-modal-subtitle">Tell us which service interests you and our team will get back to you within 24 hours.</p>

                        <Formik
                            initialValues={{
                                name: '',
                                phone: '',
                                email: '',
                                service: '',
                                message: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form className="service-form">
                                    {/* Row 1: Name and Phone */}
                                    <div className="service-form-row-2col">
                                        <div className="service-form-group">
                                            <label htmlFor="name">
                                                Full Name <span className="required">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                id="name"
                                                name="name"
                                                className={`service-form-input ${touched.name && errors.name ? 'error' : ''}`}
                                                placeholder="Enter your full name"
                                                disabled={isSubmitting}
                                            />
                                            <ErrorMessage name="name" component="div" className="error-message" />
                                        </div>

                                        <div className="service-form-group">
                                            <label htmlFor="phone">
                                                Phone Number <span className="required">*</span>
                                            </label>
                                            <Field
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className={`service-form-input ${touched.phone && errors.phone ? 'error' : ''}`}
                                                placeholder="+1 (123) 456-7890"
                                                disabled={isSubmitting}
                                            />
                                            <ErrorMessage name="phone" component="div" className="error-message" />
                                        </div>
                                    </div>

                                    {/* Row 2: Email and Service Selection */}
                                    <div className="service-form-row-2col">
                                        <div className="service-form-group">
                                            <label htmlFor="email">
                                                Email Address <span className="required">*</span>
                                            </label>
                                            <Field
                                                type="email"
                                                id="email"
                                                name="email"
                                                className={`service-form-input ${touched.email && errors.email ? 'error' : ''}`}
                                                placeholder="your@email.com"
                                                disabled={isSubmitting}
                                            />
                                            <ErrorMessage name="email" component="div" className="error-message" />
                                        </div>

                                        <div className="service-form-group">
                                            <label htmlFor="service">
                                                Select Service <span className="required">*</span>
                                            </label>
                                            <Field
                                                as="select"
                                                id="service"
                                                name="service"
                                                className={`service-form-select ${touched.service && errors.service ? 'error' : ''}`}
                                                disabled={isSubmitting}
                                            >
                                                <option value="">Choose a service</option>
                                                {serviceOptions.map((service, index) => (
                                                    <option key={index} value={service}>{service}</option>
                                                ))}
                                            </Field>
                                            <ErrorMessage name="service" component="div" className="error-message" />
                                        </div>
                                    </div>

                                    {/* Row 3: Message */}
                                    <div className="service-form-row-full">
                                        <div className="service-form-group">
                                            <label htmlFor="message">Message (Optional)</label>
                                            <Field
                                                as="textarea"
                                                id="message"
                                                name="message"
                                                className={`service-form-textarea ${touched.message && errors.message ? 'error' : ''}`}
                                                placeholder="Tell us more about your requirements..."
                                                rows="4"
                                                disabled={isSubmitting}
                                            />
                                            <ErrorMessage name="message" component="div" className="error-message" />
                                        </div>
                                    </div>

                                    {/* Row 4: Submit Button */}
                                    <motion.button
                                        type="submit"
                                        className={`service-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                                        disabled={isSubmitting}
                                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span>Submitting...</span>
                                                <div className="spinner"></div>
                                            </>
                                        ) : (
                                            <>
                                                Submit Inquiry
                                                <FiArrowRight className="service-submit-arrow" />
                                            </>
                                        )}
                                    </motion.button>

                                    {/* Cooldown info text */}
                                   
                                </Form>
                            )}
                        </Formik>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ServiceInquiryModal;