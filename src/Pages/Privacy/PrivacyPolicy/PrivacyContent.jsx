import React from "react";
import { motion } from "framer-motion";
import { FiShield, FiLock, FiEye, FiDatabase, FiUsers, FiGlobe } from "react-icons/fi";
import "./PrivacyContent.scss";

const PrivacyContent = () => {
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

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        },
        hover: {
            y: -8,
            boxShadow: "0 15px 35px rgba(122, 61, 184, 0.15)",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const iconVariants = {
        hover: {
            rotate: 360,
            scale: 1.2,
            transition: {
                duration: 0.4,
                ease: "easeInOut"
            }
        }
    };

    const privacyPrinciples = [
        {
            icon: <FiShield />,
            title: "Data Protection",
            description: "We implement industry-standard encryption and security measures to protect your financial data from unauthorized access."
        },
        {
            icon: <FiLock />,
            title: "Access Control",
            description: "Strict access controls ensure only authorized personnel can access your information for legitimate business purposes."
        },
        {
            icon: <FiEye />,
            title: "Transparency",
            description: "We clearly explain what data we collect, why we collect it, and how we use it to serve you better."
        },
        {
            icon: <FiDatabase />,
            title: "Data Minimization",
            description: "We only collect information that is necessary to provide our financial services and improve your experience."
        },
        {
            icon: <FiUsers />,
            title: "User Rights",
            description: "You have the right to access, correct, or delete your personal information at any time."
        },
        {
            icon: <FiGlobe />,
            title: "Compliance",
            description: "We adhere to global privacy regulations including GDPR, CCPA, and other applicable data protection laws."
        }
    ];

    const policySections = [
        {
            title: "Information We Collect",
            content: "We collect information you provide directly, such as name, email, phone number, financial information for investment purposes, and communication records. We also automatically collect certain information when you use our services, including IP address, device information, and usage data."
        },
        {
            title: "How We Use Your Information",
            content: "Your information is used to provide personalized financial advice, process transactions, communicate with you about services, improve our platform, ensure security and fraud prevention, and comply with legal obligations."
        },
        {
            title: "Data Sharing & Disclosure",
            content: "We do not sell your personal information. We may share information with trusted service providers who assist in our operations, with regulatory authorities when required by law, or during business transfers with appropriate confidentiality protections."
        },
        {
            title: "Data Security",
            content: "We implement robust security measures including encryption, secure servers, regular security audits, access controls, and employee training to protect your information from unauthorized access, alteration, or destruction."
        },
        {
            title: "Your Rights & Choices",
            content: "You have the right to access your data, request corrections, opt-out of marketing communications, request data deletion (subject to legal requirements), and lodge complaints with data protection authorities."
        },
        {
            title: "Updates to This Policy",
            content: "We may update this privacy policy periodically. We will notify you of significant changes through email or prominent notices on our website. The 'Last Updated' date at the top indicates when the policy was last revised."
        }
    ];

    return (
        <motion.section 
            id="privacy-content"
            className="privacy-content-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            <div className="privacy-content-container">
                {/* HEADER */}
                <motion.div 
                    className="privacy-content-header"
                    variants={itemVariants}
                >
                    <h2>Our Privacy Commitment</h2>
                    <p>
                        At HKS Investment, we believe that trust is the foundation of any financial relationship. 
                        This Privacy Policy explains how we collect, use, disclose, and safeguard your information.
                    </p>
                    <div className="last-updated">
                        Last Updated: March 2024
                    </div>
                </motion.div>

                {/* PRIVACY PRINCIPLES */}
                <div className="privacy-principles">
                    <motion.h3
                        variants={itemVariants}
                    >
                        Our Privacy Principles
                    </motion.h3>
                    
                    <div className="principles-grid">
                        {privacyPrinciples.map((principle, index) => (
                            <motion.div
                                key={index}
                                className="principle-card"
                                variants={cardVariants}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                whileHover="hover"
                            >
                                <motion.div 
                                    className="principle-icon"
                                    variants={iconVariants}
                                    whileHover="hover"
                                >
                                    {principle.icon}
                                </motion.div>
                                <h4>{principle.title}</h4>
                                <p>{principle.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* POLICY CONTENT */}
                <div className="policy-content">
                    <motion.h3
                        variants={itemVariants}
                    >
                        Privacy Policy Details
                    </motion.h3>
                    
                    <div className="policy-sections">
                        {policySections.map((section, index) => (
                            <motion.div
                                key={index}
                                className="policy-section"
                                variants={itemVariants}
                                custom={index}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <h4>
                                    <span className="section-number">{String(index + 1).padStart(2, '0')}</span>
                                    {section.title}
                                </h4>
                                <p>{section.content}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* CONTACT INFO */}
                <motion.div 
                    className="privacy-contact"
                    variants={itemVariants}
                >
                    <h3>Contact Us</h3>
                    <p>
                        If you have any questions about this Privacy Policy or our data practices, 
                        please contact our Privacy Officer:
                    </p>
                    <div className="contact-details">
                        <p><strong>Email:</strong> hk.sangani80@gmail.com</p>
                        <p><strong>Phone:</strong> +358 415737082</p>
                        <p><strong>Address:</strong> Uomarinne 1 B 20 Vantaa 01600 Uusimaa Finland</p>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default PrivacyContent;