import React, { useState, useEffect } from "react";
import "./Stats.scss";

const Stats = () => {
  const [stats, setStats] = useState({
    publicRepos: 0,
    lastUpdated: "", // Date de dernière mise à jour
    totalCommits: 0,
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const username = "georgesdm"; // Remplacez par votre nom d'utilisateur GitHub

        // Récupérer les infos de l'utilisateur
        const userResponse = await fetch(
          `https://api.github.com/users/${username}`
        );
        const userData = await userResponse.json();

        // Récupérer la liste des dépôts publics
        const reposResponse = await fetch(userData.repos_url);
        const reposData = await reposResponse.json();

        // Variables pour stocker les commits et la date de dernière mise à jour
        let totalCommits = 0;
        let latestUpdateDate = "";

        // Parcourir chaque dépôt
        await Promise.all(
          reposData.map(async (repo) => {
            // Récupérer le nombre de commits pour chaque dépôt
            const commitsResponse = await fetch(
              repo.commits_url.replace("{/sha}", "")
            );
            const commitsData = await commitsResponse.json();
            totalCommits += commitsData.length;

            // Vérifier si la date de dernière mise à jour est plus récente que la précédente
            if (
              !latestUpdateDate ||
              new Date(repo.updated_at) > new Date(latestUpdateDate)
            ) {
              latestUpdateDate = repo.updated_at;
            }
          })
        );

        // Mettre à jour les stats avec la dernière mise à jour et les commits
        setStats({
          publicRepos: userData.public_repos,
          lastUpdated: latestUpdateDate,
          totalCommits,
        });
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données GitHub",
          error
        );
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <section className="stats">
      <h2>Statistiques GitHub</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <h3>{stats.publicRepos}</h3>
          <p>Dépôts publics</p>
        </div>
        <div className="stat-item">
          <h3>{stats.totalCommits}</h3>
          <p>Total des commits</p>
        </div>
        <div className="stat-item">
          <h3>{new Date(stats.lastUpdated).toLocaleDateString()}</h3>
          <p>Dernier commit publié</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
