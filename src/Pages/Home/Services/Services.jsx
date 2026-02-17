import React, { useRef, useState } from "react"; // ADDED useState
import "./Services.scss";
import { FiUser, FiSettings, FiArrowRight, FiTrendingUp, FiShield, FiPieChart, FiDollarSign } from "react-icons/fi";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import ServiceInquiryModal from "./ServiceInquiryModal/ServiceInquiryModal"; // ADDED IMPORT

// Separate component for each service item
const ServiceItem = ({ service, index, total, scrollYProgress }) => {
    const ref = useRef(null);
    // Track if the item is in view (used for fade‑up and mobile activation)
    const isInView = useInView(ref, { margin: "-80px", amount: 0.2, once: false });

    // Simple mobile detection – you can replace with a more robust hook if needed
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

    // For desktop: threshold when line reaches this icon
    const threshold = (index + 0.5) / total;
    const isActiveByLine = useTransform(scrollYProgress, (progress) => (progress >= threshold ? 1 : 0));

    // Map active state to visual properties for desktop
    const scale = useTransform(isActiveByLine, [0, 1], [0.8, 1]);
    const bgColor = useTransform(isActiveByLine, [0, 1], ['#fff', '#7a3db8']);
    const iconColor = useTransform(isActiveByLine, [0, 1], ['#7a3db8', '#ffffff']);
    const borderColor = useTransform(isActiveByLine, [0, 1], ['#7a3db8', '#5e2690']);

    // Hover variant (same for both)
    const hoverVariant = {
        scale: 1.2,
        rotate: 360,
        backgroundColor: '#5e2690',
        color: '#fff',
        borderColor: '#5e2690',
        transition: { duration: 0.4, ease: "easeInOut" }
    };

    return (
        <motion.div
            ref={ref}
            className={`service-item ${index === total - 1 ? 'last' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            {isMobile ? (
                // MOBILE: use isInView for activation
                <motion.div
                    className="icon"
                    initial={{ scale: 0.8, backgroundColor: "transparent", color: "#7a3db8", borderColor: "#7a3db8" }}
                    animate={isInView ? { scale: 1, backgroundColor: "#7a3db8", color: "#ffffff", borderColor: "#5e2690" } : {}}
                    transition={{ duration: 0.4, ease: "backOut" }}
                    whileHover={hoverVariant}
                >
                    {service.icon}
                </motion.div>
            ) : (
                // DESKTOP: use scroll progress for activation
                <motion.div
                    className="icon"
                    style={{
                        scale,
                        backgroundColor: bgColor,
                        color: iconColor,
                        borderColor: borderColor
                    }}
                    whileHover={hoverVariant}
                >
                    {service.icon}
                </motion.div>
            )}

            <div className="content">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
            </div>
        </motion.div>
    );
};

const Services = () => {
    const timelineRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // ADDED STATE

    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ["start center", "end center"]
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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

    // ADDED HANDLER
    const handleLetStartClick = () => {
        setIsModalOpen(true);
    };

    const leftContentVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    return (
        <section className="services-wrapper">
            <div className="services-container">
                {/* LEFT SIDE – 80vh sticky box with centered content */}
                <div className="services-left">
                    <motion.div
                        className="services-left-content"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={leftContentVariants}
                    >
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

                        <motion.button
                            className="services-btn"
                            variants={buttonVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                            onClick={handleLetStartClick} // ADDED ONCLICK
                        >
                            <span className="services-btn-fill"></span>
                            <span className="services-btn-text">Let's start</span>
                            <span className="services-btn-arrow">
                                <FiArrowRight />
                            </span>
                        </motion.button>
                    </motion.div>
                </div>

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

                        {/* SERVICE ITEMS */}
                        {services.map((service, index) => (
                            <ServiceItem
                                key={service.id}
                                service={service}
                                index={index}
                                total={services.length}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* ADDED MODAL */}
            <ServiceInquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
};

export default Services;