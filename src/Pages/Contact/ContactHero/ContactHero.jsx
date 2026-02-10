import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "./ContactHero.scss";

const ContactHero = () => {
    return (
        <section className="contact-hero-wrapper">
            {/* ===== TOP HERO (75vh) ===== */}
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

                    <button className="contact-hero-btn">
                        Schedule a Call
                        <span className="contact-arrow-circle">
                            <FiArrowRight />
                        </span>
                    </button>
                </div>
            </div>

            

        </section>
    );
};

export default ContactHero;