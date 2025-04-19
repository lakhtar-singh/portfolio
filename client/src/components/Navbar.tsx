import { useState, useEffect } from "react";
import { Link } from "wouter";
import { SECTIONS } from "@/lib/constants";
import { Menu, X, Github, Linkedin, Twitter, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);
  
  // Check if we're on a project detail page
  const isProjectPage = typeof window !== 'undefined' && window.location.pathname.includes('/projects/');

  useEffect(() => {
    const handleScroll = () => {
      // For navbar shrinking on scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // For detecting active section (only on home page)
      if (!isProjectPage) {
        const sections = document.querySelectorAll("section");
        let current = "";

        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute("id") || "";
          }
        });

        if (current !== activeSection && current) {
          setActiveSection(current);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, isProjectPage]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const mobileMenuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  };

  return (
    <header 
      className={`header fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'scrolled py-3' : 'py-5'}`} 
    >
      <div className="main-container flex justify-between items-center">
        <motion.div 
          onClick={() => window.location.href = '/'} 
          className="cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <span className="text-2xl font-heading font-bold flex items-center gap-1">
            <span className="gradient-text">&lt;Dev</span>
            <span className="gradient-text-purple">Portfolio</span>
            <span className="gradient-text">/&gt;</span>
          </span>
        </motion.div>
        
        <div className="hidden lg:flex items-center space-x-6">
          {SECTIONS.map((section) => (
            <motion.div 
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`nav-link cursor-pointer ${!isProjectPage && activeSection === section.id ? 'active' : ''}`}
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {section.name}
            </motion.div>
          ))}
          
          <div className="flex items-center space-x-2 ml-4">
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ y: -2, scale: 1.1 }}
            >
              <Github className="w-4 h-4 text-white" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ y: -2, scale: 1.1 }}
            >
              <Linkedin className="w-4 h-4 text-white" />
            </motion.a>
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              whileHover={{ y: -2, scale: 1.1 }}
            >
              <Twitter className="w-4 h-4 text-white" />
            </motion.a>
          </div>
        </div>
        
        <motion.button 
          className="lg:hidden text-white focus:outline-none p-1"
          whileTap={{ scale: 0.9 }}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </motion.button>
      </div>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 lg:hidden"
            onClick={closeMenu}
          >
            <motion.div
              className="absolute top-0 right-0 h-full w-4/5 max-w-sm glass-panel p-8"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-end mb-8">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={closeMenu}
                  className="p-2 text-white"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="space-y-6 mb-10">
                {SECTIONS.map((section, index) => (
                  <motion.div
                    key={section.id}
                    variants={mobileMenuItemVariants}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center py-2 px-4 rounded-md transition-colors cursor-pointer ${
                      !isProjectPage && activeSection === section.id 
                        ? "text-white bg-white/10 font-medium" 
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    <span>{section.name}</span>
                    <ChevronRight className={`ml-auto w-5 h-5 ${!isProjectPage && activeSection === section.id ? "text-[var(--neon-pink)]" : "text-white/30"}`} />
                  </motion.div>
                ))}
              </div>

              <motion.div variants={mobileMenuItemVariants} className="pt-6 mt-6 border-t border-white/10">
                <p className="text-white/50 text-sm mb-4">Connect with me</p>
                <div className="flex items-center space-x-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Github className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 text-white" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-white" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
