import React, { useEffect, useState, useContext, useCallback, useMemo } from "react";
import {
  UserRound,
  MapPin,
  Goal,
  FileText,
  Mail,
  BriefcaseBusiness,
  Gauge,
  Clock3,
  CalendarRange,
  Github,
  Linkedin,
  Globe,
  Target,
  Sparkles,
  BookOpen,
  Layers3,
  CheckCircle2,
  Plus,
  X,
  PencilLine,
  Trophy,
} from "lucide-react";
import Layout from "../components/Layout";
import { AuthContext } from "../context/AuthContext";
import { API } from "../lib/api";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { toast } from "sonner";

const initialProfile = {
  name: "",
  email: "",
  headline: "",
  bio: "",
  background: "",
  motivation: "",
  current_challenge: "",
  desired_outcome: "",
  location: "",
  career_goal: "",
  target_role: "",
  secondary_role: "",
  preferred_domain: "",
  experience_level: "",
  weekly_hours: "",
  job_timeline: "",
  focus_skill: "",
  current_project: "",
  next_milestone: "",
  github_url: "",
  linkedin_url: "",
  portfolio_url: "",
  known_skills: [],
  weak_areas: [],
  learning_style: [],
};

const EXPERIENCE_OPTIONS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Student",
  "Career Switcher",
];

const DOMAIN_OPTIONS = [
  "Frontend",
  "Backend",
  "Full Stack",
  "Data",
  "DevOps",
  "Mobile",
  "UI/UX",
  "Cloud",
];

const WEEKLY_HOURS_OPTIONS = [
  "1–3 hrs",
  "4–6 hrs",
  "7–10 hrs",
  "10+ hrs",
  "20+ hrs",
];

const TIMELINE_OPTIONS = [
  "1–3 months",
  "3–6 months",
  "6–12 months",
  "12+ months",
];

const LEARNING_STYLE_OPTIONS = [
  "Videos",
  "Documentation",
  "Courses",
  "Practice projects",
  "Guided paths",
  "Articles",
];

const roleFitHints = {
  Frontend: ["HTML", "CSS", "JavaScript", "React", "Git"],
  Backend: ["APIs", "Node.js", "SQL", "Authentication", "Git"],
  "Full Stack": ["JavaScript", "React", "APIs", "SQL", "Git"],
  Data: ["Python", "SQL", "Pandas", "Statistics"],
  DevOps: ["Linux", "Git", "Docker", "CI/CD", "Cloud"],
};

const Profile = () => {
  const { token } = useContext(AuthContext);

  const [profile, setProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [skillInput, setSkillInput] = useState("");
  const [weakAreaInput, setWeakAreaInput] = useState("");

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch(`${API}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        throw new Error("Failed to load profile");
      }

      const data = await res.json();

      setProfile({
        ...initialProfile,
        ...data,
        known_skills: Array.isArray(data?.known_skills) ? data.known_skills : [],
        weak_areas: Array.isArray(data?.weak_areas) ? data.weak_areas : [],
        learning_style: Array.isArray(data?.learning_style) ? data.learning_style : [],
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async () => {
    try {
      setSaving(true);

      const payload = {
        ...profile,
        known_skills: Array.isArray(profile.known_skills) ? profile.known_skills : [],
        weak_areas: Array.isArray(profile.weak_areas) ? profile.weak_areas : [],
        learning_style: Array.isArray(profile.learning_style) ? profile.learning_style : [],
      };

      const res = await fetch(`${API}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      toast.success("Profile updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const setField = (key, value) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const addChip = (field, value) => {
    const cleaned = value.trim();
    if (!cleaned) return;

    setProfile((prev) => {
      const existing = Array.isArray(prev[field]) ? prev[field] : [];
      if (existing.some((item) => item.toLowerCase() === cleaned.toLowerCase())) {
        return prev;
      }
      return {
        ...prev,
        [field]: [...existing, cleaned],
      };
    });
  };

  const removeChip = (field, value) => {
    setProfile((prev) => ({
      ...prev,
      [field]: (prev[field] || []).filter((item) => item !== value),
    }));
  };

  const toggleLearningStyle = (value) => {
    setProfile((prev) => {
      const existing = prev.learning_style || [];
      return {
        ...prev,
        learning_style: existing.includes(value)
          ? existing.filter((item) => item !== value)
          : [...existing, value],
      };
    });
  };

  const completionItems = useMemo(
    () => [
      Boolean(profile.name),
      Boolean(profile.headline),
      Boolean(profile.location),
      Boolean(profile.target_role),
      Boolean(profile.career_goal),
      Boolean(profile.experience_level),
      Boolean(profile.weekly_hours),
      Boolean(profile.focus_skill),
      Boolean(profile.github_url || profile.linkedin_url || profile.portfolio_url),
      Boolean(profile.bio || profile.background || profile.motivation),
      (profile.known_skills || []).length > 0,
      (profile.learning_style || []).length > 0,
    ],
    [profile]
  );

  const completion = Math.round(
    (completionItems.filter(Boolean).length / completionItems.length) * 100
  );

  const targetRoleLabel = profile.target_role || "Not set yet";
  const preferredRoleSkills = roleFitHints[profile.preferred_domain] || roleFitHints[profile.target_role] || [];
  const knownSkillsLower = (profile.known_skills || []).map((s) => s.toLowerCase());
  const matchedSkills = preferredRoleSkills.filter((skill) =>
    knownSkillsLower.includes(skill.toLowerCase())
  );
  const roleFit = preferredRoleSkills.length
    ? Math.round((matchedSkills.length / preferredRoleSkills.length) * 100)
    : 0;

  const nextProfileAction =
    !profile.target_role
      ? "Add your target role"
      : !(profile.known_skills || []).length
      ? "Add your known skills"
      : !(profile.learning_style || []).length
      ? "Choose your learning style"
      : !profile.focus_skill
      ? "Set your current focus skill"
      : "Polish your profile links";

  const statCards = [
    {
      label: "Profile completeness",
      value: `${completion}%`,
      icon: CheckCircle2,
    },
    {
      label: "Role fit signal",
      value: preferredRoleSkills.length ? `${roleFit}%` : "—",
      icon: Trophy,
    },
    {
      label: "Known skills",
      value: `${(profile.known_skills || []).length}`,
      icon: Layers3,
    },
    {
      label: "Learning styles",
      value: `${(profile.learning_style || []).length}`,
      icon: BookOpen,
    },
  ];

  const linkCards = [
    {
      key: "github_url",
      label: "GitHub",
      icon: Github,
      placeholder: "https://github.com/yourname",
    },
    {
      key: "linkedin_url",
      label: "LinkedIn",
      icon: Linkedin,
      placeholder: "https://linkedin.com/in/yourname",
    },
    {
      key: "portfolio_url",
      label: "Portfolio",
      icon: Globe,
      placeholder: "https://yourportfolio.com",
    },
  ];

  if (loading) {
    return (
      <Layout>
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-slate-800" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="grid gap-8 xl:grid-cols-[0.95fr_1.25fr]">
        <div className="space-y-8">
          <section className="rounded-[32px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-8 text-white shadow-2xl shadow-slate-900/10">
            <div className="flex h-20 w-20 items-center justify-center rounded-[28px] bg-white/10 text-white">
              <UserRound className="h-9 w-9" />
            </div>

            <h1 className="mt-6 text-4xl font-bold">
              {profile.name || "Your profile"}
            </h1>

            <p className="mt-2 text-lg text-slate-200">
              {profile.headline || "Add a professional headline so your profile feels intentional."}
            </p>

            <p className="mt-4 leading-8 text-slate-200">
              Build a profile that powers the rest of the platform — recommendations,
              role fit, resources, and your next best move.
            </p>

            <div className="mt-8 space-y-4 rounded-[28px] border border-white/10 bg-white/5 p-5 text-sm text-slate-200">
              <div>
                <span className="text-slate-400">Email</span>
                <div className="font-medium text-white">{profile.email || "Not set"}</div>
              </div>

              <div>
                <span className="text-slate-400">Location</span>
                <div className="font-medium text-white">
                  {profile.location || "Add your location"}
                </div>
              </div>

              <div>
                <span className="text-slate-400">Target role</span>
                <div className="font-medium text-white">{targetRoleLabel}</div>
              </div>

              <div>
                <span className="text-slate-400">Current focus</span>
                <div className="font-medium text-white">
                  {profile.focus_skill || "Choose a focus skill"}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-slate-300">Profile completeness</span>
                <span className="font-semibold text-white">{completion}%</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-300 to-white"
                  style={{ width: `${completion}%` }}
                />
              </div>
              <div className="mt-3 text-sm text-slate-300">
                Next best step: <span className="font-semibold text-white">{nextProfileAction}</span>
              </div>
            </div>
          </section>

          <section className="grid gap-4 sm:grid-cols-2">
            {statCards.map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-slate-800">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold text-slate-950">{value}</div>
                <div className="mt-1 text-sm text-slate-600">{label}</div>
              </div>
            ))}
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-950">Career snapshot</h2>
              <p className="mt-2 text-sm text-slate-600">
                This gives the platform a better sense of where you are and where you’re trying to go.
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                <div>
                  <div className="text-slate-500">Experience level</div>
                  <div className="font-semibold text-slate-900">
                    {profile.experience_level || "Not set"}
                  </div>
                </div>
                <Gauge className="h-5 w-5 text-slate-400" />
              </div>

              <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                <div>
                  <div className="text-slate-500">Weekly time commitment</div>
                  <div className="font-semibold text-slate-900">
                    {profile.weekly_hours || "Not set"}
                  </div>
                </div>
                <Clock3 className="h-5 w-5 text-slate-400" />
              </div>

              <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                <div>
                  <div className="text-slate-500">Job timeline</div>
                  <div className="font-semibold text-slate-900">
                    {profile.job_timeline || "Not set"}
                  </div>
                </div>
                <CalendarRange className="h-5 w-5 text-slate-400" />
              </div>

              <div className="flex items-start justify-between gap-4 rounded-2xl bg-slate-50 p-4">
                <div>
                  <div className="text-slate-500">Preferred domain</div>
                  <div className="font-semibold text-slate-900">
                    {profile.preferred_domain || "Not set"}
                  </div>
                </div>
                <BriefcaseBusiness className="h-5 w-5 text-slate-400" />
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-sm">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-950">Professional links</h2>
              <p className="mt-2 text-sm text-slate-600">
                Add your public work so future profile intelligence has something real to point at.
              </p>
            </div>

            <div className="space-y-3">
              {linkCards.map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-slate-800 shadow-sm">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-slate-900">{label}</div>
                    <div className="truncate text-xs text-slate-500">
                      {profile[key] || "Not added"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-950">Edit profile</h2>
              <p className="mt-2 text-slate-600">
                Turn this from a basic form into a career context engine.
              </p>
            </div>

            <div className="space-y-10">
              <div>
                <div className="mb-4 flex items-center gap-2">
                  <PencilLine className="h-5 w-5 text-slate-700" />
                  <h3 className="text-xl font-semibold text-slate-950">Professional snapshot</h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {[
                    {
                      key: "name",
                      label: "Full name",
                      icon: UserRound,
                      placeholder: "Your full name",
                    },
                    {
                      key: "email",
                      label: "Email",
                      icon: Mail,
                      placeholder: "you@example.com",
                      disabled: true,
                    },
                    {
                      key: "headline",
                      label: "Professional headline",
                      icon: Sparkles,
                      placeholder: "Aspiring Frontend Developer",
                    },
                    {
                      key: "location",
                      label: "Location",
                      icon: MapPin,
                      placeholder: "Berlin, Germany",
                    },
                  ].map(({ key, label, icon: Icon, placeholder, disabled }) => (
                    <label key={key} className="grid gap-2">
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                      <div className="relative">
                        <Icon className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <Input
                          placeholder={placeholder}
                          value={profile[key] || ""}
                          disabled={disabled}
                          onChange={(e) => setField(key, e.target.value)}
                          className="h-12 rounded-2xl border-slate-200 pl-10"
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-slate-700" />
                  <h3 className="text-xl font-semibold text-slate-950">Career intent</h3>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {[
                    {
                      key: "career_goal",
                      label: "Current goal",
                      icon: Goal,
                      placeholder: "Get an internship in frontend development",
                    },
                    {
                      key: "target_role",
                      label: "Target role",
                      icon: BriefcaseBusiness,
                      placeholder: "Frontend Developer",
                    },
                    {
                      key: "secondary_role",
                      label: "Secondary role interest",
                      icon: BriefcaseBusiness,
                      placeholder: "UI Engineer",
                    },
                    {
                      key: "focus_skill",
                      label: "Current focus skill",
                      icon: Target,
                      placeholder: "React",
                    },
                    {
                      key: "current_project",
                      label: "Current project",
                      icon: Layers3,
                      placeholder: "Portfolio website rebuild",
                    },
                    {
                      key: "next_milestone",
                      label: "Next milestone",
                      icon: CheckCircle2,
                      placeholder: "Finish API integration this week",
                    },
                  ].map(({ key, label, icon: Icon, placeholder }) => (
                    <label key={key} className="grid gap-2">
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                      <div className="relative">
                        <Icon className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <Input
                          placeholder={placeholder}
                          value={profile[key] || ""}
                          onChange={(e) => setField(key, e.target.value)}
                          className="h-12 rounded-2xl border-slate-200 pl-10"
                        />
                      </div>
                    </label>
                  ))}

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-slate-700">Preferred domain</span>
                    <select
                      value={profile.preferred_domain || ""}
                      onChange={(e) => setField("preferred_domain", e.target.value)}
                      className="h-12 rounded-2xl border border-slate-200 px-4 text-slate-700 outline-none focus:border-slate-300 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select domain</option>
                      {DOMAIN_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-slate-700">Experience level</span>
                    <select
                      value={profile.experience_level || ""}
                      onChange={(e) => setField("experience_level", e.target.value)}
                      className="h-12 rounded-2xl border border-slate-200 px-4 text-slate-700 outline-none focus:border-slate-300 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select level</option>
                      {EXPERIENCE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-slate-700">Weekly time commitment</span>
                    <select
                      value={profile.weekly_hours || ""}
                      onChange={(e) => setField("weekly_hours", e.target.value)}
                      className="h-12 rounded-2xl border border-slate-200 px-4 text-slate-700 outline-none focus:border-slate-300 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select hours</option>
                      {WEEKLY_HOURS_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="grid gap-2">
                    <span className="text-sm font-medium text-slate-700">Job timeline</span>
                    <select
                      value={profile.job_timeline || ""}
                      onChange={(e) => setField("job_timeline", e.target.value)}
                      className="h-12 rounded-2xl border border-slate-200 px-4 text-slate-700 outline-none focus:border-slate-300 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">Select timeline</option>
                      {TIMELINE_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Layers3 className="h-5 w-5 text-slate-700" />
                  <h3 className="text-xl font-semibold text-slate-950">Skills and learning preferences</h3>
                </div>

                <div className="grid gap-6">
                  <div>
                    <span className="mb-2 block text-sm font-medium text-slate-700">Known skills</span>
                    <div className="flex gap-2">
                      <Input
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="Add a skill like React, Git, SQL"
                        className="h-12 rounded-2xl border-slate-200"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addChip("known_skills", skillInput);
                            setSkillInput("");
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addChip("known_skills", skillInput);
                          setSkillInput("");
                        }}
                        className="h-12 rounded-2xl bg-slate-950 px-4 text-white hover:bg-slate-900"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(profile.known_skills || []).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
                        >
                          {skill}
                          <button type="button" onClick={() => removeChip("known_skills", skill)}>
                            <X className="h-4 w-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="mb-2 block text-sm font-medium text-slate-700">Weak areas</span>
                    <div className="flex gap-2">
                      <Input
                        value={weakAreaInput}
                        onChange={(e) => setWeakAreaInput(e.target.value)}
                        placeholder="Add a weak area like APIs, testing, deployment"
                        className="h-12 rounded-2xl border-slate-200"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addChip("weak_areas", weakAreaInput);
                            setWeakAreaInput("");
                          }
                        }}
                      />
                      <Button
                        type="button"
                        onClick={() => {
                          addChip("weak_areas", weakAreaInput);
                          setWeakAreaInput("");
                        }}
                        className="h-12 rounded-2xl bg-slate-950 px-4 text-white hover:bg-slate-900"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {(profile.weak_areas || []).map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700"
                        >
                          {skill}
                          <button type="button" onClick={() => removeChip("weak_areas", skill)}>
                            <X className="h-4 w-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="mb-2 block text-sm font-medium text-slate-700">Preferred learning style</span>
                    <div className="flex flex-wrap gap-2">
                      {LEARNING_STYLE_OPTIONS.map((option) => {
                        const active = (profile.learning_style || []).includes(option);
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleLearningStyle(option)}
                            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                              active
                                ? "bg-slate-900 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                            }`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <Globe className="h-5 w-5 text-slate-700" />
                  <h3 className="text-xl font-semibold text-slate-950">Links and visibility</h3>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {linkCards.map(({ key, label, icon: Icon, placeholder }) => (
                    <label key={key} className="grid gap-2">
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                      <div className="relative">
                        <Icon className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                        <Input
                          placeholder={placeholder}
                          value={profile[key] || ""}
                          onChange={(e) => setField(key, e.target.value)}
                          className="h-12 rounded-2xl border-slate-200 pl-10"
                        />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-700" />
                  <h3 className="text-xl font-semibold text-slate-950">Your journey</h3>
                </div>

                <div className="grid gap-5">
                  {[
                    {
                      key: "bio",
                      label: "Short bio",
                      placeholder: "Write a concise summary of who you are and what you’re working toward.",
                    },
                    {
                      key: "background",
                      label: "Background",
                      placeholder: "What is your academic or professional background?",
                    },
                    {
                      key: "motivation",
                      label: "Why this path?",
                      placeholder: "Why are you pursuing this direction right now?",
                    },
                    {
                      key: "current_challenge",
                      label: "Current challenge",
                      placeholder: "What is the main thing blocking you at the moment?",
                    },
                    {
                      key: "desired_outcome",
                      label: "Desired outcome",
                      placeholder: "What result are you aiming for over the next few months?",
                    },
                  ].map(({ key, label, placeholder }) => (
                    <label key={key} className="grid gap-2">
                      <span className="text-sm font-medium text-slate-700">{label}</span>
                      <textarea
                        className="min-h-[120px] w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-slate-300 focus:ring-2 focus:ring-blue-100"
                        placeholder={placeholder}
                        value={profile[key] || ""}
                        onChange={(e) => setField(key, e.target.value)}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  onClick={updateProfile}
                  className="rounded-full bg-slate-950 px-8 text-white hover:bg-slate-900"
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save profile"}
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;