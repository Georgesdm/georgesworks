import React, { useState, useEffect } from "react";
import "./Stats.scss";

const Stats = () => {
  const [stats, setStats] = useState({
    publicRepos: 0,
    lastUpdated: "",
    totalCommits: 0,
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const username = "georgesdm"; // Replace with your GitHub username
        const apiBaseUrl = "https://api.github.com";

        const [userData, reposData] = await Promise.all([
          fetch(`${apiBaseUrl}/users/${username}`).then((res) => res.json()),
          fetch(`${apiBaseUrl}/users/${username}/repos`).then((res) =>
            res.json()
          ),
        ]);

        let totalCommits = 0;
        let latestUpdateDate = "";

        // Process repos
        await Promise.all(
          reposData.map(async (repo) => {
            const commitsData = await fetch(
              `${apiBaseUrl}/repos/${username}/${repo.name}/commits?per_page=1`
            ).then((res) => res.headers.get("Link"));

            const match = commitsData?.match(/page=(\d+)>; rel="last"/);
            totalCommits += match ? parseInt(match[1], 10) : 0;

            if (
              !latestUpdateDate ||
              new Date(repo.updated_at) > new Date(latestUpdateDate)
            ) {
              latestUpdateDate = repo.updated_at;
            }
          })
        );

        setStats({
          publicRepos: userData.public_repos,
          lastUpdated: latestUpdateDate,
          totalCommits,
        });
      } catch (error) {
        console.error("Error fetching GitHub data", error);
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
