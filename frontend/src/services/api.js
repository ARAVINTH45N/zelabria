const API = "https://zelabria-api.onrender.com";

export const getInternships = async () => {
  const res = await fetch(`${API}/api/internships`);
  return res.json();
};

export const registerUser = async (data) => {
  const res = await fetch(`${API}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const updateSkills = async (data) => {
  const res = await fetch(`${API}/api/user/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getMatches = async (userId) => {
  const res = await fetch(`${API}/api/match/${userId}`);
  return res.json();
};