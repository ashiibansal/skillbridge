import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  BriefcaseBusiness,
  Trophy,
  TriangleAlert,
  CheckCircle2,
  Layers3,
  RefreshCw,
  ChevronDown,
} from "lucide-react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { API } from "../lib/api";
import { Button } from "../components/ui/button";
import { toast } from "sonner";

const CareerRoadmap = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [switching, setSwitching] = useState(false);

  const fetchRoadmap = useCallback(
    async (selectedAssessmentId = null) => {
      try {
        const endpoint = selectedAssessmentId
          ? `${API}/career-roadmap/${selectedAssessmentId}`
          : assessmentId
          ? `${API}/career-roadmap/${assessmentId}`
          : `${API}/career-roadmap/latest`;

        const res = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load roadmap");
        }

        setRoadmap(data);
      } catch (error) {
        console.error(error);
        toast.error(error.message || "Failed to load roadmap");
        setRoadmap(null);
      } finally {
        setLoading(false);
        setSwitching(false);
      }
    },
    [assessmentId, token]
  );

  useEffect(() => {
    fetchRoadmap();
  }, [fetchRoadmap]);

  const handleRoleChange = async (event) => {
    const selectedAssessmentId = event.target.value;
    if (!selectedAssessmentId) return;

    setSwitching(true);
    navigate(`/career-roadmap/${selectedAssessmentId}`);
    await fetchRoadmap(selectedAssessmentId);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-400/30 border-t-slate-700" />
        </div>
      </Layout>
    );
  }

  if (!roadmap) {
    return (
      <Layout>
        <div className="rounded-[32px] border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-950">No roadmap found</h2>
          <p className="mt-2 text-slate-600">
            We could not generate a career roadmap for your latest assessed role yet.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Button
              onClick={() => navigate("/roles")}
              className="rounded-full bg-slate-950 text-white hover:bg-slate-900"
            >
              Explore roles
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/progress")}
              className="rounded-full"
            >
              View progress
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <section className="rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white shadow-2xl shadow-slate-900/10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-blue-50">
            <Sparkles className="h-4 w-4" />
            Personalised career roadmap
          </div>

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold">{roadmap.role}</h1>
              <p className="mt-4 max-w-3xl text-slate-200">{roadmap.summary}</p>
            </div>

            <div className="w-full max-w-sm">
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Switch assessed role
              </label>

              <div className="relative">
                <select
                  value={roadmap.selected_assessment_id || ""}
                  onChange={handleRoleChange}
                  disabled={switching}
                  className="h-12 w-full appearance-none rounded-2xl border border-white/15 bg-white/10 px-4 pr-10 text-sm text-white outline-none transition focus:border-white/25"
                >
                  {(roadmap.role_history || []).map((item) => (
                    <option
                      key={item.assessment_id}
                      value={item.assessment_id}
                      className="text-slate-900"
                    >
                      {item.role_title} • {item.readiness_score}%
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-5 w-5 text-slate-300" />
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-300">Readiness</div>
              <div className="mt-1 text-2xl font-bold">{roadmap.readiness_score}%</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-300">Timeline</div>
              <div className="mt-1 text-2xl font-bold">{roadmap.estimated_timeline}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-300">Focus skill</div>
              <div className="mt-1 text-lg font-semibold">{roadmap.focus_skill || "Not set"}</div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs uppercase tracking-wide text-slate-300">Weekly pace</div>
              <div className="mt-1 text-lg font-semibold">{roadmap.weekly_hours || "Not set"}</div>
            </div>
          </div>

          <div className="mt-6">
            <Button
              variant="outline"
              onClick={() => navigate("/progress")}
              className="rounded-full border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              View progress
            </Button>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-slate-800">
                <Trophy className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-950">Strongest skills</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(roadmap.strongest_skills || []).length > 0 ? (
                roadmap.strongest_skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-500">No strongest skills identified yet.</span>
              )}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
                <TriangleAlert className="h-5 w-5" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-950">Top blockers</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(roadmap.top_blockers || []).length > 0 ? (
                roadmap.top_blockers.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-sm text-slate-500">No major blockers identified yet.</span>
              )}
            </div>
          </div>
        </section>

        <section className="space-y-6">
          {(roadmap.phases || []).map((phase, index) => (
            <motion.div
              key={phase.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <div className="mb-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                    {phase.status}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-950">{phase.title}</h2>
                  <p className="mt-2 max-w-2xl text-slate-600">{phase.description}</p>
                </div>

                <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  Estimated duration: <span className="font-semibold text-slate-900">{phase.estimated_duration}</span>
                </div>
              </div>

              <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
                <div>
                  <div className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <Layers3 className="h-5 w-5 text-slate-700" />
                    Skills in this phase
                  </div>

                  <div className="space-y-3">
                    {(phase.skills || []).map((skill) => {
                      const progress =
                        skill.required_level > 0
                          ? Math.min((skill.current_level / skill.required_level) * 100, 100)
                          : 0;

                      return (
                        <div key={skill.name} className="rounded-2xl border border-slate-200 p-4">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <div className="font-semibold text-slate-900">{skill.name}</div>
                            <div className="text-sm text-slate-600">
                              {skill.current_level}/{skill.required_level}
                            </div>
                          </div>

                          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-slate-700 to-blue-500"
                              style={{ width: `${progress}%` }}
                            />
                          </div>

                          <div className="mt-2 flex flex-wrap gap-2 text-xs">
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                              Gap: {skill.gap}
                            </span>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                              Priority: {skill.priority}
                            </span>
                            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                              Status: {skill.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-2xl bg-slate-50 p-5">
                    <div className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                      <BriefcaseBusiness className="h-5 w-5 text-slate-700" />
                      Milestone project
                    </div>
                    <p className="text-slate-700">{phase.milestone_project}</p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-5">
                    <div className="mb-3 flex items-center gap-2 text-lg font-semibold text-slate-900">
                      <CheckCircle2 className="h-5 w-5 text-slate-700" />
                      Completion criteria
                    </div>
                    <div className="space-y-2">
                      {(phase.completion_criteria || []).map((item) => (
                        <div key={item} className="text-sm text-slate-700">
                          • {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => navigate("/resources")}
                      className="rounded-full bg-slate-950 text-white hover:bg-slate-900"
                    >
                      View resources <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </Layout>
  );
};

export default CareerRoadmap;