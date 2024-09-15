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
        const username = "georgesdm";
        const apiBaseUrl = "https://api.github.com";
        const token = import.meta.env.VITE_GITHUB_TOKEN;

        console.log("GitHub Token:", token);

        const headers = {
          Authorization: `token ${token}`,
          Accept: "application/vnd.github.v3+json",
        };

        console.log("Request headers:", headers);

        const userUrl = `${apiBaseUrl}/users/${username}`;
        const reposUrl = `${apiBaseUrl}/users/${username}/repos?per_page=100`;

        console.log("User URL:", userUrl);
        console.log("Repos URL:", reposUrl);

        const [userResponse, reposResponse] = await Promise.all([
          fetch(userUrl, { headers }),
          fetch(reposUrl, { headers }),
        ]);

        console.log("User response status:", userResponse.status);
        console.log("Repos response status:", reposResponse.status);

        if (!userResponse.ok || !reposResponse.ok) {
          const userText = await userResponse.text();
          const reposText = await reposResponse.text();
          console.log("User response body:", userText);
          console.log("Repos response body:", reposText);
          throw new Error(
            `HTTP error! status: ${userResponse.status}, ${reposResponse.status}`
          );
        }

        const [userData, reposData] = await Promise.all([
          userResponse.json(),
          reposResponse.json(),
        ]);

        let totalCommits = 0;
        let latestUpdateDate = "";

        const commitPromises = reposData.map((repo) =>
          fetch(
            `${apiBaseUrl}/repos/${username}/${repo.name}/commits?per_page=1`,
            { headers }
          ).then((res) => {
            const linkHeader = res.headers.get("Link");
            if (linkHeader && linkHeader.includes('rel="last"')) {
              const matches = linkHeader.match(/&page=(\d+)>; rel="last"/);
              if (matches && matches[1]) {
                return parseInt(matches[1], 10);
              }
            }
            return 1;
          })
        );

        const commitCounts = await Promise.all(commitPromises);
        totalCommits = commitCounts.reduce((sum, count) => sum + count, 0);

        reposData.forEach((repo) => {
          if (
            !latestUpdateDate ||
            new Date(repo.pushed_at) > new Date(latestUpdateDate)
          ) {
            latestUpdateDate = repo.pushed_at;
          }
        });

        setStats({
          publicRepos: userData.public_repos,
          lastUpdated: latestUpdateDate,
          totalCommits,
        });
      } catch (error) {
        console.error("Error fetching GitHub data", error);
        setStats({
          publicRepos: "Erreur",
          lastUpdated: "Erreur",
          totalCommits: "Erreur",
        });
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
