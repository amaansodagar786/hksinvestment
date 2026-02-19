import React, { useState } from "react";
import {
    FiInstagram,
    FiSend,
    FiArrowRight
} from "react-icons/fi";
import { FaYoutube, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import { NavLink, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Footer.scss";

const Footer = () => {
    const [formData, setFormData] = useState({
        name: "",
        feedback: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();

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

    // KEEP SOCIAL ICONS VARIANTS EXACTLY AS IS - DO NOT CHANGE
    const socialIconVariants = {
        initial: { scale: 1, color: "#d9ccf3" },
        hover: {
            scale: 1.3,
            color: "#ffffff",
            rotate: 360,
            transition: { duration: 0.4, ease: "easeInOut" }
        }
    };

    // UPGRADED: Guide list item variants with more premium effect
    const listItemVariants = {
        initial: { x: 0, opacity: 0.8 },
        hover: {
            x: 15,
            color: "#ffffff",
            opacity: 1,
            textShadow: "0 0 8px rgba(255,255,255,0.5)",
            transition: {
                duration: 0.4,
                ease: [0.19, 1, 0.22, 1]
            }
        }
    };

    // UPGRADED: Contact items with more sophisticated hover
    const contactItemVariants = {
        initial: { opacity: 0.8, x: 0 },
        hover: {
            opacity: 1,
            x: 8,
            transition: {
                duration: 0.4,
                ease: "easeOut"
            }
        }
    };

    // UPGRADED: Icon inside contact items
    const contactIconVariants = {
        initial: { scale: 1, color: "#d9ccf3" },
        hover: {
            scale: 1.2,
            color: "#ffffff",
            rotate: [0, -10, 10, 0],
            transition: {
                duration: 0.5,
                ease: "easeInOut"
            }
        }
    };

    // UPDATED: Bottom text variants - CHANGED TO WHITE
    const bottomTextVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
        }
    };

    // KEEP COPYRIGHT VARIANTS EXACTLY AS IS
    const copyrightVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 0.85,
            transition: { duration: 0.6, delay: 0.5 }
        }
    };

    // KEEP PULSE VARIANTS EXACTLY AS IS
    const pulseVariants = {
        initial: { opacity: 0.9 },
        animate: {
            opacity: [0.9, 1, 0.9],
            transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }
    };

    // UPGRADED: Button variants
    const buttonVariants = {
        initial: {
            background: "linear-gradient(90deg, #5e2690, #7a3db8)",
            scale: 1,
            boxShadow: "0 4px 15px rgba(94, 38, 144, 0.2)"
        },
        hover: {
            scale: 1.05,
            boxShadow: "0 15px 30px rgba(94, 38, 144, 0.6), 0 0 20px rgba(217, 204, 243, 0.4)",
            transition: {
                duration: 0.3,
                ease: "easeInOut",
                boxShadow: { duration: 0.4 }
            }
        },
        tap: { scale: 0.98, transition: { duration: 0.1 } }
    };

    // Arrow icon variants
    const arrowIconVariants = {
        initial: { x: 0, rotate: 0 },
        hover: {
            x: 5,
            rotate: 15,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 10
            }
        }
    };

    // Section headers hover effect
    const headerVariants = {
        initial: { letterSpacing: "1px", opacity: 0.7 },
        hover: {
            letterSpacing: "2px",
            opacity: 1,
            textShadow: "0 0 10px rgba(217, 204, 243, 0.5)",
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    // Form input focus variants
    const inputVariants = {
        initial: {
            borderColor: "rgba(217, 204, 243, 0.3)",
            scale: 1,
            boxShadow: "0 0 0 rgba(217, 204, 243, 0)"
        },
        focus: {
            borderColor: "#d9ccf3",
            scale: 1.02,
            boxShadow: "0 0 20px rgba(217, 204, 243, 0.3)",
            transition: { duration: 0.2 }
        }
    };

    // Developer text premium hover
    const developerVariants = {
        initial: { opacity: 0.85 },
        hover: {
            opacity: 1,
            scale: 1.05,
            transition: { duration: 0.3 }
        }
    };

    // UPDATED: Guide items with sentence case
    const guideItems = [
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
        { name: "Pricing", path: "/pricing" },
        { name: "Career", path: "/career" },
        { name: "Privacy Policy", path: "/privacypolicy" }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            toast.error("Please enter your name");
            return;
        }
        if (!formData.feedback.trim()) {
            toast.error("Please enter your feedback");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            toast.success("Thank you for your feedback! 🙏");
            setFormData({ name: "", feedback: "" });
            setIsSubmitting(false);
        }, 1500);
    };

    // WhatsApp link generator
    const whatsappLink = "https://wa.me/17828828102?text=Hello%20HKS%20Investment%2C%20I%20have%20a%20question%20about%20your%20services.";

    return (
        <>
            <ToastContainer position="top-right" autoClose={4000} theme="dark" />
            <motion.footer
                className="footer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={containerVariants}
            >
                <div className="footer-top">
                    {/* COLUMN 1: FEEDBACK */}
                    <motion.div
                        className="footer-col feedback"
                        variants={columnVariants}
                    >
                        <motion.h4
                            variants={headerVariants}
                            initial="initial"
                            whileHover="hover"
                        >
                            Your feedback is important for us.
                        </motion.h4>

                        <form className="feedback-form" onSubmit={handleSubmit}>
                            <motion.div
                                whileFocus="focus"
                                variants={inputVariants}
                                initial="initial"
                            >
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Your name"
                                    className="feedback-input"
                                    disabled={isSubmitting}
                                />
                            </motion.div>

                            <motion.div
                                whileFocus="focus"
                                variants={inputVariants}
                                initial="initial"
                            >
                                <textarea
                                    name="feedback"
                                    value={formData.feedback}
                                    onChange={handleInputChange}
                                    placeholder="Your feedback"
                                    className="feedback-textarea"
                                    rows="2"
                                    disabled={isSubmitting}
                                />
                            </motion.div>

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
                                <motion.span
                                    variants={arrowIconVariants}
                                    initial="initial"
                                    whileHover="hover"
                                    className="send-icon-wrapper"
                                >
                                    <FiSend className="send-icon" />
                                    {/* <FiArrowRight className="arrow-icon" /> */}
                                </motion.span>
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* GROUP: BRAND + GUIDE + CONTACT + COPYRIGHT */}
                    <div className="footer-group">
                        <div className="footer-group-grid">
                            {/* COLUMN 2: BRAND */}
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
                                    whileHover={{
                                        color: "#d9ccf3",
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    Redefining wealth, <br />
                                    one decision at a time.
                                </motion.p>
                                <div className="socials">
                                    {[FiInstagram, FaFacebookF, FaLinkedinIn, FaYoutube].map((Icon, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={socialIconVariants}
                                            initial="initial"
                                            whileHover="hover"
                                        >
                                            <Icon />
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* COLUMN 3: GUIDE - HEADING REMOVED, LINKS FROM TOP */}
                            <motion.div
                                className="footer-col guide-column"
                                variants={columnVariants}
                            >
                                {/* HEADING COMPLETELY REMOVED */}
                                <ul className="guide-links-list">
                                    {guideItems.map((item, idx) => (
                                        <motion.li
                                            key={idx}
                                            variants={listItemVariants}
                                            initial="initial"
                                            whileHover="hover"
                                            custom={idx}
                                        >
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    isActive ? "guide-link active" : "guide-link"
                                                }
                                            >
                                                <span className="guide-item-text">{item.name}</span>
                                                <motion.span
                                                    className="guide-arrow"
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileHover={{
                                                        opacity: 1,
                                                        x: 0,
                                                        transition: { delay: 0.1 }
                                                    }}
                                                >
                                                    →
                                                </motion.span>
                                            </NavLink>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* COLUMN 4: CONTACT - CALL REPLACED WITH WHATSAPP */}
                            <motion.div
                                className="footer-col contact"
                                variants={columnVariants}
                            >
                                {/* REPLACED CALL WITH WHATSAPP */}
                                <motion.p
                                    variants={contactItemVariants}
                                    whileHover="hover"
                                >
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="whatsapp-link"
                                    >
                                        <motion.span
                                            variants={contactIconVariants}
                                            initial="initial"
                                            whileHover="hover"
                                        >
                                            <FaWhatsapp />
                                        </motion.span>
                                        +1 782-882-8102
                                    </a>
                                </motion.p>

                                <motion.p
                                    variants={contactItemVariants}
                                    whileHover="hover"
                                    transition={{ delay: 0.1 }}
                                >
                                    <a href="mailto:support@hksinvestment.com">
                                        <motion.span
                                            variants={contactIconVariants}
                                            initial="initial"
                                            whileHover="hover"
                                        >
                                            <MdEmail />
                                        </motion.span>
                                        support@hksinvestment.com
                                    </a>
                                </motion.p>

                                <motion.p
                                    variants={contactItemVariants}
                                    whileHover="hover"
                                    transition={{ delay: 0.2 }}
                                >
                                    <a
                                        href="https://maps.google.com/?q=Halifax,NS,Canada"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <motion.span
                                            variants={contactIconVariants}
                                            initial="initial"
                                            whileHover="hover"
                                        >
                                            <FaLocationDot className="location-icon" />
                                        </motion.span>
                                        Halifax, NS, Canada
                                    </a>
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* COPYRIGHT ROW */}
                        <motion.div
                            className="copyright-row"
                            variants={copyrightVariants}
                        >
                            <span className="copyright-brand">
                                Copyright © 2025 hksinvestment, All Rights Reserved.
                            </span>
                            <motion.span
                                className="developer-text"
                                variants={developerVariants}
                                initial="initial"
                                whileHover="hover"
                            >
                                Design and Developed by <strong>TECHCORSES</strong>
                            </motion.span>
                        </motion.div>
                    </div>
                </div>

                {/* BOTTOM BIG TEXT - COLOR CHANGED TO WHITE ONLY */}
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