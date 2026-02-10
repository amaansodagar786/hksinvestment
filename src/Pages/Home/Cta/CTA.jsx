import React, { useState } from "react";
import { FiArrowRight, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./CTA.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9+\-\s()]*$/, "Phone number is not valid"),
    message: Yup.string()
      .max(500, "Message must be 500 characters or less")
  });


  const API_URL = import.meta.env.VITE_API_URL || 'https://hksinvenstmentbackend.onrender.com/api';


  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    initial: {
      background: "#5e2690",
      color: "#ffffff"
    },
    hover: {
      background: "#ffffff",
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
    initial: {
      background: "#ffffff",
      color: "#5e2690",
      rotate: 0
    },
    hover: {
      background: "#5e2690",
      color: "#ffffff",
      rotate: 45,
      scale: 1.1,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const pulseVariants = {
    initial: {
      boxShadow: "0 0 0 0 rgba(94, 38, 144, 0.4)",
      scale: 1
    },
    animate: {
      boxShadow: [
        "0 0 0 0 rgba(94, 38, 144, 0.4)",
        "0 0 0 20px rgba(94, 38, 144, 0)",
        "0 0 0 0 rgba(94, 38, 144, 0)"
      ],
      scale: [1, 1.02, 1],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: 1
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
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
      scale: 0.8,
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
      const response = await fetch(`${API_URL}/contact/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit form');
      }

      if (data.success) {
        toast.success('Thank you for your message! We will contact you soon.');
        resetForm();
        setIsModalOpen(false);
      } else {
        toast.error(data.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <motion.section
        className="cta-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div
          className="cta-box"
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            variants={textVariants}
          >
            Trusted & Professional <br />
            <motion.span
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Advisors
            </motion.span> for your investments
          </motion.h2>

          <motion.button
            className="cta-btn"
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            onClick={() => setIsModalOpen(true)}
          >
            Contact
            <motion.span
              className="cta-arrow"
              variants={arrowVariants}
            >
              <FiArrowRight />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              className="modal-overlay"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setIsModalOpen(false)}
            />

            <motion.div
              className="contact-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <button
                className="modal-close-btn"
                onClick={() => setIsModalOpen(false)}
              >
                <FiX />
              </button>

              <h3 className="modal-title">Contact Our Advisors</h3>
              <p className="modal-subtitle">Fill out the form below and our team will get back to you within 24 hours.</p>

              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  phone: '',
                  message: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched }) => (
                  <Form className="contact-form">
                    <div className="form-group">
                      <label htmlFor="name">
                        Full Name <span className="required">*</span>
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className={`form-input ${touched.name && errors.name ? 'error' : ''}`}
                        placeholder="Enter your full name"
                      />
                      <ErrorMessage name="name" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">
                        Email Address <span className="required">*</span>
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className={`form-input ${touched.email && errors.email ? 'error' : ''}`}
                        placeholder="Enter your email address"
                      />
                      <ErrorMessage name="email" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number (Optional)</label>
                      <Field
                        type="tel"
                        id="phone"
                        name="phone"
                        className={`form-input ${touched.phone && errors.phone ? 'error' : ''}`}
                        placeholder="Enter your phone number"
                      />
                      <ErrorMessage name="phone" component="div" className="error-message" />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">Message (Optional)</label>
                      <Field
                        as="textarea"
                        id="message"
                        name="message"
                        className={`form-textarea ${touched.message && errors.message ? 'error' : ''}`}
                        placeholder="Tell us about your investment needs..."
                        rows="4"
                      />
                      <ErrorMessage name="message" component="div" className="error-message" />
                    </div>

                    <motion.button
                      type="submit"
                      className="submit-btn"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isSubmitting ? "Sending..." : "Submit Message"}
                      <FiArrowRight className="submit-arrow" />
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

export default CTA;