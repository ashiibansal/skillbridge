import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Search,
  ExternalLink,
  BookOpen,
  Compass,
  Sparkles,
  Info,
  GraduationCap,
  Map,
  FileText,
  Wrench,
  Layers3,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { API } from "../lib/api";
import { toast } from "sonner";

const Resources = () => {
  const { token } = useContext(AuthContext);
  const [resources, setResources] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchResources = useCallback(async () => {
    try {
      const res = await fetch(`${API}/resources`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load resources");
      }

      setResources(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load resources");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  const getPriorityColor = (priority) => {
    const colors = {
      High: "bg-red-50 text-red-700 border-red-100",
      Medium: "bg-orange-50 text-orange-700 border-orange-100",
      Low: "bg-yellow-50 text-yellow-700 border-yellow-100",
    };

    return colors[priority] || "bg-slate-50 text-slate-600 border-slate-200";
  };

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

  const isRoadmapResource = (resource) => {
    const type = normalizeText(resource?.type);
    const title = normalizeText(resource?.title);
    const url = String(resource?.url || "").toLowerCase();

    return (
      type.includes("roadmap") ||
      title.includes("roadmap") ||
      url.includes("roadmap.sh")
    );
  };

  const isLearningResource = (resource) => {
    if (isRoadmapResource(resource)) return false;

    const type = normalizeText(resource?.type);
    const title = normalizeText(resource?.title);
    const url = String(resource?.url || "").toLowerCase();

    return (
      [
        "video",
        "article",
        "tutorial",
        "course",
        "documentation",
        "docs",
        "guide",
        "reading",
        "resource",
        "lesson",
      ].some((label) => type.includes(label)) ||
      title.includes("tutorial") ||
      title.includes("course") ||
      title.includes("guide") ||
      title.includes("documentation") ||
      title.includes("docs") ||
      url.includes("youtube.com") ||
      url.includes("youtu.be") ||
      url.includes("udemy.com") ||
      url.includes("coursera.org") ||
      url.includes("freecodecamp.org") ||
      url.includes("developer.mozilla.org") ||
      url.includes("docs.")
    );
  };

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

  const getGuidanceFallbacks = (skill) => {
    const normalized = normalizeText(skill);

    const guidanceMap = {
      git: [
        createGuidanceItem({
          type: "roadmap",
          title: "Git & GitHub Roadmap",
          url: "https://roadmap.sh/git-github",
          provider: "roadmap.sh",
          label: "Visual roadmap",
          description: "A clear concept map for version control, collaboration, branching, and workflow basics.",
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
          description: "A structured path for repositories, collaboration, pull requests, and Git workflows.",
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
          description: "Covers core language concepts, async logic, browser APIs, and ecosystem progression.",
          icon: "compass",
        }),
        createGuidanceItem({
          type: "learning_path",
          title: "Full Stack JavaScript Path",
          url: "https://www.theodinproject.com/paths/full-stack-javascript",
          provider: "The Odin Project",
          label: "Structured path",
          description: "Project-based JavaScript learning with hands-on workflow and practical build steps.",
          icon: "graduation",
        }),
      ],
      react: [
        createGuidanceItem({
          type: "roadmap",
          title: "React Roadmap",
          url: "https://roadmap.sh/react",
          provider: "roadmap.sh",
          label: "Visual roadmap",
          description: "A visual progression through React fundamentals, state, routing, and ecosystem tools.",
          icon: "compass",
        }),
        createGuidanceItem({
          type: "course",
          title: "Full Stack Open",
          url: "https://fullstackopen.com/en/",
          provider: "Full Stack Open",
          label: "Deep-dive course",
          description: "A rigorous React-focused course with APIs, testing, state management, and TypeScript.",
          icon: "map",
        }),
      ],
      frontend: [
        createGuidanceItem({
          type: "roadmap",
          title: "Frontend Roadmap",
          url: "https://roadmap.sh/frontend",
          provider: "roadmap.sh",
          label: "Visual roadmap",
          description: "High-level frontend knowledge map covering browser fundamentals, frameworks, and tooling.",
          icon: "compass",
        }),
        createGuidanceItem({
          type: "learning_path",
          title: "Foundations Path",
          url: "https://www.theodinproject.com/paths/foundations/courses/foundations",
          provider: "The Odin Project",
          label: "Structured path",
          description: "Excellent practical sequence for HTML, CSS, JavaScript, Git, and developer workflow.",
          icon: "graduation",
        }),
        createGuidanceItem({
          type: "course",
          title: "Responsive Web Design",
          url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/",
          provider: "freeCodeCamp",
          label: "Certification path",
          description: "Beginner-friendly project-based track for layout, styling, accessibility, and responsive design.",
          icon: "map",
        }),
      ],
      backend: [
        createGuidanceItem({
          type: "roadmap",
          title: "Backend Roadmap",
          url: "https://roadmap.sh/backend",
          provider: "roadmap.sh",
          label: "Visual roadmap",
          description: "Covers server-side concepts, APIs, databases, auth, deployment, and architecture foundations.",
          icon: "compass",
        }),
        createGuidanceItem({
          type: "course",
          title: "Full Stack Open",
          url: "https://fullstackopen.com/en/",
          provider: "Full Stack Open",
          label: "Deep-dive course",
          description: "Strong backend coverage including APIs, databases, testing, deployment, and modern tooling.",
          icon: "map",
        }),
      ],
      fullstack: [
        createGuidanceItem({
          type: "roadmap",
          title: "Full Stack Roadmap",
          url: "https://roadmap.sh/full-stack",
          provider: "roadmap.sh",
          label: "Visual roadmap",
          description: "A broad overview of how frontend, backend, infrastructure, and workflow fit together.",
          icon: "compass",
        }),
        createGuidanceItem({
          type: "learning_path",
          title: "Full Stack JavaScript Path",
          url: "https://www.theodinproject.com/paths/full-stack-javascript",
          provider: "The Odin Project",
          label: "Structured path",
          description: "Project-driven full-stack learning path using JavaScript across the stack.",
          icon: "graduation",
        }),
        createGuidanceItem({
          type: "course",
          title: "Full Stack Open",
          url: "https://fullstackopen.com/en/",
          provider: "Full Stack Open",
          label: "Deep-dive course",
          description: "A more advanced route through React, Node, GraphQL, TypeScript, testing, and CI.",
          icon: "map",
        }),
      ],
      python: [
        createGuidanceItem({
          type: "roadmap",
          title: "Python Roadmap",
          url: "https://roadmap.sh/python",
          provider: "roadmap.sh",
          label: "Visual roadmap",
          description: "A staged path through Python syntax, tooling, libraries, and ecosystem-level growth.",
          icon: "compass",
        }),
        createGuidanceItem({
          type: "course",
          title: "freeCodeCamp Learn Platform",
          url: "https://www.freecodecamp.org/learn/",
          provider: "freeCodeCamp",
          label: "Guided learning",
          description: "Use the curriculum hub to pick Python-adjacent beginner and intermediate structured learning paths.",
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
          description: "A knowledge map for querying, joins, normalization, performance, and relational thinking.",
          icon: "compass",
        }),
      ],
      docker: [
        createGuidanceItem({
          type: "roadmap",
          title: "Docker Roadmap",
          url: "https://roadmap.sh/docker",
          provider: "roadmap.sh",
          label: "Visual roadmap",
          description: "A focused path through images, containers, volumes, networking, and deployment basics.",
          icon: "compass",
        }),
      ],
      kubernetes: [
        createGuidanceItem({
          type: "roadmap",
          title: "Kubernetes Roadmap",
          url: "https://roadmap.sh/kubernetes",
          provider: "roadmap.sh",
          label: "Visual roadmap",
          description: "A structured map for orchestration concepts, workloads, services, and cluster operations.",
          icon: "compass",
        }),
      ],
      devops: [
        createGuidanceItem({
          type: "roadmap",
          title: "DevOps Roadmap",
          url: "https://roadmap.sh/devops",
          provider: "roadmap.sh",
          label: "Visual roadmap",
          description: "A broad path across automation, CI/CD, infrastructure, containers, observability, and operations.",
          icon: "compass",
        }),
      ],

      authentication: [
        createGuidanceItem({
          type: "docs",
          title: "Authentication and Web Security",
          url: "https://developer.mozilla.org/en-US/docs/Web/Security",
          provider: "MDN",
          label: "Official docs",
          description: "Best starting point for security fundamentals, sessions, tokens, cookies, and browser-level concerns.",
          icon: "docs",
        }),
        createGuidanceItem({
          type: "practice",
          title: "Build a Login + Protected Routes Mini Project",
          provider: "SkillBridge",
          label: "Practice task",
          description: "Implement registration, login, JWT or session auth, protected routes, and logout flow in a small app.",
          icon: "practice",
        }),
      ],
      authorization: [
        createGuidanceItem({
          type: "docs",
          title: "Authorization and Access Control",
          url: "https://developer.mozilla.org/en-US/docs/Web/Security",
          provider: "MDN",
          label: "Official docs",
          description: "Use this as a conceptual base before building role-based access and permission systems.",
          icon: "docs",
        }),
        createGuidanceItem({
          type: "practice",
          title: "Role-Based Access Control Checklist",
          provider: "SkillBridge",
          label: "Practice checklist",
          description: "Add admin/user roles, route guards, permission-based UI rendering, and backend enforcement.",
          icon: "practice",
        }),
      ],
      "rest api": [
        createGuidanceItem({
          type: "learning_path",
          title: "Backend Roadmap",
          url: "https://roadmap.sh/backend",
          provider: "roadmap.sh",
          label: "Related roadmap",
          description: "REST APIs fit best under broader backend design, routing, validation, auth, and data handling.",
          icon: "compass",
        }),
        createGuidanceItem({
          type: "practice",
          title: "Build a CRUD API",
          provider: "SkillBridge",
          label: "Practice project",
          description: "Create endpoints, validation, status codes, database integration, and error handling in one small service.",
          icon: "practice",
        }),
      ],
      api: [
        createGuidanceItem({
          type: "learning_path",
          title: "Backend Roadmap",
          url: "https://roadmap.sh/backend",
          provider: "roadmap.sh",
          label: "Related roadmap",
          description: "API design sits naturally inside broader backend engineering concepts and workflow.",
          icon: "compass",
        }),
        createGuidanceItem({
          type: "practice",
          title: "Design and Test an API Workflow",
          provider: "SkillBridge",
          label: "Practice task",
          description: "Define endpoints, request/response schema, validation, and error semantics before implementation.",
          icon: "practice",
        }),
      ],
      apis: [
        createGuidanceItem({
          type: "learning_path",
          title: "Backend Roadmap",
          url: "https://roadmap.sh/backend",
          provider: "roadmap.sh",
          label: "Related roadmap",
          description: "A broader backend path is more useful here than forcing a fake API-only roadmap.",
          icon: "compass",
        }),
      ],
      testing: [
        createGuidanceItem({
          type: "docs",
          title: "Testing Guides and Documentation",
          url: "https://developer.mozilla.org/",
          provider: "MDN",
          label: "Reference docs",
          description: "Use documentation and framework guides as the starting point for testing concepts and workflows.",
          icon: "docs",
        }),
        createGuidanceItem({
          type: "practice",
          title: "Write Unit and Integration Tests",
          provider: "SkillBridge",
          label: "Practice checklist",
          description: "Cover one utility, one component, one API route, and one failure case to build testing muscle properly.",
          icon: "practice",
        }),
      ],
      debugging: [
        createGuidanceItem({
          type: "practice",
          title: "Debugging Practice Workflow",
          provider: "SkillBridge",
          label: "Practice checklist",
          description: "Reproduce the bug, isolate the failing layer, inspect state/logs, test a fix, and verify regressions.",
          icon: "practice",
        }),
        createGuidanceItem({
          type: "curated_resources",
          title: "Debugging Mindset Builder",
          provider: "SkillBridge",
          label: "Curated guidance",
          description: "Use a mix of docs, devtools, logs, and small bug-fix exercises instead of chasing a nonexistent roadmap.",
          icon: "curated",
        }),
      ],
      communication: [
        createGuidanceItem({
          type: "curated_resources",
          title: "Communication Skill Builder",
          provider: "SkillBridge",
          label: "Curated guidance",
          description: "Focus on writing updates, explaining tradeoffs, documenting decisions, and asking better technical questions.",
          icon: "curated",
        }),
      ],
      "problem solving": [
        createGuidanceItem({
          type: "practice",
          title: "Problem Solving Practice Routine",
          provider: "SkillBridge",
          label: "Practice routine",
          description: "Break down unknown tasks, identify constraints, sketch solutions, test assumptions, and iterate.",
          icon: "practice",
        }),
        createGuidanceItem({
          type: "curated_resources",
          title: "Structured Thinking Resources",
          provider: "SkillBridge",
          label: "Curated guidance",
          description: "Use guided exercises and worked examples rather than pretending there is one universal roadmap.",
          icon: "curated",
        }),
      ],
      documentation: [
        createGuidanceItem({
          type: "docs",
          title: "Technical Documentation Principles",
          url: "https://developer.mozilla.org/",
          provider: "MDN",
          label: "Reference style",
          description: "Study how good docs structure concepts, examples, edge cases, and progressive explanation.",
          icon: "docs",
        }),
        createGuidanceItem({
          type: "practice",
          title: "Write a Setup Guide and API Usage Note",
          provider: "SkillBridge",
          label: "Practice task",
          description: "Document one project setup flow and one feature or endpoint clearly enough for a stranger to use it.",
          icon: "practice",
        }),
      ],
      "system design": [
        createGuidanceItem({
          type: "learning_path",
          title: "Backend Roadmap",
          url: "https://roadmap.sh/backend",
          provider: "roadmap.sh",
          label: "Related roadmap",
          description: "System design is better approached through backend architecture and scaling concepts than a fake narrow path.",
          icon: "compass",
        }),
        createGuidanceItem({
          type: "curated_resources",
          title: "System Design Reading Path",
          provider: "SkillBridge",
          label: "Curated guidance",
          description: "Start with APIs, databases, caching, queues, reliability, and tradeoffs before jumping into giant diagrams.",
          icon: "curated",
        }),
      ],
    };

    const parentFallbackMap = {
      html: "frontend",
      css: "frontend",
      responsive: "frontend",
      "responsive design": "frontend",
      "node js": "backend",
      nodejs: "backend",
      express: "backend",
      database: "backend",
      databases: "backend",
      postgres: "backend",
      postgresql: "backend",
      mongodb: "backend",
      cloud: "devops",
      aws: "devops",
      azure: "devops",
      gcp: "devops",
      deployment: "devops",
      cicd: "devops",
      "ci cd": "devops",
      "version control": "git",
      "react js": "react",
      "full stack": "fullstack",
      "git github": "git",
    };

    if (guidanceMap[normalized]) return guidanceMap[normalized];

    const parentKey = parentFallbackMap[normalized];
    if (parentKey && guidanceMap[parentKey]) return guidanceMap[parentKey];

    return [];
  };

  const filteredResources = useMemo(() => {
    const query = search.toLowerCase().trim();

    return resources
      .map((section) => {
        const sectionSkill = section.skill?.toLowerCase() || "";

        const filteredItems = (section.resources || []).filter((resource) => {
          const title = resource?.title?.toLowerCase() || "";
          const type = resource?.type?.toLowerCase() || "";
          const url = resource?.url?.toLowerCase() || "";

          return (
            title.includes(query) ||
            type.includes(query) ||
            url.includes(query) ||
            sectionSkill.includes(query)
          );
        });

        return {
          ...section,
          resources: query ? filteredItems : section.resources || [],
        };
      })
      .filter((section) => section.resources.length > 0 || !query);
  }, [resources, search]);

  const getGuidanceIcon = (iconName) => {
    switch (iconName) {
      case "graduation":
        return GraduationCap;
      case "map":
        return Map;
      case "docs":
        return FileText;
      case "practice":
        return Wrench;
      case "curated":
        return Layers3;
      case "compass":
      default:
        return Compass;
    }
  };

  const getGuidanceBadgeClass = (type) => {
    const styles = {
      roadmap: "bg-blue-50 text-blue-700",
      learning_path: "bg-indigo-50 text-indigo-700",
      course: "bg-violet-50 text-violet-700",
      docs: "bg-slate-100 text-slate-700",
      practice: "bg-emerald-50 text-emerald-700",
      curated_resources: "bg-amber-50 text-amber-700",
    };

    return styles[type] || "bg-slate-100 text-slate-700";
  };

  const getActionLabel = (item) => {
    switch (item.type) {
      case "roadmap":
        return "View roadmap";
      case "learning_path":
        return "Open path";
      case "course":
        return "Open course";
      case "docs":
        return "Open docs";
      case "practice":
        return item.url ? "Open task" : "Use this task";
      case "curated_resources":
        return item.url ? "Open guide" : "Use this guidance";
      default:
        return item.url ? "Open link" : "View item";
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900">
                <Sparkles className="h-4 w-4" />
                Recommended learning stack
              </div>
              <h1 className="text-4xl font-bold text-slate-950">
                Resources that match your gaps
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Real roadmaps where they exist, and better next-step formats where they do not.
              </p>
            </div>

            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
              <Input
                placeholder="Search resources..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-12 rounded-2xl border-slate-200 pl-10"
              />
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-400/30 border-t-slate-700" />
          </div>
        ) : (
          <div className="space-y-10">
            {filteredResources.map((section) => {
              const sectionResources = Array.isArray(section.resources)
                ? section.resources
                : [];

              const roadmapResources = sectionResources.filter(isRoadmapResource);
              const learningResources = sectionResources.filter(isLearningResource);

              const fallbackGuidance =
                roadmapResources.length === 0 ? getGuidanceFallbacks(section.skill) : [];

              const realRoadmapCards = roadmapResources.map((resource) => ({
                type: "roadmap",
                title: resource.title || "Learning roadmap",
                url: resource.url || "",
                provider: resource.provider || "External resource",
                label: "Real roadmap",
                description:
                  resource.description ||
                  "A mapped learning roadmap already returned by your resource engine.",
                icon: "compass",
                isFallback: false,
              }));

              const guidanceCards = [...realRoadmapCards, ...fallbackGuidance];
              const hasGuidance = guidanceCards.length > 0;

              return (
                <section
                  key={section.skill}
                  className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h2 className="text-3xl font-bold text-slate-950">
                          {section.skill}
                        </h2>
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityColor(
                            section.priority
                          )}`}
                        >
                          {section.priority} priority
                        </span>
                      </div>
                      <p className="max-w-2xl text-sm leading-7 text-slate-600">
                        💡 {section.learning_tip}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      {sectionResources.length} resources
                    </div>
                  </div>

                  {hasGuidance && (
                    <div className="mb-8">
                      <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                        <Compass className="h-5 w-5 text-slate-700" />
                        Best next steps
                      </div>

                      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {guidanceCards.map((item, index) => {
                          const Icon = getGuidanceIcon(item.icon);

                          return (
                            <div
                              key={`${item.title}-${item.provider}-${index}`}
                              className="rounded-[28px] border border-slate-100 bg-slate-50 p-6"
                            >
                              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-800 shadow-sm">
                                <Icon className="h-5 w-5" />
                              </div>

                              <div className="mb-2 flex items-center justify-between gap-3">
                                <span
                                  className={`rounded-full px-3 py-1 text-xs font-medium ${getGuidanceBadgeClass(
                                    item.type
                                  )}`}
                                >
                                  {item.label}
                                </span>
                                <span className="text-xs font-medium text-slate-500">
                                  {item.provider}
                                </span>
                              </div>

                              <h3 className="text-lg font-bold text-slate-950">
                                {item.title}
                              </h3>

                              <p className="mt-2 text-sm leading-6 text-slate-600">
                                {item.description}
                              </p>

                              {item.url ? (
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="mt-5 block"
                                >
                                  <Button className="w-full rounded-full bg-slate-950 text-white hover:bg-slate-900">
                                    {getActionLabel(item)}
                                    <ExternalLink className="ml-2 h-4 w-4" />
                                  </Button>
                                </a>
                              ) : (
                                <div className="mt-5 rounded-2xl border border-dashed border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                                  Use this as an internal learning task or checklist for the skill.
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {!hasGuidance && (
                    <div className="mb-8 rounded-[24px] border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm">
                          <Info className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            No roadmap-style guidance available
                          </div>
                          <p className="mt-1 text-sm leading-6 text-slate-600">
                            This skill does not have a trustworthy roadmap or mapped fallback yet. Use the curated learning resources below.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {learningResources.length > 0 && (
                    <div>
                      <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                        <BookOpen className="h-5 w-5 text-orange-500" />
                        Tutorials and learning resources
                      </div>

                      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {learningResources.map((resource, index) => (
                          <motion.div
                            key={`${resource.url || resource.title}-${index}`}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.04 }}
                            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                          >
                            <div className="mb-4 flex items-start justify-between">
                              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                                <BookOpen className="h-5 w-5" />
                              </div>
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                                {resource.type || "Resource"}
                              </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-950">
                              {resource.title || "Learning resource"}
                            </h3>

                            {resource.description && (
                              <p className="mt-2 text-sm leading-6 text-slate-600">
                                {resource.description}
                              </p>
                            )}

                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-5 block"
                            >
                              <Button
                                variant="outline"
                                className="w-full rounded-full"
                              >
                                Open resource
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Button>
                            </a>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {learningResources.length === 0 && !hasGuidance && (
                    <div className="rounded-[24px] border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
                      No curated resources available for this skill yet.
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Resources;