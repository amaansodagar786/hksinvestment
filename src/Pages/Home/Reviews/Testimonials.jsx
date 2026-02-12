import React, { useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight as FaArrowRightIcon } from "react-icons/fa6"; // NEW ICONS
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "./Testimonials.scss";

// Avatar images
const avatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
];

const reviews = [
    {
        name: "David R.",
        text: "We've scaled from 5 to 50 employees using this financial platform. The automation eliminated busywork and helped us focus on growth. Highly recommended for any business looking to streamline their financial operations."
    },
    {
        name: "Rebecca H.",
        text: "The client portal is a game-changer for managing investments. Pricing flexibility could be better for individuals, but overall the service is excellent for serious investors."
    },
    {
        name: "Carlos M.",
        text: "Great analytics and insights that helped us make better investment decisions. Occasional downtime during peak usage, but customer support is always responsive and helpful."
    },
    {
        name: "Akash P.",
        text: "Solid security features and consistent performance. Integration was challenging at first but definitely worth it for the long-term benefits and financial tracking capabilities."
    },
    {
        name: "Thomas W.",
        text: "Just amazing! Transformed how we manage our family finances. The interface is intuitive and the reporting features save us hours every month."
    },
    {
        name: "Lisa G.",
        text: "Compliant, user-friendly, and supported by an excellent success team. They helped us set up our retirement portfolio and we've seen steady growth ever since."
    },
    {
        name: "Emma T.",
        text: "Solid security features and consistent performance. Integration was challenging at first but definitely worth it for the long-term benefits."
    }
];

const Testimonials = () => {
    const swiperRef = useRef(null);

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
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const pillVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4, ease: "backOut" }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        },
        
    };

    // BUTTON VARIANTS – SAME AS ABOUT SECTION
    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    const avatarVariants = {
        hover: {
            scale: 1.1,
            borderColor: "#7a3db8",
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };

    // ARROW VARIANTS FOR SLIDER BUTTONS (FaArrowLeft / FaArrowRight)
    const sliderArrowVariants = {
        initial: {
            background: "#5e2690",
            scale: 1,
            rotate: 0
        },
        hover: {
            background: "#7a3db8",
            scale: 1.1,
            rotate: 360, // full spin for fun
            transition: { duration: 0.4, ease: "easeInOut" }
        },
        tap: { scale: 0.9 }
    };

    return (
        <motion.section
            className="testimonial-section"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
        >
            {/* HEADER */}
            <motion.div
                className="testimonial-header"
                variants={headerVariants}
            >
                <div>
                    <motion.span
                        className="pill"
                        variants={pillVariants}
                    >
                        Testimonial
                    </motion.span>
                    <motion.h2 variants={headerVariants}>
                        Reviews that <br />
                        <motion.span
                            initial={{ opacity: 0.8 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatType: "reverse"
                            }}
                        >
                            make us blush
                        </motion.span>
                    </motion.h2>
                </div>

                {/* DESKTOP BUTTON – hidden on mobile via CSS */}
                <motion.button
                    className="review-btn desktop-only"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                >
                    <span className="review-btn-fill"></span>
                    <span className="review-btn-text">Leave a review</span>
                    <span className="review-btn-arrow">
                        <FiArrowRight />
                    </span>
                </motion.button>
            </motion.div>

            {/* DESKTOP GRID – LAYOUT UNCHANGED */}
            <div className="testimonial-grid desktop-only">
                <div className="col">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={cardVariants}
                        // whileHover="hover" 
                    >
                        <ReviewCard {...reviews[0]} avatar={avatars[0]} />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={cardVariants}
                        whileHover="hover"
                        transition={{ delay: 0.1 }}
                    >
                        <ReviewCard {...reviews[3]} avatar={avatars[3]} />
                    </motion.div>
                </div>
                <div className="col">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={cardVariants}
                        whileHover="hover"
                        transition={{ delay: 0.2 }}
                    >
                        <ReviewCard {...reviews[1]} avatar={avatars[1]} />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={cardVariants}
                        whileHover="hover"
                        transition={{ delay: 0.3 }}
                    >
                        <ReviewCard {...reviews[4]} avatar={avatars[4]} />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={cardVariants}
                        whileHover="hover"
                        transition={{ delay: 0.4 }}
                    >
                        <ReviewCard {...reviews[5]} avatar={avatars[5]} />
                    </motion.div>
                </div>
                <div className="col">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={cardVariants}
                        whileHover="hover"
                        transition={{ delay: 0.5 }}
                    >
                        <ReviewCard {...reviews[2]} avatar={avatars[2]} />
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        variants={cardVariants}
                        whileHover="hover"
                        transition={{ delay: 0.6 }}
                    >
                        <ReviewCard {...reviews[6]} avatar={avatars[6]} />
                    </motion.div>
                </div>
            </div>

            {/* MOBILE SLIDER – LAYOUT UNCHANGED */}
            <div className="testimonial-mobile">
                <Swiper
                    modules={[Autoplay]}
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    slidesPerView={1}
                    spaceBetween={20}
                    loop
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                >
                    {reviews.map((item, i) => (
                        <SwiperSlide key={i}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                <ReviewCard {...item} avatar={avatars[i]} mobile />
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* SLIDER ARROWS – UPDATED WITH FaArrowLeft / FaArrowRight */}
                <div className="slider-arrows">
                    <motion.button
                        onClick={() => swiperRef.current.slidePrev()}
                        variants={sliderArrowVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <FaArrowLeft />
                    </motion.button>
                    <motion.button
                        onClick={() => swiperRef.current.slideNext()}
                        variants={sliderArrowVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <FaArrowRightIcon />
                    </motion.button>
                </div>

                {/* MOBILE CTA BUTTON – ONLY BUTTON IN MOBILE VIEW */}
                <motion.button
                    className="review-btn mobile-only"
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                >
                    <span className="review-btn-fill"></span>
                    <span className="review-btn-text">Leave a review</span>
                    <span className="review-btn-arrow">
                        <FiArrowRight />
                    </span>
                </motion.button>
            </div>
        </motion.section>
    );
};

const ReviewCard = ({ name, text, avatar, mobile }) => {
    const avatarVariants = {
        hover: {
            scale: 1.1,
            borderColor: "#7a3db8",
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };

    return (
        <div className={`review-card-testimonial ${mobile ? "mobile-card" : ""}`}>
            <div className="user">
                <motion.div
                    className="avatar"
                    whileHover="hover"
                    variants={avatarVariants}
                >
                    <img src={avatar} alt={name} />
                </motion.div>
                <motion.strong
                    initial={{ opacity: 0.8 }}
                    whileHover={{
                        opacity: 1,
                        color: "#7a3db8",
                        transition: { duration: 0.2 }
                    }}
                >
                    {name}
                </motion.strong>
            </div>
            <motion.p
                initial={{ opacity: 0.9 }}
                whileHover={{
                    opacity: 1,
                    color: "#f0f0f0",
                    transition: { duration: 0.2 }
                }}
            >
                {text}
            </motion.p>
        </div>
    );
};

export default Testimonials;