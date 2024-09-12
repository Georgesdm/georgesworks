import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "../styles/errorpage.scss";

const ErrorPage = () => {
  return (
    <>
      <Navbar />
      <section className="error-page">
        <div className="error-content">
          <h1>
            <i class="fa-solid fa-triangle-exclamation"></i> 404
          </h1>
          <Link to="/" className="back-home-btn">
            Retourner à l'accueil
          </Link>
          <p>
            Il semble que vous ayez cliqué sur un lien brisé ou entré une
            mauvaise adresse.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ErrorPage;
