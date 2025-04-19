export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: "frontend" | "backend" | "fullstack";
  technologies: string[];
  features: string[];
  liveUrl?: string;
  githubUrl?: string;
  screenshots?: string[];
  developmentTime?: string;
  challengesSolved?: string[];
  futurePlans?: string[];
  slug: string;
}

export interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
