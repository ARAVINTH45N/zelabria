const skillKeywords = [
  "react",
  "node",
  "javascript",
  "python",
  "java",
  "mongodb",
  "express",
  "frontend",
  "backend",
  "fullstack",
  "api",
  "django",
  "flask",
  "html",
  "css",
  "sql",
  "typescript"
];

function extractSkills(text) {
  const foundSkills = [];

  if (!text) return foundSkills;

  const lowerText = text.toLowerCase();

  skillKeywords.forEach((skill) => {
    if (lowerText.includes(skill)) {
      foundSkills.push(skill);
    }
  });

  return foundSkills;
}

module.exports = extractSkills;