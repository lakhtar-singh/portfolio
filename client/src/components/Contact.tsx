import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { FormData } from "@/types";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter, Code, SendIcon, Loader2 } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Please provide a valid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters long"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

export default function Contact() {
  const { toast } = useToast();
  const { targetRef, hasIntersected } = useIntersectionObserver();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      // In a real implementation, this would send data to the server
      console.log("Form data submitted:", data);
      
      toast({
        title: "Message sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      
      reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden" ref={targetRef as React.RefObject<HTMLElement>}>
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading text-3xl md:text-4xl font-heading text-darkGray">
            Get In Touch
          </h2>
          <p className="text-textSecondary mt-4 max-w-2xl mx-auto">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={hasIntersected ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-heading font-bold mb-8 text-darkGray">Contact Information</h3>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-primary font-medium mb-1">Email</h4>
                  <p className="text-textSecondary">contact@yourdevportfolio.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-full bg-secondary/10 text-secondary flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-secondary font-medium mb-1">Phone</h4>
                  <p className="text-textSecondary">+1 (555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-5">
                <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-display text-accent font-medium mb-1">Location</h4>
                  <p className="text-textSecondary">New York, NY, United States</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 bg-lightGray p-6 rounded-xl">
              <h4 className="text-xl font-heading font-bold mb-5 text-darkGray">Connect With Me</h4>
              <div className="flex space-x-4">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-all duration-300 cursor-pointer">
                  <Github className="h-5 w-5 text-darkGray" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-all duration-300 cursor-pointer">
                  <Linkedin className="h-5 w-5 text-darkGray" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-all duration-300 cursor-pointer">
                  <Twitter className="h-5 w-5 text-darkGray" />
                </div>
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-all duration-300 cursor-pointer">
                  <Code className="h-5 w-5 text-darkGray" />
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={hasIntersected ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white p-8 rounded-xl shadow-lg border border-mediumGray/30">
              <h3 className="text-2xl font-heading font-bold mb-6 text-darkGray">Send Me a Message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-textPrimary mb-2 font-medium">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className={`w-full px-4 py-3 bg-lightGray border ${errors.name ? 'border-red-500' : 'border-transparent'} rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
                      placeholder="John Doe"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-textPrimary mb-2 font-medium">Your Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className={`w-full px-4 py-3 bg-lightGray border ${errors.email ? 'border-red-500' : 'border-transparent'} rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
                      placeholder="john@example.com"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-textPrimary mb-2 font-medium">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    className={`w-full px-4 py-3 bg-lightGray border ${errors.subject ? 'border-red-500' : 'border-transparent'} rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300`}
                    placeholder="Project Inquiry"
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <p className="mt-2 text-sm text-red-500">{errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-textPrimary mb-2 font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className={`w-full px-4 py-3 bg-lightGray border ${errors.message ? 'border-red-500' : 'border-transparent'} rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none`}
                    placeholder="Your message here..."
                    {...register("message")}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-500">{errors.message.message}</p>
                  )}
                </div>
                
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>Sending... <Loader2 className="h-4 w-4 animate-spin" /></>
                  ) : (
                    <>Send Message <SendIcon className="h-4 w-4" /></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
