import { SECTIONS } from "@/lib/constants";
import { Github, Linkedin, Twitter, Code } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-lightGray py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div 
              onClick={() => window.location.href = '/'}
              className="text-2xl font-bold font-heading text-darkGray flex items-center gap-2 cursor-pointer"
            >
              <span className="text-primary">&lt;</span>Dev<span className="text-secondary">Portfolio</span><span className="text-primary">/&gt;</span>
            </div>
            <p className="text-textSecondary mt-2">Building innovative web solutions</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            {SECTIONS.map((section) => (
              <div 
                key={section.id}
                onClick={() => window.location.href = `/#${section.id}`}
                className="text-textSecondary hover:text-primary transition-colors duration-300 cursor-pointer"
              >
                {section.name}
              </div>
            ))}
          </div>
        </div>
        
        <hr className="border-mediumGray my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-textSecondary">© {currentYear} Your Developer Portfolio. All rights reserved.</p>
          <div className="flex space-x-5 mt-4 md:mt-0">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
              <Github className="h-5 w-5 text-darkGray" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
              <Linkedin className="h-5 w-5 text-darkGray" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
              <Twitter className="h-5 w-5 text-darkGray" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
              <Code className="h-5 w-5 text-darkGray" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
