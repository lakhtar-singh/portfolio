import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { Mail, Download } from "lucide-react";

export default function About() {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  return (
    <section id="about" className="py-20 bg-white" ref={targetRef as React.RefObject<HTMLElement>}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading text-3xl md:text-4xl font-heading text-darkGray">
            About Me
          </h2>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            className="md:w-2/5"
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-secondary rounded-xl blur-md opacity-20"></div>
              <svg
                className="relative rounded-xl w-full shadow-lg bg-white p-8"
                viewBox="0 0 400 400"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="200" cy="150" r="80" fill="#F5F5F5" />
                <path
                  d="M200 250C144.772 250 100 294.772 100 350H300C300 294.772 255.228 250 200 250Z"
                  fill="#F5F5F5"
                />
                <circle cx="200" cy="150" r="60" fill="#FF5A5F" />
                <circle cx="170" cy="135" r="10" fill="white" />
                <circle cx="230" cy="135" r="10" fill="white" />
                <path
                  d="M170 180C184 196 216 196 230 180"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M120 95C141 79 170 70 200 70C230 70 259 79 280 95"
                  stroke="#087E8B"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d="M160 210H240"
                  stroke="#F5A623"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-3/5"
            initial={{ opacity: 0, y: 50 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-2xl font-heading font-bold mb-4 text-darkGray">Full-Stack Developer & UI Enthusiast</h3>
            <p className="text-textSecondary mb-6 leading-relaxed">
              I'm a passionate full-stack developer with expertise in building scalable, performant, and user-friendly web applications. 
              With a strong foundation in both frontend and backend technologies, I bring ideas to life with clean, 
              maintainable code and intuitive user experiences.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <div className="bg-lightGray rounded-lg p-5">
                <h4 className="font-display text-primary font-semibold mb-3">Frontend</h4>
                <ul className="space-y-2 text-textSecondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    React.js / Next.js
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Vue.js
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    CSS / Tailwind / SASS
                  </li>
                </ul>
              </div>
              <div className="bg-lightGray rounded-lg p-5">
                <h4 className="font-display text-secondary font-semibold mb-3">Backend</h4>
                <ul className="space-y-2 text-textSecondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Node.js / Express
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Laravel / PHP
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    RESTful APIs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    SQL / NoSQL Databases
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex gap-5 flex-wrap">
              <div 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary flex items-center gap-2 cursor-pointer"
              >
                Contact Me <Mail className="h-4 w-4" />
              </div>
              <div 
                className="btn-secondary flex items-center gap-2 cursor-pointer"
              >
                Download CV <Download className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
