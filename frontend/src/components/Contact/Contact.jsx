import React from "react";
import "./Contact.scss";

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <h2>Contactez-moi</h2>

      <div className="social-links">
        <a
          href="https://github.com/Georgesdm"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          <i className="fab fa-github"></i> GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/Georgesdm"
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
        >
          <i className="fab fa-linkedin"></i> LinkedIn
        </a>
        <a href="mailto:georgesdmpro@gmail.com" className="btn">
          <i className="fas fa-envelope"></i> Email
        </a>
      </div>
    </section>
  );
};

export default Contact;
