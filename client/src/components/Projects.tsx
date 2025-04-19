import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { projects } from "@/data/projects";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Code, ArrowRight, Filter, Layers } from "lucide-react";

type FilterType = "all" | "frontend" | "backend" | "fullstack";

export default function Projects() {
  const [filter, setFilter] = useState<FilterType>("all");
  const { targetRef, hasIntersected } = useIntersectionObserver();

  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.category === filter
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.6 
      } 
    }
  };

  return (
    <section id="projects" className="section-container bg-[var(--deep-blue)]" ref={targetRef as React.RefObject<HTMLElement>}>
      {/* Background elements */}
      <div className="animated-bg">
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[var(--neon-purple)] opacity-10 blur-[150px] rounded-full"></div>
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[var(--neon-pink)] opacity-10 blur-[150px] rounded-full"></div>
      </div>
      
      <div className="main-container">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title gradient-heading">
              My Projects
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              A showcase of my recent work, highlighting my development skills and technical capabilities.
            </p>
          </motion.div>
        </div>
        
        <motion.div 
          className="flex gap-3 md:gap-4 justify-center flex-wrap mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="glass-panel rounded-full p-1 flex">
            <motion.button 
              className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 ${
                filter === "all" 
                  ? "glow-btn text-white" 
                  : "text-white/70 hover:text-white"
              }`} 
              onClick={() => setFilter("all")}
              whileHover={{ scale: filter !== "all" ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center">
                <Filter className="h-4 w-4 mr-2 opacity-70" />
                All Projects
              </span>
            </motion.button>
            
            <motion.button 
              className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 ${
                filter === "frontend" 
                  ? "glow-btn text-white" 
                  : "text-white/70 hover:text-white"
              }`} 
              onClick={() => setFilter("frontend")}
              whileHover={{ scale: filter !== "frontend" ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center">
                <Code className="h-4 w-4 mr-2 opacity-70" />
                Frontend
              </span>
            </motion.button>
            
            <motion.button 
              className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 ${
                filter === "fullstack" 
                  ? "glow-btn text-white" 
                  : "text-white/70 hover:text-white"
              }`} 
              onClick={() => setFilter("fullstack")}
              whileHover={{ scale: filter !== "fullstack" ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center">
                <Layers className="h-4 w-4 mr-2 opacity-70" />
                Full-Stack
              </span>
            </motion.button>
            
            <motion.button 
              className={`px-4 sm:px-6 py-2 rounded-full transition-all duration-300 ${
                filter === "backend" 
                  ? "glow-btn text-white" 
                  : "text-white/70 hover:text-white"
              }`} 
              onClick={() => setFilter("backend")}
              whileHover={{ scale: filter !== "backend" ? 1.05 : 1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 opacity-70">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
                Backend
              </span>
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {filteredProjects.map((project) => (
            <motion.div 
              key={project.id}
              className="project-card group"
              variants={itemVariants}
              onClick={() => window.location.href = `/projects/${project.slug}`}
            >
              <div className="relative overflow-hidden h-56 rounded-t-xl">
                <img 
                  src={project.image} 
                  alt={`${project.title} Screenshot`} 
                  className="w-full h-full object-cover project-image"
                />
                <div className="absolute inset-0 project-overlay"></div>
                
                <div className="absolute top-4 right-4 z-10">
                  <span className={`
                    text-xs capitalize px-3 py-1 rounded-full font-medium backdrop-blur-sm
                    ${project.category === 'frontend' 
                      ? 'bg-[var(--neon-pink)]/20 text-[var(--neon-pink)] border border-[var(--neon-pink)]/30' 
                      : project.category === 'backend' 
                        ? 'bg-[var(--neon-purple)]/20 text-[var(--neon-purple)] border border-[var(--neon-purple)]/30' 
                        : 'bg-[var(--neon-orange)]/20 text-[var(--neon-orange)] border border-[var(--neon-orange)]/30'
                    }`
                  }>
                    {project.category}
                  </span>
                </div>
              </div>
              
              <div className="project-card-content p-6">
                <h3 className="font-heading font-bold text-xl mb-3 text-white">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span key={index} className="tech-tag flex items-center">
                      <Code className="h-3 w-3 mr-1 opacity-70" /> {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="tech-tag">+{project.technologies.length - 3}</span>
                  )}
                </div>
                <p className="text-gray-300 text-sm line-clamp-2 mb-4">
                  {project.shortDescription}
                </p>
                <div className="mt-auto pt-2">
                  <span className="inline-flex items-center text-[var(--neon-pink)] font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                    View Project Details 
                    <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
