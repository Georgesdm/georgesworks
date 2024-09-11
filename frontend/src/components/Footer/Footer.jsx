import React from "react";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Georges.Works</p>
      </div>
    </footer>
  );
};

export default Footer;
