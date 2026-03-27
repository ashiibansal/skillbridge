import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Target,
  Award,
  BookOpen,
  ArrowRight,
  BriefcaseBusiness,
  Sparkles,
  CheckCircle2,
  Clock3
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { API } from '../lib/api';

const Dashboard = () => {
  const navigate = useNavigate();
  const { token, user } = React.useContext(AuthContext);
  const [assessments, setAssessments] = useState([]);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [assessmentsRes, progressRes] = await Promise.all([
        fetch(`${API}/assessments`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API}/progress`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      if (assessmentsRes.ok) {
        const assessmentsData = await assessmentsRes.json();
        setAssessments(Array.isArray(assessmentsData) ? assessmentsData : []);
      }

      if (progressRes.ok) {
        const progressData = await progressRes.json();
        setProgress(Array.isArray(progressData) ? progressData : []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const hasAssessments = assessments.length > 0;
  const avgProgress =
    progress.length > 0
      ? Math.round(
          progress.reduce(
            (sum, p) => sum + (p.overall_progress || p.readiness_score || 0),
            0
          ) / progress.length
        )
      : 0;

  const bestTrack =
    progress[0]?.role?.title ||
    assessments[0]?.role?.title ||
    'No active role yet';

  return (
    <Layout>
      <div className="space-y-8" data-testid="dashboard">
        <section className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white shadow-2xl shadow-slate-900/10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-blue-50">
              <Sparkles className="h-4 w-4" />
              Personalised career dashboard
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'Learner'}.
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
              Keep moving from assessment to execution. Your dashboard now
              surfaces the next meaningful actions instead of making you hunt
              for them like it owes you money.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                onClick={() => navigate('/roles')}
                className="h-12 rounded-full bg-white px-6 text-slate-900 hover:bg-slate-100"
              >
                Explore roles <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                onClick={() => navigate('/resources')}
                variant="outline"
                className="h-12 rounded-full border-white/20 bg-transparent px-6 text-white hover:bg-white/10"
              >
                Open resources
              </Button>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-sm font-medium text-slate-500">
              Quick snapshot
            </div>

            <div className="mt-4 space-y-5">
              <div>
                <div className="text-4xl font-bold text-slate-950">
                  {avgProgress}%
                </div>
                <div className="text-sm text-slate-600">
                  Average readiness across active tracks
                </div>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-slate-800 to-blue-600"
                  style={{ width: `${Math.min(avgProgress, 100)}%` }}
                />
              </div>

              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                Current focus:{' '}
                <span className="font-semibold text-slate-900">
                  {bestTrack}
                </span>
              </div>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-slate-800" />
          </div>
        ) : (
          <>
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  icon: Target,
                  label: 'Career paths started',
                  value: assessments.length
                },
                {
                  icon: TrendingUp,
                  label: 'Average progress',
                  value: `${avgProgress}%`
                },
                {
                  icon: Award,
                  label: 'Active analyses',
                  value: progress.length
                },
                {
                  icon: BriefcaseBusiness,
                  label: 'Top track',
                  value:
                    bestTrack.length > 18
                      ? `${bestTrack.slice(0, 18)}…`
                      : bestTrack
                }
              ].map(({ icon: Icon, label, value }, index) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-slate-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-3xl font-bold text-slate-950">
                    {value}
                  </div>
                  <div className="mt-2 text-sm text-slate-600">{label}</div>
                </motion.div>
              ))}
            </section>

            {!hasAssessments && (
              <motion.section
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-[32px] border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-8 shadow-sm"
              >
                <h2 className="text-3xl font-bold text-slate-950">
                  Start with your first assessment
                </h2>
                <p className="mt-3 max-w-2xl text-slate-600">
                  Pick a role, rate your current skill level, and let the app
                  generate a gap analysis and roadmap. Much better than guessing
                  and calling it strategy.
                </p>
                <Button
                  onClick={() => navigate('/roles')}
                  data-testid="get-started-roles-btn"
                  className="mt-6 h-12 rounded-full bg-slate-900 px-8 text-white hover:bg-slate-800"
                >
                  Explore career roles <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.section>
            )}

            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-slate-800">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-950">
                      Quick actions
                    </h3>
                    <p className="text-sm text-slate-600">
                      Jump back into the flow without friction.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3">
                  {[
                    [
                      'Explore Roles',
                      'Review target roles and start a new assessment.',
                      '/roles'
                    ],
                    [
                      'Learning Resources',
                      'Open recommended tutorials and roadmaps.',
                      '/resources'
                    ],
                    [
                      'Track Progress',
                      'See skill-level movement and readiness trends.',
                      '/progress'
                    ]
                  ].map(([title, description, path]) => (
                    <button
                      key={title}
                      onClick={() => navigate(path)}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 text-left transition hover:border-blue-200 hover:bg-blue-50"
                    >
                      <div>
                        <div className="font-semibold text-slate-900">
                          {title}
                        </div>
                        <div className="text-sm text-slate-600">
                          {description}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-400" />
                    </button>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.16 }}
                className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <h3 className="text-2xl font-semibold text-slate-950">
                  Next best moves
                </h3>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      icon: CheckCircle2,
                      title: 'Update your profile',
                      copy: 'Add your location, goal, and bio so the app context feels complete.'
                    },
                    {
                      icon: Clock3,
                      title: 'Prioritise one weak skill',
                      copy: 'Use the resources page to focus on a single high-impact skill gap first.'
                    },
                    {
                      icon: Sparkles,
                      title: 'Ask the AI coach',
                      copy: 'Use the chatbot for role-fit questions, sequencing, and learning suggestions.'
                    }
                  ].map(({ icon: Icon, title, copy }) => (
                    <div key={title} className="flex gap-4 rounded-2xl bg-slate-50 p-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {title}
                        </div>
                        <div className="text-sm leading-6 text-slate-600">
                          {copy}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;