import { useState } from "react";
import { motion } from "framer-motion";
import "./PricingSection.scss";

const PricingSection = () => {
    const [active, setActive] = useState("weekly");

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: (i) => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: i * 0.2 + 0.3,
                ease: "backOut"
            }
        })
    };

    return (
        <motion.section
            className="pricing-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            <div className="pricing-grid">

                {/* LEFT CONTENT - VERTICALLY CENTERED */}
                <motion.div
                    className="pricing-text"
                    variants={itemVariants}
                >
                    <div className="pricing-text-inner">
                        <motion.span
                            className="pricing-pill"
                            variants={itemVariants}
                        >
                            Pricing
                        </motion.span>
                        <motion.h2
                            variants={itemVariants}
                        >
                            Choose the perfect plan<br />for your needs.
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                        >
                            Simple, transparent pricing with no hidden fees. 
                            Pick the plan that fits your trading style.
                        </motion.p>
                    </div>
                </motion.div>

                {/* WEEKLY CARD */}
                <motion.div
                    className={`pricing-card ${active === "weekly" ? "active" : ""}`}
                    onClick={() => setActive("weekly")}
                    variants={cardVariants}
                    custom={0}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="card-inner">
                        <div className="card-header-box">
                            <h3>Swing & Option trading</h3>
                            <p>Perfect for active traders</p>
                        </div>

                        <div className="card-body-box">
                            <div className="price">
                                <span className="amount">CAD 24.99</span>
                                <span className="duration">/week</span>
                            </div>

                            <ul>
                                <li className="yes">Long term stock</li>
                                <li className="yes">Option & swing trading</li>
                                <li className="yes">Personal assistance</li>
                                <li className="yes">No commitment, cancel anytime</li>
                                <li className="yes">Daily live analysis</li>
                                <li className="no">Refund</li>
                            </ul>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Get Started
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* MONTHLY CARD */}
                <motion.div
                    className={`pricing-card ${active === "monthly" ? "active" : ""}`}
                    onClick={() => setActive("monthly")}
                    variants={cardVariants}
                    custom={1}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="card-inner">
                        <div className="card-header-box">
                            <h3>Long term investment</h3>
                            <p>Great for long-term investors</p>
                        </div>

                        <div className="card-body-box">
                            <div className="price">
                                <span className="amount">CAD 14.99</span>
                                <span className="duration">/month</span>
                            </div>

                            <ul>
                                <li className="yes">Long term stock</li>
                               
                                <li className="yes">No commitment, cancel anytime</li>
                                <li className="no">Refund</li>
                                 <li className="no">Option & swing trading</li>
                                <li className="no">Personal assistance</li>
                                {/* No daily live analysis for monthly */}
                            </ul>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Get Started
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </motion.section>
    );
};

export default PricingSection;