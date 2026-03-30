import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { AuthContext } from '../context/AuthContext';
import { API } from '../lib/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        toast.success('Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error(data.detail || 'Login failed');
      }
    } catch (error) {
      toast.error('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-stretch px-6 py-10 lg:grid-cols-2 lg:gap-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="hidden rounded-[36px] bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="mb-10 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10"><Target className="h-6 w-6" /></div>
              <div>
                <div className="text-xl font-semibold">SkillBridge</div>
                <div className="text-sm text-slate-300">Your career planning workspace</div>
              </div>
            </div>
            <h1 className="max-w-md text-5xl font-bold leading-tight">Welcome back to the part where your career plan stops winging it.</h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-300">Review your role readiness, keep learning momentum, and jump straight back into your roadmap.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {['Assess skills', 'Track progress', 'Use AI coach'].map((item) => (
              <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">{item}</div>
            ))}
          </div>
        </motion.div>

        <div className="flex items-center justify-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md rounded-[32px] border border-white/70 bg-white/85 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-10">
            <Link to="/" className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white"><Target className="h-5 w-5" /></div>
              <div>
                <div className="text-lg font-semibold text-slate-950">SkillBridge</div>
                <div className="text-xs text-slate-500">Sign in to continue</div>
              </div>
            </Link>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-950">Sign in</h2>
              <p className="mt-2 text-slate-600">Enter your credentials to resume your personalised learning path.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-2xl border-slate-200 pl-10" required data-testid="login-email-input" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-2xl border-slate-200 pl-10" required data-testid="login-password-input" />
                </div>
              </div>
              <Button type="submit" className="h-12 w-full rounded-full bg-slate-950 text-white hover:bg-slate-900" disabled={loading} data-testid="login-submit-btn">
                {loading ? 'Signing in…' : 'Sign in'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p><Link to="/forgot-password" className="text-sm font-medium text-slate-700 hover:text-slate-900">
                Forgot password?
              </Link></p>

            <p className="mt-6 text-center text-sm text-slate-600">
              Don&apos;t have an account? <Link to="/register" className="font-semibold text-slate-900 hover:underline">Create one</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
