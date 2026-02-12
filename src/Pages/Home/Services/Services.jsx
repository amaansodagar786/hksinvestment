import React, { useRef } from "react";
import "./Services.scss";
import { FiUser, FiSettings, FiArrowRight, FiTrendingUp, FiShield, FiPieChart, FiDollarSign } from "react-icons/fi";
import { motion, useScroll, useTransform } from "framer-motion";

const Services = () => {
    const timelineRef = useRef(null);
    const leftRef = useRef(null);

    // Scroll animation for timeline line – fills as you scroll
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // UPDATED SERVICES DATA
    const services = [
        {
            id: 1,
            icon: <FiUser />,
            title: "Financial Advising",
            description: "Personalized financial guidance designed around your goals, income, and risk profile. We help you make smart decisions on saving, investing, and wealth protection."
        },
        {
            id: 2,
            icon: <FiSettings />,
            title: "Systematic Investment Plan",
            description: "A disciplined investment approach that helps you build wealth gradually through regular contributions. SIPs reduce market risk through consistency and long-term planning."
        },
        {
            id: 3,
            icon: <FiTrendingUp />,
            title: "Market-Based Research Plan",
            description: "Data-driven investment strategies backed by deep market research and analysis. We identify opportunities for both short-term gains and long-term wealth creation. Our insights help you invest with clarity and reduced risk."
        },
        {
            id: 4,
            icon: <FiShield />,
            title: "Registered Retirement Saving Plan",
            description: "Structured retirement planning to secure your future lifestyle. We help you build a reliable savings strategy with tax-efficient investment options. Designed to provide financial independence after retirement."
        },
        {
            id: 5,
            icon: <FiPieChart />,
            title: "Wealth Account Management",
            description: "Comprehensive management of your investment portfolio under expert supervision. We monitor, optimize, and rebalance your assets for consistent growth. Focused on protecting and maximizing your wealth."
        },
        {
            id: 6,
            icon: <FiDollarSign />,
            title: "Tax Optimization",
            description: "Smart tax planning strategies to minimize liabilities, maximize returns, and ensure compliance with all regulations while optimizing your financial position."
        }
    ];

    // LEFT CONTENT ANIMATION – appears when in view
    const leftContentVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // SERVICE ITEM – appears one by one on scroll
    const serviceItemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    // ICON – inactive (light) → active (dark purple) when in view
    const iconVariants = {
        hidden: {
            scale: 0.8,
            backgroundColor: "#efe8fb",
            color: "#7a3db8",
            borderColor: "#7a3db8"
        },
        visible: {
            scale: 1,
            backgroundColor: "#7a3db8",
            color: "#ffffff",
            borderColor: "#5e2690",
            transition: { duration: 0.4, ease: "backOut" }
        },
        hover: {
            scale: 1.2,
            rotate: 360,
            backgroundColor: "#5e2690",
            color: "#fff",
            transition: { duration: 0.4, ease: "easeInOut" }
        }
    };

    // BUTTON – same as About section
    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    return (
        <section className="services-wrapper">
            <div className="services-container">
                {/* LEFT SIDE – VERTICALLY CENTERED */}
                <motion.div
                    className="services-left"
                    ref={leftRef}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={leftContentVariants}
                >
                    <div className="services-left-content">
                        <motion.span
                            className="services-tag"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                        >
                            Services
                        </motion.span>

                        <motion.h2 variants={leftContentVariants}>
                            Clear Strategies. <br />
                            Strong Investments. <br />
                            Real Growth.
                        </motion.h2>

                        <motion.p
                            className="subtitle"
                            variants={leftContentVariants}
                        >
                            Financial guidance for every <br />
                            stage of life.
                        </motion.p>

                        {/* BUTTON – RIGHT TO LEFT HOVER ANIMATION */}
                        <motion.button
                            className="services-btn"
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <span className="services-btn-fill"></span>
                            <span className="services-btn-text">Let's start</span>
                            <span className="services-btn-arrow">
                                <FiArrowRight />
                            </span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* RIGHT SIDE – TIMELINE */}
                <div className="services-right" ref={timelineRef}>
                    <div className="timeline">
                        {/* VERTICAL LINE – FILLS ON SCROLL */}
                        <div className="timeline-line">
                            <motion.div
                                className="timeline-fill"
                                style={{ height: lineHeight }}
                            />
                        </div>

                        {/* SERVICE ITEMS – APPEAR ONE BY ONE ON SCROLL */}
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                className={`service-item ${index === services.length - 1 ? 'last' : ''}`}
                                variants={serviceItemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: false, margin: "-80px", amount: 0.2 }}
                            >
                                <motion.div
                                    className="icon"
                                    variants={iconVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: false, margin: "-80px", amount: 0.2 }}
                                    whileHover="hover"
                                >
                                    {service.icon}
                                </motion.div>

                                <div className="content">
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;