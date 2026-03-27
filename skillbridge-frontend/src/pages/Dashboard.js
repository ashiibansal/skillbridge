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
  Clock3,
  UserRound,
  Layers3,
  Goal,
  Gauge,
  TriangleAlert
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
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [assessmentsRes, progressRes, profileRes] = await Promise.all([
        fetch(`${API}/assessments`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API}/progress`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API}/profile`, {
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

      if (profileRes.ok) {
        const profileData = await profileRes.json();
        setProfile(profileData || null);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const hasAssessments = assessments.length > 0;
  const knownSkills = Array.isArray(profile?.known_skills) ? profile.known_skills : [];
  const weakAreas = Array.isArray(profile?.weak_areas) ? profile.weak_areas : [];
  const learningStyle = Array.isArray(profile?.learning_style) ? profile.learning_style : [];

  const avgProgress =
    progress.length > 0
      ? Math.round(
          progress.reduce(
            (sum, p) => sum + (p.overall_progress || p.readiness_score || 0),
            0
          ) / progress.length
        )
      : 0;

  const targetRole =
    profile?.target_role ||
    progress[0]?.role?.title ||
    assessments[0]?.role?.title ||
    'No target role yet';

  const focusSkill = profile?.focus_skill || weakAreas[0] || 'Not set yet';

  const nextMilestone =
    profile?.next_milestone ||
    (weakAreas[0] ? `Strengthen ${weakAreas[0]}` : 'Set your next milestone');

  const weeklyHours = profile?.weekly_hours || 'Not set';
  const currentGoal = profile?.career_goal || 'Add your current goal';
  const headline = profile?.headline || 'Build a sharper profile to unlock better recommendations.';
  const currentProject = profile?.current_project || 'No current project set';
  const learnerName = user?.name?.split(' ')[0] || profile?.name?.split(' ')[0] || 'Learner';

  const profileSignals = [
    Boolean(profile?.headline),
    Boolean(profile?.target_role),
    Boolean(profile?.career_goal),
    Boolean(profile?.focus_skill),
    knownSkills.length > 0,
    weakAreas.length > 0,
    learningStyle.length > 0,
    Boolean(profile?.github_url || profile?.linkedin_url || profile?.portfolio_url)
  ];

  const profileCompleteness = Math.round(
    (profileSignals.filter(Boolean).length / profileSignals.length) * 100
  );

  const nextProfileAction =
    !profile?.target_role
      ? 'Add your target role'
      : !knownSkills.length
      ? 'Add your known skills'
      : !weakAreas.length
      ? 'Add one weak area'
      : !profile?.focus_skill
      ? 'Set your current focus skill'
      : !(profile?.github_url || profile?.linkedin_url || profile?.portfolio_url)
      ? 'Add a professional link'
      : 'Keep building momentum';

  const statCards = [
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
      icon: Gauge,
      label: 'Profile readiness',
      value: `${profileCompleteness}%`
    }
  ];

  const quickActions = [
    [
      'Explore Roles',
      profile?.target_role
        ? `Compare ${profile.target_role} with other role paths.`
        : 'Review target roles and start a new assessment.',
      '/roles'
    ],
    [
      'Learning Resources',
      focusSkill !== 'Not set yet'
        ? `Focus resources around ${focusSkill} and your weakest gaps.`
        : 'Open recommended tutorials and learning paths.',
      '/resources'
    ],
    [
      'Track Progress',
      'See skill-level movement and readiness trends.',
      '/progress'
    ],
    [
      'Complete Profile',
      `${nextProfileAction} to improve dashboard relevance.`,
      '/profile'
    ]
  ];

  const nextMoves = [
    {
      icon: UserRound,
      title: profileCompleteness < 100 ? 'Complete your profile' : 'Profile is in strong shape',
      copy:
        profileCompleteness < 100
          ? `${nextProfileAction} so the platform can personalise recommendations more accurately.`
          : 'Your profile has enough signal to drive stronger role and resource recommendations.'
    },
    {
      icon: TriangleAlert,
      title: weakAreas.length ? `Prioritise ${weakAreas[0]}` : 'Identify one weak skill',
      copy: weakAreas.length
        ? `Use the resources page to turn ${weakAreas[0]} into your next strength.`
        : 'Add a weak area in your profile so the app can suggest more targeted next steps.'
    },
    {
      icon: Sparkles,
      title: 'Ask the AI coach',
      copy:
        focusSkill !== 'Not set yet'
          ? `Use the chatbot for sequencing help around ${focusSkill}, ${targetRole}, and your current goal.`
          : 'Use the chatbot for role-fit questions, sequencing, and learning suggestions.'
    }
  ];

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
              Welcome back, {learnerName}.
            </h1>

            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-200">
              {headline}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-300">
                  Target role
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {targetRole}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-300">
                  Current focus
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {focusSkill}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-300">
                  Current goal
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {currentGoal}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs uppercase tracking-wide text-slate-300">
                  Weekly commitment
                </div>
                <div className="mt-1 text-lg font-semibold text-white">
                  {weeklyHours}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                onClick={() => navigate('/roles')}
                className="h-12 rounded-full bg-white px-6 text-slate-900 hover:bg-slate-100"
              >
                Explore roles <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              <Button
                onClick={() => navigate('/profile')}
                variant="outline"
                className="h-12 rounded-full border-white/20 bg-transparent px-6 text-white hover:bg-white/10"
              >
                Edit profile
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
                <div>
                  Next milestone:{' '}
                  <span className="font-semibold text-slate-900">
                    {nextMilestone}
                  </span>
                </div>
                <div className="mt-2">
                  Current project:{' '}
                  <span className="font-semibold text-slate-900">
                    {currentProject}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
                Profile readiness is <span className="font-semibold text-slate-950">{profileCompleteness}%</span>.{' '}
                {nextProfileAction}.
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
              {statCards.map(({ icon: Icon, label, value }, index) => (
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
                  generate a gap analysis and next-step guidance. Guesswork is
                  not a growth strategy, tragic as it may be.
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
                  {quickActions.map(([title, description, path]) => (
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
                  {nextMoves.map(({ icon: Icon, title, copy }) => (
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

            <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-slate-800">
                    <Layers3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-950">
                      Skills snapshot
                    </h3>
                    <p className="text-sm text-slate-600">
                      What you already know and what needs attention.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="mb-2 text-sm font-medium text-slate-700">
                      Known skills
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {knownSkills.length > 0 ? (
                        knownSkills.slice(0, 8).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">
                          Add your known skills in profile to make recommendations sharper.
                        </span>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-medium text-slate-700">
                      Weak areas
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {weakAreas.length > 0 ? (
                        weakAreas.slice(0, 6).map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">
                          Add one or two weak areas so the app can prioritise better.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-slate-800">
                    <Goal className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-slate-950">
                      Momentum plan
                    </h3>
                    <p className="text-sm text-slate-600">
                      Keep the next step painfully obvious.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">Current goal</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {currentGoal}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">Current project</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {currentProject}
                    </div>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <div className="text-sm text-slate-500">Next milestone</div>
                    <div className="mt-1 font-semibold text-slate-900">
                      {nextMilestone}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700">
                    Best current bet: spend your next focused session on{' '}
                    <span className="font-semibold text-slate-950">{focusSkill}</span>
                    {weeklyHours !== 'Not set' ? ` within your ${weeklyHours} weekly plan.` : '.'}
                  </div>
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