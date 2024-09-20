import React, { useState, useEffect, useRef } from "react";
import { fetchGitHubStats } from "../../api/api";
import "./Stats.scss";

const Stats = () => {
  const [stats, setStats] = useState({
    publicRepos: 0,
    lastUpdated: "",
    totalCommits: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  const animateValue = (start, end, duration, element) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      element.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

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
  useEffect(() => {
    const handleScroll = () => {
      if (!statsRef.current) return;

      const statsTop = statsRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (statsTop < windowHeight && !hasAnimated) {
        const elements = statsRef.current.querySelectorAll(".stat-number");
        elements.forEach((element) => {
          const endValue = parseInt(element.getAttribute("data-value"), 10);
          animateValue(0, endValue, 2000, element);
        });
        setHasAnimated(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasAnimated]);

  return (
    <section className="stats" ref={statsRef}>
      <h2>Statistiques GitHub</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <h3 className="stat-number" data-value={stats.publicRepos}>
            0
          </h3>
          <p>Dépôts publics</p>
        </div>
        <div className="stat-item">
          <h3 className="stat-number" data-value={stats.totalCommits}>
            0
          </h3>
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
