export const PROFILE = {
  name: "Dineth Panditha",
  role: "Associate Software Engineer (Full-Stack)",
  location: "Hikkaduwa, Galle, Sri Lanka",
  // UPDATED EMAIL HERE
  email: "contact@dinethpanditha.com", 
  phone: "+94 77 24 27 603",
  bio: "A BEng (Hons) Software Engineering graduate with a passion for building scalable web, mobile, and blockchain applications. I specialize in full-stack development using the MERN stack, Spring Boot, and Python.",
  links: {
    github: "https://github.com/dineth-panditha",
    linkedin: "https://www.linkedin.com/in/dinethpanditha/",
    // UPDATED EMAIL LINK HERE
    email: "mailto:contact@dinethpanditha.com" 
  }
};

export const PROJECTS = [
  {
    id: 1,
    title: "Decentralized Voting DApp",
    category: "Blockchain",
    image: "/images/projects/voting.png", // Ensure you have these local images or use placeholder URL
    tech: ["Solidity", "React", "Hardhat", "IPFS", "Ethers.js"],
    description: "An 'Election Factory' DApp allowing secure, transparent voting on the Ethereum network.",
    longDescription: "Built a full-stack Ethereum decentralized application (DApp) that serves as an election management platform. Features include an admin panel for election creation, IPFS for decentralized storage of candidate data, and automated PDF report generation. Deployed on the Sepolia Testnet.",
    links: { demo: "#", repo: "https://github.com/dineth-panditha" }
  },
  {
    id: 2,
    title: "Automated Suspect Detection",
    category: "AI/ML",
    image: "/images/projects/suspect.png", 
    tech: ["Python", "DeepFace", "OpenCV", "Flask", "TensorFlow"],
    description: "Multi-camera suspect tracking system using Deep Learning and Real-time recognition.",
    longDescription: "Engineered a full-stack security application capable of tracking suspects across multiple camera feeds in real-time. The system utilizes DeepFace and TensorFlow for facial recognition and includes a dashboard for suspect enrollment and automated alert reporting.",
    links: { demo: "#", repo: "https://github.com/dineth-panditha" }
  },
  {
    id: 3,
    title: "Door Lock E-Commerce",
    category: "Web",
    image: "/images/projects/ecommerce.png", 
    tech: ["MERN Stack", "Stripe", "AI Chatbot", "Redux"],
    description: "A MERN-based e-commerce platform with AI customer support and secure payments.",
    longDescription: "Developed a comprehensive e-commerce platform for smart door locks. Key features include an integrated AI chatbot for customer support, secure Stripe payment gateway, admin inventory management, and POS stock synchronization.",
    links: { demo: "#", repo: "https://github.com/dineth-panditha" }
  },
  {
    id: 4,
    title: "Explore Vacation",
    category: "Web",
    image: "/images/projects/vacation.png", 
    tech: ["Spring Boot", "MySQL", "AWS", "React"],
    description: "Vacation rental tracking system with dynamic property management.",
    longDescription: "Contributed to the 'Explore Vacation Project' by developing a monolithic rental tracking system. Implemented robust user authentication, property management for owners, and an automated email notification system for booking confirmations.",
    links: { demo: "#", repo: "https://github.com/dineth-panditha" }
  },
  {
    id: 5,
    title: "LMS Mobile App",
    category: "Mobile",
    image: "/images/projects/mobile.png", 
    tech: ["React Native", "Node.js", "Socket.IO", "AWS S3"],
    description: "Student management mobile app with real-time chat and file sharing.",
    longDescription: "Developed a comprehensive mobile application for student management. Features include assignment submission, note creation, group chat capabilities using Socket.IO, and an integrated AI chatbot for student assistance.",
    links: { demo: "#", repo: "https://github.com/dineth-panditha" }
  }
];

export const CATEGORIES = ["All", "Web", "Mobile", "AI/ML", "Blockchain"];

export const EXPERIENCE = [
  {
    id: 1,
    role: "Freelance Software Developer",
    company: "Self-Employed",
    date: "Jan 2025 - Present",
    description: "Delivering diverse client projects including Blockchain DApps, AI/ML models, and full-stack MERN applications. Developing cross-platform mobile apps using Flutter and React Native.",
    skills: ["Solidity", "MERN Stack", "Flutter", "React Native", "Python"]
  },
  {
    id: 2,
    role: "Associate Software Engineer (Full-Stack)",
    company: "Seekers Cloud (PVT) LTD",
    date: "Jan 2024 - June 2024",
    description: "Contributed to the 'Explore Vacation' and 'Craft Ozen' projects. Built vacation rental tracking systems and configured Spring Security for secure user modules. Deployed solutions using AWS.",
    skills: ["Next.js", "Spring Boot", "Python", "Node.js", "MySQL", "MongoDB", "AWS"]
  },
  {
    id: 3,
    role: "Trainee Software Engineer",
    company: "LYXUX (LTD)",
    date: "Jan 2024 - Mar 2024",
    description: "Built the 'Impulse Trading' platform with reporting capabilities using Python Flask. Developed an e-commerce backend with Node.js/MongoDB including OTP authentication.",
    skills: ["Python Flask", "Node.js", "MongoDB", "MySQL"]
  }
];

export const EDUCATION = [
  {
    id: 1,
    degree: "BEng (Hons) Software Engineering",
    institution: "London Metropolitan University",
    date: "Graduated (2nd Upper)",
    description: "Gained strong skills in software development, databases, and system design. Specialized in full-stack engineering principles.",
    status: "Completed"
  },
  {
    id: 2,
    degree: "Graduate Higher Diploma",
    institution: "Institute of Software Engineering (IJSE)",
    date: "Completed",
    description: "Gained practical experience in software development, databases, web technologies, and system analysis.",
    status: "Completed"
  },
  {
    id: 3,
    degree: "Rapid Mobile & Web Dev",
    institution: "Institute of Software Engineering (IJSE)",
    date: "Completed",
    description: "Comprehensive training in modern mobile and web application development techniques.",
    status: "Completed"
  }
];