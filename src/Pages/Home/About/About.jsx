import React from "react";
import {
    FiTrendingUp,
    FiDollarSign,
    FiPieChart,
    FiBarChart2,
    FiShield
} from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import "./About.scss";
import { BsShieldFillCheck } from "react-icons/bs";
import { motion } from "framer-motion";
import roboimag from "../../../assets/images/home/about/robo.png"

const About = () => {
    // Animation variants for circles
    const circleVariants = {
        animate: {
            scale: [1, 1.02, 1],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const circleInnerVariants = {
        animate: {
            scale: [1, 1.03, 1],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
            }
        }
    };

    // Animation for tags
    const tagVariants = {
        initial: { opacity: 0, y: 20 },
        animate: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                delay: i * 0.1 + 0.5,
                ease: "backOut"
            }
        }),
        hover: {
            scale: 1.1,
            backgroundColor: "#e6dcf7",
            borderColor: "#5e2690",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    // Button animation
    const buttonVariants = {
        initial: { 
            background: "linear-gradient(to right, #5e2690 90%, #fff 10%)"
        },
        hover: {
            background: "linear-gradient(to right, #fff 0%, #fff 100%)",
            border: "2px solid #5e2690",
            transition: {
                duration: 0.4,
                ease: "easeInOut"
            }
        }
    };

    const arrowVariants = {
        initial: { color: "#5e2690", scale: 1 },
        hover: {
            color: "#5e2690",
            scale: 1.2,
            rotate: 45,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const buttonTextVariants = {
        initial: { color: "#fff" },
        hover: {
            color: "#5e2690",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    // Section animation
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

    const headerVariants = {
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

    const pillVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.4,
                ease: "backOut"
            }
        }
    };

    const contentVariants = {
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

    const tags = [
        { className: "shares", icon: <FiPieChart />, text: "Shares" },
        { className: "sell", icon: <FiTrendingUp />, text: "Sell" },
        { className: "yield", icon: <FiBarChart2 />, text: "Yield" },
        { className: "finance", icon: <FiDollarSign />, text: "Finance" },
        { className: "trends", icon: <FiTrendingUp />, text: "Trends" },
        { className: "invest", icon: <FiShield />, text: "Investment" }
    ];

    return (
        <motion.section 
            className="about-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            {/* HEADER */}
            <motion.div 
                className="about-header"
                variants={headerVariants}
            >
                <motion.span 
                    className="about-pill"
                    variants={pillVariants}
                >
                    About us
                </motion.span>
                <motion.h2
                    variants={headerVariants}
                >
                    Personal financial guidance for <br />
                    smarter investing and saving
                </motion.h2>
            </motion.div>

            <div className="about-content">
                {/* LEFT VISUAL */}
                <motion.div 
                    className="about-visual"
                    variants={contentVariants}
                >
                    <div className="circle-wrap">
                        {/* Animated circles */}
                        <motion.div 
                            className="circle-mid"
                            variants={circleVariants}
                            animate="animate"
                        >
                            <motion.div 
                                className="circle-inner"
                                variants={circleInnerVariants}
                                animate="animate"
                            >
                                <motion.img 
                                    src={roboimag} 
                                    alt="Finance AI" 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: 0.8 }}
                                />
                            </motion.div>
                        </motion.div>

                        {/* Animated Tags */}
                        {tags.map((tag, index) => (
                            <motion.span 
                                key={index}
                                className={`tag ${tag.className}`}
                                custom={index}
                                initial="initial"
                                animate="animate"
                                whileHover="hover"
                                variants={tagVariants}
                                viewport={{ once: true }}
                            >
                                {tag.icon} {tag.text}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* RIGHT TEXT */}
                <motion.div 
                    className="about-text"
                    variants={contentVariants}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <BsShieldFillCheck className="shield-icon" />
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        Personalized financial guidance designed around your goals,
                        income, and risk profile. We help you make smart decisions
                        on saving, investing, and wealth protection.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        We help you make smart decisions on saving, investing, and
                        wealth protection. Personalized financial guidance designed
                        around your goals, income, and risk profile.
                    </motion.p>

                    <motion.button 
                        className="about-btn"
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap={{ scale: 0.98 }}
                        style={{
                            background: "linear-gradient(to right, #5e2690 90%, #fff 10%)",
                            border: "2px solid transparent"
                        }}
                    >
                        <motion.span 
                            className="button-text"
                            variants={buttonTextVariants}
                        >
                            Schedule
                        </motion.span>
                        <motion.span 
                            className="arrow"
                            variants={arrowVariants}
                        >
                            <FiArrowRight />
                        </motion.span>
                    </motion.button>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default About;