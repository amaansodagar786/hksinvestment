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

                {/* WEEKLY CARD - CAD 24.99 */}
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
                            <p className="sub-line1">Complete investing & options program</p>
                            <p className="sub-line2">Step-by-step training with live signals</p>
                        </div>

                        <div className="card-body-box">
                            <div className="price">
                                <span className="amount">CAD 24.99</span>
                                <span className="duration">/bi-weekly</span>
                            </div>

                            <ul>
                                {/* ACCOUNT FEATURES */}
                                <li className="yes">Portfolio management</li>
                                <li className="yes">Personal assistance</li>
                                <li className="yes">Daily analysis</li>
                                <li className="yes">Swing trades</li>
                                <li className="yes">Entries + exits</li>
                                <li className="yes">Covered calls / cash secured</li>
                                
                                {/* ANALYSIS & SIGNALS */}
                                <li className="yes">AI signals, charts, analysis</li>
                                
                                {/* ADDITIONAL INVESTMENTS */}
                                <li className="yes">Crypto investment & trades</li>
                                                                <li className="yes">Cancel at anytime</li>

                                <li className="yes">Option trade signals</li>
                                
                                {/* FLEXIBILITY */}
                                <li className="yes">Trial period (3 days)</li>
                                
                                {/* EXCLUSIONS - AT BOTTOM */}
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

                {/* MONTHLY CARD - CAD 7.99 */}
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
                            <p className="sub-line1">High-growth picks (10x–100x potential)</p>
                            <p className="sub-line2">Receive real-time buy & sell alerts</p>
                            <p className="note">Note: For Long-term investing only</p>
                        </div>

                        <div className="card-body-box">
                            <div className="price">
                                <span className="amount">CAD 07.99</span>
                                <span className="duration">/bi-weekly</span>
                            </div>

                            <ul>
                                {/* SAME POINTS AS BEFORE - SIRF ORDER CHANGE KIYA HAI */}
                                {/* 1. Portfolio management (common) */}
                                <li className="yes">Portfolio management</li>
                                
                                {/* 2. Personal assistance (common) */}
                                <li className="yes">Personal assistance</li>
                                
                                {/* 3. Daily analysis (common) */}
                                <li className="yes">Daily analysis</li>
                                
                                {/* 4. Long-term stocks (unique to 7.99) */}
                                <li className="yes">Long-term stocks with high potential growth</li>
                                
                                {/* 5. Charts & deep dives (common - matches AI signals position) */}
                                <li className="yes">Charts & deep dives</li>
                                
                                {/* 6. 24/7 news updates (unique to 7.99) */}
                                <li className="yes">24/7 news updates</li>
                                
                                {/* 7. Dividend stocks (unique to 7.99) */}
                                <li className="yes">Dividend stocks</li>
                                
                                {/* 8. Understand market psychology (unique to 7.99) */}
                                <li className="yes">Understand market psychology</li>
                                
                                {/* 9. Cancel at any time (common) */}
                                <li className="yes">Cancel at any time</li>
                                
                                {/* 10. Option & swing trading (common - but no in 7.99) */}
                                <li className="no">Option & swing trading</li>
                                
                                {/* 11. Trial period (common - but no in 7.99) */}
                                <li className="no">Trial period (3 days)</li>
                                
                                {/* 12. Refund (common - but no in 7.99) */}
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

            </div>
        </motion.section>
    );
};

export default PricingSection;