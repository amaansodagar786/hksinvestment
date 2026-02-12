import React, { useState } from "react";
import {
    FiInstagram,
    FiPhone,
    FiMail,
    FiMapPin,
    FiArrowRight,
    FiSend
} from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Footer.scss";

const Footer = () => {
    const [formData, setFormData] = useState({
        name: "",
        feedback: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        }
    };

    const columnVariants = {
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

    const socialIconVariants = {
        initial: {
            scale: 1,
            color: "#d9ccf3"
        },
        hover: {
            scale: 1.3,
            color: "#ffffff",
            rotate: 360,
            transition: {
                duration: 0.4,
                ease: "easeInOut"
            }
        }
    };

    const listItemVariants = {
        initial: { x: 0 },
        hover: {
            x: 10,
            color: "#d9ccf3",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    const contactItemVariants = {
        initial: { opacity: 0.8 },
        hover: {
            opacity: 1,
            scale: 1.02,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const bottomTextVariants = {
        hidden: {
            opacity: 0,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const copyrightVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 0.85,
            transition: {
                duration: 0.6,
                delay: 0.5
            }
        }
    };

    const pulseVariants = {
        initial: { opacity: 0.9 },
        animate: {
            opacity: [0.9, 1, 0.9],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const formInputVariants = {
        focus: {
            scale: 1.02,
            borderColor: "#d9ccf3",
            boxShadow: "0 0 0 3px rgba(217, 204, 243, 0.2)",
            transition: {
                duration: 0.2
            }
        }
    };

    const buttonVariants = {
        initial: {
            background: "linear-gradient(90deg, #5e2690, #7a3db8)",
            scale: 1
        },
        hover: {
            scale: 1.05,
            boxShadow: "0 10px 25px rgba(94, 38, 144, 0.4)",
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

    const guideItems = ["HOME", "CONTACT", "PRIVACY POLICY"];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!formData.name.trim()) {
            toast.error("Please enter your name");
            return;
        }
        if (!formData.feedback.trim()) {
            toast.error("Please enter your feedback");
            return;
        }

        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            toast.success("Thank you for your feedback! 🙏");
            setFormData({ name: "", feedback: "" });
            setIsSubmitting(false);
        }, 1500);
    };

    return (
        <>
            <ToastContainer 
                position="top-right" 
                autoClose={4000}
                theme="dark"
            />
            <motion.footer
                className="footer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={containerVariants}
            >
                <div className="footer-top">
                    {/* COLUMN 1: FEEDBACK FORM - NEW */}
                    <motion.div
                        className="footer-col feedback"
                        variants={columnVariants}
                    >
                        <motion.h4
                            initial={{ opacity: 0.7 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            GIVE FEEDBACK
                        </motion.h4>
                        
                        <form className="feedback-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="footer-name">Your Name</label>
                                <motion.input
                                    type="text"
                                    id="footer-name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your name"
                                    className="feedback-input"
                                    whileFocus="focus"
                                    variants={formInputVariants}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="footer-feedback">Your Feedback</label>
                                <motion.textarea
                                    id="footer-feedback"
                                    name="feedback"
                                    value={formData.feedback}
                                    onChange={handleInputChange}
                                    placeholder="Tell us what you think..."
                                    className="feedback-textarea"
                                    rows="3"
                                    whileFocus="focus"
                                    variants={formInputVariants}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="feedback-btn"
                                variants={buttonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : "Send Feedback"}
                                <FiSend className="send-icon" />
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* COLUMN 2: BRAND - WITH COPYRIGHT ANCHOR */}
                    <motion.div
                        className="footer-col brand"
                        variants={columnVariants}
                    >
                        <motion.h3
                            variants={pulseVariants}
                            initial="initial"
                            animate="animate"
                        >
                            Finance. Freedom. Future.
                        </motion.h3>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Redefining wealth, <br />
                            one decision at a time.
                        </motion.p>

                        <div className="socials">
                            {[FiInstagram, FaFacebookF, FaLinkedinIn, FaYoutube].map((Icon, index) => (
                                <motion.div
                                    key={index}
                                    variants={socialIconVariants}
                                    initial="initial"
                                    whileHover="hover"
                                >
                                    <Icon />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* COLUMN 3: GUIDE */}
                    <motion.div
                        className="footer-col"
                        variants={columnVariants}
                    >
                        <motion.h4
                            initial={{ opacity: 0.7 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        >
                            GUIDE
                        </motion.h4>
                        <ul>
                            {guideItems.map((item, index) => (
                                <motion.li
                                    key={index}
                                    variants={listItemVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    transition={{ delay: index * 0.1 }}
                                >
                                    {item}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* COLUMN 4: CONTACT */}
                    <motion.div
                        className="footer-col contact"
                        variants={columnVariants}
                    >
                        <motion.p
                            variants={contactItemVariants}
                            whileHover="hover"
                        >
                            <IoIosCall /> +358 415737082
                        </motion.p>
                        <motion.p
                            variants={contactItemVariants}
                            whileHover="hover"
                            transition={{ delay: 0.1 }}
                        >
                            <MdEmail /> hk.sangani80@gmail.com
                        </motion.p>
                        <motion.p
                            variants={contactItemVariants}
                            whileHover="hover"
                            transition={{ delay: 0.2 }}
                        >
                            <FaLocationDot className="location-icon" />
                            Uomarinne 1 B 20 Vantaa 01600 <br />
                            Uusima Finland.
                        </motion.p>
                    </motion.div>
                </div>

                {/* COPYRIGHT ROW - ALIGNED WITH BRAND COLUMN */}
                <motion.div
                    className="copyright-row"
                    variants={copyrightVariants}
                >
                    <motion.span
                        whileHover={{
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                        className="copyright-brand"
                    >
                        Copyright © 2026 hksinvestment, All Rights Reserved.
                    </motion.span>
                    <motion.span
                        className="developer-text"
                        whileHover={{
                            scale: 1.02,
                            color: "#ffffff",
                            transition: { duration: 0.2 }
                        }}
                    >
                        Design and Developed by <strong>TECHCORSES</strong>
                    </motion.span>
                </motion.div>

                {/* BOTTOM BIG TEXT */}
                <motion.div
                    className="footer-bottom"
                    variants={bottomTextVariants}
                >
                    YOUR GOALS. OUR GUIDANCE.
                </motion.div>
            </motion.footer>
        </>
    );
};

export default Footer;