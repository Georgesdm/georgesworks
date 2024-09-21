export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const GITHUB_API_BASE_URL = "https://api.github.com";

export const fetchProjects = async () => {
  const response = await fetch(`${API_URL}/api/projects`);
  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }
  return response.json();
};

export const fetchSkills = async () => {
  const response = await fetch(`${API_URL}/api/skills`);
  if (!response.ok) {
    throw new Error("Failed to fetch skills");
  }
  return response.json();
};

export const addSkill = async (newSkill) => {
  const response = await fetch(`${API_URL}/api/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(newSkill),
  });
  if (!response.ok) {
    throw new Error("Failed to add skill");
  }
  return response.json();
};

export const deleteSkill = async (id) => {
  const response = await fetch(`${API_URL}/api/skills/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete skill");
  }
};

export const addProject = async (formData) => {
  const response = await fetch(`${API_URL}/api/projects`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to add project");
  }

  return response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete project");
  }
};

export const updateProject = async (id, updatedProject) => {
  const response = await fetch(`${API_URL}/api/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updatedProject),
  });
  if (!response.ok) {
    throw new Error("Failed to update project");
  }
  return response.json();
};

export const login = async (email, password) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Erreur lors de la connexion");
  }

  return data;
};

export const fetchGitHubStats = async (username) => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  const headers = {
    Authorization: `token ${token}`,
    Accept: "application/vnd.github.v3+json",
  };

  const userUrl = `${GITHUB_API_BASE_URL}/users/${username}`;
  const reposUrl = `${GITHUB_API_BASE_URL}/users/${username}/repos?per_page=100`;

  const [userResponse, reposResponse] = await Promise.all([
    fetch(userUrl, { headers }),
    fetch(reposUrl, { headers }),
  ]);

  if (!userResponse.ok || !reposResponse.ok) {
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
      `${GITHUB_API_BASE_URL}/repos/${username}/${repo.name}/commits?per_page=1`,
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

  return {
    publicRepos: userData.public_repos,
    lastUpdated: latestUpdateDate,
    totalCommits,
  };
};
