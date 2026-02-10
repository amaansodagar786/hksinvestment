import React from "react";
import { FiArrowRight } from "react-icons/fi";
import "./HeroSection.scss";
import coin from "../../../assets/images/home/hero/coin.png"
import bar from "../../../assets/images/home/hero/bar.png"

const HeroSection = () => {
    return (
        <section className="hero-wrapper">
            {/* ===== TOP HERO (75vh) ===== */}
            <div className="hero-top">
                <div className="hero-content">
                    <h1 className="hero-title">
                        Clarity for every <br />
                        <span className="financial-highlight">Financial</span> move
                    </h1>

                    <p className="hero-subtitle">
                        Take control of your financial future!
                        <br />
                        Smart financial support for steady growth and peace of mind.
                    </p>

                    <button className="hero-btn">
                        Let's start
                        <span className="arrow-circle">
                            <FiArrowRight />
                        </span>
                    </button>
                </div>
            </div>

            {/* ===== BOTTOM SECTION ===== */}
            <div className="hero-bottom-section">
                <div className="hero-bottom-bg">
                    <div className="hero-bottom-grid">

                        {/* COLUMN 1 */}
                        <div className="hero-bottom-col hero-bottom-col-text">
                            <div className="hero-bottom-text-content">
                                <p>
                                    Your <br /> Pathway to <br />
                                    <strong>Financial</strong> <br />
                                    Prosperity <br /> Starts Here!
                                </p>
                            </div>
                        </div>

                        {/* COLUMN 2 */}
                        <div className="hero-bottom-col hero-bottom-col-image">
                            <div className="hero-bottom-fixed-image">
                                <img
                                    src={bar}
                                    alt="growth"
                                />
                            </div>
                        </div>

                        {/* COLUMN 3 */}
                        <div className="hero-bottom-col hero-bottom-col-right">
                            <div className="hero-bottom-right-top">
                                <img
                                    src={coin}
                                    alt="coins"
                                />
                            </div>

                            <div className="hero-bottom-right-bottom">
                                <div className="hero-bottom-bar-chart">
                                    <div className="hero-bottom-bar hero-bottom-bar1">8</div>
                                    <div className="hero-bottom-bar hero-bottom-bar2">12</div>
                                    <div className="hero-bottom-bar hero-bottom-bar3">16</div>
                                    <div className="hero-bottom-bar hero-bottom-bar4">20</div>
                                    <div className="hero-bottom-bar hero-bottom-bar5">29</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    );
};

export default HeroSection;