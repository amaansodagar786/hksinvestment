import React from "react";
import {
    FiInstagram,
    FiPhone,
    FiMail,
    FiMapPin,
    FiArrowRight
} from "react-icons/fi";
import { FaYoutube } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Footer.scss";

const Footer = () => {
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

    const guideItems = ["HOME", "CONTACT", "PRIVACY POLICY"];

    return (
        <motion.footer
            className="footer"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
        >
            <div className="footer-top">
                {/* LEFT - CONTENT */}
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

                {/* CENTER - GUIDE */}
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

                {/* RIGHT - CONTACT */}
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

            {/* COPYRIGHT ROW */}
            <motion.div
                className="copyright-row"
                variants={copyrightVariants}
            >
                <motion.span
                    whileHover={{
                        scale: 1.02,
                        transition: { duration: 0.2 }
                    }}
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
    );
};

export default Footer;