import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import "./PrivacyHero.scss";

const PrivacyHero = () => {
    // Animation variants
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

    const pulseVariants = {
        initial: { opacity: 0.8 },
        animate: {
            opacity: [0.8, 1, 0.8],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <motion.section 
            className="privacy-hero-wrapper"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            <div className="privacy-hero-content">
                <motion.span 
                    className="privacy-hero-pill"
                    variants={itemVariants}
                >
                    Privacy & Security
                </motion.span>
                
                <motion.h1 
                    className="privacy-hero-title"
                    variants={itemVariants}
                >
                    Your <motion.span 
                        className="privacy-highlight"
                        variants={pulseVariants}
                        initial="initial"
                        animate="animate"
                    >
                        Privacy
                    </motion.span> Matters
                </motion.h1>

                <motion.p 
                    className="privacy-hero-subtitle"
                    variants={itemVariants}
                >
                    We are committed to protecting your personal and financial information with 
                    the highest standards of security and transparency.
                </motion.p>

                <motion.button 
                    className="privacy-hero-btn"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => {
                        document.getElementById('privacy-content')?.scrollIntoView({ 
                            behavior: 'smooth' 
                        });
                    }}
                >
                    Read Our Policy
                    <motion.span 
                        className="privacy-arrow-circle"
                        variants={arrowVariants}
                    >
                        <FiArrowRight />
                    </motion.span>
                </motion.button>
            </div>
        </motion.section>
    );
};

export default PrivacyHero;