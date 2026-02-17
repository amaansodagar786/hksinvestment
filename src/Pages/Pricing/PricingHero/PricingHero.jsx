import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
import "./PricingHero.scss";

const PricingHero = () => {
    // Animation variants - SAME AS ORIGINAL TOP SECTION
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

    // NEW: Animation for the highlighted word (pulse + glow)
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

    return (
        <motion.section
            className="pricing-hero-wrapper"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="pricing-hero-top">
                <motion.div
                    className="pricing-hero-content"
                    variants={containerVariants}
                >
                    <motion.h1
                        className="pricing-hero-title"
                        variants={titleVariants}
                    >
                        Simple, transparent <br />
                        <motion.span 
                            className="pricing-highlight"
                            variants={highlightVariants}
                            initial="initial"
                            animate="animate"
                            whileHover="hover"
                        >
                            pricing
                        </motion.span> 
                        {" "}for every need
                    </motion.h1>

                    <motion.p
                        className="pricing-hero-subtitle"
                        variants={itemVariants}
                    >
                        Choose the perfect plan for your financial journey!<br className="desktop-only" /> No hidden fees. Cancel anytime. Start free for 14 days.
                    </motion.p>

                    <motion.button
                        className="pricing-hero-btn"
                        variants={itemVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <span className="pricing-hero-btn-fill"></span>
                        <span className="pricing-hero-btn-text">View plans</span>
                        <span className="pricing-hero-btn-arrow">
                            <FiArrowRight />
                        </span>
                    </motion.button>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default PricingHero;