import React, { useState } from "react";
import { FiArrowRight, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./ContactHero.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ContactHero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Validation schema for General Inquiry
    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .min(2, "Name must be at least 2 characters"),
        phone: Yup.string()
            .required("Phone number is required")
            .matches(/^[0-9+\-\s()]*$/, "Phone number is not valid"),
        email: Yup.string()
            .email("Invalid email address"),
        reason: Yup.string()
            .required("Please select a reason"),
        message: Yup.string()
            .max(500, "Message must be 500 characters or less")
    });

    // Animation variants - SAME AS PRICING/CAREER
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut"
            }
        }
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    const buttonVariants = {
        initial: { background: "#5e2690", scale: 1 },
        hover: {
            background: "#4a1f73",
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        tap: {
            scale: 0.95,
            transition: { duration: 0.1 }
        }
    };

    // Animation for the highlighted word
    const highlightVariants = {
        initial: {
            scale: 1,
            boxShadow: "0 0 0 rgba(94, 38, 144, 0.4)"
        },
        animate: {
            scale: [1, 1.02, 1],
            boxShadow: [
                "0 0 0 rgba(94, 38, 144, 0.4)",
                "0 0 15px rgba(94, 38, 144, 0.6)",
                "0 0 0 rgba(94, 38, 144, 0.4)"
            ],
            transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        },
        hover: {
            scale: 1.05,
            backgroundColor: "rgba(122, 61, 184, 0.25)",
            borderColor: "#8a4fc8",
            boxShadow: "0 0 25px rgba(94, 38, 144, 0.8)",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    // ✅ MODAL VARIANTS
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
        // Simulate API call - just show success toast
        setTimeout(() => {
            toast.success('Thank you for your general inquiry! Our team will contact you soon.');
            resetForm();
            setIsModalOpen(false);
            setSubmitting(false);
        }, 1000);
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <motion.section
                className="contact-hero-wrapper"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="contact-hero-top">
                    <motion.div
                        className="contact-hero-content"
                        variants={containerVariants}
                    >
                        <motion.h1
                            className="contact-hero-title"
                            variants={titleVariants}
                        >
                            Let's start your <br />
                            <motion.span
                                className="contact-highlight"
                                variants={highlightVariants}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                            >
                                Financial
                            </motion.span>
                            {" "}journey
                        </motion.h1>

                        <motion.p
                            className="contact-hero-subtitle"
                            variants={itemVariants}
                        >
                            Get personalized financial guidance today!
                            <br />
                            Our expert advisors are ready to help you achieve your goals.
                        </motion.p>

                        <motion.button
                            className="contact-hero-btn"
                            variants={itemVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <span className="contact-hero-btn-fill"></span>
                            <span className="contact-hero-btn-text">Schedule a Call</span>
                            <span className="contact-hero-btn-arrow">
                                <FiArrowRight />
                            </span>
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>

            {/* ✅ GENERAL INQUIRY MODAL */}
            <AnimatePresence>
                {isModalOpen && (
                    <>
                        <motion.div
                            className="inquiry-modal-overlay"
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={() => setIsModalOpen(false)}
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
                                onClick={() => setIsModalOpen(false)}
                            >
                                <FiX />
                            </button>

                            <h3 className="inquiry-modal-title">General Inquiry</h3>
                            <p className="inquiry-modal-subtitle">Fill out the form below and our team will get back to you within 24 hours.</p>

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
                                                />
                                                <ErrorMessage name="phone" component="div" className="error-message" />
                                            </div>
                                        </div>

                                        {/* Row 2: Email and Reason */}
                                        <div className="inquiry-form-row-2col">
                                            <div className="inquiry-form-group">
                                                <label htmlFor="email">Email Address (Optional)</label>
                                                <Field
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    className={`inquiry-form-input ${touched.email && errors.email ? 'error' : ''}`}
                                                    placeholder="your@email.com"
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
                                                />
                                                <ErrorMessage name="message" component="div" className="error-message" />
                                            </div>
                                        </div>

                                        {/* Row 4: Submit Button */}
                                        <motion.button
                                            type="submit"
                                            className="inquiry-submit-btn"
                                            disabled={isSubmitting}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Inquiry"}
                                            <FiArrowRight className="inquiry-submit-arrow" />
                                        </motion.button>
                                    </Form>
                                )}
                            </Formik>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default ContactHero;