import React, { useRef, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaArrowLeft, FaArrowRight as FaArrowRightIcon } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules"; // Added Navigation
import { motion, AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "./Testimonials.scss";

// Avatar images (unchanged)
const avatars = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=100&h=100&fit=crop"
];

// Reviews array - uncommented all reviews
const reviews = [
    {
        name: "David R. 1",
        text: "We've scaled from 5 to 50 employees using this financial platform. The automation eliminated busywork and helped us focus on growth. Highly recommended for any business looking to streamline their financial operations."
    },
    {
        name: "Rebecca H.2",
        text: "The client portal is a game-changer for managing investments. Pricing flexibility could be better for individuals, but overall the service is excellent for serious investors."
    },
    {
        name: "Carlos M.3",
        text: "Great analytics and insights that helped us make better investment decisions. Occasional downtime during peak usage, but customer support is always responsive and helpful."
    },
    {
        name: "Akash P.4",
        text: "Solid security features and consistent performance. Integration was challenging at first but definitely worth it for the long-term benefits and financial tracking capabilities."
    },
    {
        name: "Thomas W.5",
        text: "Just amazing! Transformed how we manage our family finances. The interface is intuitive and the reporting features save us hours every month."
    },
    {
        name: "Lisa G.6",
        text: "Compliant, user-friendly, and supported by an excellent success team. They helped us set up our retirement portfolio and we've seen steady growth ever since."
    },
    {
        name: "Emma T.7",
        text: "Solid security features and consistent performance. Integration was challenging at first but definitely worth it for the long-term benefits."
    },
    {
        name: "Amaan S.8",
        text: "Solid security features and consistent performance. Integration was challenging at first but definitely worth it for the long-term benefits and financial tracking capabilities."
    },
    // {
    //     name: "John D.",
    //     text: "Excellent service and support. They helped me plan my retirement with confidence."
    // },
    // {
    //     name: "Sarah K.",
    //     text: "Very professional team. My investments have grown steadily thanks to their advice."
    // },
    // {
    //     name: "Mike P.",
    //     text: "Outstanding platform! The reporting features are incredibly detailed and helpful for tax planning."
    // },
    // {
    //     name: "Rachel W.",
    //     text: "Best decision we made for our business finances. The automation saves us at least 10 hours per week."
    // }
];

// Modal Component (unchanged - keep as is)
const ReviewModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="modal-content"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
            >
                <h3>Leave a Review</h3>
                <Formik
                    initialValues={{ name: "", number: "", review: "" }}
                    validate={values => {
                        const errors = {};
                        if (!values.name) errors.name = "Required";
                        if (!values.number) errors.number = "Required";
                        if (!values.review) errors.review = "Required";
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        setTimeout(() => {
                            toast.success("Review submitted successfully!");
                            setSubmitting(false);
                            resetForm();
                            onClose();
                        }, 500);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <Field type="text" name="name" />
                                <ErrorMessage name="name" component="div" className="error" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="number">Phone Number</label>
                                <Field type="tel" name="number" />
                                <ErrorMessage name="number" component="div" className="error" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="review">Review</label>
                                <Field as="textarea" name="review" rows="4" />
                                <ErrorMessage name="review" component="div" className="error" />
                            </div>
                            <div className="modal-actions">
                                <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                                <button type="submit" disabled={isSubmitting} className="submit-btn">
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <button className="close-modal" onClick={onClose}>×</button>
            </motion.div>
        </motion.div>
    );
};

const Testimonials = () => {
    const swiperRef = useRef(null);
    const desktopSwiperRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Animation variants (unchanged)
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

    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.02 },
        tap: { scale: 0.98 }
    };

    const sliderArrowVariants = {
        initial: {
            background: "#5e2690",
            scale: 1,
            rotate: 0
        },
        hover: {
            background: "#7a3db8",
            scale: 1.1,
            rotate: 360,
            transition: { duration: 0.4, ease: "easeInOut" }
        },
        tap: { scale: 0.9 }
    };

    // Function to arrange reviews in carousel that shows next logical set of 5 reviews
    const getDesktopSlides = () => {
        const slides = [];

        if (reviews.length <= 5) {
            // If 5 or fewer reviews, just show one slide
            slides.push({
                col1: [reviews[0], reviews[1]],
                col2: [reviews[2]],
                col3: [reviews[3], reviews[4]]
            });
        } else {
            let startIndex = 0;

            while (startIndex + 4 < reviews.length) {
                const slideReviews = reviews.slice(startIndex, startIndex + 5);

                slides.push({
                    col1: [slideReviews[0], slideReviews[1]],
                    col2: [slideReviews[2]],
                    col3: [slideReviews[3], slideReviews[4]]
                });

                // Move startIndex forward by the number of new reviews we want to show
                // For 6 reviews: +1, For 7 reviews: +2, For 8 reviews: +3, etc.
                startIndex += Math.max(1, Math.floor(5 - (reviews.length - startIndex - 5)));
            }

            // Handle the last slide if needed
            if (startIndex < reviews.length) {
                // Get the last 5 reviews available
                const lastStartIndex = Math.max(0, reviews.length - 5);
                const lastSlideReviews = reviews.slice(lastStartIndex, lastStartIndex + 5);

                // Check if this slide is different from the last one
                const lastSlide = {
                    col1: [lastSlideReviews[0], lastSlideReviews[1]],
                    col2: [lastSlideReviews[2]],
                    col3: [lastSlideReviews[3], lastSlideReviews[4]]
                };

                // Compare with the last slide in slides array
                const lastExistingSlide = slides[slides.length - 1];
                const lastExistingStr = JSON.stringify(lastExistingSlide);
                const lastSlideStr = JSON.stringify(lastSlide);

                if (lastExistingStr !== lastSlideStr) {
                    slides.push(lastSlide);
                }
            }
        }

        return slides;
    };

    const desktopSlides = getDesktopSlides();

    return (
        <>
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

                    {/* DESKTOP BUTTON – opens modal */}
                    <motion.button
                        className="review-btn desktop-only"
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <span className="review-btn-fill"></span>
                        <span className="review-btn-text">Leave a review</span>
                        <span className="review-btn-arrow">
                            <FiArrowRight />
                        </span>
                    </motion.button>
                </motion.div>

                {/* DESKTOP CAROUSEL – ALWAYS SHOWS 5 REVIEWS */}
                <div className="desktop-carousel desktop-only">
                    <Swiper
                        modules={[Autoplay, Navigation]}
                        onSwiper={(swiper) => (desktopSwiperRef.current = swiper)}
                        slidesPerView={1}
                        spaceBetween={0}
                        loop={false} // Change this to false
                        autoplay={false}
                        navigation={{
                            prevEl: '.desktop-swiper-prev',
                            nextEl: '.desktop-swiper-next',
                        }}
                        className="desktop-swiper"
                        watchOverflow={true} // Add this
                        allowTouchMove={false} // Add this to prevent manual swiping
                    >
                        {desktopSlides.map((slide, slideIndex) => (
                            <SwiperSlide key={slideIndex}>
                                <div className="testimonial-grid">
                                    {/* Column 1 - 2 reviews */}
                                    <div className="col col-1">
                                        {slide.col1.map((review, idx) => (
                                            <motion.div
                                                key={`col1-${slideIndex}-${idx}`}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, margin: "-50px" }}
                                                variants={cardVariants}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <ReviewCard
                                                    {...review}
                                                    avatar={avatars[(slideIndex * 5 + idx) % avatars.length]}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Column 2 - 1 review (vertically centered) */}
                                    <div className="col col-2">
                                        {slide.col2.map((review, idx) => (
                                            <motion.div
                                                key={`col2-${slideIndex}-${idx}`}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, margin: "-50px" }}
                                                variants={cardVariants}
                                                className="centered-card"
                                            >
                                                <ReviewCard
                                                    {...review}
                                                    avatar={avatars[(slideIndex * 5 + 2) % avatars.length]}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Column 3 - 2 reviews */}
                                    <div className="col col-3">
                                        {slide.col3.map((review, idx) => (
                                            <motion.div
                                                key={`col3-${slideIndex}-${idx}`}
                                                initial="hidden"
                                                whileInView="visible"
                                                viewport={{ once: true, margin: "-50px" }}
                                                variants={cardVariants}
                                                transition={{ delay: idx * 0.1 }}
                                            >
                                                <ReviewCard
                                                    {...review}
                                                    avatar={avatars[(slideIndex * 5 + 3 + idx) % avatars.length]}
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Desktop Navigation Arrows - Only show if more than 5 reviews */}
                    {desktopSlides.length > 1 && (
                        <div className="desktop-slider-arrows">
                            <motion.button
                                className="desktop-swiper-prev"
                                variants={sliderArrowVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                disabled={desktopSwiperRef.current?.isBeginning}
                            >
                                <FaArrowLeft />
                            </motion.button>
                            <motion.button
                                className="desktop-swiper-next"
                                variants={sliderArrowVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                                disabled={desktopSwiperRef.current?.isEnd}
                            >
                                <FaArrowRightIcon />
                            </motion.button>
                        </div>
                    )}
                </div>

                {/* MOBILE SLIDER – UNCHANGED */}
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

                    {/* SLIDER ARROWS */}
                    <div className="slider-arrows">
                        <motion.button
                            onClick={() => swiperRef.current?.slidePrev()}
                            variants={sliderArrowVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <FaArrowLeft />
                        </motion.button>
                        <motion.button
                            onClick={() => swiperRef.current?.slideNext()}
                            variants={sliderArrowVariants}
                            initial="initial"
                            whileHover="hover"
                            whileTap="tap"
                        >
                            <FaArrowRightIcon />
                        </motion.button>
                    </div>

                    {/* MOBILE CTA BUTTON – opens modal */}
                    <motion.button
                        className="review-btn mobile-only"
                        variants={buttonVariants}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <span className="review-btn-fill"></span>
                        <span className="review-btn-text">Leave a review</span>
                        <span className="review-btn-arrow">
                            <FiArrowRight />
                        </span>
                    </motion.button>
                </div>
            </motion.section>

            {/* MODAL */}
            <AnimatePresence>
                {isModalOpen && <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
            </AnimatePresence>

            {/* TOAST CONTAINER */}
            <ToastContainer position="top-right" autoClose={3000} />
        </>
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