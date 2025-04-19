import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { Project } from "@/types";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Github, 
  Calendar, 
  Code, 
  Layers, 
  CheckCircle2, 
  Lightbulb, 
  Rocket, 
  ArrowRight,
  Infinity,
  Clock
} from "lucide-react";

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { targetRef, hasIntersected } = useIntersectionObserver();

  useEffect(() => {
    // Find the project by slug
    const foundProject = projects.find(p => p.slug === slug);
    setProject(foundProject || null);
    setLoading(false);
  }, [slug]);

  // Handle image slider navigation
  const nextImage = () => {
    if (!project?.screenshots) return;
    setCurrentImageIndex((prev) => 
      prev === project.screenshots!.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!project?.screenshots) return;
    setCurrentImageIndex((prev) => 
      prev === 0 ? project.screenshots!.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--deep-blue)]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-t-2 border-[var(--neon-pink)] border-r-2 border-b-2 border-transparent rounded-full animate-spin mb-4"></div>
          <div className="gradient-text font-heading text-2xl">Loading project...</div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--deep-blue)]">
        <h1 className="gradient-heading text-4xl mb-6">Project Not Found</h1>
        <p className="text-gray-400 mb-8 text-center max-w-md">The project you're looking for doesn't exist or has been removed.</p>
        <Link href="/#projects">
          <a className="btn-primary flex items-center">
            <ChevronLeft className="mr-2 h-5 w-5" /> Back to Projects
          </a>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 pb-20" ref={targetRef as React.RefObject<HTMLDivElement>}>
      {/* Background elements */}
      <div className="animated-bg">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[var(--neon-pink)] opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[var(--neon-purple)] opacity-10 blur-[120px] rounded-full"></div>
      </div>
      
      <div className="main-container">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/#projects">
            <a className="inline-flex items-center text-white/70 hover:text-white mb-10 transition-colors group">
              <ChevronLeft className="mr-1 h-5 w-5 group-hover:transform group-hover:-translate-x-1 transition-transform" /> 
              <span>Back to Projects</span>
            </a>
          </Link>
        </motion.div>

        {/* Project header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="gradient-heading text-4xl md:text-5xl mb-5 inline-block">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag flex items-center">
                <Code className="h-3 w-3 mr-1 opacity-70" /> {tech}
              </span>
            ))}
          </div>
          <p className="text-gray-300 text-lg max-w-4xl">{project.shortDescription}</p>
        </motion.div>

        {/* Screenshots slider */}
        <motion.div 
          className="mb-16 relative rounded-xl overflow-hidden neon-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative aspect-video bg-[var(--slate-gray)]">
            {project.screenshots && project.screenshots.length > 0 ? (
              <img 
                src={project.screenshots[currentImageIndex]} 
                alt={`${project.title} screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-white/50">No screenshots available</p>
              </div>
            )}
            
            {/* Navigation arrows */}
            {project.screenshots && project.screenshots.length > 1 && (
              <>
                <motion.button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm rounded-full p-3 text-white hover:bg-[var(--neon-pink)]/80 transition-colors"
                  aria-label="Previous image"
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronLeft className="h-6 w-6" />
                </motion.button>
                <motion.button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm rounded-full p-3 text-white hover:bg-[var(--neon-pink)]/80 transition-colors"
                  aria-label="Next image"
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ChevronRight className="h-6 w-6" />
                </motion.button>
              </>
            )}
            
            {/* Pagination dots */}
            {project.screenshots && project.screenshots.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 glass-panel rounded-full px-3 py-2 flex space-x-2">
                {project.screenshots.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentImageIndex 
                        ? 'bg-[var(--neon-pink)] scale-110' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Project details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Project Overview */}
            <div className="glass-panel p-8 mb-10">
              <h2 className="gradient-heading text-2xl mb-5 flex items-center">
                <Layers className="mr-3 h-6 w-6 text-[var(--neon-pink)]" /> Project Overview
              </h2>
              <div className="gradient-divider mb-6"></div>
              <p className="text-gray-300 mb-6 leading-relaxed">{project.fullDescription}</p>
              
              {/* Development Timeline */}
              <div className="mb-8">
                <h3 className="font-heading text-xl text-white mb-4 flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-[var(--neon-orange)]" /> Development Timeline
                </h3>
                <div className="timeline-container">
                  <div className="timeline-item">
                    <h4 className="text-[var(--neon-pink)] font-medium mb-1">Planning & Research</h4>
                    <p className="text-gray-400">Initial requirements gathering, market research, and competitive analysis. Architecture and technology stack decisions were made during this phase.</p>
                  </div>
                  <div className="timeline-item">
                    <h4 className="text-[var(--neon-pink)] font-medium mb-1">Design & Prototyping</h4>
                    <p className="text-gray-400">Creating wireframes, UI designs, and interactive prototypes. User flows and experience were carefully crafted to ensure intuitive navigation.</p>
                  </div>
                  <div className="timeline-item">
                    <h4 className="text-[var(--neon-pink)] font-medium mb-1">Development</h4>
                    <p className="text-gray-400">Implementation of frontend and backend components, database design, API integrations, and core functionality development.</p>
                  </div>
                  <div className="timeline-item">
                    <h4 className="text-[var(--neon-pink)] font-medium mb-1">Testing & Refinement</h4>
                    <p className="text-gray-400">Rigorous testing for functionality, performance, security, and user experience. Feedback incorporation and iterative improvements.</p>
                  </div>
                  <div className="timeline-item">
                    <h4 className="text-[var(--neon-pink)] font-medium mb-1">Deployment & Monitoring</h4>
                    <p className="text-gray-400">Deployment to production environment, performance monitoring, and continuous improvement based on real-world usage data.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Key Features */}
            <div className="glass-panel p-8 mb-10">
              <h2 className="gradient-heading text-2xl mb-5 flex items-center">
                <CheckCircle2 className="mr-3 h-6 w-6 text-[var(--neon-pink)]" /> Core Functionality
              </h2>
              <div className="gradient-divider mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {project.features.map((feature, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-white/5 rounded-lg p-5 border border-white/10"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(227, 49, 111, 0.2)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-start">
                      <span className="flex-shrink-0 w-8 h-8 bg-[var(--neon-pink)]/20 rounded-full flex items-center justify-center mr-3">
                        <span className="text-[var(--neon-pink)]">0{index + 1}</span>
                      </span>
                      <div>
                        <h3 className="text-white font-medium mb-2">Feature {index + 1}</h3>
                        <p className="text-gray-400">{feature}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="bg-[var(--neon-pink)]/10 rounded-lg p-6 border border-[var(--neon-pink)]/20">
                <h3 className="text-[var(--neon-pink)] font-heading text-xl mb-3">How It Works</h3>
                <p className="text-gray-300 mb-4">
                  This {project.category} application implements a comprehensive workflow that handles 
                  {project.category === 'fullstack' 
                    ? ' both client-side and server-side operations.' 
                    : project.category === 'frontend' 
                      ? ' sophisticated UI rendering and state management.' 
                      : ' complex server logic and data processing.'}
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-[var(--neon-pink)] mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-gray-300">
                      {project.category === 'fullstack' 
                        ? 'The frontend communicates with the backend API using RESTful endpoints, with data validation on both client and server sides.'
                        : project.category === 'frontend'
                          ? 'The application uses modern state management to control UI rendering and optimize performance.'
                          : 'The server processes requests through a well-structured middleware pipeline for authentication, validation, and error handling.'}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-[var(--neon-pink)] mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-gray-300">
                      {project.category === 'fullstack'
                        ? 'User authentication is handled securely with JWT tokens and proper password hashing.'
                        : project.category === 'frontend'
                          ? 'Components are structured for reusability and maintainability, with clear separation of concerns.'
                          : 'The database schema is optimized for query performance with proper indexing and relationship management.'}
                    </p>
                  </div>
                  <div className="flex items-start">
                    <ArrowRight className="h-5 w-5 text-[var(--neon-pink)] mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-gray-300">
                      {project.category === 'fullstack'
                        ? 'Real-time updates are implemented using WebSockets for immediate data synchronization between clients.'
                        : project.category === 'frontend'
                          ? 'Animations and transitions enhance the user experience while maintaining accessibility standards.'
                          : 'Background processing handles computationally intensive tasks without blocking the main request thread.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Challenges & Solutions */}
            {project.challengesSolved && project.challengesSolved.length > 0 && (
              <div className="glass-panel p-8 mb-10">
                <h2 className="gradient-heading text-2xl mb-5 flex items-center">
                  <Lightbulb className="mr-3 h-6 w-6 text-[var(--neon-pink)]" /> Challenges & Solutions
                </h2>
                <div className="gradient-divider mb-6"></div>
                <div className="space-y-6">
                  {project.challengesSolved.map((challenge, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-6 border border-white/10">
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-[var(--neon-purple)]/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <span className="text-[var(--neon-purple)] font-heading font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="text-white font-medium mb-2">Challenge {index + 1}</h3>
                          <p className="text-gray-400">{challenge}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Future Plans */}
            {project.futurePlans && project.futurePlans.length > 0 && (
              <div className="glass-panel p-8 mb-10">
                <h2 className="gradient-heading text-2xl mb-5 flex items-center">
                  <Rocket className="mr-3 h-6 w-6 text-[var(--neon-pink)]" /> Future Development
                </h2>
                <div className="gradient-divider mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.futurePlans.map((plan, index) => (
                    <div key={index} className="bg-white/5 rounded-lg p-5 border border-white/10">
                      <div className="flex">
                        <div className="w-10 h-10 bg-[var(--neon-orange)]/20 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <Infinity className="h-5 w-5 text-[var(--neon-orange)]" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium mb-1">Enhancement {index + 1}</h3>
                          <p className="text-gray-400">{plan}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
          
          {/* Project details sidebar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="sticky top-28">
              <div className="glass-panel p-8 mb-8 neon-border">
                <h3 className="gradient-heading text-xl mb-6">Project Specifications</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-white/50 uppercase text-sm font-medium mb-2 flex items-center">
                      <Layers className="h-4 w-4 mr-2" /> Project Type
                    </h4>
                    <p className="text-white text-lg capitalize">{project.category}</p>
                  </div>
                  
                  {project.developmentTime && (
                    <div>
                      <h4 className="text-white/50 uppercase text-sm font-medium mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-2" /> Development Time
                      </h4>
                      <p className="text-white text-lg">{project.developmentTime}</p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="text-white/50 uppercase text-sm font-medium mb-3 flex items-center">
                      <Code className="h-4 w-4 mr-2" /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                {project.liveUrl && (
                  <motion.a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-primary w-full flex justify-center items-center gap-2"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px rgba(227, 49, 111, 0.3)" 
                    }}
                  >
                    View Live Demo <ExternalLink className="h-4 w-4" />
                  </motion.a>
                )}
                
                {project.githubUrl && (
                  <motion.a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-outline w-full flex justify-center items-center gap-2"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 15px rgba(255, 255, 255, 0.08)" 
                    }}
                  >
                    View Source Code <Github className="h-4 w-4" />
                  </motion.a>
                )}
                
                <motion.div 
                  onClick={() => window.location.href = "/#projects"}
                  className="w-full flex justify-center py-3 text-white/60 hover:text-white cursor-pointer transition-colors"
                  whileHover={{ scale: 1.02 }}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Back to all projects
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}