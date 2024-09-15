import React, { useState, useEffect } from "react";
import { fetchGitHubStats } from "../../api/api";
import "./Stats.scss";

const Stats = () => {
  const [stats, setStats] = useState({
    publicRepos: 0,
    lastUpdated: "",
    totalCommits: 0,
  });

  useEffect(() => {
    const loadGitHubStats = async () => {
      try {
        const username = "georgesdm";
        const data = await fetchGitHubStats(username);
        setStats(data);
      } catch (error) {
        console.error("Error fetching GitHub data", error);
        setStats({
          publicRepos: "Erreur",
          lastUpdated: "Erreur",
          totalCommits: "Erreur",
        });
      }
    };

    loadGitHubStats();
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
          <h3>
            {stats.lastUpdated !== "N/A"
              ? new Date(stats.lastUpdated).toLocaleDateString()
              : "N/A"}
          </h3>
          <p>Dernier commit publié</p>
        </div>
      </div>
    </section>
  );
};

export default Stats;
