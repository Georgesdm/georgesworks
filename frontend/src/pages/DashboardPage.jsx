import React, { useState } from "react";
import "../styles/dashboard.scss";
import ManageProjects from "../components/Admin/ManageProjects";
import ManageSkills from "../components/Admin/ManageSkills";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("skills");
  const navigate = useNavigate();

  const renderActiveTab = () => {
    if (activeTab === "skills") {
      return <ManageSkills />;
    }
    if (activeTab === "projects") {
      return <ManageProjects />;
    }
  };

  const handleLogout = () => {
    console.log("Déconnexion en cours...");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <div className="backHome">
        <a href="/">Retour au site</a>
      </div>
      <h1>Tableau de bord Administrateur</h1>
      <div className="tabs">
        <button onClick={() => setActiveTab("skills")}>
          Gérer les Compétences
        </button>
        <button onClick={() => setActiveTab("projects")}>
          Gérer les Projets
        </button>
      </div>
      <div className="content">{renderActiveTab()}</div>
      <div className="logout">
        <button onClick={handleLogout}>Déconnexion</button>
      </div>
    </div>
  );
};

export default DashboardPage;
