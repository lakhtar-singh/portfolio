export const COLORS = {
  primary: "#FF5A5F",
  secondary: "#087E8B",
  accent: "#F5A623",
  light: "#FFFFFF",
  lightGray: "#F7F7F7",
  mediumGray: "#E0E0E0", 
  darkGray: "#333333",
  dark: "#111111",
  textPrimary: "#333333",
  textSecondary: "#666666",
};

export const SECTIONS = [
  {
    id: "home",
    name: "Home",
  },
  {
    id: "about",
    name: "About",
  },
  {
    id: "projects",
    name: "Projects",
  },
  {
    id: "skills",
    name: "Skills",
  },
  {
    id: "contact",
    name: "Contact",
  },
];

export const SKILLS = {
  frontend: [
    { name: "React.js / Next.js", percentage: 95 },
    { name: "Vue.js", percentage: 85 },
    { name: "CSS / Tailwind / SASS", percentage: 90 },
    { name: "JavaScript / TypeScript", percentage: 92 },
  ],
  backend: [
    { name: "Node.js / Express", percentage: 90 },
    { name: "PHP / Laravel", percentage: 85 },
    { name: "RESTful API Design", percentage: 95 },
    { name: "SQL / NoSQL Databases", percentage: 88 },
  ],
  other: [
    { name: "DevOps / CI/CD", percentage: 80 },
    { name: "UI/UX Design", percentage: 85 },
    { name: "WebSockets / Real-time Apps", percentage: 90 },
    { name: "Performance Optimization", percentage: 88 },
  ],
};
