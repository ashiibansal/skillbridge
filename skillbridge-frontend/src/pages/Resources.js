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
  Target,
  BriefcaseBusiness,
  Gauge,
} from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { API } from "../lib/api";
import { toast } from "sonner";
import {
  getGuidanceFallbacks,
  normalizeText,
} from "../data/resourceGuidanceMap";

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

const Resources = () => {
  const { token } = useContext(AuthContext);

  const [resources, setResources] = useState([]);
  const [profile, setProfile] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchResources = useCallback(async () => {
    try {
      const [resourcesRes, profileRes] = await Promise.all([
        fetch(`${API}/resources`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const resourcesData = await resourcesRes.json();

      if (!resourcesRes.ok) {
        throw new Error(resourcesData.message || "Failed to load resources");
      }

      setResources(Array.isArray(resourcesData) ? resourcesData : []);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData || null);
      }
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

  const weakAreas = useMemo(
    () => (Array.isArray(profile?.weak_areas) ? profile.weak_areas : []),
    [profile?.weak_areas]
  );

  const learningStyle = useMemo(
    () => (Array.isArray(profile?.learning_style) ? profile.learning_style : []),
    [profile?.learning_style]
  );

  const focusSkill = profile?.focus_skill || "";
  const targetRole = profile?.target_role || "";
  const preferredDomain = profile?.preferred_domain || "";
  const careerGoal = profile?.career_goal || "";

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

  const scoreGuidanceItem = useCallback(
    (item, sectionSkill) => {
      let score = 0;

      const skillNorm = normalizeText(sectionSkill);
      const focusNorm = normalizeText(focusSkill);
      const targetNorm = normalizeText(targetRole);
      const domainNorm = normalizeText(preferredDomain);
      const weakNorms = weakAreas.map(normalizeText);
      const styleNorms = learningStyle.map(normalizeText);

      const textBlob = normalizeText(
        `${item.title} ${item.description} ${item.provider} ${item.label} ${sectionSkill}`
      );

      if (
        focusNorm &&
        (skillNorm.includes(focusNorm) ||
          focusNorm.includes(skillNorm) ||
          textBlob.includes(focusNorm))
      ) {
        score += 8;
      }

      if (
        weakNorms.some(
          (weak) =>
            weak &&
            (skillNorm.includes(weak) ||
              weak.includes(skillNorm) ||
              textBlob.includes(weak))
        )
      ) {
        score += 7;
      }

      if (targetNorm && textBlob.includes(targetNorm)) {
        score += 4;
      }

      if (domainNorm && textBlob.includes(domainNorm)) {
        score += 3;
      }

      if (styleNorms.some((style) => style.includes("videos")) && item.type === "course") {
        score += 2;
      }

      if (styleNorms.some((style) => style.includes("courses")) && item.type === "course") {
        score += 3;
      }

      if (
        styleNorms.some((style) => style.includes("guided paths")) &&
        item.type === "learning_path"
      ) {
        score += 3;
      }

      if (styleNorms.some((style) => style.includes("documentation")) && item.type === "docs") {
        score += 3;
      }

      if (styleNorms.some((style) => style.includes("practice")) && item.type === "practice") {
        score += 4;
      }

      if (item.type === "roadmap") {
        score += 1;
      }

      return score;
    },
    [focusSkill, targetRole, preferredDomain, weakAreas, learningStyle]
  );

  const scoreLearningResource = useCallback(
    (resource, sectionSkill) => {
      let score = 0;

      const type = normalizeText(resource?.type);
      const title = normalizeText(resource?.title);
      const desc = normalizeText(resource?.description);
      const url = String(resource?.url || "").toLowerCase();
      const skillNorm = normalizeText(sectionSkill);
      const focusNorm = normalizeText(focusSkill);
      const weakNorms = weakAreas.map(normalizeText);
      const styleNorms = learningStyle.map(normalizeText);

      const blob = `${type} ${title} ${desc} ${url} ${skillNorm}`;

      if (
        focusNorm &&
        (skillNorm.includes(focusNorm) ||
          focusNorm.includes(skillNorm) ||
          blob.includes(focusNorm))
      ) {
        score += 8;
      }

      if (
        weakNorms.some(
          (weak) =>
            weak &&
            (skillNorm.includes(weak) ||
              weak.includes(skillNorm) ||
              blob.includes(weak))
        )
      ) {
        score += 7;
      }

      if (
        styleNorms.some((style) => style.includes("videos")) &&
        (type.includes("video") || url.includes("youtube"))
      ) {
        score += 4;
      }

      if (
        styleNorms.some((style) => style.includes("documentation")) &&
        (type.includes("docs") ||
          type.includes("documentation") ||
          url.includes("developer.mozilla.org") ||
          url.includes("docs."))
      ) {
        score += 4;
      }

      if (styleNorms.some((style) => style.includes("courses")) && type.includes("course")) {
        score += 4;
      }

      if (styleNorms.some((style) => style.includes("articles")) && type.includes("article")) {
        score += 3;
      }

      if (styleNorms.some((style) => style.includes("practice")) && title.includes("project")) {
        score += 3;
      }

      return score;
    },
    [focusSkill, weakAreas, learningStyle]
  );

  const personalisedSections = useMemo(() => {
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

        const sectionResources = query ? filteredItems : section.resources || [];
        const roadmapResources = sectionResources.filter(isRoadmapResource);
        const learningResources = sectionResources
          .filter(isLearningResource)
          .sort(
            (a, b) => scoreLearningResource(b, section.skill) - scoreLearningResource(a, section.skill)
          );

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

        const guidanceCards = [...realRoadmapCards, ...fallbackGuidance].sort(
          (a, b) => scoreGuidanceItem(b, section.skill) - scoreGuidanceItem(a, section.skill)
        );

        let relevanceScore = 0;
        const sectionNorm = normalizeText(section.skill);

        if (
          focusSkill &&
          (sectionNorm.includes(normalizeText(focusSkill)) ||
            normalizeText(focusSkill).includes(sectionNorm))
        ) {
          relevanceScore += 10;
        }

        if (
          weakAreas.some((weak) => {
            const weakNorm = normalizeText(weak);
            return weakNorm && (sectionNorm.includes(weakNorm) || weakNorm.includes(sectionNorm));
          })
        ) {
          relevanceScore += 8;
        }

        if (
          preferredDomain &&
          normalizeText(section.learning_tip).includes(normalizeText(preferredDomain))
        ) {
          relevanceScore += 2;
        }

        if (targetRole && normalizeText(section.learning_tip).includes(normalizeText(targetRole))) {
          relevanceScore += 2;
        }

        if (section.priority === "High") relevanceScore += 3;
        if (section.priority === "Medium") relevanceScore += 2;
        if (section.priority === "Low") relevanceScore += 1;

        return {
          ...section,
          resources: sectionResources,
          roadmapResources,
          learningResources,
          guidanceCards,
          hasGuidance: guidanceCards.length > 0,
          relevanceScore,
          recommended:
            relevanceScore >= 8 ||
            (focusSkill && sectionNorm.includes(normalizeText(focusSkill))) ||
            weakAreas.some((weak) => {
              const weakNorm = normalizeText(weak);
              return weakNorm && (sectionNorm.includes(weakNorm) || weakNorm.includes(sectionNorm));
            }),
        };
      })
      .filter((section) => section.resources.length > 0 || !query)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }, [
    resources,
    search,
    focusSkill,
    weakAreas,
    preferredDomain,
    targetRole,
    scoreGuidanceItem,
    scoreLearningResource,
  ]);

  const profileSummary = useMemo(() => {
    const bits = [];

    if (targetRole) bits.push(`targeting ${targetRole}`);
    if (preferredDomain) bits.push(`leaning toward ${preferredDomain}`);
    if (focusSkill) bits.push(`currently focused on ${focusSkill}`);
    if (weakAreas.length) bits.push(`working on ${weakAreas.slice(0, 2).join(" and ")}`);

    return bits.length
      ? `You’re ${bits.join(", ")}.`
      : "Add more profile details to make resources smarter and more relevant.";
  }, [targetRole, preferredDomain, focusSkill, weakAreas]);

  const topRecommendedCount = personalisedSections.filter((section) => section.recommended).length;

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

          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-[28px] bg-slate-50 p-5">
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                <Target className="h-4 w-4" />
                Personalisation snapshot
              </div>
              <p className="text-sm leading-7 text-slate-600">{profileSummary}</p>

              {(careerGoal || learningStyle.length > 0) && (
                <div className="mt-4 space-y-2 text-sm text-slate-600">
                  {careerGoal && (
                    <div>
                      <span className="font-medium text-slate-900">Current goal:</span> {careerGoal}
                    </div>
                  )}
                  {learningStyle.length > 0 && (
                    <div>
                      <span className="font-medium text-slate-900">Learning style:</span>{" "}
                      {learningStyle.join(", ")}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              <div className="rounded-2xl bg-blue-50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-800">
                  <BriefcaseBusiness className="h-4 w-4" />
                  Role
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  {targetRole || "Not set"}
                </div>
              </div>

              <div className="rounded-2xl bg-orange-50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-orange-800">
                  <Gauge className="h-4 w-4" />
                  Focus
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  {focusSkill || "Not set"}
                </div>
              </div>

              <div className="rounded-2xl bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-800">
                  <Layers3 className="h-4 w-4" />
                  Recommended
                </div>
                <div className="mt-2 text-sm font-semibold text-slate-900">
                  {topRecommendedCount} priority sections
                </div>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-400/30 border-t-slate-700" />
          </div>
        ) : (
          <div className="space-y-10">
            {personalisedSections.map((section) => {
              const sectionResources = Array.isArray(section.resources) ? section.resources : [];

              return (
                <section
                  key={section.skill}
                  className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h2 className="text-3xl font-bold text-slate-950">{section.skill}</h2>

                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${getPriorityColor(
                            section.priority
                          )}`}
                        >
                          {section.priority} priority
                        </span>

                        {section.recommended && (
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            Recommended for you
                          </span>
                        )}
                      </div>

                      <p className="max-w-2xl text-sm leading-7 text-slate-600">
                        💡 {section.learning_tip}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                      {sectionResources.length} resources
                    </div>
                  </div>

                  {section.hasGuidance && (
                    <div className="mb-8">
                      <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                        <Compass className="h-5 w-5 text-slate-700" />
                        Best next steps
                      </div>

                      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {section.guidanceCards.map((item, index) => {
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

                              <h3 className="text-lg font-bold text-slate-950">{item.title}</h3>

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

                  {!section.hasGuidance && (
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
                            This skill does not have a trustworthy roadmap or mapped fallback yet.
                            Use the curated learning resources below.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {section.learningResources.length > 0 && (
                    <div>
                      <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                        <BookOpen className="h-5 w-5 text-orange-500" />
                        Tutorials and learning resources
                      </div>

                      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        {section.learningResources.map((resource, index) => (
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
                              <Button variant="outline" className="w-full rounded-full">
                                Open resource
                                <ExternalLink className="ml-2 h-4 w-4" />
                              </Button>
                            </a>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.learningResources.length === 0 && !section.hasGuidance && (
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