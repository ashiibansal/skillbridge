const normalizeText = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\+/g, "plus")
      .replace(/#/g, "sharp")
      .replace(/&/g, "and")
      .replace(/\//g, " ")
      .replace(/[-_]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  
  const createGuidanceItem = ({
    type,
    title,
    url = "",
    provider,
    label,
    description,
    icon = "compass",
  }) => ({
    type,
    title,
    url,
    provider,
    label,
    description,
    icon,
    isFallback: true,
  });
  
  export const guidanceMap = {
    // =========================
    // CORE WEB / SOFTWARE
    // =========================
    git: [
      createGuidanceItem({
        type: "roadmap",
        title: "Git & GitHub Roadmap",
        url: "https://roadmap.sh/git-github",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A clear concept map for version control, collaboration, branching, and workflow basics.",
        icon: "compass",
      }),
    ],
  
    github: [
      createGuidanceItem({
        type: "roadmap",
        title: "Git & GitHub Roadmap",
        url: "https://roadmap.sh/git-github",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A structured path for repositories, pull requests, collaboration, and Git workflows.",
        icon: "compass",
      }),
    ],
  
    javascript: [
      createGuidanceItem({
        type: "roadmap",
        title: "JavaScript Roadmap",
        url: "https://roadmap.sh/javascript",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "Covers language fundamentals, asynchronous logic, browser APIs, and ecosystem progression.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "learning_path",
        title: "Full Stack JavaScript Path",
        url: "https://www.theodinproject.com/paths/full-stack-javascript",
        provider: "The Odin Project",
        label: "Structured path",
        description:
          "Project-based JavaScript learning with hands-on workflow and practical build steps.",
        icon: "graduation",
      }),
    ],
  
    typescript: [
      createGuidanceItem({
        type: "roadmap",
        title: "TypeScript Roadmap",
        url: "https://roadmap.sh/typescript",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "Strong next step after JavaScript for safer, scalable application development.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "docs",
        title: "TypeScript Documentation",
        url: "https://www.typescriptlang.org/docs/",
        provider: "TypeScript",
        label: "Official docs",
        description:
          "Best reference for types, interfaces, generics, narrowing, and real TypeScript usage.",
        icon: "docs",
      }),
    ],
  
    html: [
      createGuidanceItem({
        type: "learning_path",
        title: "Frontend Foundations",
        url: "https://www.theodinproject.com/paths/foundations/courses/foundations",
        provider: "The Odin Project",
        label: "Structured path",
        description:
          "A practical starting point for HTML, CSS, browser structure, and web basics.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "docs",
        title: "HTML Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        provider: "MDN",
        label: "Official docs",
        description:
          "Authoritative HTML reference for elements, semantics, forms, and accessibility basics.",
        icon: "docs",
      }),
    ],
  
    css: [
      createGuidanceItem({
        type: "learning_path",
        title: "Responsive Web Design",
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
        provider: "freeCodeCamp",
        label: "Certification path",
        description:
          "Beginner-friendly project-based track for layout, styling, responsiveness, and accessibility.",
        icon: "map",
      }),
      createGuidanceItem({
        type: "docs",
        title: "CSS Documentation",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        provider: "MDN",
        label: "Official docs",
        description:
          "Best source for selectors, layout, flexbox, grid, animations, and browser styling rules.",
        icon: "docs",
      }),
    ],
  
    react: [
      createGuidanceItem({
        type: "roadmap",
        title: "React Roadmap",
        url: "https://roadmap.sh/react",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A visual progression through React fundamentals, state, routing, and ecosystem tools.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "course",
        title: "Full Stack Open",
        url: "https://fullstackopen.com/en/",
        provider: "Full Stack Open",
        label: "Deep-dive course",
        description:
          "A rigorous React-focused course with APIs, testing, state management, and TypeScript.",
        icon: "map",
      }),
      createGuidanceItem({
        type: "docs",
        title: "React Documentation",
        url: "https://react.dev/learn",
        provider: "React",
        label: "Official docs",
        description:
          "Excellent modern reference for components, hooks, rendering patterns, and application structure.",
        icon: "docs",
      }),
    ],
  
    "state management": [
      createGuidanceItem({
        type: "learning_path",
        title: "React Roadmap",
        url: "https://roadmap.sh/react",
        provider: "roadmap.sh",
        label: "Related roadmap",
        description:
          "State management is best learned within broader React application architecture and component design.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build a Stateful Frontend Project",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Model forms, shared state, derived UI state, API data, and reusable component logic in one app.",
        icon: "practice",
      }),
    ],
  
    routing: [
      createGuidanceItem({
        type: "learning_path",
        title: "Frontend Roadmap",
        url: "https://roadmap.sh/frontend",
        provider: "roadmap.sh",
        label: "Related roadmap",
        description:
          "Routing fits naturally under broader frontend architecture, navigation, and application structure.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build a Multi-Page App Flow",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create route-aware navigation, nested layouts, route params, and protected or conditional pages.",
        icon: "practice",
      }),
    ],
  
    "responsive design": [
      createGuidanceItem({
        type: "course",
        title: "Responsive Web Design",
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
        provider: "freeCodeCamp",
        label: "Certification path",
        description:
          "A practical route to layout systems, accessibility, and mobile-friendly interface design.",
        icon: "map",
      }),
      createGuidanceItem({
        type: "docs",
        title: "Responsive Design Basics",
        url: "https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design",
        provider: "MDN",
        label: "Official docs",
        description:
          "Strong conceptual grounding for media queries, flexible layouts, and responsive content design.",
        icon: "docs",
      }),
    ],
  
    frontend: [
      createGuidanceItem({
        type: "roadmap",
        title: "Frontend Roadmap",
        url: "https://roadmap.sh/frontend",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "High-level frontend knowledge map covering browser fundamentals, frameworks, and tooling.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "learning_path",
        title: "Foundations Path",
        url: "https://www.theodinproject.com/paths/foundations/courses/foundations",
        provider: "The Odin Project",
        label: "Structured path",
        description:
          "Excellent practical sequence for HTML, CSS, JavaScript, Git, and developer workflow.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "course",
        title: "Responsive Web Design",
        url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
        provider: "freeCodeCamp",
        label: "Certification path",
        description:
          "Beginner-friendly project-based track for layout, styling, accessibility, and responsive design.",
        icon: "map",
      }),
    ],
  
    nextjs: [
      createGuidanceItem({
        type: "roadmap",
        title: "Next.js Roadmap",
        url: "https://roadmap.sh/next",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A guided path for server rendering, routing, data fetching, and production-ready React apps.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "docs",
        title: "Next.js Documentation",
        url: "https://nextjs.org/docs",
        provider: "Next.js",
        label: "Official docs",
        description:
          "Best source for App Router, rendering strategies, layouts, server actions, and deployment guidance.",
        icon: "docs",
      }),
    ],
  
    "web performance optimization": [
      createGuidanceItem({
        type: "docs",
        title: "Web Performance",
        url: "https://developer.mozilla.org/en-US/docs/Web/Performance",
        provider: "MDN",
        label: "Reference docs",
        description:
          "Covers rendering efficiency, Core Web Vitals, loading strategy, and front-end performance principles.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Optimise a Real Frontend App",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Improve bundle size, image loading, render flow, and perceived responsiveness in an existing app.",
        icon: "practice",
      }),
    ],
  
    backend: [
      createGuidanceItem({
        type: "roadmap",
        title: "Backend Roadmap",
        url: "https://roadmap.sh/backend",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "Covers server-side concepts, APIs, databases, auth, deployment, and architecture foundations.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "course",
        title: "Full Stack Open",
        url: "https://fullstackopen.com/en/",
        provider: "Full Stack Open",
        label: "Deep-dive course",
        description:
          "Strong backend coverage including APIs, databases, testing, deployment, and modern tooling.",
        icon: "map",
      }),
    ],
  
    nodejs: [
      createGuidanceItem({
        type: "roadmap",
        title: "Node.js Roadmap",
        url: "https://roadmap.sh/nodejs",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "Backend-focused concept map for Node.js, packages, runtime behaviour, and ecosystem tooling.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "course",
        title: "Full Stack Open",
        url: "https://fullstackopen.com/en/",
        provider: "Full Stack Open",
        label: "Deep-dive course",
        description:
          "Covers Node.js APIs, testing, deployment, and modern backend workflows.",
        icon: "map",
      }),
    ],
  
    "express js": [
      createGuidanceItem({
        type: "learning_path",
        title: "Backend Roadmap",
        url: "https://roadmap.sh/backend",
        provider: "roadmap.sh",
        label: "Related roadmap",
        description:
          "Express.js is best learned as part of broader backend routing, middleware, APIs, and service design.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build an Express API",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create routes, middleware, validation, auth, error handling, and persistent storage in one service.",
        icon: "practice",
      }),
    ],
  
    "rest apis": [
      createGuidanceItem({
        type: "learning_path",
        title: "Backend Roadmap",
        url: "https://roadmap.sh/backend",
        provider: "roadmap.sh",
        label: "Related roadmap",
        description:
          "REST APIs fit best under broader backend design, validation, auth, and data workflows.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build a CRUD API",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create endpoints, validation, status codes, database integration, and error handling in one service.",
        icon: "practice",
      }),
    ],
  
    authentication: [
      createGuidanceItem({
        type: "docs",
        title: "Authentication and Web Security",
        url: "https://developer.mozilla.org/en-US/docs/Web/Security",
        provider: "MDN",
        label: "Official docs",
        description:
          "Best starting point for sessions, tokens, cookies, browser security, and authentication concepts.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build Login + Protected Routes",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Implement registration, login, protected endpoints, role checks, and logout flow in a small app.",
        icon: "practice",
      }),
    ],
  
    "authentication jwt oauth": [
      createGuidanceItem({
        type: "docs",
        title: "Authentication and Web Security",
        url: "https://developer.mozilla.org/en-US/docs/Web/Security",
        provider: "MDN",
        label: "Official docs",
        description:
          "Useful conceptual base before implementing JWT, OAuth flows, token refresh, and access control.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "JWT and OAuth Auth Flow",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Implement sign-in, protected routes, access token handling, and basic identity flow design.",
        icon: "practice",
      }),
    ],
  
    mongodb: [
      createGuidanceItem({
        type: "roadmap",
        title: "MongoDB Roadmap",
        url: "https://roadmap.sh/mongodb",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "MongoDB-specific concept map for document design, queries, indexing, and production use.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "course",
        title: "Full Stack Open MongoDB Section",
        url: "https://fullstackopen.com/en/part3/saving_data_to_mongo_db",
        provider: "Full Stack Open",
        label: "Deep-dive course",
        description:
          "Practical MongoDB usage in the context of real web applications and backend flows.",
        icon: "map",
      }),
    ],
  
    sql: [
      createGuidanceItem({
        type: "roadmap",
        title: "SQL Roadmap",
        url: "https://roadmap.sh/sql",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A knowledge map for querying, joins, normalization, performance, and relational thinking.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "SQL Practice Track",
        provider: "SkillBridge",
        label: "Practice routine",
        description:
          "Build confidence with joins, aggregation, filtering, schema design, and real query debugging.",
        icon: "practice",
      }),
    ],
  
    "sql postgresql mysql": [
      createGuidanceItem({
        type: "roadmap",
        title: "SQL Roadmap",
        url: "https://roadmap.sh/sql",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "Best general roadmap for relational querying, modeling, and database fundamentals.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "docs",
        title: "PostgreSQL Documentation",
        url: "https://www.postgresql.org/docs/",
        provider: "PostgreSQL",
        label: "Official docs",
        description:
          "Strong source for SQL syntax, indexing, schema design, transactions, and database administration basics.",
        icon: "docs",
      }),
    ],
  
    "system design basics": [
      createGuidanceItem({
        type: "learning_path",
        title: "Backend Roadmap",
        url: "https://roadmap.sh/backend",
        provider: "roadmap.sh",
        label: "Related roadmap",
        description:
          "System design is better approached through backend architecture and scaling concepts than a fake narrow path.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "curated_resources",
        title: "System Design Reading Path",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Start with APIs, databases, caching, queues, reliability, and tradeoffs before giant architecture diagrams.",
        icon: "curated",
      }),
    ],
  
    "caching redis": [
      createGuidanceItem({
        type: "learning_path",
        title: "Backend Roadmap",
        url: "https://roadmap.sh/backend",
        provider: "roadmap.sh",
        label: "Related roadmap",
        description:
          "Caching fits naturally within backend performance, scaling, and system architecture patterns.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Add Redis Caching to an API",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Cache hot responses, manage invalidation, and compare system behaviour before and after caching.",
        icon: "practice",
      }),
    ],
  
    fullstack: [
      createGuidanceItem({
        type: "roadmap",
        title: "Full Stack Roadmap",
        url: "https://roadmap.sh/full-stack",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A broad overview of how frontend, backend, infrastructure, and workflow fit together.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "learning_path",
        title: "Full Stack JavaScript Path",
        url: "https://www.theodinproject.com/paths/full-stack-javascript",
        provider: "The Odin Project",
        label: "Structured path",
        description:
          "Project-driven full-stack learning path using JavaScript across the stack.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "course",
        title: "Full Stack Open",
        url: "https://fullstackopen.com/en/",
        provider: "Full Stack Open",
        label: "Deep-dive course",
        description:
          "A more advanced route through React, Node, GraphQL, TypeScript, testing, and CI.",
        icon: "map",
      }),
    ],
  
    // =========================
    // DATA / ML / AI
    // =========================
    python: [
      createGuidanceItem({
        type: "roadmap",
        title: "Python Roadmap",
        url: "https://roadmap.sh/python",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A staged path through Python syntax, tooling, libraries, and ecosystem-level growth.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "course",
        title: "freeCodeCamp Learn Platform",
        url: "https://www.freecodecamp.org/learn/",
        provider: "freeCodeCamp",
        label: "Guided learning",
        description:
          "Use the curriculum hub to pick Python-oriented beginner and intermediate structured learning paths.",
        icon: "map",
      }),
    ],
  
    pandas: [
      createGuidanceItem({
        type: "docs",
        title: "Pandas Documentation",
        url: "https://pandas.pydata.org/docs/",
        provider: "Pandas",
        label: "Official docs",
        description:
          "Best reference for tabular data manipulation, transformation, aggregation, and analysis workflows.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Data Cleaning Notebook Practice",
        provider: "SkillBridge",
        label: "Practice routine",
        description:
          "Clean messy data, handle nulls, transform columns, aggregate metrics, and build reproducible notebooks.",
        icon: "practice",
      }),
    ],
  
    numpy: [
      createGuidanceItem({
        type: "docs",
        title: "NumPy Documentation",
        url: "https://numpy.org/doc/",
        provider: "NumPy",
        label: "Official docs",
        description:
          "Core foundation for arrays, vectorized operations, broadcasting, and numerical computing in Python.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Numerical Python Exercises",
        provider: "SkillBridge",
        label: "Practice routine",
        description:
          "Strengthen array thinking, matrix operations, indexing, and efficient numerical computation habits.",
        icon: "practice",
      }),
    ],
  
    "data visualization": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Data Visualization Learning Path",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build chart judgment, data storytelling, dashboard thinking, and decision-focused visual analysis.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Turn Raw Data into a Dashboard Story",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create a chart set or dashboard that moves from exploration to insight to recommendation.",
        icon: "practice",
      }),
    ],
  
    statistics: [
      createGuidanceItem({
        type: "curated_resources",
        title: "Statistics for Data Work",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Focus on probability, distributions, hypothesis thinking, sampling, and practical interpretation.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Applied Statistics Exercises",
        provider: "SkillBridge",
        label: "Practice routine",
        description:
          "Work through probability, confidence, variance, significance, and interpretation using real examples.",
        icon: "practice",
      }),
    ],
  
    "machine learning": [
      createGuidanceItem({
        type: "roadmap",
        title: "AI and Data Scientist Roadmaps",
        url: "https://roadmap.sh/ai-data-scientist",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "High-level map for practical machine learning, model thinking, data work, and deployment direction.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "course",
        title: "Machine Learning Specialization",
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
        provider: "Coursera",
        label: "Structured course",
        description:
          "Good progression for supervised learning, evaluation, optimization, and model intuition.",
        icon: "map",
      }),
    ],
  
    "scikit learn": [
      createGuidanceItem({
        type: "docs",
        title: "scikit-learn Documentation",
        url: "https://scikit-learn.org/stable/",
        provider: "scikit-learn",
        label: "Official docs",
        description:
          "Best source for model APIs, preprocessing, evaluation, pipelines, and classical ML workflows.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Classical ML Workflow Project",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Train, evaluate, compare, and iterate on a supervised learning pipeline using scikit-learn.",
        icon: "practice",
      }),
    ],
  
    "deep learning": [
      createGuidanceItem({
        type: "roadmap",
        title: "AI Engineer Roadmap",
        url: "https://roadmap.sh/ai-engineer",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A strong path for neural networks, model training, frameworks, inference, and production AI work.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "course",
        title: "Deep Learning Specialization",
        url: "https://www.coursera.org/specializations/deep-learning",
        provider: "Coursera",
        label: "Structured course",
        description:
          "A practical route into neural networks, tuning, CNNs, sequence models, and deep learning workflows.",
        icon: "map",
      }),
    ],
  
    tensorflow: [
      createGuidanceItem({
        type: "docs",
        title: "TensorFlow Documentation",
        url: "https://www.tensorflow.org/learn",
        provider: "TensorFlow",
        label: "Official docs",
        description:
          "Core resource for model building, training pipelines, Keras workflows, and deployment concepts.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "TensorFlow Model Project",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Build, train, evaluate, and export a TensorFlow model with a reproducible training workflow.",
        icon: "practice",
      }),
    ],
  
    pytorch: [
      createGuidanceItem({
        type: "docs",
        title: "PyTorch Documentation",
        url: "https://pytorch.org/tutorials/",
        provider: "PyTorch",
        label: "Official docs",
        description:
          "Best source for tensors, training loops, autograd, neural models, and applied experimentation.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "PyTorch Training Project",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Build an end-to-end training loop, evaluate a model, and improve experimentation discipline.",
        icon: "practice",
      }),
    ],
  
    "linear algebra": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Linear Algebra for ML and AI",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Focus on vectors, matrices, transformations, eigen intuition, and how they connect to models.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Applied Matrix Math Exercises",
        provider: "SkillBridge",
        label: "Practice routine",
        description:
          "Build intuition through matrix multiplication, projections, transformations, and ML-related examples.",
        icon: "practice",
      }),
    ],
  
    "model deployment": [
      createGuidanceItem({
        type: "learning_path",
        title: "AI Engineer Roadmap",
        url: "https://roadmap.sh/ai-engineer",
        provider: "roadmap.sh",
        label: "Related roadmap",
        description:
          "Model deployment sits within broader ML systems, serving, monitoring, and production architecture.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Serve a Model with an API",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Wrap a model in an API, handle input validation, measure inference behaviour, and deploy a serving path.",
        icon: "practice",
      }),
    ],
  
    "mlops basics": [
      createGuidanceItem({
        type: "learning_path",
        title: "MLOps Roadmap",
        url: "https://roadmap.sh/mlops",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A practical roadmap for ML pipelines, experiment tracking, deployment, monitoring, and reproducibility.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build a Reproducible ML Workflow",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Version data, structure training runs, track outputs, and define a repeatable model delivery workflow.",
        icon: "practice",
      }),
    ],
  
    "mlops": [
      createGuidanceItem({
        type: "learning_path",
        title: "MLOps Roadmap",
        url: "https://roadmap.sh/mlops",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "Strong coverage of model lifecycle, serving, observability, experiments, and production ML systems.",
        icon: "compass",
      }),
    ],
  
    "data processing": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Data Processing Workflow",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn batching, cleaning, feature preparation, transformation logic, and pipeline thinking.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build a Data Preparation Pipeline",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Take raw data through validation, transformation, feature preparation, and downstream-ready output.",
        icon: "practice",
      }),
    ],
  
    excel: [
      createGuidanceItem({
        type: "course",
        title: "Excel Skills for Business",
        url: "https://www.coursera.org/specializations/excel",
        provider: "Coursera",
        label: "Structured course",
        description:
          "A solid route for spreadsheet logic, formulas, analysis workflows, and business reporting confidence.",
        icon: "map",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Spreadsheet Analysis Tasks",
        provider: "SkillBridge",
        label: "Practice routine",
        description:
          "Build speed in formulas, pivots, cleaning, summarization, and decision-ready business analysis.",
        icon: "practice",
      }),
    ],
  
    "power bi": [
      createGuidanceItem({
        type: "learning_path",
        title: "Power BI Learning Path",
        url: "https://learn.microsoft.com/en-us/training/powerplatform/power-bi/",
        provider: "Microsoft Learn",
        label: "Structured path",
        description:
          "A clear progression for dashboards, modeling, reporting, filters, and business storytelling.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build a Business Dashboard",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create a dashboard with KPIs, drilldowns, filters, clean layout, and a clear narrative.",
        icon: "practice",
      }),
    ],
  
    tableau: [
      createGuidanceItem({
        type: "learning_path",
        title: "Tableau Learning",
        url: "https://www.tableau.com/learn/training",
        provider: "Tableau",
        label: "Structured path",
        description:
          "Build dashboarding, chart selection, storytelling, and visual analysis capability with Tableau.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Create an Insight Dashboard",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Turn a raw dataset into a well-structured dashboard with decisions, patterns, and business insight.",
        icon: "practice",
      }),
    ],
  
    "data cleaning": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Data Cleaning Playbook",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn missing values, duplicates, standardisation, outliers, schema fixes, and reproducible cleanup logic.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Messy Dataset Cleanup Project",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Take a broken dataset through cleaning, validation, transformation, and analysis-ready preparation.",
        icon: "practice",
      }),
    ],
  
    "data warehousing": [
      createGuidanceItem({
        type: "learning_path",
        title: "Data Engineer Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Data warehousing is best learned through schemas, ETL design, modeling, and analytics-ready storage.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Design a Warehouse Schema",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Model fact and dimension tables, define transformations, and structure an analytics-ready dataset flow.",
        icon: "practice",
      }),
    ],
  
    "etl pipelines": [
      createGuidanceItem({
        type: "learning_path",
        title: "Data Engineering Learning Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "ETL work is best approached through extraction, transformation logic, orchestration, and data reliability.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build an ETL Pipeline",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Extract raw data, transform it cleanly, load it into storage, and validate pipeline outputs.",
        icon: "practice",
      }),
    ],
  
    airflow: [
      createGuidanceItem({
        type: "docs",
        title: "Apache Airflow Documentation",
        url: "https://airflow.apache.org/docs/",
        provider: "Apache Airflow",
        label: "Official docs",
        description:
          "Best starting point for DAGs, scheduling, orchestration patterns, and workflow management concepts.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Schedule a Data Workflow",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create a DAG that runs extraction, transformation, checks, and delivery in a scheduled pipeline.",
        icon: "practice",
      }),
    ],
  
    "apache spark": [
      createGuidanceItem({
        type: "docs",
        title: "Apache Spark Documentation",
        url: "https://spark.apache.org/docs/latest/",
        provider: "Apache Spark",
        label: "Official docs",
        description:
          "Strong reference for distributed processing, transformations, actions, and large-scale data computation.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Large-Scale Data Processing Project",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Run transformations on larger datasets, optimise job flow, and understand distributed execution tradeoffs.",
        icon: "practice",
      }),
    ],
  
    "distributed systems": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Distributed Systems Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Focus on coordination, scaling, failures, consistency, queues, and service communication patterns.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Service Decomposition and Reliability Exercise",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Model failure points, retries, communication paths, and consistency tradeoffs in distributed services.",
        icon: "practice",
      }),
    ],
  
    // =========================
    // DEVOPS / CLOUD / SRE
    // =========================
    linux: [
      createGuidanceItem({
        type: "roadmap",
        title: "Linux Roadmap",
        url: "https://roadmap.sh/linux",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A strong progression for shell usage, processes, permissions, filesystems, and system fundamentals.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Linux Command-Line Routine",
        provider: "SkillBridge",
        label: "Practice routine",
        description:
          "Build confidence with navigation, file operations, process inspection, permissions, and shell workflows.",
        icon: "practice",
      }),
    ],
  
    "bash scripting": [
      createGuidanceItem({
        type: "docs",
        title: "GNU Bash Manual",
        url: "https://www.gnu.org/software/bash/manual/",
        provider: "GNU",
        label: "Reference docs",
        description:
          "Best source for shell scripting syntax, variables, loops, conditions, and script behaviour.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Automate Repetitive CLI Tasks",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Write scripts for backups, log processing, deployment helpers, and simple admin automation.",
        icon: "practice",
      }),
    ],
  
    docker: [
      createGuidanceItem({
        type: "roadmap",
        title: "Docker Roadmap",
        url: "https://roadmap.sh/docker",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A focused path through images, containers, volumes, networking, and deployment basics.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Containerise an Application",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Dockerise a service, manage envs and volumes, and run a repeatable container workflow locally.",
        icon: "practice",
      }),
    ],
  
    kubernetes: [
      createGuidanceItem({
        type: "roadmap",
        title: "Kubernetes Roadmap",
        url: "https://roadmap.sh/kubernetes",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A structured map for orchestration concepts, workloads, services, and cluster operations.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Deploy a Containerised App on Kubernetes",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Define deployments, services, scaling, config, and rollouts for a production-style app.",
        icon: "practice",
      }),
    ],
  
    "ci cd pipelines": [
      createGuidanceItem({
        type: "roadmap",
        title: "DevOps Roadmap",
        url: "https://roadmap.sh/devops",
        provider: "roadmap.sh",
        label: "Related roadmap",
        description:
          "CI/CD is best learned as part of automation, delivery, testing, and infrastructure workflow design.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build a CI/CD Pipeline",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Automate linting, testing, builds, and deployment for a real application workflow.",
        icon: "practice",
      }),
    ],
  
    "github actions jenkins": [
      createGuidanceItem({
        type: "roadmap",
        title: "DevOps Roadmap",
        url: "https://roadmap.sh/devops",
        provider: "roadmap.sh",
        label: "Related roadmap",
        description:
          "Use a broader DevOps roadmap while learning CI tooling like GitHub Actions and Jenkins in context.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Automate Build and Deploy with CI Tools",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create a workflow that runs tests, builds artifacts, and pushes a deployable application output.",
        icon: "practice",
      }),
    ],
  
    devops: [
      createGuidanceItem({
        type: "roadmap",
        title: "DevOps Roadmap",
        url: "https://roadmap.sh/devops",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "A broad path across automation, CI/CD, infrastructure, containers, observability, and operations.",
        icon: "compass",
      }),
    ],
  
    "aws gcp azure": [
      createGuidanceItem({
        type: "roadmap",
        title: "AWS Roadmap",
        url: "https://roadmap.sh/aws",
        provider: "roadmap.sh",
        label: "Visual roadmap",
        description:
          "Use this to understand cloud service categories, architecture patterns, deployment, and operations.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "learning_path",
        title: "Cloud Fundamentals Learning Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Build compute, storage, networking, IAM, deployment, and cloud architecture foundations.",
        icon: "graduation",
      }),
    ],
  
    "infrastructure as code terraform": [
      createGuidanceItem({
        type: "docs",
        title: "Terraform Documentation",
        url: "https://developer.hashicorp.com/terraform/docs",
        provider: "HashiCorp",
        label: "Official docs",
        description:
          "Best reference for Terraform configuration, providers, modules, and infrastructure state handling.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Provision Infrastructure with Terraform",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Define infrastructure as code, structure reusable modules, and provision a simple cloud environment.",
        icon: "practice",
      }),
    ],
  
    "monitoring prometheus grafana": [
      createGuidanceItem({
        type: "learning_path",
        title: "DevOps and SRE Observability Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Learn metrics, dashboards, alerts, service health, and operational visibility through observability tools.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Create Monitoring Dashboards and Alerts",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Instrument services, visualise metrics, and define alerts for health and reliability issues.",
        icon: "practice",
      }),
    ],
  
    networking: [
      createGuidanceItem({
        type: "roadmap",
        title: "Computer Science Roadmap",
        url: "https://roadmap.sh/computer-science",
        provider: "roadmap.sh",
        label: "Related roadmap",
        description:
          "Networking is foundational and best learned through systems context, protocols, and infrastructure thinking.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Networking Fundamentals Lab",
        provider: "SkillBridge",
        label: "Practice routine",
        description:
          "Build confidence with ports, DNS, routing, protocols, client-server flows, and traffic troubleshooting.",
        icon: "practice",
      }),
    ],
  
    "incident response": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Incident Response Workflow",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn detection, triage, impact assessment, communication, recovery, and post-incident review discipline.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Run a Mock Incident Timeline",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Respond to a simulated outage or breach by triaging, documenting, escalating, and planning recovery.",
        icon: "practice",
      }),
    ],
  
    monitoring: [
      createGuidanceItem({
        type: "learning_path",
        title: "Observability Learning Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Build competence in metrics, logs, tracing, dashboards, alert design, and service health analysis.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Observe a Running Service",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Add instrumentation, inspect service health, and build a dashboard that reveals failures and trends.",
        icon: "practice",
      }),
    ],
  
    // =========================
    // MOBILE / GAME / XR
    // =========================
    "react native": [
      createGuidanceItem({
        type: "course",
        title: "React Native Learning Path",
        provider: "SkillBridge",
        label: "Structured path",
        description:
          "Build cross-platform app fundamentals, navigation, native modules, API usage, and mobile UI patterns.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build a Cross-Platform Mobile App",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create screens, state, API integration, navigation, and a usable mobile interaction flow.",
        icon: "practice",
      }),
    ],
  
    flutter: [
      createGuidanceItem({
        type: "docs",
        title: "Flutter Documentation",
        url: "https://docs.flutter.dev/",
        provider: "Flutter",
        label: "Official docs",
        description:
          "Best source for widgets, layouts, state, navigation, and app shipping practices in Flutter.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build a Flutter App",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create a multi-screen Flutter app with state, API usage, forms, and responsive mobile UI.",
        icon: "practice",
      }),
    ],
  
    dart: [
      createGuidanceItem({
        type: "docs",
        title: "Dart Documentation",
        url: "https://dart.dev/guides",
        provider: "Dart",
        label: "Official docs",
        description:
          "Learn Dart syntax, object modeling, async programming, and language fundamentals for Flutter work.",
        icon: "docs",
      }),
    ],
  
    "android development": [
      createGuidanceItem({
        type: "learning_path",
        title: "Android Developer Learning Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Cover native app basics, lifecycle, architecture, API usage, testing, and app delivery.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build an Android App Flow",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Implement screens, navigation, storage, networking, and a native-friendly interaction pattern.",
        icon: "practice",
      }),
    ],
  
    "ios development": [
      createGuidanceItem({
        type: "learning_path",
        title: "iOS Developer Learning Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Learn iOS app structure, state, navigation, native patterns, and delivery workflow basics.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build an iOS App Flow",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create a native mobile workflow with screens, data, interaction states, and platform conventions.",
        icon: "practice",
      }),
    ],
  
    firebase: [
      createGuidanceItem({
        type: "docs",
        title: "Firebase Documentation",
        url: "https://firebase.google.com/docs",
        provider: "Firebase",
        label: "Official docs",
        description:
          "Strong source for auth, Firestore, storage, hosting, and app backend integrations.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Add Firebase to a Mobile or Web App",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Use Firebase auth, data storage, or hosting to add real backend capability to an app.",
        icon: "practice",
      }),
    ],
  
    "app deployment": [
      createGuidanceItem({
        type: "practice",
        title: "Ship an App Build",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Prepare assets, configuration, env handling, release build flow, and basic deployment documentation.",
        icon: "practice",
      }),
    ],
  
    unity: [
      createGuidanceItem({
        type: "learning_path",
        title: "Unity Developer Learning Path",
        provider: "SkillBridge",
        label: "Structured path",
        description:
          "Build scenes, scripting, game object workflows, interaction logic, and deployable prototypes in Unity.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build a Unity Prototype",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create a playable prototype with scenes, controls, logic, and real interaction states.",
        icon: "practice",
      }),
    ],
  
    "unreal engine": [
      createGuidanceItem({
        type: "learning_path",
        title: "Unreal Engine Learning Path",
        provider: "SkillBridge",
        label: "Structured path",
        description:
          "Develop engine familiarity, interaction logic, rendering awareness, and game project structure.",
        icon: "graduation",
      }),
    ],
  
    "game physics": [
      createGuidanceItem({
        type: "practice",
        title: "Physics-Based Gameplay Prototype",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Experiment with movement, collisions, forces, and physically meaningful game behaviour.",
        icon: "practice",
      }),
    ],
  
    "3d math": [
      createGuidanceItem({
        type: "curated_resources",
        title: "3D Math for Graphics and XR",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Focus on vectors, transforms, rotations, matrices, and spatial intuition for immersive systems.",
        icon: "curated",
      }),
    ],
  
    "xr sdks": [
      createGuidanceItem({
        type: "learning_path",
        title: "AR/VR Developer Learning Path",
        provider: "SkillBridge",
        label: "Structured path",
        description:
          "Build comfort with immersive SDKs, interaction patterns, hardware context, and XR development workflow.",
        icon: "graduation",
      }),
    ],
  
    "3d asset integration": [
      createGuidanceItem({
        type: "practice",
        title: "Integrate and Optimise 3D Assets",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Import assets, manage scenes, optimise usage, and keep interaction and performance stable.",
        icon: "practice",
      }),
    ],
  
    // =========================
    // SECURITY
    // =========================
    "networking fundamentals": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Networking Foundations for Security",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build TCP/IP, ports, DNS, routing, packet flow, and protocol awareness through security context.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Traffic Analysis Lab",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Inspect packets, trace requests, identify ports and services, and reason about normal versus suspicious traffic.",
        icon: "practice",
      }),
    ],
  
    "penetration testing": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Penetration Testing Learning Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Learn recon, enumeration, vulnerability reasoning, testing methodology, reporting, and ethical boundaries.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Run a Guided Security Lab",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Work through recon, exploitation logic, reporting, and remediation in a legal test environment.",
        icon: "practice",
      }),
    ],
  
    "ethical hacking": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Ethical Hacking Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Focus on legal frameworks, controlled environments, methodology, reconnaissance, and attack surface thinking.",
        icon: "curated",
      }),
    ],
  
    "cryptography basics": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Cryptography Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Understand hashing, symmetric/asymmetric encryption, signatures, keys, and practical security intuition.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Apply Crypto Concepts in Real Systems",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Map hashing, tokens, signatures, and encryption choices to web, auth, and blockchain systems.",
        icon: "practice",
      }),
    ],
  
    "security tools wireshark metasploit": [
      createGuidanceItem({
        type: "practice",
        title: "Security Tooling Lab",
        provider: "SkillBridge",
        label: "Practice routine",
        description:
          "Use packet inspection, enumeration, and controlled testing tools in legal sandbox environments.",
        icon: "practice",
      }),
    ],
  
    "web security": [
      createGuidanceItem({
        type: "docs",
        title: "Web Security",
        url: "https://developer.mozilla.org/en-US/docs/Web/Security",
        provider: "MDN",
        label: "Official docs",
        description:
          "A strong base for XSS, CSRF, cookies, auth, browser security, and defensive web development.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Harden a Web App",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Audit an app for common security issues and improve headers, auth, validation, and request safety.",
        icon: "practice",
      }),
    ],
  
    "threat analysis": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Threat Analysis Workflow",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn attack surfaces, indicators, triage, prioritisation, and how to reason through active threats.",
        icon: "curated",
      }),
    ],
  
    "security basics": [
      createGuidanceItem({
        type: "docs",
        title: "Security Learning Path",
        url: "https://developer.mozilla.org/en-US/docs/Web/Security",
        provider: "MDN",
        label: "Reference docs",
        description:
          "Useful foundation for common attack vectors, defensive patterns, and general secure system thinking.",
        icon: "docs",
      }),
    ],
  
    // =========================
    // PRODUCT / BUSINESS / PM
    // =========================
    "product strategy": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Product Strategy Builder",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn user problems, market framing, prioritisation logic, and product direction setting.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Write a Product Strategy Brief",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Define user problem, goals, metrics, tradeoffs, and a focused execution direction.",
        icon: "practice",
      }),
    ],
  
    roadmapping: [
      createGuidanceItem({
        type: "practice",
        title: "Build a Product Roadmap",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Translate user needs and priorities into phases, milestones, scope, and delivery expectations.",
        icon: "practice",
      }),
    ],
  
    "user research": [
      createGuidanceItem({
        type: "curated_resources",
        title: "User Research Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build problem discovery, interview design, evidence synthesis, and decision-making from user insight.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Run a Lightweight Research Sprint",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Define research questions, gather responses, extract themes, and turn them into product/design decisions.",
        icon: "practice",
      }),
    ],
  
    analytics: [
      createGuidanceItem({
        type: "curated_resources",
        title: "Product and Business Analytics",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Focus on metrics, funnels, retention, experimentation, and decision-making through quantitative signals.",
        icon: "curated",
      }),
    ],
  
    "a b testing": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Experimentation Basics",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn experiment design, hypothesis structure, metrics selection, interpretation, and rollout tradeoffs.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Design a Product Experiment",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Define variant, success metric, guardrails, and how results will influence product decisions.",
        icon: "practice",
      }),
    ],
  
    "stakeholder management": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Stakeholder Management",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn alignment, expectation-setting, prioritisation communication, and cross-functional negotiation.",
        icon: "curated",
      }),
    ],
  
    "requirement gathering": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Requirement Gathering Workflow",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build clarity in capturing needs, asking sharper questions, defining constraints, and avoiding ambiguity.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Write a Requirements Document",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Turn a vague feature request into structured requirements, assumptions, scope, and open questions.",
        icon: "practice",
      }),
    ],
  
    "process mapping": [
      createGuidanceItem({
        type: "practice",
        title: "Map a Business Workflow",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Turn a messy operational process into a clear flow, bottlenecks, actors, and improvement opportunities.",
        icon: "practice",
      }),
    ],
  
    "problem solving": [
      createGuidanceItem({
        type: "practice",
        title: "Problem Solving Practice Routine",
        provider: "SkillBridge",
        label: "Practice routine",
        description:
          "Break down unknown tasks, identify constraints, sketch solutions, test assumptions, and iterate.",
        icon: "practice",
      }),
      createGuidanceItem({
        type: "curated_resources",
        title: "Structured Thinking Resources",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Use guided exercises and worked examples rather than pretending there is one universal roadmap.",
        icon: "curated",
      }),
    ],
  
    "project planning": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Project Planning Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn scope, sequencing, dependencies, timing, ownership, and delivery planning for real projects.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Plan a Delivery Timeline",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Convert vague work into milestones, sequencing, owners, risks, and realistic delivery dates.",
        icon: "practice",
      }),
    ],
  
    budgeting: [
      createGuidanceItem({
        type: "curated_resources",
        title: "Project Budget Awareness",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build basic comfort with cost estimates, tradeoffs, resource allocation, and delivery impact.",
        icon: "curated",
      }),
    ],
  
    leadership: [
      createGuidanceItem({
        type: "curated_resources",
        title: "Leadership Development",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Focus on communication, ownership, prioritisation, delegation, and team-facing decision clarity.",
        icon: "curated",
      }),
    ],
  
    // =========================
    // DESIGN / UX
    // =========================
    figma: [
      createGuidanceItem({
        type: "learning_path",
        title: "Figma Learning Path",
        provider: "SkillBridge",
        label: "Structured path",
        description:
          "Build comfort with interface design, components, layout systems, and collaborative design workflows.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Design a Multi-Screen Interface in Figma",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create a clean interface, reusable components, and a structured design file with realistic flows.",
        icon: "practice",
      }),
    ],
  
    "ui design": [
      createGuidanceItem({
        type: "curated_resources",
        title: "UI Design Skill Builder",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Focus on hierarchy, spacing, layout, consistency, clarity, visual rhythm, and practical interface judgment.",
        icon: "curated",
      }),
    ],
  
    "ux research": [
      createGuidanceItem({
        type: "curated_resources",
        title: "UX Research Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build interview, synthesis, problem framing, insight extraction, and evidence-based design judgment.",
        icon: "curated",
      }),
    ],
  
    wireframing: [
      createGuidanceItem({
        type: "practice",
        title: "Wireframe a Product Flow",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Translate product or business requirements into rough structure, navigation, and task-focused layouts.",
        icon: "practice",
      }),
    ],
  
    prototyping: [
      createGuidanceItem({
        type: "practice",
        title: "Prototype an End-to-End Flow",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Turn static designs into interactive flows that communicate intent, structure, and usability hypotheses.",
        icon: "practice",
      }),
    ],
  
    "user testing": [
      createGuidanceItem({
        type: "curated_resources",
        title: "User Testing Workflow",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn how to observe behaviour, ask better prompts, synthesize friction, and improve designs from evidence.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Run a Usability Test",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Test a design with simple tasks, capture friction points, and convert observations into design changes.",
        icon: "practice",
      }),
    ],
  
    "design systems": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Design Systems Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build consistency through tokens, reusable components, patterns, states, and scalable interface logic.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Build a Mini Design System",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Define typography, spacing, color tokens, buttons, fields, cards, and reusable component rules.",
        icon: "practice",
      }),
    ],
  
    "interaction design": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Interaction Design Learning Path",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Understand state changes, affordances, transitions, feedback, and interface behaviour patterns.",
        icon: "curated",
      }),
    ],
  
    // =========================
    // QA / TESTING
    // =========================
    testing: [
      createGuidanceItem({
        type: "docs",
        title: "Testing Guides and Documentation",
        url: "https://developer.mozilla.org/",
        provider: "MDN",
        label: "Reference docs",
        description:
          "Use documentation and framework guides as the starting point for testing concepts and workflows.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Write Unit and Integration Tests",
        provider: "SkillBridge",
        label: "Practice checklist",
        description:
          "Cover one utility, one component, one API route, and one failure case to build testing muscle properly.",
        icon: "practice",
      }),
    ],
  
    "manual testing": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Manual Testing Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn exploratory testing, scenario coverage, edge cases, reporting clarity, and quality discipline.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Test a User Flow End-to-End",
        provider: "SkillBridge",
        label: "Practice routine",
        description:
          "Write cases, execute scenarios, capture defects, and report observations with reproducible clarity.",
        icon: "practice",
      }),
    ],
  
    "automation testing": [
      createGuidanceItem({
        type: "learning_path",
        title: "QA Automation Learning Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Move from manual testing into repeatable automation, functional validation, and workflow reliability.",
        icon: "graduation",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Automate a Regression Flow",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Select a repetitive test path and automate it with maintainable assertions and setup steps.",
        icon: "practice",
      }),
    ],
  
    selenium: [
      createGuidanceItem({
        type: "docs",
        title: "Selenium Documentation",
        url: "https://www.selenium.dev/documentation/",
        provider: "Selenium",
        label: "Official docs",
        description:
          "Best reference for browser automation, selectors, waits, execution flow, and automation architecture.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Automate a Browser Test Suite",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Create maintainable browser tests with assertions, waits, page interactions, and reproducible flows.",
        icon: "practice",
      }),
    ],
  
    "test case design": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Test Case Design Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn positive, negative, boundary, risk-based, and scenario-focused test design patterns.",
        icon: "curated",
      }),
    ],
  
    "bug tracking tools": [
      createGuidanceItem({
        type: "practice",
        title: "Write Better Bug Reports",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Improve reproducibility, severity judgment, clarity, expected behaviour, and issue traceability.",
        icon: "practice",
      }),
    ],
  
    "api testing": [
      createGuidanceItem({
        type: "learning_path",
        title: "Backend Roadmap",
        url: "https://roadmap.sh/backend",
        provider: "roadmap.sh",
        label: "Related roadmap",
        description:
          "API testing is strongest when learned alongside request structure, validation, auth, and backend behaviour.",
        icon: "compass",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Test an API Collection",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Validate status codes, payloads, auth flow, edge cases, and failure behaviour across endpoints.",
        icon: "practice",
      }),
    ],
  
    "performance testing": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Performance Testing Basics",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn throughput, latency, load, bottlenecks, and how performance signals influence system quality.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Run a Load Testing Exercise",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Measure baseline behaviour, simulate load, identify bottlenecks, and propose improvements.",
        icon: "practice",
      }),
    ],
  
    "ci cd integration": [
      createGuidanceItem({
        type: "learning_path",
        title: "DevOps Roadmap",
        url: "https://roadmap.sh/devops",
        provider: "roadmap.sh",
        label: "Related roadmap",
        description:
          "CI/CD integration belongs in a broader automation and deployment workflow rather than isolated testing logic.",
        icon: "compass",
      }),
    ],
  
    // =========================
    // BLOCKCHAIN
    // =========================
    solidity: [
      createGuidanceItem({
        type: "curated_resources",
        title: "Solidity and Smart Contract Path",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build solidity syntax, contract structure, events, access control, and secure smart contract habits.",
        icon: "curated",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Write and Test a Smart Contract",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Define contract logic, deploy to a test network, and validate expected contract behaviour.",
        icon: "practice",
      }),
    ],
  
    "smart contracts": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Smart Contract Workflow",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn contract design, security concerns, events, state changes, and deployment/testing basics.",
        icon: "curated",
      }),
    ],
  
    ethereum: [
      createGuidanceItem({
        type: "curated_resources",
        title: "Ethereum Development Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Understand accounts, gas, transactions, contracts, testnets, and ecosystem-level mental models.",
        icon: "curated",
      }),
    ],
  
    "web3 js ethers js": [
      createGuidanceItem({
        type: "practice",
        title: "Connect a DApp to a Wallet Flow",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Read contract state, trigger writes, handle network context, and build a basic Web3 interaction flow.",
        icon: "practice",
      }),
    ],
  
    // =========================
    // WRITING / DOCS / AGILE
    // =========================
    "technical documentation": [
      createGuidanceItem({
        type: "docs",
        title: "Technical Writing and Docs Principles",
        url: "https://developer.mozilla.org/",
        provider: "MDN",
        label: "Reference style",
        description:
          "Study how good docs structure concepts, examples, edge cases, and progressive explanation.",
        icon: "docs",
      }),
      createGuidanceItem({
        type: "practice",
        title: "Write a Setup Guide and Feature Note",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Document one setup flow and one technical feature clearly enough for another person to follow.",
        icon: "practice",
      }),
    ],
  
    "api documentation": [
      createGuidanceItem({
        type: "practice",
        title: "Document an API Clearly",
        provider: "SkillBridge",
        label: "Practice project",
        description:
          "Write endpoints, request examples, responses, auth needs, errors, and usage notes in a usable structure.",
        icon: "practice",
      }),
    ],
  
    "information architecture": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Information Architecture Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn grouping, navigation, findability, document structure, and scalable content organization logic.",
        icon: "curated",
      }),
    ],
  
    markdown: [
      createGuidanceItem({
        type: "docs",
        title: "Markdown Guide",
        url: "https://www.markdownguide.org/",
        provider: "Markdown Guide",
        label: "Reference docs",
        description:
          "Quick route to clean formatting, headings, code blocks, tables, and practical documentation writing.",
        icon: "docs",
      }),
    ],
  
    agile: [
      createGuidanceItem({
        type: "curated_resources",
        title: "Agile Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Understand iterative delivery, feedback loops, ceremonies, prioritisation, and product/team alignment.",
        icon: "curated",
      }),
    ],
  
    scrum: [
      createGuidanceItem({
        type: "curated_resources",
        title: "Scrum Workflow Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn roles, ceremonies, backlog flow, sprint planning, retrospectives, and delivery cadence.",
        icon: "curated",
      }),
    ],
  
    facilitation: [
      createGuidanceItem({
        type: "practice",
        title: "Facilitate a Structured Team Session",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Lead a standup, retrospective, planning session, or stakeholder sync with structure and clarity.",
        icon: "practice",
      }),
    ],
  
    "conflict resolution": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Conflict Resolution at Work",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build practical habits for de-escalation, alignment, clarity, and constructive team problem-solving.",
        icon: "curated",
      }),
    ],
  
    coaching: [
      createGuidanceItem({
        type: "curated_resources",
        title: "Coaching and Team Development",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn how to support growth, ask better questions, remove blockers, and guide without micromanaging.",
        icon: "curated",
      }),
    ],
  
    "risk management": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Risk Management Foundations",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Learn to identify, prioritise, communicate, and mitigate project, delivery, and operational risks.",
        icon: "curated",
      }),
    ],
  
    "process improvement": [
      createGuidanceItem({
        type: "practice",
        title: "Improve a Team Workflow",
        provider: "SkillBridge",
        label: "Practice task",
        description:
          "Map a process, identify friction, propose better flow, and justify the impact of change.",
        icon: "practice",
      }),
    ],
  
    "project tracking tools": [
      createGuidanceItem({
        type: "practice",
        title: "Manage Work in a Tracking System",
        provider: "SkillBridge",
        label: "Practice routine",
        description:
          "Organise tasks, priorities, statuses, owners, blockers, and reporting visibility in a structured workflow.",
        icon: "practice",
      }),
    ],
  
    // =========================
    // FALLBACK ROLE-FAMILY KEYS
    // =========================
    "data analyst": [
      createGuidanceItem({
        type: "learning_path",
        title: "Data Analyst Learning Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Build SQL, Excel, cleaning, dashboards, storytelling, and business insight generation step by step.",
        icon: "graduation",
      }),
    ],
  
    "data engineer": [
      createGuidanceItem({
        type: "learning_path",
        title: "Data Engineer Learning Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Build data pipelines, warehousing, orchestration, cloud workflows, and scalable processing systems.",
        icon: "graduation",
      }),
    ],
  
    "site reliability engineer": [
      createGuidanceItem({
        type: "learning_path",
        title: "SRE Learning Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Focus on reliability, observability, incident handling, cloud infrastructure, and operational resilience.",
        icon: "graduation",
      }),
    ],
  
    "product manager": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Product Management Path",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build strategy, research, prioritisation, analytics, communication, and stakeholder alignment.",
        icon: "curated",
      }),
    ],
  
    "business analyst": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Business Analysis Path",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build requirement gathering, workflow analysis, communication, documentation, and structured problem-solving.",
        icon: "curated",
      }),
    ],
  
    "solutions architect": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Solutions Architecture Path",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Focus on system design, integrations, cloud architecture, security, and stakeholder-ready technical design.",
        icon: "curated",
      }),
    ],
  
    "blockchain developer": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Blockchain Developer Path",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build solidity, Ethereum, smart contracts, crypto basics, DApp patterns, and security awareness.",
        icon: "curated",
      }),
    ],
  
    "game developer": [
      createGuidanceItem({
        type: "learning_path",
        title: "Game Development Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Build engine familiarity, gameplay systems, scripting, optimisation, and playable prototype design.",
        icon: "graduation",
      }),
    ],
  
    "database administrator": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Database Administration Path",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Focus on SQL depth, operations, backup, tuning, security, monitoring, and production database care.",
        icon: "curated",
      }),
    ],
  
    "ar vr developer": [
      createGuidanceItem({
        type: "learning_path",
        title: "AR/VR Development Path",
        provider: "SkillBridge",
        label: "Structured guidance",
        description:
          "Build Unity, XR tooling, 3D interaction, asset integration, and performance-ready immersive experiences.",
        icon: "graduation",
      }),
    ],
  
    "technical writer": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Technical Writing Path",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build documentation structure, developer writing, API docs, information architecture, and editing discipline.",
        icon: "curated",
      }),
    ],
  
    "scrum master": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Scrum Master Path",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build agile facilitation, communication, conflict handling, process improvement, and team coaching habits.",
        icon: "curated",
      }),
    ],
  
    "project manager": [
      createGuidanceItem({
        type: "curated_resources",
        title: "Project Management Path",
        provider: "SkillBridge",
        label: "Curated guidance",
        description:
          "Build planning, risk, communication, stakeholder alignment, budgeting, and delivery leadership.",
        icon: "curated",
      }),
    ],
  };
  
  export const parentFallbackMap = {
    // software/web
    html: "frontend",
    css: "frontend",
    responsive: "responsive design",
    "responsive design": "frontend",
    "react js": "react",
    "react javascript": "react",
    "node js": "nodejs",
    nodejs: "backend",
    express: "express js",
    expressjs: "express js",
    database: "backend",
    databases: "backend",
    postgres: "sql postgresql mysql",
    postgresql: "sql postgresql mysql",
    mysql: "sql postgresql mysql",
    mongodb: "mongodb",
    cloud: "aws gcp azure",
    aws: "aws gcp azure",
    gcp: "aws gcp azure",
    azure: "aws gcp azure",
    deployment: "devops",
    cicd: "ci cd pipelines",
    "ci cd": "ci cd pipelines",
    "version control": "git",
    "full stack": "fullstack",
    "git github": "git",
    "system design": "system design basics",
    "debugging mindset": "debugging",
  
    // data/ai
    "powerbi": "power bi",
    "business intelligence": "data analyst",
    "data science": "data scientist",
    "data warehouse": "data warehousing",
    "etl": "etl pipelines",
    "pipeline orchestration": "airflow",
    spark: "apache spark",
    "ml engineer": "machine learning engineer",
    "ai developer": "ai engineer",
    "model serving": "model deployment",
  
    // devops/sre/cloud
    observability: "monitoring",
    "prometheus grafana": "monitoring prometheus grafana",
    terraform: "infrastructure as code terraform",
    "iac": "infrastructure as code terraform",
    sre: "site reliability engineer",
    reliability: "site reliability engineer",
  
    // mobile/game/xr
    "mobile app": "react native",
    "cross platform": "react native",
    "app store deployment": "app deployment",
    "game development": "game developer",
    "game dev": "game developer",
    "xr": "ar vr developer",
    "vr": "ar vr developer",
    "ar": "ar vr developer",
  
    // security
    security: "security basics",
    infosec: "cybersecurity engineer",
    "cyber security": "cybersecurity engineer",
    "ethical security": "ethical hacking",
    "packet analysis": "security tools wireshark metasploit",
  
    // product/business
    pm: "product manager",
    "product owner": "product manager",
    ba: "business analyst",
    architect: "solutions architect",
    "solution architecture": "solutions architect",
    "requirement analysis": "business analyst",
  
    // design
    ux: "ui ux designer",
    ui: "ui ux designer",
    "ui ux": "ui ux designer",
    designer: "ui ux designer",
  
    // qa/testing
    qa: "software tester qa engineer",
    tester: "software tester qa engineer",
    "quality assurance": "software tester qa engineer",
  
    // writing/agile/pm
    documentation: "technical documentation",
    docs: "technical documentation",
    writer: "technical writer",
    "api docs": "api documentation",
    agile: "scrum",
    scrum: "scrum master",
    "scrum master": "scrum master",
    "project management": "project manager",
  };
  
  export const getGuidanceFallbacks = (skill) => {
    const normalized = normalizeText(skill);
  
    if (guidanceMap[normalized]) {
      return guidanceMap[normalized];
    }
  
    const parentKey = parentFallbackMap[normalized];
    if (parentKey && guidanceMap[parentKey]) {
      return guidanceMap[parentKey];
    }
  
    return [];
  };
  
  export { createGuidanceItem, normalizeText };