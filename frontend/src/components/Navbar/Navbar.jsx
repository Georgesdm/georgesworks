import React from "react";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">Georges Works</div>
        <ul className="nav-links">
          <li>
            <a href="#projects">Projets</a>
          </li>
          <li>
            <a href="#skills">Compétences</a>
          </li>
          <li>
            <a href="#about">À propos</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
