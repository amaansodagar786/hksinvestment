import React, { useRef } from "react";
import "./Services.scss";
import { FiUser, FiSettings, FiArrowRight, FiTrendingUp, FiShield, FiPieChart, FiDollarSign } from "react-icons/fi";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const Services = () => {
    const containerRef = useRef(null);
    const timelineRef = useRef(null);
    
    // Scroll animation for timeline line
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start start", "end end"]
    });
    
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
    
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

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
            title: "Portfolio Management",
            description: "Professional management of your investment portfolio with regular rebalancing and optimization based on market conditions and your financial objectives."
        },
        {
            id: 4,
            icon: <FiShield />,
            title: "Risk Management",
            description: "Comprehensive risk assessment and protection strategies to safeguard your assets and investments against market volatility and unforeseen circumstances."
        },
        {
            id: 5,
            icon: <FiPieChart />,
            title: "Retirement Planning",
            description: "Strategic planning for your retirement years, ensuring financial security, steady income streams, and proper distribution of assets for long-term comfort."
        },
        {
            id: 6,
            icon: <FiDollarSign />,
            title: "Tax Optimization",
            description: "Smart tax planning strategies to minimize liabilities, maximize returns, and ensure compliance with all regulations while optimizing your financial position."
        }
    ];

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

    const leftContentVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const serviceItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const iconVariants = {
        hidden: { scale: 0 },
        visible: {
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "backOut"
            }
        },
        hover: {
            scale: 1.2,
            rotate: 360,
            backgroundColor: "#7a3db8",
            color: "#fff",
            transition: {
                duration: 0.4,
                ease: "easeInOut"
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
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        tap: { scale: 0.98 }
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

    return (
        <motion.section 
            className="services-wrapper"
            ref={containerRef}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
        >
            <div className="services-container">
                {/* LEFT SIDE */}
                <motion.div 
                    className="services-left"
                    variants={leftContentVariants}
                >
                    <motion.span 
                        className="services-tag"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: "backOut" }}
                    >
                        Services
                    </motion.span>

                    <motion.h2
                        variants={leftContentVariants}
                    >
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

                    <motion.button 
                        className="start-btn"
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Let's start
                        <motion.span
                            variants={arrowVariants}
                        >
                            <FiArrowRight />
                        </motion.span>
                    </motion.button>
                </motion.div>

                {/* RIGHT SIDE - TIMELINE */}
                <div className="services-right" ref={timelineRef}>
                    <div className="timeline">
                        {/* ANIMATED VERTICAL LINE - YOUR SCROLL EFFECT PRESERVED */}
                        <div className="timeline-line">
                            <motion.div 
                                className="timeline-fill"
                                style={{ height: lineHeight }}
                            />
                        </div>
                        
                        {/* SERVICE ITEMS */}
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                className={`service-item ${index === services.length - 1 ? 'last' : ''}`}
                                variants={serviceItemVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                            >
                                <motion.div 
                                    className="icon"
                                    variants={iconVariants}
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
        </motion.section>
    );
};

export default Services;