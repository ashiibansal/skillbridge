import React, { useState, useEffect, useContext } from "react";
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

  useEffect(() => {
    fetchAssessmentTemplate();
  }, [roleId]);

  const fetchAssessmentTemplate = async () => {
    try {
      const res = await fetch(
        `${API}/assessments/role/${roleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to load assessment");

      const data = await res.json();

      setRoleTitle(data.title);
      setSkills(data.skills);

      // Initialize answers (default 50%)
      const initialAnswers = {};
      data.skills.forEach((s) => {
        initialAnswers[s.skill] = 50;
      });
      setAnswers(initialAnswers);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load assessment");
    } finally {
      setLoading(false);
    }
  };

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

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Submission failed");
      }

      const data = await res.json();
      toast.success("Assessment submitted");

      navigate(`/gap-analysis/${data.assessmentId}`);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
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
              key={item.skill}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm"
            >
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">{item.skill}</h3>
                <span className="font-bold text-primary">
                  {answers[item.skill]}
                </span>
              </div>

              <Slider
                min={0}
                max={100}
                step={5}
                value={[answers[item.skill]]}
                onValueChange={(val) =>
                  setAnswers((prev) => ({
                    ...prev,
                    [item.skill]: val[0],
                  }))
                }
              />
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