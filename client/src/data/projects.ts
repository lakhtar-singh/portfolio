import { Project } from "@/types";

export const projects: Project[] = [
  {
    id: 1,
    title: "URL Shortener App",
    shortDescription: "Built with Next.js (App Router), Express.js (Node.js), Redux, and TypeScript. Developed protected routes, link tracking, and analytics dashboard.",
    fullDescription: "A modern URL shortening service with comprehensive analytics. The app features user authentication, protected routes, detailed link tracking, and an intuitive analytics dashboard to monitor link performance. Built with a modern stack including Next.js with App Router, Express.js backend, Redux for state management, and TypeScript for type safety.",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
    category: "fullstack",
    technologies: ["Next.js", "Express.js", "TypeScript", "Redux"],
    features: [
      "User authentication and protected routes",
      "Custom link creation with analytics",
      "Real-time statistics dashboard",
      "Mobile responsive design",
      "Performance optimized for high traffic"
    ],
    slug: "url-shortener-app",
    screenshots: [
      "https://images.unsplash.com/photo-1610986603166-f78428624e76?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
    ],
    developmentTime: "4 weeks",
    challengesSolved: [
      "Implemented secure authentication system with JWT",
      "Optimized database queries for high-traffic scenarios",
      "Developed custom analytics tracking without affecting performance"
    ],
    futurePlans: [
      "Add QR code generation for shortened links",
      "Implement team sharing and collaboration features",
      "Integrate with social media platforms for easier sharing"
    ]
  },
  {
    id: 2,
    title: "Stock Market Bidding Game",
    shortDescription: "Built using Next.js frontend, Node.js/Express.js backend with real-time data handling using web Socket.IO. Scaled to 100k+ users.",
    fullDescription: "A real-time, web-based simulation platform built with a Next.js frontend and a Node.js/Express.js backend, leveraging Socket.IO for live data handling and user interaction. Designed to handle over 100,000 concurrent users, the game offers an immersive bidding experience where users can participate in time-based stock bidding rounds using virtual currency. Prices fluctuate dynamically based on user activity and backend algorithms, simulating a realistic stock market environment.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
    category: "fullstack",
    technologies: ["Next.js", "Node.js", "Express.js", "Socket.IO"],
    features: [
      "Live bidding arena with real-time updates",
      "Virtual wallet and currency system",
      "Dynamic leaderboards",
      "User profiles with performance tracking",
      "Admin panel for managing stocks and sessions"
    ],
    slug: "stock-market-bidding-game",
    screenshots: [
      "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
    ],
    developmentTime: "10 weeks",
    challengesSolved: [
      "Scaled WebSocket connections to support 100,000+ concurrent users",
      "Implemented real-time data synchronization across multiple server instances",
      "Developed anti-cheat mechanisms to ensure fair gameplay"
    ],
    futurePlans: [
      "Add more sophisticated market simulation algorithms",
      "Implement social features like teams and alliances",
      "Create a mobile app version for iOS and Android"
    ]
  },
  {
    id: 3,
    title: "Real Estate Platform",
    shortDescription: "Used React.js, RESTful APIs, and backend optimizations. Integrated social media APIs for lead generation.",
    fullDescription: "A feature-rich web application developed using React.js for the frontend and RESTful APIs for seamless communication with the backend. The platform was optimized for performance and scalability, ensuring a smooth user experience for property browsing, filtering, and inquiries. Backend optimizations improved data fetching, caching, and response times. A key highlight was the integration of social media APIs to enable automated lead generation, allowing property listings to be promoted across multiple channels.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
    category: "frontend",
    technologies: ["React.js", "RESTful APIs", "PHP", "Social APIs"],
    features: [
      "Advanced property search and filtering",
      "Interactive map integration",
      "Automated social media integration",
      "Lead generation and tracking system",
      "Responsive design for all devices"
    ],
    slug: "real-estate-platform",
    screenshots: [
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1448630360428-65456885c650?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
    ],
    developmentTime: "6 weeks",
    challengesSolved: [
      "Optimized image loading for property galleries without sacrificing quality",
      "Built complex search filtering with multiple parameters while maintaining performance",
      "Integrated with multiple social media platforms for lead generation"
    ],
    futurePlans: [
      "Add virtual reality property tours",
      "Implement AI-powered property recommendations",
      "Develop a chatbot for instant customer inquiries"
    ]
  },
  {
    id: 4,
    title: "Healthcare Scheduler",
    shortDescription: "Developed appointment booking with Express.JS backend and React components.",
    fullDescription: "An appointment booking system for healthcare providers built with Express.JS backend and React components. The application allows patients to book, reschedule, and cancel appointments with healthcare providers. Features include calendar integration, automated email reminders, and a dashboard for healthcare providers to manage their schedules efficiently.",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
    category: "fullstack",
    technologies: ["Express.js", "React", "MongoDB"],
    features: [
      "Appointment scheduling and management",
      "Calendar integration",
      "Automated reminders via email and SMS",
      "Provider dashboard for schedule management",
      "Patient history and records access"
    ],
    slug: "healthcare-scheduler",
    screenshots: [
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
    ],
    developmentTime: "8 weeks",
    challengesSolved: [
      "Built a conflict-free scheduling system that prevents double-bookings",
      "Implemented HIPAA compliance for patient data protection",
      "Developed an efficient notification system for appointment reminders"
    ],
    futurePlans: [
      "Add video consultation capabilities",
      "Implement patient health records integration",
      "Create a mobile app for on-the-go scheduling"
    ]
  },
  {
    id: 5,
    title: "Movie Rating App",
    shortDescription: "Developed REST APIs using Express.Js, frontend with React.js. Integrated real-time reviews and ratings.",
    fullDescription: "A comprehensive movie rating and review application with a React.js frontend and Express.js backend. Users can browse movies, read and write reviews, and rate films. The platform features real-time updates for new reviews and ratings, personalized movie recommendations based on user preferences, and integration with external movie databases for comprehensive information.",
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
    category: "frontend",
    technologies: ["Express.js", "React.js", "RESTful APIs"],
    features: [
      "User reviews and ratings system",
      "Real-time updates for new content",
      "Personalized movie recommendations",
      "Integration with external movie databases",
      "User profile and watch history"
    ],
    slug: "movie-rating-app",
    screenshots: [
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1512070904629-fa988dab2fe1?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
    ],
    developmentTime: "5 weeks",
    challengesSolved: [
      "Built a recommendation engine based on user preferences and behavior",
      "Developed a caching system for external API data to improve performance",
      "Created a real-time notification system for new reviews on followed content"
    ],
    futurePlans: [
      "Add a social networking component for movie enthusiasts",
      "Implement advanced filters for discovering content",
      "Create movie clubs and discussion forums"
    ]
  },
  {
    id: 6,
    title: "Custom CMS",
    shortDescription: "Built a custom CMS using Laravel + Vue.js for publishing workflows.",
    fullDescription: "A tailored content management system built with Laravel backend and Vue.js frontend, designed specifically for streamlined publishing workflows. The system supports complex content types, user role management, scheduling capabilities, and detailed analytics. With a focus on usability and flexibility, this CMS enables organizations to manage their digital content efficiently across multiple platforms and channels.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
    category: "fullstack",
    technologies: ["Laravel", "Vue.js", "MySQL"],
    features: [
      "Custom content type creation",
      "Advanced user role management",
      "Content scheduling and approval workflows",
      "Multi-channel publishing support",
      "Detailed content performance analytics"
    ],
    slug: "custom-cms",
    screenshots: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1618788372246-79faff0c3742?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
    ],
    developmentTime: "12 weeks",
    challengesSolved: [
      "Built a flexible content type system that supports complex content structures",
      "Developed an approval workflow with multiple stages and role-based permissions",
      "Created a performance analytics system for content engagement"
    ],
    futurePlans: [
      "Add AI-powered content optimization suggestions",
      "Implement advanced SEO tools integration",
      "Develop a headless API for multi-platform publishing"
    ]
  },
  {
    id: 7,
    title: "Logistics Management System",
    shortDescription: "Built backend using Node.js and Express.js. Integrated RESTful APIs for live tracking and optimized route planning.",
    fullDescription: "A comprehensive logistics management system with a robust Node.js and Express.js backend. The system provides real-time tracking for shipments, optimized route planning for delivery vehicles, and comprehensive reporting for logistics operations. RESTful APIs enable integration with mobile applications and third-party services, creating a complete ecosystem for managing logistics operations efficiently.",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
    category: "backend",
    technologies: ["Node.js", "Express.js", "RESTful APIs"],
    features: [
      "Real-time shipment tracking",
      "AI-powered route optimization",
      "Driver mobile app integration",
      "Comprehensive reporting dashboard",
      "Third-party service integration"
    ],
    slug: "logistics-management-system",
    screenshots: [
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
    ],
    developmentTime: "14 weeks",
    challengesSolved: [
      "Developed an optimized routing algorithm that reduced delivery times by 20%",
      "Built a real-time tracking system with minimal battery impact for mobile devices",
      "Created a scalable architecture that handles thousands of concurrent deliveries"
    ],
    futurePlans: [
      "Implement machine learning for predictive delivery estimates",
      "Add augmented reality features for warehouse management",
      "Develop advanced analytics for fleet optimization"
    ]
  },
  {
    id: 8,
    title: "Support Ticketing Platform",
    shortDescription: "Developed admin/user portals using Laravel, implemented role-based access and dashboard using Vue.js.",
    fullDescription: "A comprehensive support ticketing system with separate portals for administrators and users. Built with Laravel for the backend and Vue.js for the frontend, the platform offers role-based access control, detailed dashboards, and customizable ticket workflows. Features include ticket categorization, prioritization, assignment rules, and performance analytics for support team management.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
    category: "fullstack",
    technologies: ["Laravel", "Vue.js", "MySQL"],
    features: [
      "Role-based access control",
      "Customizable ticket workflows",
      "Automated ticket routing and assignment",
      "SLA management and reporting",
      "Knowledge base integration"
    ],
    slug: "support-ticketing-platform",
    screenshots: [
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80",
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&q=80"
    ],
    developmentTime: "9 weeks",
    challengesSolved: [
      "Built a customizable workflow engine for different ticket types and departments",
      "Developed an SLA monitoring system with escalation procedures",
      "Created an integrated knowledge base with smart search capabilities"
    ],
    futurePlans: [
      "Add AI-powered ticket classification and routing",
      "Implement chatbot integration for first-line support",
      "Develop customer satisfaction analytics and reporting"
    ]
  }
];
