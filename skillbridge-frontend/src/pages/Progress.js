import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Award,
  CheckCircle2,
  Sparkles,
  Target,
  Clock3,
  Goal,
  TriangleAlert,
  BriefcaseBusiness,
  Layers3,
} from "lucide-react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { API } from "../lib/api";
import { toast } from "sonner";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";

const Progress = () => {
  const { token } = useContext(AuthContext);
  const [analyses, setAnalyses] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    try {
      const [progressRes, profileRes] = await Promise.all([
        fetch(`${API}/progress`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const progressData = await progressRes.json();

      if (!progressRes.ok) {
        throw new Error(progressData.message || "Failed to load progress");
      }

      if (Array.isArray(progressData)) setAnalyses(progressData);
      else if (Array.isArray(progressData.data)) setAnalyses(progressData.data);
      else setAnalyses([]);

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData || null);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load progress data");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  const focusSkill = profile?.focus_skill || "";
  const weakAreas = useMemo(
    () => (Array.isArray(profile?.weak_areas) ? profile.weak_areas : []),
    [profile?.weak_areas]
  );
  const targetRole = profile?.target_role || "";
  const nextMilestone = profile?.next_milestone || "Set your next milestone";
  const weeklyHours = profile?.weekly_hours || "Not set";
  const currentGoal = profile?.career_goal || "Add your current goal";

  const getRadarData = (analysis) => {
    if (!Array.isArray(analysis?.skill_gaps)) return [];
    return analysis.skill_gaps.map((skill) => ({
      skill:
        String(skill.skill || "").length > 15
          ? `${String(skill.skill).substring(0, 15)}...`
          : String(skill.skill || ""),
      current: Number(skill.current_level || 0),
      required: Number(skill.required_level || 0),
    }));
  };

  const getPrioritySkills = (analysis) => {
    if (!Array.isArray(analysis?.skill_gaps)) return [];

    return [...analysis.skill_gaps]
      .map((skill) => {
        const current = Number(skill.current_level || 0);
        const required = Number(skill.required_level || 0);
        const gap = Math.max(required - current, 0);
        const progress = required > 0 ? Math.min((current / required) * 100, 100) : 0;

        let weight = gap;

        if (
          focusSkill &&
          String(skill.skill || "").toLowerCase().includes(focusSkill.toLowerCase())
        ) {
          weight += 3;
        }

        if (
          weakAreas.some((weak) =>
            String(skill.skill || "").toLowerCase().includes(String(weak).toLowerCase())
          )
        ) {
          weight += 2;
        }

        if (String(skill.priority || "").toLowerCase() === "high") {
          weight += 2;
        } else if (String(skill.priority || "").toLowerCase() === "medium") {
          weight += 1;
        }

        return {
          ...skill,
          gap,
          progress: Math.round(progress),
          weight,
        };
      })
      .sort((a, b) => b.weight - a.weight)
      .slice(0, 3);
  };

  const overallAverage = useMemo(() => {
    if (!analyses.length) return 0;
    return Math.round(
      analyses.reduce((sum, analysis) => sum + Number(analysis.readiness_score || 0), 0) /
        analyses.length
    );
  }, [analyses]);

  const focusCoverage = useMemo(() => {
    if (!focusSkill || !analyses.length) return false;

    return analyses.some((analysis) =>
      Array.isArray(analysis.skill_gaps) &&
      analysis.skill_gaps.some((skill) =>
        String(skill.skill || "").toLowerCase().includes(focusSkill.toLowerCase())
      )
    );
  }, [analyses, focusSkill]);

  const summaryText = useMemo(() => {
    const bits = [];

    if (targetRole) bits.push(`targeting ${targetRole}`);
    if (focusSkill) bits.push(`currently focused on ${focusSkill}`);
    if (weakAreas.length) bits.push(`working on ${weakAreas.slice(0, 2).join(" and ")}`);

    if (!bits.length) {
      return "Add more profile detail to make your progress view more personalised and actionable.";
    }

    return `You’re ${bits.join(", ")}.`;
  }, [targetRole, focusSkill, weakAreas]);

  if (loading) {
    return (
      <Layout>
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-400/30 border-t-slate-700" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex flex-col gap-6 lg:grid lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900">
                <Sparkles className="h-4 w-4" />
                Progress overview
              </div>
              <h1 className="text-4xl font-bold text-slate-950">
                Track skill growth over time
              </h1>
              <p className="mt-3 max-w-2xl text-slate-600">
                Progress is easier to trust when the page shows both the numbers and the underlying skill comparison clearly.
              </p>

              <div className="mt-5 rounded-[28px] bg-slate-50 p-5">
                <div className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                  <Target className="h-4 w-4" />
                  Personalised context
                </div>
                <p className="text-sm leading-7 text-slate-600">{summaryText}</p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl bg-white p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                      <BriefcaseBusiness className="h-4 w-4" />
                      Target role
                    </div>
                    <div className="mt-2 font-semibold text-slate-900">
                      {targetRole || "Not set"}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                      <Goal className="h-4 w-4" />
                      Current goal
                    </div>
                    <div className="mt-2 font-semibold text-slate-900">
                      {currentGoal}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                      <Layers3 className="h-4 w-4" />
                      Focus skill
                    </div>
                    <div className="mt-2 font-semibold text-slate-900">
                      {focusSkill || "Not set"}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-white p-4">
                    <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-slate-500">
                      <Clock3 className="h-4 w-4" />
                      Weekly commitment
                    </div>
                    <div className="mt-2 font-semibold text-slate-900">
                      {weeklyHours}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-medium text-slate-500">Average readiness</div>
                <div className="mt-2 text-4xl font-bold text-slate-950">{overallAverage}%</div>
                <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-slate-800 to-blue-600"
                    style={{ width: `${Math.min(overallAverage, 100)}%` }}
                  />
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                <div className="text-sm font-medium text-slate-500">Analyses tracked</div>
                <div className="mt-2 text-4xl font-bold text-slate-950">{analyses.length}</div>
                <div className="mt-3 text-sm text-slate-600">
                  {focusCoverage
                    ? "Your current focus is represented in your tracked analyses."
                    : "Add or update a focus skill in profile to sharpen this view."}
                </div>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:col-span-2 lg:col-span-1 xl:col-span-2">
                <div className="text-sm font-medium text-slate-500">Next milestone</div>
                <div className="mt-2 text-lg font-semibold text-slate-950">{nextMilestone}</div>
              </div>
            </div>
          </div>
        </section>

        {analyses.length === 0 ? (
          <div className="rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm">
            <Award className="mx-auto mb-4 h-16 w-16 text-slate-300" />
            <h3 className="text-2xl font-semibold text-slate-950">No progress yet</h3>
            <p className="mt-2 text-slate-600">
              Start a skill assessment to begin tracking your development.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {analyses.map((analysis, index) => {
              const roleTitle = analysis.role?.title || "Career Role";
              const prioritySkills = getPrioritySkills(analysis);

              const matchesFocus =
                focusSkill &&
                Array.isArray(analysis.skill_gaps) &&
                analysis.skill_gaps.some((skill) =>
                  String(skill.skill || "").toLowerCase().includes(focusSkill.toLowerCase())
                );

              return (
                <motion.div
                  key={analysis._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm"
                >
                  <div className="mb-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <h2 className="text-3xl font-bold text-slate-950">{roleTitle}</h2>
                        {matchesFocus && (
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            Matches your focus
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-2 text-slate-600">
                        <TrendingUp className="h-5 w-5 text-slate-700" />
                        Career readiness score
                      </div>

                      <div className="mt-5 text-5xl font-bold text-slate-900">
                        {Number(analysis.readiness_score || 0)}%
                      </div>

                      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Number(analysis.readiness_score || 0)}%` }}
                          transition={{ duration: 1 }}
                          className="h-full rounded-full bg-gradient-to-r from-slate-700 to-blue-500"
                        />
                      </div>

                      <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
                        {analysis.ai_insights || "No AI insights available yet."}
                      </div>

                      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
                          <TriangleAlert className="h-4 w-4 text-blue-700" />
                          Priority skills to work on now
                        </div>

                        {prioritySkills.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {prioritySkills.map((skill) => (
                              <span
                                key={skill.skill}
                                className="rounded-full bg-white px-3 py-2 text-sm font-medium text-slate-800"
                              >
                                {skill.skill}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-slate-600">
                            No priority skills identified yet.
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                      <h3 className="mb-4 text-lg font-semibold text-slate-900">
                        Skill comparison
                      </h3>

                      <ResponsiveContainer width="100%" height={320}>
                        <RadarChart data={getRadarData(analysis)}>
                          <PolarGrid stroke="#e2e8f0" />
                          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 5]} />
                          <Radar
                            name="Current"
                            dataKey="current"
                            stroke="#1e3a8a"
                            fill="#1e3a8a"
                            fillOpacity={0.28}
                          />
                          <Radar
                            name="Required"
                            dataKey="required"
                            stroke="#475569"
                            fill="#475569"
                            fillOpacity={0.1}
                            strokeDasharray="5 5"
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-950">Skill progress</h3>

                    {Array.isArray(analysis.skill_gaps) && analysis.skill_gaps.length > 0 ? (
                      analysis.skill_gaps.map((skill, idx) => {
                        const current = Number(skill.current_level || 0);
                        const required = Number(skill.required_level || 0);
                        const progress =
                          required > 0 ? Math.min((current / required) * 100, 100) : 0;

                        const isFocusMatch =
                          focusSkill &&
                          String(skill.skill || "")
                            .toLowerCase()
                            .includes(focusSkill.toLowerCase());

                        const isWeakMatch = weakAreas.some((weak) =>
                          String(skill.skill || "")
                            .toLowerCase()
                            .includes(String(weak).toLowerCase())
                        );

                        return (
                          <div
                            key={skill.skill}
                            className={`rounded-2xl border p-4 ${
                              isFocusMatch
                                ? "border-blue-200 bg-blue-50/50"
                                : isWeakMatch
                                ? "border-orange-200 bg-orange-50/40"
                                : "border-slate-200"
                            }`}
                          >
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3">
                                {progress >= 100 && (
                                  <CheckCircle2 className="h-5 w-5 text-slate-600" />
                                )}
                                <span className="font-semibold text-slate-900">
                                  {skill.skill}
                                </span>

                                {isFocusMatch && (
                                  <span className="rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                                    Focus
                                  </span>
                                )}

                                {isWeakMatch && (
                                  <span className="rounded-full bg-orange-100 px-2.5 py-1 text-xs font-semibold text-orange-700">
                                    Weak area
                                  </span>
                                )}
                              </div>

                              <span className="text-sm font-semibold text-slate-800">
                                {Math.round(progress)}%
                              </span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.8, delay: idx * 0.08 }}
                                className="h-full rounded-full bg-gradient-to-r from-slate-700 to-blue-500"
                              />
                            </div>

                            <p className="mt-3 text-xs text-slate-600">
                              Current: {current} / Required: {required} — Priority:{" "}
                              {skill.priority || "Not specified"}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-6 text-sm text-slate-500">
                        No skill gap data available for this analysis yet.
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Progress;