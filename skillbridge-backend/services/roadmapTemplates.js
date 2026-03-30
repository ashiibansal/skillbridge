export const roleRoadmapTemplates = {
  "Frontend Developer": {
    phases: [
      {
        id: "foundations",
        title: "Core Foundations",
        description: "Build the web fundamentals and developer workflow needed for frontend engineering.",
        skills: ["HTML", "CSS", "JavaScript", "Git"],
      },
      {
        id: "modern-frontend-core",
        title: "Modern Frontend Core",
        description: "Move from static pages into modern frontend application development.",
        skills: ["TypeScript", "Responsive Design", "React", "State Management"],
      },
      {
        id: "framework-and-apps",
        title: "Framework and App Development",
        description: "Learn how to build production-style frontend apps with routing and framework conventions.",
        skills: ["Next.js", "APIs", "DOM", "Debugging"],
      },
      {
        id: "performance-and-polish",
        title: "Performance and Production Readiness",
        description: "Polish applications for responsiveness, maintainability, and real-world usage.",
        skills: ["Web Performance Optimization", "Testing", "Accessibility", "Deployment"],
      },
    ],
    projects: [
      "Build and version-control a responsive landing page",
      "Build a TypeScript React UI with reusable components and state",
      "Build a Next.js app connected to an external API",
      "Optimise and deploy a production-style frontend project",
    ],
  },

  "Backend Developer": {
    phases: [
      {
        id: "backend-foundations",
        title: "Programming and Backend Foundations",
        description: "Build the language, tooling, and runtime foundations required for backend work.",
        skills: ["Git", "JavaScript", "Node.js", "Express.js"],
      },
      {
        id: "apis-and-auth",
        title: "APIs and Authentication",
        description: "Learn how to build services, define endpoints, and secure application access.",
        skills: ["REST APIs", "Authentication (JWT/OAuth)", "Debugging"],
      },
      {
        id: "data-and-architecture",
        title: "Data and Architecture",
        description: "Develop confidence with databases, design decisions, and scalable backend thinking.",
        skills: ["MongoDB", "SQL (PostgreSQL/MySQL)", "System Design Basics", "Caching (Redis)"],
      },
      {
        id: "shipping-and-ops",
        title: "Deployment and Operations",
        description: "Learn to containerise, deploy, and maintain backend services.",
        skills: ["Docker Basics", "Deployment", "CI/CD"],
      },
    ],
    projects: [
      "Build a CRUD API with Express and structured routing",
      "Add JWT-based authentication and protected endpoints",
      "Build a database-backed service using MongoDB and SQL concepts",
      "Containerise and deploy a backend service with a basic CI workflow",
    ],
  },

  "DevOps Engineer": {
    phases: [
      {
        id: "systems-foundations",
        title: "Systems and Scripting Foundations",
        description: "Build the command-line, system, and scripting knowledge that underpins DevOps work.",
        skills: ["Linux", "Bash Scripting", "Networking Basics"],
      },
      {
        id: "containers-and-ci",
        title: "Containers and CI/CD",
        description: "Learn how to package applications and automate delivery workflows.",
        skills: ["Docker", "CI/CD Pipelines", "GitHub Actions / Jenkins"],
      },
      {
        id: "cloud-and-orchestration",
        title: "Cloud and Orchestration",
        description: "Work with scalable infrastructure and orchestrated application deployment.",
        skills: ["AWS / GCP / Azure", "Kubernetes", "Infrastructure as Code (Terraform)"],
      },
      {
        id: "monitoring-and-operations",
        title: "Monitoring and Operational Readiness",
        description: "Learn how to observe, troubleshoot, and maintain production systems reliably.",
        skills: ["Monitoring (Prometheus/Grafana)", "Debugging", "Deployment"],
      },
    ],
    projects: [
      "Write Bash scripts to automate Linux administration tasks",
      "Create a CI/CD pipeline for a sample application",
      "Deploy a containerised app to cloud infrastructure using Kubernetes",
      "Set up monitoring dashboards and alerts for a running service",
    ],
  },

  "Full Stack Developer": {
    phases: [
      {
        id: "web-foundations",
        title: "Web Foundations",
        description: "Establish the core web and workflow skills needed across the stack.",
        skills: ["HTML", "CSS", "JavaScript", "Git"],
      },
      {
        id: "frontend-core",
        title: "Frontend Core",
        description: "Build modern interfaces and client-side application logic.",
        skills: ["React", "Routing", "State Management", "Debugging"],
      },
      {
        id: "backend-core",
        title: "Backend Core",
        description: "Learn to build APIs, services, and data-backed systems.",
        skills: ["Node.js", "Express.js", "REST APIs", "Authentication"],
      },
      {
        id: "data-and-shipping",
        title: "Data and Production Readiness",
        description: "Connect frontend and backend systems and prepare them for real-world use.",
        skills: ["MongoDB", "SQL", "Testing", "Deployment"],
      },
    ],
    projects: [
      "Build a responsive multi-page frontend project",
      "Build a React app with state, routing, and dynamic UI",
      "Build a full-stack app with Express APIs and authentication",
      "Connect database layers and deploy a production-ready full-stack app",
    ],
  },

  "Data Scientist": {
    phases: [
      {
        id: "python-and-data-foundations",
        title: "Python and Data Foundations",
        description: "Build the programming and mathematical base required for data science.",
        skills: ["Python", "Statistics", "SQL", "Git"],
      },
      {
        id: "analysis-and-manipulation",
        title: "Data Analysis and Manipulation",
        description: "Learn how to clean, structure, explore, and visualise data effectively.",
        skills: ["Pandas", "NumPy", "Data Visualization"],
      },
      {
        id: "machine-learning-core",
        title: "Machine Learning Core",
        description: "Develop the ability to train, evaluate, and improve predictive models.",
        skills: ["Machine Learning", "Scikit-Learn", "Debugging"],
      },
      {
        id: "advanced-modeling",
        title: "Advanced Modeling and AI Foundations",
        description: "Move toward more advanced AI concepts and deeper model architectures.",
        skills: ["Deep Learning Basics", "Deployment"],
      },
    ],
    projects: [
      "Perform exploratory data analysis on a real dataset using Python",
      "Build a cleaned and visualised analysis notebook with Pandas and NumPy",
      "Train and evaluate machine learning models with scikit-learn",
      "Prototype a deep learning or advanced predictive modeling project",
    ],
  },

  "Mobile App Developer": {
    phases: [
      {
        id: "mobile-programming-foundations",
        title: "Programming and Mobile Foundations",
        description: "Build the programming and API fundamentals needed for mobile app development.",
        skills: ["JavaScript", "Git", "REST APIs"],
      },
      {
        id: "cross-platform-core",
        title: "Cross-Platform App Development",
        description: "Learn how to build mobile apps efficiently across platforms.",
        skills: ["React Native", "Flutter", "Dart"],
      },
      {
        id: "platform-specific-development",
        title: "Platform-Specific Development",
        description: "Understand native mobile concepts for Android and iOS environments.",
        skills: ["Android Development", "iOS Development", "Firebase"],
      },
      {
        id: "shipping-mobile-apps",
        title: "Testing, Deployment, and App Delivery",
        description: "Prepare mobile applications for release and maintenance.",
        skills: ["App Deployment", "Testing", "Debugging"],
      },
    ],
    projects: [
      "Build a simple mobile UI and connect it to a REST API",
      "Create a React Native or Flutter cross-platform application",
      "Add Firebase-backed features or native mobile functionality",
      "Package and deploy a mobile-ready application build",
    ],
  },

  "AI Engineer": {
    phases: [
      {
        id: "math-and-programming-foundations",
        title: "Mathematics and Programming Foundations",
        description: "Build the mathematical and programming depth needed for AI engineering.",
        skills: ["Python", "Data Structures & Algorithms", "Linear Algebra", "Git"],
      },
      {
        id: "machine-learning-core",
        title: "Machine Learning Core",
        description: "Learn how predictive models work and how to train them effectively.",
        skills: ["Machine Learning", "Debugging"],
      },
      {
        id: "deep-learning-frameworks",
        title: "Deep Learning and Frameworks",
        description: "Develop expertise in neural networks and the main AI tooling ecosystem.",
        skills: ["Deep Learning", "TensorFlow", "PyTorch"],
      },
      {
        id: "deployment-and-mlops",
        title: "Deployment and MLOps Readiness",
        description: "Learn how to serve models and support them in production environments.",
        skills: ["Model Deployment", "MLOps Basics", "Deployment"],
      },
    ],
    projects: [
      "Implement classic machine learning pipelines in Python",
      "Train and evaluate a deep learning model with modern frameworks",
      "Build a model-serving workflow with TensorFlow or PyTorch",
      "Deploy a model-backed AI application with basic MLOps practices",
    ],
  },

  "Cybersecurity Engineer": {
    phases: [
      {
        id: "security-foundations",
        title: "Security and Systems Foundations",
        description: "Build the networking, operating system, and security basics required for defensive and offensive work.",
        skills: ["Networking Fundamentals", "Linux", "Git"],
      },
      {
        id: "offensive-security-core",
        title: "Offensive Security Core",
        description: "Develop practical penetration testing and ethical hacking capabilities.",
        skills: ["Penetration Testing", "Ethical Hacking", "Security Tools (Wireshark, Metasploit)"],
      },
      {
        id: "application-and-crypto-security",
        title: "Application and Cryptographic Security",
        description: "Learn how to reason about web security and cryptographic foundations.",
        skills: ["Web Security", "Cryptography Basics"],
      },
      {
        id: "response-and-analysis",
        title: "Threat Analysis and Incident Response",
        description: "Prepare to investigate threats and respond to incidents in real environments.",
        skills: ["Threat Analysis", "Incident Response", "Debugging"],
      },
    ],
    projects: [
      "Analyse traffic and basic Linux hardening scenarios",
      "Perform guided penetration testing exercises in a lab environment",
      "Assess a web application for common security vulnerabilities",
      "Document a threat scenario and incident response workflow",
    ],
  },

  "Cloud Engineer": {
    phases: [
      {
        id: "cloud-foundations",
        title: "Cloud and Systems Foundations",
        description: "Build the cloud, Linux, and networking knowledge required for cloud engineering.",
        skills: ["AWS / GCP / Azure", "Linux", "Networking", "Git"],
      },
      {
        id: "containers-and-platforms",
        title: "Containers and Platform Engineering",
        description: "Learn how applications are packaged and orchestrated in cloud-native systems.",
        skills: ["Docker", "Kubernetes"],
      },
      {
        id: "infrastructure-automation",
        title: "Infrastructure Automation",
        description: "Develop repeatable infrastructure and deployment workflows.",
        skills: ["Terraform", "CI/CD", "Python"],
      },
      {
        id: "observability-and-operations",
        title: "Monitoring and Operational Readiness",
        description: "Build the skills needed to operate and troubleshoot cloud systems reliably.",
        skills: ["Monitoring Tools", "Deployment", "Debugging"],
      },
    ],
    projects: [
      "Deploy a simple cloud-hosted service on AWS, GCP, or Azure",
      "Containerise an application and orchestrate it with Kubernetes basics",
      "Provision infrastructure using Terraform and automate delivery with CI/CD",
      "Set up monitoring and troubleshoot a cloud-deployed service",
    ],
  },

  "Machine Learning Engineer": {
    phases: [
      {
        id: "ml-foundations",
        title: "Programming and ML Foundations",
        description: "Build the programming, math, and data foundations needed for ML engineering.",
        skills: ["Python", "Statistics", "Git"],
      },
      {
        id: "modeling-core",
        title: "Machine Learning and Data Processing",
        description: "Develop the ability to prepare data and build robust machine learning systems.",
        skills: ["Machine Learning", "Data Processing", "Debugging"],
      },
      {
        id: "deep-learning-frameworks",
        title: "Deep Learning and Frameworks",
        description: "Work with modern deep learning architectures and frameworks.",
        skills: ["Deep Learning", "TensorFlow", "PyTorch"],
      },
      {
        id: "production-ml",
        title: "Production ML and Deployment",
        description: "Learn how to deploy, monitor, and support machine learning systems in production.",
        skills: ["Model Deployment", "MLOps", "Deployment"],
      },
    ],
    projects: [
      "Build a classical machine learning pipeline on processed data",
      "Create a training workflow with feature engineering and evaluation",
      "Train a deep learning model with TensorFlow or PyTorch",
      "Deploy and monitor a machine learning model in a production-style setup",
    ],
  },

  "UI/UX Designer": {
    phases: [
      {
        id: "design-foundations",
        title: "Design Foundations",
        description: "Build the core principles and tools needed for modern product design.",
        skills: ["Figma", "UI Design", "Responsive Design"],
      },
      {
        id: "ux-research-and-structure",
        title: "UX Research and Experience Structure",
        description: "Develop the ability to study users and design more effective experiences.",
        skills: ["UX Research", "Wireframing", "Interaction Design"],
      },
      {
        id: "prototyping-and-systems",
        title: "Prototyping and Design Systems",
        description: "Learn how to move from concepts into usable, scalable design solutions.",
        skills: ["Prototyping", "Design Systems", "Communication Skills"],
      },
      {
        id: "validation-and-iteration",
        title: "Testing and Iteration",
        description: "Refine designs using user feedback and validation workflows.",
        skills: ["User Testing", "Debugging"],
      },
    ],
    projects: [
      "Design a responsive interface system in Figma",
      "Conduct user research and build wireframes for a product flow",
      "Prototype a multi-screen experience with a small design system",
      "Run user testing and iterate on a product design case study",
    ],
  },

  "Software Tester (QA Engineer)": {
    phases: [
      {
        id: "testing-foundations",
        title: "Testing Foundations",
        description: "Build the core habits and frameworks needed for software quality assurance.",
        skills: ["Manual Testing", "Test Case Design", "Bug Tracking Tools"],
      },
      {
        id: "automation-and-functional-testing",
        title: "Automation and Functional Testing",
        description: "Learn how to automate repetitive checks and validate application behaviour efficiently.",
        skills: ["Automation Testing", "Selenium", "API Testing"],
      },
      {
        id: "performance-and-integration",
        title: "Performance and Integration Quality",
        description: "Expand testing into performance, database awareness, and pipeline integration.",
        skills: ["Performance Testing", "SQL", "CI/CD Integration"],
      },
      {
        id: "qa-workflow-readiness",
        title: "QA Workflow Readiness",
        description: "Strengthen debugging, reporting, and release-facing quality practices.",
        skills: ["Debugging", "Git"],
      },
    ],
    projects: [
      "Create manual test cases and bug reports for a sample application",
      "Automate a functional test flow using Selenium",
      "Perform API and performance testing on a service workflow",
      "Integrate automated checks into a CI/CD-style QA pipeline",
    ],
  },
  /* ========================= NEW ROLES ========================= */

  "Data Analyst": {
    phases: [
      {
        id: "data-foundations",
        title: "Data Foundations",
        description: "Build strong fundamentals in data handling and querying.",
        skills: ["SQL", "Excel", "Data Cleaning", "Statistics"]
      },
      {
        id: "analysis-and-visualization",
        title: "Analysis and Visualization",
        description: "Learn how to extract insights and communicate them effectively.",
        skills: ["Python", "Pandas", "Data Visualization", "Business Communication"]
      },
      {
        id: "bi-and-dashboards",
        title: "Business Intelligence",
        description: "Develop dashboarding and reporting skills.",
        skills: ["Power BI", "Tableau"]
      },
      {
        id: "decision-impact",
        title: "Decision Impact",
        description: "Translate analysis into actionable business insights.",
        skills: ["Problem Solving", "Storytelling"]
      }
    ],
    projects: [
      "Clean and analyse a messy dataset using SQL and Excel",
      "Build a Python-based analysis notebook with insights",
      "Create dashboards in Power BI or Tableau",
      "Present insights with business recommendations"
    ]
  },

  "Data Engineer": {
    phases: [
      {
        id: "data-engineering-foundations",
        title: "Data Engineering Foundations",
        description: "Build core data pipeline and database skills.",
        skills: ["Python", "SQL", "Data Warehousing"]
      },
      {
        id: "pipeline-development",
        title: "Pipeline Development",
        description: "Learn how to build reliable ETL pipelines.",
        skills: ["ETL Pipelines", "Airflow", "Data Cleaning"]
      },
      {
        id: "big-data-processing",
        title: "Big Data Processing",
        description: "Work with distributed data systems.",
        skills: ["Apache Spark", "Distributed Systems"]
      },
      {
        id: "cloud-and-deployment",
        title: "Cloud Data Systems",
        description: "Deploy scalable data pipelines in the cloud.",
        skills: ["AWS / GCP / Azure", "Docker", "CI/CD"]
      }
    ],
    projects: [
      "Build an ETL pipeline from raw data to database",
      "Schedule workflows using Airflow",
      "Process large datasets with Spark",
      "Deploy a cloud-based data pipeline"
    ]
  },

  "Site Reliability Engineer": {
    phases: [
      {
        id: "systems-foundations",
        title: "Systems Foundations",
        description: "Understand infrastructure and system behaviour.",
        skills: ["Linux", "Networking", "Debugging"]
      },
      {
        id: "automation-and-ci",
        title: "Automation and CI/CD",
        description: "Automate deployments and workflows.",
        skills: ["CI/CD", "Scripting", "Git"]
      },
      {
        id: "scaling-and-orchestration",
        title: "Scaling Systems",
        description: "Manage distributed systems at scale.",
        skills: ["Docker", "Kubernetes"]
      },
      {
        id: "observability",
        title: "Monitoring and Reliability",
        description: "Ensure uptime through observability.",
        skills: ["Monitoring", "Incident Response"]
      }
    ],
    projects: [
      "Automate deployments using CI/CD",
      "Containerise applications with Docker",
      "Deploy scalable systems using Kubernetes",
      "Set up monitoring and alerting dashboards"
    ]
  },

  "Product Manager": {
    phases: [
      {
        id: "product-foundations",
        title: "Product Foundations",
        description: "Understand product thinking and user needs.",
        skills: ["Product Strategy", "User Research"]
      },
      {
        id: "planning-and-roadmapping",
        title: "Planning and Roadmapping",
        description: "Learn to define and prioritise product features.",
        skills: ["Roadmapping", "Agile / Scrum"]
      },
      {
        id: "execution-and-analysis",
        title: "Execution and Analytics",
        description: "Track performance and optimise decisions.",
        skills: ["Analytics", "A/B Testing"]
      },
      {
        id: "leadership",
        title: "Leadership and Communication",
        description: "Manage stakeholders and drive alignment.",
        skills: ["Stakeholder Management", "Communication Skills"]
      }
    ],
    projects: [
      "Create a product roadmap for a sample app",
      "Conduct user interviews and define features",
      "Run a mock A/B test and analyse results",
      "Present a product strategy document"
    ]
  },

  "Business Analyst": {
    phases: [
      {
        id: "analysis-foundations",
        title: "Business Analysis Foundations",
        description: "Learn requirement gathering and documentation.",
        skills: ["Requirement Gathering", "Documentation"]
      },
      {
        id: "data-and-process",
        title: "Data and Process Analysis",
        description: "Understand workflows and analyse data.",
        skills: ["Process Mapping", "SQL", "Excel"]
      },
      {
        id: "solution-design",
        title: "Solution Design",
        description: "Translate requirements into system designs.",
        skills: ["Wireframing", "Problem Solving"]
      },
      {
        id: "stakeholder-communication",
        title: "Stakeholder Communication",
        description: "Work with teams and business stakeholders.",
        skills: ["Communication Skills", "Stakeholder Management"]
      }
    ],
    projects: [
      "Document requirements for a business system",
      "Analyse business workflows and suggest improvements",
      "Create wireframes for a feature",
      "Present a solution proposal"
    ]
  },

  "Solutions Architect": {
    phases: [
      {
        id: "architecture-foundations",
        title: "Architecture Foundations",
        description: "Understand system design and infrastructure.",
        skills: ["System Design", "Databases"]
      },
      {
        id: "cloud-architecture",
        title: "Cloud Architecture",
        description: "Design scalable cloud systems.",
        skills: ["Cloud Platforms", "Microservices"]
      },
      {
        id: "integration-and-security",
        title: "Integration and Security",
        description: "Build secure and connected systems.",
        skills: ["APIs", "Security Basics"]
      },
      {
        id: "enterprise-design",
        title: "Enterprise Design",
        description: "Handle large-scale system decisions.",
        skills: ["Stakeholder Communication", "Documentation"]
      }
    ],
    projects: [
      "Design a scalable system architecture",
      "Create a cloud-based architecture diagram",
      "Design API integration flows",
      "Present a complete architecture solution"
    ]
  },

  "Blockchain Developer": {
    phases: [
      {
        id: "blockchain-foundations",
        title: "Blockchain Foundations",
        description: "Understand decentralised systems.",
        skills: ["Blockchain Basics", "Cryptography Basics"]
      },
      {
        id: "smart-contracts",
        title: "Smart Contracts",
        description: "Write and deploy smart contracts.",
        skills: ["Solidity", "Ethereum"]
      },
      {
        id: "dapp-development",
        title: "DApp Development",
        description: "Build decentralised applications.",
        skills: ["Web3.js", "Node.js"]
      },
      {
        id: "security-and-testing",
        title: "Security and Testing",
        description: "Ensure secure smart contracts.",
        skills: ["Security Basics", "Testing"]
      }
    ],
    projects: [
      "Build a smart contract using Solidity",
      "Deploy a contract on a test network",
      "Build a Web3-based DApp",
      "Audit and test smart contracts"
    ]
  },

  "Game Developer": {
    phases: [
      {
        id: "game-dev-foundations",
        title: "Game Development Foundations",
        description: "Learn programming and game engines.",
        skills: ["C#", "Unity"]
      },
      {
        id: "game-mechanics",
        title: "Game Mechanics",
        description: "Build gameplay systems.",
        skills: ["Game Physics", "OOP"]
      },
      {
        id: "advanced-development",
        title: "Advanced Game Development",
        description: "Optimise and expand game features.",
        skills: ["Debugging", "Performance Optimization"]
      },
      {
        id: "deployment",
        title: "Game Deployment",
        description: "Prepare games for release.",
        skills: ["Version Control", "Publishing"]
      }
    ],
    projects: [
      "Build a simple 2D game",
      "Implement physics and player controls",
      "Optimise performance and visuals",
      "Publish a playable game"
    ]
  },

  "Database Administrator": {
    phases: [
      {
        id: "db-foundations",
        title: "Database Foundations",
        description: "Learn core database concepts.",
        skills: ["SQL", "PostgreSQL / MySQL"]
      },
      {
        id: "performance-and-security",
        title: "Performance and Security",
        description: "Ensure efficient and secure databases.",
        skills: ["Performance Tuning", "Database Security"]
      },
      {
        id: "backup-and-recovery",
        title: "Backup and Recovery",
        description: "Prevent data loss and failures.",
        skills: ["Backup", "Recovery"]
      },
      {
        id: "operations",
        title: "Database Operations",
        description: "Maintain production systems.",
        skills: ["Monitoring", "Replication"]
      }
    ],
    projects: [
      "Design a relational database schema",
      "Optimise slow queries",
      "Implement backup strategies",
      "Monitor database performance"
    ]
  },

  "AR/VR Developer": {
    phases: [
      {
        id: "xr-foundations",
        title: "XR Foundations",
        description: "Learn immersive development basics.",
        skills: ["Unity", "C#"]
      },
      {
        id: "3d-and-interaction",
        title: "3D Interaction",
        description: "Work with 3D systems and user interaction.",
        skills: ["3D Math", "Interaction Design"]
      },
      {
        id: "xr-development",
        title: "XR Development",
        description: "Build AR/VR experiences.",
        skills: ["XR SDKs", "Debugging"]
      },
      {
        id: "optimization",
        title: "Performance Optimization",
        description: "Ensure smooth immersive experiences.",
        skills: ["Performance Optimization"]
      }
    ],
    projects: [
      "Build a basic VR scene",
      "Create interactive AR experience",
      "Integrate 3D assets",
      "Optimise XR performance"
    ]
  },

  "Technical Writer": {
    phases: [
      {
        id: "writing-foundations",
        title: "Writing Foundations",
        description: "Learn clear technical communication.",
        skills: ["Technical Documentation", "Communication Skills"]
      },
      {
        id: "developer-docs",
        title: "Developer Documentation",
        description: "Write API and product documentation.",
        skills: ["API Documentation", "Markdown"]
      },
      {
        id: "content-structure",
        title: "Content Structure",
        description: "Organise complex information effectively.",
        skills: ["Information Architecture", "Editing"]
      },
      {
        id: "user-focused-writing",
        title: "User-Focused Writing",
        description: "Improve usability of documentation.",
        skills: ["User Empathy", "Research"]
      }
    ],
    projects: [
      "Write documentation for a sample API",
      "Create a product user guide",
      "Structure a documentation site",
      "Improve documentation usability"
    ]
  },

  "Scrum Master": {
    phases: [
      {
        id: "agile-foundations",
        title: "Agile Foundations",
        description: "Understand Agile and Scrum principles.",
        skills: ["Agile", "Scrum"]
      },
      {
        id: "team-facilitation",
        title: "Team Facilitation",
        description: "Support team collaboration.",
        skills: ["Facilitation", "Communication Skills"]
      },
      {
        id: "process-optimization",
        title: "Process Optimization",
        description: "Improve delivery workflows.",
        skills: ["Process Improvement", "Risk Management"]
      },
      {
        id: "leadership",
        title: "Leadership",
        description: "Coach and guide teams.",
        skills: ["Coaching", "Conflict Resolution"]
      }
    ],
    projects: [
      "Run mock Scrum ceremonies",
      "Improve team workflow process",
      "Resolve team blockers",
      "Coach a team through Agile practices"
    ]
  },

  "Project Manager": {
    phases: [
      {
        id: "pm-foundations",
        title: "Project Management Foundations",
        description: "Understand planning and execution.",
        skills: ["Project Planning", "Documentation"]
      },
      {
        id: "execution",
        title: "Execution",
        description: "Manage delivery and teams.",
        skills: ["Stakeholder Management", "Leadership"]
      },
      {
        id: "risk-and-budget",
        title: "Risk and Budget",
        description: "Control project risks and finances.",
        skills: ["Risk Management", "Budgeting"]
      },
      {
        id: "delivery",
        title: "Delivery",
        description: "Ensure successful project completion.",
        skills: ["Agile / Scrum", "Communication Skills"]
      }
    ],
    projects: [
      "Plan a full project lifecycle",
      "Manage a mock team project",
      "Handle project risks and deadlines",
      "Deliver a project with documentation"
    ]
  },
};