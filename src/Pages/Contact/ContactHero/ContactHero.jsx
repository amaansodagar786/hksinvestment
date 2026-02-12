import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "./ContactHero.scss";

const ContactHero = () => {
    return (
        <section className="contact-hero-wrapper">
            {/* ===== TOP HERO (95vh) ===== */}
            <div className="contact-hero-top">
                <div className="contact-hero-content">
                    <h1 className="contact-hero-title">
                        Let's start your <br />
                        <span className="contact-financial-highlight">Financial</span> journey
                    </h1>

                    <p className="contact-hero-subtitle">
                        Get personalized financial guidance today!
                        <br />
                        Our expert advisors are ready to help you achieve your goals.
                    </p>

                    {/* UPDATED BUTTON - EXACT CTA PATTERN WITH YOUR COLORS */}
                    <button className="contact-hero-btn">
                        <span className="contact-hero-btn-fill"></span>
                        <span className="contact-hero-btn-text">Schedule a Call</span>
                        <span className="contact-hero-btn-arrow">
                            <FiArrowRight />
                        </span>
                    </button>
                </div>
            </div>

            {/* Bottom section can be added here later */}
        </section>
    );
};

export default ContactHero;