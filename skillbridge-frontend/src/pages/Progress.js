import React, { useState, useEffect, useContext, useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Award, CheckCircle2, Sparkles } from "lucide-react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { API } from "../lib/api";
import { toast } from "sonner";
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts";

const Progress = () => {
  const { token } = useContext(AuthContext);
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProgress = useCallback(async () => {
    try {
      const res = await fetch(`${API}/progress`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load progress");
      if (Array.isArray(data)) setAnalyses(data);
      else if (Array.isArray(data.data)) setAnalyses(data.data);
      else setAnalyses([]);
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

  const getRadarData = (analysis) => {
    if (!analysis?.skill_gaps) return [];
    return analysis.skill_gaps.map((skill) => ({
      skill: skill.skill.length > 15 ? `${skill.skill.substring(0, 15)}...` : skill.skill,
      current: skill.current_level,
      required: skill.required_level,
    }));
  };

  if (loading) {
    return <Layout><div className="flex items-center justify-center h-64"><div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-400/30 border-t-slate-700" /></div></Layout>;
  }

  return (
    <Layout>
      <div className="space-y-8">
        <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900"><Sparkles className="h-4 w-4" /> Progress overview</div>
          <h1 className="text-4xl font-bold text-slate-950">Track skill growth over time</h1>
          <p className="mt-3 max-w-2xl text-slate-600">Progress is easier to trust when the page shows both the numbers and the underlying skill comparison clearly.</p>
        </section>

        {analyses.length === 0 ? (
          <div className="rounded-[32px] border border-slate-200 bg-white p-12 text-center shadow-sm">
            <Award className="mx-auto mb-4 h-16 w-16 text-slate-300" />
            <h3 className="text-2xl font-semibold text-slate-950">No progress yet</h3>
            <p className="mt-2 text-slate-600">Start a skill assessment to begin tracking your development.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {analyses.map((analysis, index) => (
              <motion.div key={analysis._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-950">{analysis.role?.title || "Career Role"}</h2>
                    <div className="mt-3 flex items-center gap-2 text-slate-600"><TrendingUp className="h-5 w-5 text-slate-700" />Career readiness score</div>
                    <div className="mt-5 text-5xl font-bold text-slate-900">{analysis.readiness_score}%</div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100"><motion.div initial={{ width: 0 }} animate={{ width: `${analysis.readiness_score}%` }} transition={{ duration: 1 }} className="h-full rounded-full bg-gradient-to-r from-slate-700 to-blue-400" /></div>
                    <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">{analysis.ai_insights}</div>
                  </div>

                  <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5">
                    <h3 className="mb-4 text-lg font-semibold text-slate-900">Skill comparison</h3>
                    <ResponsiveContainer width="100%" height={320}>
                      <RadarChart data={getRadarData(analysis)}>
                        <PolarGrid stroke="#e2e8f0" />
                        <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 5]} />
                        <Radar name="Current" dataKey="current" stroke="#14532d" fill="#14532d" fillOpacity={0.35} />
                        <Radar name="Required" dataKey="required" stroke="#ea580c" fill="#ea580c" fillOpacity={0.14} strokeDasharray="5 5" />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-950">Skill progress</h3>
                  {analysis.skill_gaps.map((skill, idx) => {
                    const progress = Math.min((skill.current_level / skill.required_level) * 100, 100);
                    return (
                      <div key={skill.skill} className="rounded-2xl border border-slate-200 p-4">
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            {progress >= 100 && <CheckCircle2 className="h-5 w-5 text-slate-600" />}
                            <span className="font-semibold text-slate-900">{skill.skill}</span>
                          </div>
                          <span className="text-sm font-semibold text-slate-800">{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.8, delay: idx * 0.08 }} className="h-full rounded-full bg-gradient-to-r from-slate-700 to-blue-400" />
                        </div>
                        <p className="mt-3 text-xs text-slate-600">Current: {skill.current_level} / Required: {skill.required_level} — Priority: {skill.priority}</p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Progress;
