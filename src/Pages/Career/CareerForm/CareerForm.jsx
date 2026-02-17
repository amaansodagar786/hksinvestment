import React from "react";
import { motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiInstagram,
    FiArrowRight,
    FiUser,
    FiCheckCircle
} from "react-icons/fi";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import "./CareerForm.scss";

const CareerForm = () => {
    // Animation variants - EXACT SAME as ContactSection
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const iconVariants = {
        initial: { scale: 1, color: "#7a3db8" },
        hover: {
            scale: 1.2,
            color: "#5e2690",
            rotate: 360,
            transition: {
                duration: 0.4,
                ease: "easeInOut"
            }
        }
    };

    const contactItemVariants = {
        initial: { opacity: 0.8, x: 0 },
        hover: {
            opacity: 1,
            x: 10,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const buttonVariants = {
        initial: {
            background: "#5e2690",
            color: "#fff"
        },
        hover: {
            background: "#fff",
            color: "#5e2690",
            border: "2px solid #5e2690",
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        tap: {
            scale: 0.98,
            transition: {
                duration: 0.1
            }
        }
    };

    const arrowVariants = {
        hover: {
            rotate: 45,
            scale: 1.1,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    // Form validation schema
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .required("First name is required")
            .min(2, "First name must be at least 2 characters"),
        lastName: Yup.string()
            .required("Last name is required")
            .min(2, "Last name must be at least 2 characters"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string()
            .matches(/^[0-9\-\+ ]+$/, "Invalid phone number")
            .required("Phone number is required"),
        llqpLicense: Yup.string()
            .required("Please select an option")
    });

    // Initial form values
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        llqpLicense: ""
    };

    // Handle form submission
    const handleSubmit = (values, { resetForm, setSubmitting }) => {
        console.log("Form submitted:", values);

        // Simulate API call
        setTimeout(() => {
            toast.success("Application submitted successfully! We'll contact you soon.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });

            resetForm();
            setSubmitting(false);
        }, 1000);
    };

    const socialIcons = [
        { Icon: FiInstagram, label: "Instagram" },
        { Icon: FaFacebookF, label: "Facebook" },
        { Icon: FaLinkedinIn, label: "LinkedIn" },
        { Icon: FaTwitter, label: "Twitter" }
    ];

    const contactInfo = [
        {
            icon: <FiPhone />,
            text: "+1 (416) 555-0123",
            type: "phone"
        },
        {
            icon: <FiMail />,
            text: "careers@company.com",
            type: "email"
        },
        {
            icon: <FiMapPin />,
            text: "123 Business Avenue, Suite 100 Toronto, ON M5V 2T6",
            type: "address"
        }
    ];

    return (
        <>
            <ToastContainer />
            <motion.section
                className="career-form-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={containerVariants}
            >
                <div className="career-form-header">
                    <motion.span
                        className="career-pill"
                        variants={itemVariants}
                    >
                        Join Our Team
                    </motion.span>
                    <motion.h2
                        variants={itemVariants}
                    >
                        Ready to build your <span>future</span> with us?
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                    >
                    Your help is important for us.
                    </motion.p>
                </div>

                <div className="career-content">
                    {/* LEFT SIDE - CONTACT INFO */}
                    <motion.div
                        className="career-info"
                        variants={itemVariants}
                    >
                        <div className="career-info-content">
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                Why Join Us?
                            </motion.h3>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                Be part of a dynamic team shaping the future of financial technology.
                                We offer growth opportunities, competitive benefits, and a supportive culture.
                            </motion.p>

                            {/* CONTACT ITEMS */}
                            <div className="career-items">
                                {contactInfo.map((item, index) => (
                                    <motion.div
                                        key={index}
                                        className="career-item"
                                        variants={contactItemVariants}
                                        initial="initial"
                                        whileHover="hover"
                                        custom={index}
                                    >
                                        <div className="career-item-icon">
                                            {item.icon}
                                        </div>
                                        <div className="career-item-text">
                                            {item.text}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* SOCIAL ICONS */}
                            <motion.div
                                className="career-socials"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <h4>Follow Us</h4>
                                <div className="social-icons">
                                    {socialIcons.map((social, index) => (
                                        <motion.a
                                            key={index}
                                            href="#"
                                            className="social-icon"
                                            variants={iconVariants}
                                            initial="initial"
                                            whileHover="hover"
                                            whileTap={{ scale: 0.9 }}
                                            aria-label={social.label}
                                        >
                                            <social.Icon />
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* RIGHT SIDE - FORM */}
                    <motion.div
                        className="career-form-wrapper"
                        variants={itemVariants}
                    >
                        <div className="career-form-container">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting, errors, touched }) => (
                                    <Form className="career-form">
                                        {/* FIRST NAME & LAST NAME ROW */}
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label htmlFor="firstName">
                                                    <FiUser /> First Name *
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="firstName"
                                                    name="firstName"
                                                    placeholder="Enter your first name"
                                                    className={`form-input ${errors.firstName && touched.firstName ? 'error' : ''}`}
                                                />
                                                <ErrorMessage name="firstName" component="div" className="error-message" />
                                            </div>

                                            <div className="form-group">
                                                <label htmlFor="lastName">
                                                    <FiUser /> Last Name *
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="lastName"
                                                    name="lastName"
                                                    placeholder="Enter your last name"
                                                    className={`form-input ${errors.lastName && touched.lastName ? 'error' : ''}`}
                                                />
                                                <ErrorMessage name="lastName" component="div" className="error-message" />
                                            </div>
                                        </div>

                                        {/* EMAIL FIELD */}
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

                                        {/* PHONE FIELD */}
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

                                        {/* LLQP LICENSE RADIO */}
                                        <div className="form-group">
                                            <label>
                                                <FiCheckCircle /> Do you have LLQP License? *
                                            </label>
                                            <div className="radio-group">
                                                <label className="radio-label">
                                                    <Field type="radio" name="llqpLicense" value="yes" />
                                                    <span>Yes</span>
                                                </label>
                                                <label className="radio-label">
                                                    <Field type="radio" name="llqpLicense" value="no" />
                                                    <span>No</span>
                                                </label>
                                            </div>
                                            <ErrorMessage name="llqpLicense" component="div" className="error-message" />
                                        </div>

                                        {/* SUBMIT BUTTON */}
                                        <motion.button
                                            type="submit"
                                            className="submit-btn"
                                            variants={buttonVariants}
                                            initial="initial"
                                            whileHover="hover"
                                            whileTap="tap"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Submitting..." : "Submit Application"}
                                            <motion.span
                                                variants={arrowVariants}
                                            >
                                                <FiArrowRight />
                                            </motion.span>
                                        </motion.button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </motion.div>
                </div>
            </motion.section>
        </>
    );
};

export default CareerForm;