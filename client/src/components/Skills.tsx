import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { SKILLS } from "@/lib/constants";
import { Code, Server, Wrench } from "lucide-react";

export default function Skills() {
  const { targetRef, hasIntersected } = useIntersectionObserver();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section id="skills" className="py-20 bg-lightGray" ref={targetRef as React.RefObject<HTMLElement>}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="section-heading text-3xl md:text-4xl font-heading text-darkGray">
            Skills & Expertise
          </h2>
          <p className="text-textSecondary mt-4 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise.
          </p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={hasIntersected ? "visible" : "hidden"}
        >
          {/* Frontend Skills */}
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            variants={cardVariants}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-darkGray">Frontend Development</h3>
            </div>
            
            <div className="space-y-6">
              {SKILLS.frontend.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-textPrimary font-medium">{skill.name}</span>
                    <span className="text-primary font-medium">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      initial={{ width: 0 }}
                      animate={hasIntersected ? { width: `${skill.percentage}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.1 * index }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Backend Skills */}
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            variants={cardVariants}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mr-4">
                <Server className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-bold text-darkGray">Backend Development</h3>
            </div>
            
            <div className="space-y-6">
              {SKILLS.backend.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-textPrimary font-medium">{skill.name}</span>
                    <span className="text-secondary font-medium">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      style={{ background: 'linear-gradient(90deg, #087E8B, #4ECDC4)' }}
                      initial={{ width: 0 }}
                      animate={hasIntersected ? { width: `${skill.percentage}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.1 * index }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Additional Skills */}
          <motion.div 
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
            variants={cardVariants}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4">
                <Wrench className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-heading font-bold text-darkGray">Other Skills</h3>
            </div>
            
            <div className="space-y-6">
              {SKILLS.other.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-textPrimary font-medium">{skill.name}</span>
                    <span className="text-accent font-medium">{skill.percentage}%</span>
                  </div>
                  <div className="skill-bar">
                    <motion.div 
                      className="skill-progress"
                      style={{ background: 'linear-gradient(90deg, #F5A623, #FFCB77)' }}
                      initial={{ width: 0 }}
                      animate={hasIntersected ? { width: `${skill.percentage}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.1 * index }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
