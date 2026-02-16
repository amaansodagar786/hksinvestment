import React from "react";
import "./ServicesSection.scss";

const ServicesSection = () => {
  return (
    <>
      <section className="services-section">
        <div className="services-container">

          {/* LEFT SIDE */}
          <div className="left">
            <div className="left-sticky">
              <h2>Our Services</h2>
              <p>Premium digital solutions built for scale.</p>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="right">
            {[1,2,3,4,5,6].map((item) => (
              <div key={item} className="card">
                <h3>Service {item}</h3>
                <p>Detailed service explanation content.</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="next-section">
        <h2>Next Section</h2>
      </section>
    </>
  );
};

export default ServicesSection;
