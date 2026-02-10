import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "./FAQ.scss";

const faqData = [
  {
    question: "How long does it take to get started with Feature?",
    answer:
      "Getting started is quick and simple. Once you sign up, you can begin using the core features immediately without any complex setup."
  },
  {
    question: "Do I need any technical knowledge to use the platform?",
    answer:
      "No technical expertise is required. Our platform is designed to be user-friendly and intuitive for everyone."
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings with no additional charges."
  },
  {
    question: "Is customer support available 24/7?",
    answer:
      "Our support team is available to assist you via email and chat, with priority support for premium users."
  },
  {
    question: "Do you offer a free trial?",
    answer:
      "Yes, we offer a free trial so you can explore the platform and its features before committing."
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard security measures to ensure your data is safe and protected."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

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

  const headerVariants = {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      backgroundColor: "#e6daf8",
      boxShadow: "0 8px 25px rgba(122, 61, 184, 0.12)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const iconVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: {
      scale: 1.1,
      rotate: 90,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const answerVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      marginTop: 0
    },
    visible: {
      opacity: 1,
      height: "auto",
      marginTop: 14,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      marginTop: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      className="faq-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* HEADER */}
      <motion.div 
        className="faq-header"
        variants={headerVariants}
      >
        <motion.span 
          className="faq-pill"
          variants={pillVariants}
        >
          FAQ
        </motion.span>
        <motion.h2
          variants={headerVariants}
        >
          Any questions?
        </motion.h2>
        <motion.p
          variants={headerVariants}
        >
          Let us walk you through it. <strong>Schedule your demo now.</strong>
        </motion.p>
      </motion.div>

      {/* FAQ LIST */}
      <motion.div 
        className="faq-list"
        variants={containerVariants}
      >
        <AnimatePresence>
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              whileHover="hover"
              layout
            >
              <motion.div
                className="faq-question"
                onClick={() => toggleFAQ(index)}
                whileTap={{ scale: 0.98 }}
              >
                <span className="faq-text">
                  <span className="faq-number">
                    ({String(index + 1).padStart(2, "0")})
                  </span>
                  {item.question}
                </span>

                <motion.span 
                  className="faq-icon"
                  variants={iconVariants}
                  animate={activeIndex === index ? "hover" : "rest"}
                  whileHover="hover"
                >
                  {activeIndex === index ? <FiMinus /> : <FiPlus />}
                </motion.span>
              </motion.div>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    className="faq-answer"
                    variants={answerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
};

export default FAQ;