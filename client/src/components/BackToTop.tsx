import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";

interface BackToTopProps {
  visible: boolean;
}

export default function BackToTop({ visible }: BackToTopProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          whileHover={{ 
            scale: 1.1,
            boxShadow: "0 0 20px rgba(227, 49, 111, 0.6)"
          }}
          transition={{ 
            type: "spring",
            stiffness: 400,
            damping: 17
          }}
          className="fixed bottom-8 right-8 w-14 h-14 rounded-full flex items-center justify-center text-white z-30 glow-btn"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
