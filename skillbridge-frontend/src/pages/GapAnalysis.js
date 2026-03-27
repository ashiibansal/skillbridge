import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle, TrendingUp, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "../components/ui/button";
import Layout from "../components/Layout";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
import { API } from "../lib/api";

const GapAnalysis = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGapAnalysis = async () => {
      try {
        const res = await fetch(`${API}/gap-analysis/${assessmentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load gap analysis");
        }

        setAnalysis(data);
      } catch (err) {
        console.error(err);
        toast.error(err.message || "Failed to load gap analysis");
      } finally {
        setLoading(false);
      }
    };

    fetchGapAnalysis();
  }, [assessmentId, token]);

  const getRadarData = () => {
    if (!analysis?.skill_gaps?.length) return [];

    return analysis.skill_gaps.map((gap) => ({
      skill:
        String(gap.skill || "").length > 15
          ? `${String(gap.skill).substring(0, 15)}...`
          : String(gap.skill || ""),
      current: Number(gap.current_level || 0),
      required: Number(gap.required_level || 0),
    }));
  };

  const goToResources = () => {
    navigate("/resources");
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      </Layout>
    );
  }

  if (!analysis) {
    return (
      <Layout>
        <div className="text-center mt-20 text-slate-600">
          No analysis data found.
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Skill Gap Analysis</h1>
        </div>

        {/* Readiness Score */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-primary to-slate-900 rounded-xl p-8 text-white mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold mb-2 uppercase tracking-wide">
                Career Readiness Score
              </div>
              <div className="text-6xl font-bold">
                {analysis.readiness_score ?? 0}%
              </div>
              <p className="text-slate-200 mt-2">
                {analysis.readiness_score >= 80
                  ? "Excellent! You’re nearly role-ready."
                  : analysis.readiness_score >= 60
                  ? "Good progress! Focus on gaps below."
                  : "Great start! Build fundamentals."}
              </p>
            </div>
            <TrendingUp className="w-24 h-24 opacity-20" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Radar Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-4">Skills Overview</h2>

            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={getRadarData()}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
                <PolarRadiusAxis angle={90} domain={[0, 5]} />
                <Radar
                  name="Current"
                  dataKey="current"
                  stroke="#1e3a8a"
                  fill="#1e3a8a"
                  fillOpacity={0.3}
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
          </motion.div>

          {/* AI Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
          >
            <h2 className="text-2xl font-semibold mb-4">AI Insights</h2>
            <p className="text-slate-700 leading-relaxed">
              {analysis.ai_insights || "No insights available."}
            </p>
          </motion.div>
        </div>

        {/* Skill Gaps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6">Skill Gaps to Address</h2>

          {!analysis.skill_gaps?.length ? (
            <p className="text-slate-600">
              You meet all required skill levels 🎉
            </p>
          ) : (
            <div className="space-y-4">
              {analysis.skill_gaps.map((gap) => (
                <div
                  key={gap.skill}
                  className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <AlertCircle className="w-5 h-5 text-accent" />
                      <span className="font-semibold text-lg">{gap.skill}</span>
                    </div>
                    <div className="text-sm text-slate-600 ml-7">
                      Current: {gap.current_level} | Required: {gap.required_level} | Gap: {gap.gap}
                    </div>
                  </div>
                  <div className="text-lg font-bold text-accent">
                    {gap.priority}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA */}
        <div className="flex justify-end">
          <Button
            onClick={goToResources}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12"
          >
            View Learning Resources
            <BookOpen className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default GapAnalysis;