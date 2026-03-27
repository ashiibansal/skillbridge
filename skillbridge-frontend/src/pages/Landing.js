import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Target, TrendingUp, BookOpen, Award, CheckCircle2, Sparkles, ShieldCheck, Clock3 } from "lucide-react";
import { Button } from "../components/ui/button";

const features = [
  {
    icon: Target,
    title: "Map the right role",
    description: "Explore career paths with the required skills, salary context, and growth signals in one place.",
  },
  {
    icon: TrendingUp,
    title: "Pinpoint real skill gaps",
    description: "Run structured self-assessments and get a readiness view instead of vague motivational confetti.",
  },
  {
    icon: BookOpen,
    title: "Learn with direction",
    description: "Turn the gap analysis into a learning roadmap and curated resources you can actually act on.",
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.10),_transparent_24%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <nav className="fixed top-0 z-50 w-full border-b border-white/60 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-tight text-slate-950">SkillBridge</div>
              <div className="text-xs text-slate-500">Career intelligence for learners</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login"><Button variant="ghost" className="rounded-full">Login</Button></Link>
            <Link to="/register"><Button className="rounded-full bg-slate-950 px-6 text-white hover:bg-slate-900">Get Started</Button></Link>
          </div>
        </div>
      </nav>

      <section className="px-6 pb-20 pt-32">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-900">
              <Sparkles className="h-4 w-4" />
              Designed for students and early-career professionals
            </div>
            <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-950 md:text-6xl">
              Turn career uncertainty into a <span className="text-slate-900">clear, measurable plan.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              SkillBridge helps you choose a target role, assess your current level, identify missing competencies, and follow a focused roadmap toward job readiness.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/register">
                <Button size="lg" className="h-12 rounded-full bg-slate-950 px-8 text-white hover:bg-slate-900">
                  Start your journey <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="h-12 rounded-full px-8">See the dashboard</Button>
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                [ShieldCheck, "Role clarity", "Understand what a role actually demands"],
                [Clock3, "Time efficiency", "Focus on high-priority gaps first"],
                [CheckCircle2, "Better decisions", "Track progress with structured feedback"],
              ].map(([Icon, title, copy]) => (
                <div key={title} className="rounded-3xl border border-slate-200 bg-white/80 p-5 shadow-sm">
                  <Icon className="mb-3 h-5 w-5 text-slate-700" />
                  <div className="mb-1 font-semibold text-slate-900">{title}</div>
                  <div className="text-sm leading-6 text-slate-600">{copy}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="rounded-[32px] border border-white/70 bg-white/70 p-4 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                alt="Students collaborating with laptops"
                className="h-[520px] w-full rounded-[24px] object-cover"
              />
              <div className="-mt-24 ml-auto max-w-xs rounded-[28px] border border-white/80 bg-white/90 p-5 shadow-xl backdrop-blur">
                <div className="mb-3 text-sm font-medium text-slate-500">Readiness snapshot</div>
                <div className="mb-3 text-4xl font-bold text-slate-950">74%</div>
                <div className="mb-4 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-slate-700 to-blue-400" />
                </div>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex justify-between"><span>Core skills</span><span className="font-medium text-slate-900">Strong</span></div>
                  <div className="flex justify-between"><span>Portfolio readiness</span><span className="font-medium text-slate-900">Moderate</span></div>
                  <div className="flex justify-between"><span>Interview prep</span><span className="font-medium text-slate-900">Needs work</span></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-2xl">
            <h2 className="text-4xl font-semibold text-slate-950">A cleaner workflow from ambition to execution</h2>
            <p className="mt-4 text-slate-600">The UI now presents a more product-ready experience with clearer hierarchy, better spacing, and stronger visual consistency across the flow.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map(({ icon: Icon, title, description }, index) => (
              <motion.div key={title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-900">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-slate-950">{title}</h3>
                <p className="leading-7 text-slate-600">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-6 rounded-[36px] bg-slate-950 px-8 py-10 text-white md:grid-cols-3 md:px-12">
          {[
            ["6+", "Career paths available"],
            ["Personalised", "Roadmaps built from your assessment"],
            ["Single flow", "From role selection to resources"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-[28px] border border-white/10 bg-white/5 p-6">
              <div className="text-4xl font-bold">{value}</div>
              <div className="mt-2 text-slate-300">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-20 pt-8">
        <div className="mx-auto max-w-4xl rounded-[36px] border border-slate-100 bg-gradient-to-r from-slate-50 to-white p-10 text-center shadow-sm">
          <Award className="mx-auto mb-5 h-14 w-14 text-slate-800" />
          <h2 className="text-4xl font-bold text-slate-950">Ready to make the platform feel like a real product?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">This pass upgrades the visual system, makes the UX easier to scan, and leaves the app in a better state for deployment and demo day nerves.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register"><Button size="lg" className="h-12 rounded-full bg-slate-950 px-8 text-white hover:bg-slate-900">Create account</Button></Link>
            <Link to="/login"><Button size="lg" variant="outline" className="h-12 rounded-full px-8">Sign in</Button></Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
