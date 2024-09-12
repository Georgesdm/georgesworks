import React, { useState, useEffect } from "react";

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", icon: "", color: "" });

  // Récupérer les compétences depuis le backend
  useEffect(() => {
    const fetchSkills = async () => {
      const response = await fetch("http://localhost:4000/api/skills", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setSkills(data);
    };

    fetchSkills();
  }, []);

  const addSkill = async () => {
    const response = await fetch("http://localhost:4000/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newSkill),
    });
    const data = await response.json();
    setSkills([...skills, data.skill]);
    setNewSkill({ name: "", icon: "", color: "" });
  };

  const deleteSkill = async (id) => {
    await fetch(`http://localhost:4000/api/skills/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setSkills(skills.filter((skill) => skill._id !== id));
  };

  return (
    <div className="manage-skills">
      <h2>Ajouter une Compétence</h2>
      <form onSubmit={addSkill}>
        <input
          type="text"
          placeholder="Nom"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Icône"
          value={newSkill.icon}
          onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Couleur"
          value={newSkill.color}
          onChange={(e) => setNewSkill({ ...newSkill, color: e.target.value })}
          required
        />
        <button type="submit">Ajouter</button>
      </form>

      <h2>Liste des Compétences</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skill._id}>
            {skill.name}
            <button onClick={() => deleteSkill(skill._id)}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSkills;
