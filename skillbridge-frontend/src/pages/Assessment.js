import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Slider } from "../components/ui/slider";
import Layout from "../components/Layout";
import { toast } from "sonner";
import { AuthContext } from "../context/AuthContext";
import { API } from "../lib/api";

const Assessment = () => {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [roleTitle, setRoleTitle] = useState("");
  const [skills, setSkills] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchAssessmentTemplate = useCallback(async () => {
    try {
      const res = await fetch(`${API}/assessments/role/${roleId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json(); // ✅ Read once

      if (!res.ok) {
        throw new Error(data.message || "Failed to load assessment");
      }

      setRoleTitle(data.title);
      setSkills(data.skills || []);

      // Initialize answers (1–5 scale)
      const initialAnswers = {};
      (data.skills || []).forEach((s) => {
        initialAnswers[s.name] = 1;
      });
      setAnswers(initialAnswers);

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to load assessment");
    } finally {
      setLoading(false);
    }
  }, [roleId, token]);


  useEffect(() => {
    fetchAssessmentTemplate();
  }, [fetchAssessmentTemplate]);

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const formattedAnswers = Object.entries(answers).map(
        ([skill, score]) => ({
          skill,
          score,
        })
      );

      const res = await fetch(`${API}/assessments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roleId,
          answers: formattedAnswers,
        }),
      });

      const data = await res.json(); // ✅ Read once

      if (!res.ok) {
        throw new Error(data.message || "Submission failed");
      }

      toast.success("Assessment submitted");
      navigate(`/gap-analysis/${data.assessmentId}`);

    } catch (err) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  const getLabel = (value) => {
    const labels = {
      1: "Beginner",
      2: "Basic",
      3: "Intermediate",
      4: "Advanced",
      5: "Expert",
    };
    return labels[value] || "";
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

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Skill Assessment</h1>
          <p className="text-slate-600 mb-4">
            Rate your current proficiency for {roleTitle}
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900">
              <strong>How to rate:</strong> Be honest — this helps accurate gap analysis.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {skills.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <span className="text-xs px-2 py-1 bg-slate-100 rounded-full text-slate-600">
                    {item.category}
                  </span>
                </div>

                <div className="text-right">
                  <div className="text-xl font-bold text-primary">
                    {answers[item.name]}
                  </div>
                  <div className="text-xs text-slate-500">
                    {getLabel(answers[item.name])}
                  </div>
                </div>
              </div>

              <Slider
                min={1}
                max={5}
                step={1}
                value={[answers[item.name] || 1]}
                onValueChange={(val) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [item.name]: val[0],
                  }))
                }
              />

              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12"
          >
            {submitting ? "Analyzing..." : "Analyze My Skills"}
            <ChevronRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Assessment;