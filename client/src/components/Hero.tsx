import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, ExternalLink, Braces, Database, Github } from "lucide-react";

export default function Hero() {
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative pt-24 overflow-hidden bg-white">
      {/* Subtle background pattern */}
      <div className="subtle-bg">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[var(--baby-green)] opacity-20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[var(--mint-green)] opacity-20 blur-[120px] rounded-full"></div>
        
        {/* Light dot pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNlMGUwZTAiLz48L3N2Zz4=')] opacity-30"></div>
      </div>
      
      <div className="main-container flex flex-col lg:flex-row items-center gap-12 lg:gap-16 z-10">
        <motion.div 
          className="lg:w-1/2 space-y-8"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", damping: 20 }}
        >
          <div className="glass-panel px-4 py-2 rounded-full inline-flex items-center">
            <div className="w-3 h-3 bg-[var(--sage-green)] rounded-full animate-pulse mr-2"></div>
            <p className="text-gray-700 font-display uppercase tracking-wider text-sm">FULL-STACK DEVELOPER</p>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight text-gray-800">
            <span className="gradient-text">Crafting</span> <span className="text-gray-800">Digital</span>
            <br /> 
            <span className="text-gray-800">Experiences with</span> <span className="gradient-text-teal">Code</span>
          </h1>
          
          <p className="text-lg text-gray-600 max-w-xl">
            Building robust web applications with modern technologies, 
            focused on performance, usability, and scalability.
          </p>
          
          <div className="flex items-center gap-6 flex-wrap">
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-[var(--sage-green)]/10 rounded-full flex items-center justify-center mb-2">
                <Braces className="w-6 h-6 text-[var(--sage-green)]" />
              </div>
              <span className="text-gray-700 font-medium">Frontend</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-[var(--mint-green)]/20 rounded-full flex items-center justify-center mb-2">
                <Database className="w-6 h-6 text-[var(--mint-green)]" />
              </div>
              <span className="text-gray-700 font-medium">Backend</span>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="w-12 h-12 bg-[var(--light-teal)]/20 rounded-full flex items-center justify-center mb-2">
                <Github className="w-6 h-6 text-[var(--light-teal)]" />
              </div>
              <span className="text-gray-700 font-medium">Open Source</span>
            </motion.div>
          </div>
          
          <div className="flex flex-wrap gap-5 pt-6">
            <motion.button 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary flex items-center gap-2"
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px rgba(42, 187, 127, 0.15)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work <ArrowRight className="h-4 w-4" />
            </motion.button>
            
            <motion.button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline flex items-center gap-2"
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 15px rgba(42, 187, 127, 0.1)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch <ExternalLink className="h-4 w-4" />
            </motion.button>
          </div>
        </motion.div>
        
        <motion.div 
          className="lg:w-1/2 flex justify-center mt-10 lg:mt-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative perspective-1000">
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-[var(--sage-green)] via-[var(--mint-green)] to-[var(--light-teal)] opacity-30 blur-lg rounded-3xl"
              animate={{ 
                background: [
                  "linear-gradient(0deg, #2ABB7F, #9FE3C4, #7dd3c0)",
                  "linear-gradient(120deg, #7dd3c0, #2ABB7F, #9FE3C4)",
                  "linear-gradient(240deg, #9FE3C4, #7dd3c0, #2ABB7F)",
                  "linear-gradient(360deg, #2ABB7F, #9FE3C4, #7dd3c0)"
                ]
              }}
              transition={{ duration: 10, repeat: Infinity }}
            />
            
            <motion.div
              className="relative soft-border bg-white rounded-3xl p-6 shadow-md"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut"
              }}
            >
              <svg
                className="w-80 h-80 md:w-96 md:h-96"
                viewBox="0 0 500 500"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="500" height="500" rx="16" fill="#F9F9F9" />
                
                <motion.path
                  d="M160 250C160 200.7 200.7 160 250 160C299.3 160 340 200.7 340 250C340 299.3 299.3 340 250 340C200.7 340 160 299.3 160 250Z"
                  fill="#2ABB7F"
                  fillOpacity="0.7"
                  animate={{ 
                    fillOpacity: [0.5, 0.7, 0.5],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                
                <motion.path
                  d="M117 182C117 132.7 157.7 92 207 92C256.3 92 297 132.7 297 182C297 231.3 256.3 272 207 272C157.7 272 117 231.3 117 182Z"
                  fill="#7dd3c0"
                  fillOpacity="0.6"
                  animate={{ 
                    fillOpacity: [0.4, 0.6, 0.4],
                    scale: [1, 1.03, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                />
                
                <motion.path
                  d="M207 322C207 272.7 247.7 232 297 232C346.3 232 387 272.7 387 322C387 371.3 346.3 412 297 412C247.7 412 207 371.3 207 322Z"
                  fill="#9FE3C4"
                  fillOpacity="0.6"
                  animate={{ 
                    fillOpacity: [0.4, 0.6, 0.4],
                    scale: [1, 1.04, 1],
                    rotate: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                />
                
                <motion.path
                  d="M170 250L220 300L330 190"
                  stroke="#333333"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ 
                    pathLength: [0, 1, 1],
                    opacity: [0, 1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Code symbols */}
                <motion.text 
                  x="50" 
                  y="80" 
                  fill="#2ABB7F" 
                  fontFamily="monospace" 
                  fontSize="24"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                >
                  &lt;/&gt;
                </motion.text>
                
                <motion.text 
                  x="400" 
                  y="420" 
                  fill="#7dd3c0" 
                  fontFamily="monospace" 
                  fontSize="24"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  {"{"}
                </motion.text>
                
                <motion.text 
                  x="430" 
                  y="420" 
                  fill="#7dd3c0" 
                  fontFamily="monospace" 
                  fontSize="24"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.8 }}
                >
                  {"}"}
                </motion.text>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        onClick={scrollToNextSection}
      >
        <div className="glass-panel rounded-full px-4 py-2 flex items-center gap-2">
          <span className="text-gray-600 text-sm">Explore More</span>
          <ChevronDown className="h-4 w-4 text-[var(--sage-green)]" />
        </div>
      </motion.div>
    </section>
  );
}
