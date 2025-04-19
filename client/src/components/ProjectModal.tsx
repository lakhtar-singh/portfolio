import { createContext, useContext, useState, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Project } from "@/types";

interface ProjectModalContextProps {
  isOpen: boolean;
  currentProject: Project | null;
  openModal: (project: Project) => void;
  closeModal: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextProps>({
  isOpen: false,
  currentProject: null,
  openModal: () => {},
  closeModal: () => {},
});

export const useProjectModal = () => useContext(ProjectModalContext);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setCurrentProject(project);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <ProjectModalContext.Provider value={{ isOpen, currentProject, openModal, closeModal }}>
      {children}
      <ProjectModal />
    </ProjectModalContext.Provider>
  );
};

function ProjectModal() {
  const { isOpen, currentProject, closeModal } = useProjectModal();

  if (!currentProject) return null;

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent className="bg-darkGray border-none text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <DialogTitle className="text-2xl font-bold font-poppins">{currentProject.title}</DialogTitle>
            <button 
              onClick={closeModal}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </DialogHeader>
        
        <div className="mt-4">
          <img 
            src={currentProject.image} 
            alt={`${currentProject.title} Screenshot`} 
            className="w-full h-64 object-cover rounded-lg mb-6"
          />
          
          <div className="flex flex-wrap gap-2 mb-4">
            {currentProject.technologies.map((tech, index) => (
              <span key={index} className="tech-tag text-xs px-3 py-1 bg-primary/20 text-primary rounded-full">
                {tech}
              </span>
            ))}
          </div>
          
          <p className="text-gray-300 mb-6">{currentProject.fullDescription}</p>
          
          <div className="mt-6">
            <h4 className="text-lg font-bold font-poppins mb-3">Project Features</h4>
            <ul className="list-disc pl-5 space-y-2 text-gray-300">
              {currentProject.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          
          <div className="flex gap-4 mt-6">
            {currentProject.liveUrl && (
              <a 
                href={currentProject.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-all duration-300 flex items-center gap-2"
              >
                View Live <i className="fas fa-external-link-alt"></i>
              </a>
            )}
            
            {currentProject.githubUrl && (
              <a 
                href={currentProject.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-2 border border-primary text-primary hover:bg-primary/10 rounded-full font-medium transition-all duration-300 flex items-center gap-2"
              >
                GitHub <i className="fab fa-github"></i>
              </a>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
