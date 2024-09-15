import React, { useState, useEffect } from "react";
import { fetchSkills, addSkill, deleteSkill } from "../../api/api";

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", icon: "", color: "" });

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchSkills();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    loadSkills();
  }, []);

  const handleAddSkill = async () => {
    try {
      const data = await addSkill(newSkill);
      setSkills([...skills, data.skill]);
      setNewSkill({ name: "", icon: "", color: "" });
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      await deleteSkill(id);
      setSkills(skills.filter((skill) => skill._id !== id));
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  return (
    <div className="manage-skills">
      <h2>Ajouter une Compétence</h2>
      <form onSubmit={handleAddSkill}>
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
            <button onClick={() => handleDeleteSkill(skill._id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageSkills;
