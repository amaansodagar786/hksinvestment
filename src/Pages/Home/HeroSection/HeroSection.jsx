import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaQuoteLeft } from "react-icons/fa";
import { motion } from "framer-motion";
import "./HeroSection.scss";
import coin from "../../../assets/images/home/hero/coin.png";
import bar from "../../../assets/images/home/hero/bar.png";

const HeroSection = () => {
    // Animation variants - YOUR EXACT VARIANTS
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
        initial: {
            background: "#5e2690",
            scale: 1
        },
        hover: {
            background: "#4a1f73",
            scale: 1.05,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        tap: {
            scale: 0.95,
            transition: {
                duration: 0.1
            }
        }
    };

    const arrowVariants = {
        initial: {
            rotate: 0,
            background: "#ffffff"
        },
        hover: {
            rotate: 45,
            background: "#5e2690",
            color: "#ffffff",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const bottomSectionVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: 0.3
            }
        }
    };

    const imageFloatVariants = {
        initial: { y: 0 },
        float: {
            y: [-5, 5, -5],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const barChartVariants = {
        hidden: { height: 0 },
        visible: (height) => ({
            height: `${height}%`,
            transition: {
                duration: 1,
                ease: "easeOut",
                delay: 1
            }
        })
    };

    const quoteVariants = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: {
            opacity: 0.15,
            scale: 1,
            transition: {
                duration: 1,
                ease: "easeOut",
                delay: 0.5
            }
        }
    };

    return (
        <motion.section
            className="hero-wrapper"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* ===== TOP HERO ===== */}
            <div className="hero-top">
                <motion.div
                    className="hero-content"
                    variants={containerVariants}
                >
                    <motion.h1
                        className="hero-title"
                        variants={titleVariants}
                    >
                        Clarity for every <br />
                        {/* CHANGE 1: REPLACED financial-highlight WITH WORD SLIDER - SAME STYLE */}
                        <span className="financial-highlight word-slider-wrapper">
                            <span className="loader">
                                <span className="words">
                                    <span className="word">Financial</span>
                                    <span className="word">Wealth</span>
                                    <span className="word">Portfolio</span>
                                    <span className="word">Financial</span>
                                </span>
                            </span>
                        </span> move
                    </motion.h1>

                    <motion.p
                        className="hero-subtitle"
                        variants={itemVariants}
                    >
                        Take control of your financial future!
                        <br />
                        Smart financial support for steady growth and peace of mind.
                    </motion.p>

                    <motion.button
                        className="hero-btn"
                        variants={itemVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Let's start
                        <motion.span
                            className="arrow-circle"
                            variants={arrowVariants}
                        >
                            <FiArrowRight />
                        </motion.span>
                    </motion.button>
                </motion.div>
            </div>

            {/* ===== BOTTOM SECTION ===== */}
            <motion.div
                className="hero-bottom-section"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={bottomSectionVariants}
            >
                <div className="hero-bottom-bg">
                    <div className="hero-bottom-grid">

                        {/* ===== COLUMN 1 - COIN IMAGE MOVED HERE + TEXT ===== */}
                        <div className="hero-bottom-col hero-bottom-col-text">
                            <motion.div
                                className="hero-bottom-text-content"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* CHANGE 2: COIN IMAGE MOVED FROM COLUMN 3 TO COLUMN 1 */}
                                <motion.div
                                    className="hero-bottom-right-top coin-in-column1"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.img
                                        src={coin}
                                        alt="coins"
                                        animate={{
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{
                                            duration: 6,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </motion.div>

                                {/* QUOTE ICON - CHANGED TO FaQuoteLeft */}
                                <motion.div
                                    className="quote-mark"
                                    variants={quoteVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <FaQuoteLeft />
                                </motion.div>
                                <motion.p
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    Your <br /> Pathway to <br />
                                    <strong>Financial</strong> <br />
                                    Prosperity <br /> Starts Here!
                                </motion.p>
                            </motion.div>
                        </div>

                        {/* ===== COLUMN 2 - BAR IMAGE (NO CHANGE) ===== */}
                        <div className="hero-bottom-col hero-bottom-col-image">
                            <motion.div
                                className="hero-bottom-fixed-image"
                                variants={imageFloatVariants}
                                initial="initial"
                                animate="float"
                                whileHover={{ scale: 1.05, rotate: 2 }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.img
                                    src={bar}
                                    alt="growth"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </div>

                        {/* ===== COLUMN 3 - ONLY BAR CHART (FULL HEIGHT) ===== */}
                        <div className="hero-bottom-col hero-bottom-col-right">
                            {/* CHANGE 3: REMOVED coin image, only bar chart remains - FULL HEIGHT */}
                            <motion.div
                                className="hero-bottom-right-bottom full-height"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <div className="hero-bottom-bar-chart">
                                    <motion.div
                                        className="hero-bottom-bar hero-bottom-bar1"
                                        custom={30}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={barChartVariants}
                                    >8</motion.div>
                                    <motion.div
                                        className="hero-bottom-bar hero-bottom-bar2"
                                        custom={45}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={barChartVariants}
                                    >12</motion.div>
                                    <motion.div
                                        className="hero-bottom-bar hero-bottom-bar3"
                                        custom={60}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={barChartVariants}
                                    >16</motion.div>
                                    <motion.div
                                        className="hero-bottom-bar hero-bottom-bar4"
                                        custom={75}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={barChartVariants}
                                    >20</motion.div>
                                    <motion.div
                                        className="hero-bottom-bar hero-bottom-bar5"
                                        custom={90}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                        variants={barChartVariants}
                                    >29</motion.div>
                                </div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </motion.div>

        </motion.section>
    );
};

export default HeroSection;