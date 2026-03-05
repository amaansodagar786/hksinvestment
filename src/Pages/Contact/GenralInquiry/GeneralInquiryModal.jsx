// GeneralInquiryModal.jsx
import React from "react";
import { FiArrowRight, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./GeneralInquiryModal.scss";

const GeneralInquiryModal = ({ isOpen, onClose, source = "default" }) => {
    const API_URL = import.meta.env.VITE_API_URL;

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
        reason: Yup.string()
            .required("Please select a reason"),
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

    const handleSubmit = async (values, { setSubmitting, resetForm, setFieldError }) => {
        try {
            const response = await fetch(`${API_URL}/general-inquiry/submit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            });

            const data = await response.json();

            if (!response.ok) {
                // Handle 429 cooldown error specifically
                if (response.status === 429) {
                    toast.warning(data.message || 'Please wait 48 hours between inquiries');
                    return;
                }
                throw new Error(data.message || 'Failed to submit inquiry');
            }

            if (data.success) {
                toast.success('Thank you for your inquiry! Our team will contact you within 24 hours.');
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
                        className="inquiry-modal-overlay"
                        variants={overlayVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={onClose}
                    />

                    <motion.div
                        className="inquiry-modal"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <button
                            className="inquiry-modal-close-btn"
                            onClick={onClose}
                            type="button"
                        >
                            <FiX />
                        </button>

                        <h3 className="inquiry-modal-title">
                            {source === 'privacy-questions' ? 'Any Questions?' : 'General Inquiry'}
                        </h3>
                        <p className="inquiry-modal-subtitle">
                            {source === 'privacy-questions'
                                ? 'Have questions about your privacy? Fill out the form below and our team will get back to you within 24 hours.'
                                : 'Fill out the form below and our team will get back to you within 24 hours.'
                            }
                        </p>
                        <Formik
                            initialValues={{
                                name: '',
                                phone: '',
                                email: '',
                                reason: '',
                                message: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form className="inquiry-form">
                                    {/* Row 1: Name and Phone */}
                                    <div className="inquiry-form-row-2col">
                                        <div className="inquiry-form-group">
                                            <label htmlFor="name">
                                                Full Name <span className="required">*</span>
                                            </label>
                                            <Field
                                                type="text"
                                                id="name"
                                                name="name"
                                                className={`inquiry-form-input ${touched.name && errors.name ? 'error' : ''}`}
                                                placeholder="Enter your full name"
                                                disabled={isSubmitting}
                                            />
                                            <ErrorMessage name="name" component="div" className="error-message" />
                                        </div>

                                        <div className="inquiry-form-group">
                                            <label htmlFor="phone">
                                                Phone Number <span className="required">*</span>
                                            </label>
                                            <Field
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                className={`inquiry-form-input ${touched.phone && errors.phone ? 'error' : ''}`}
                                                placeholder="+1 (123) 456-7890"
                                                disabled={isSubmitting}
                                            />
                                            <ErrorMessage name="phone" component="div" className="error-message" />
                                        </div>
                                    </div>

                                    {/* Row 2: Email and Reason */}
                                    <div className="inquiry-form-row-2col">
                                        <div className="inquiry-form-group">
                                            <label htmlFor="email">
                                                Email Address <span className="required">*</span>
                                            </label>
                                            <Field
                                                type="email"
                                                id="email"
                                                name="email"
                                                className={`inquiry-form-input ${touched.email && errors.email ? 'error' : ''}`}
                                                placeholder="your@email.com"
                                                disabled={isSubmitting}
                                            />
                                            <ErrorMessage name="email" component="div" className="error-message" />
                                        </div>

                                        <div className="inquiry-form-group">
                                            <label htmlFor="reason">
                                                Reason for Inquiry <span className="required">*</span>
                                            </label>
                                            <Field
                                                as="select"
                                                id="reason"
                                                name="reason"
                                                className={`inquiry-form-select ${touched.reason && errors.reason ? 'error' : ''}`}
                                                disabled={isSubmitting}
                                            >
                                                <option value="">Select a reason</option>
                                                <option value="General Inquiry">General Inquiry</option>
                                                <option value="Investment Advice">Investment Advice</option>
                                                <option value="Account Support">Account Support</option>
                                                <option value="Others">Others</option>
                                            </Field>
                                            <ErrorMessage name="reason" component="div" className="error-message" />
                                        </div>
                                    </div>

                                    {/* Row 3: Message */}
                                    <div className="inquiry-form-row-full">
                                        <div className="inquiry-form-group">
                                            <label htmlFor="message">Message (Optional)</label>
                                            <Field
                                                as="textarea"
                                                id="message"
                                                name="message"
                                                className={`inquiry-form-textarea ${touched.message && errors.message ? 'error' : ''}`}
                                                placeholder="Tell us about your inquiry..."
                                                rows="4"
                                                disabled={isSubmitting}
                                            />
                                            <ErrorMessage name="message" component="div" className="error-message" />
                                        </div>
                                    </div>

                                    {/* Row 4: Submit Button */}
                                    <motion.button
                                        type="submit"
                                        className={`inquiry-submit-btn ${isSubmitting ? 'submitting' : ''}`}
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
                                                <FiArrowRight className="inquiry-submit-arrow" />
                                            </>
                                        )}
                                    </motion.button>


                                </Form>
                            )}
                        </Formik>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default GeneralInquiryModal;