import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { AuthContext } from '../context/AuthContext';
import { API } from '../lib/api';

const Register = () => {
  const navigate = useNavigate();
  const { login } = React.useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user, data.token);
        toast.success('Account created successfully!');
        navigate('/roles');
      } else {
        toast.error(data.detail || 'Registration failed');
      }
    } catch (error) {
      toast.error('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_right,_rgba(16,185,129,0.16),_transparent_28%),linear-gradient(180deg,#f8fafc_0%,#ffffff_100%)]">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-stretch px-6 py-10 lg:grid-cols-2 lg:gap-10">
        <div className="flex items-center justify-center order-2 lg:order-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md rounded-[32px] border border-white/70 bg-white/85 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:p-10">
            <Link to="/" className="mb-8 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white"><Target className="h-5 w-5" /></div>
              <div>
                <div className="text-lg font-semibold text-slate-950">SkillBridge</div>
                <div className="text-xs text-slate-500">Create your workspace</div>
              </div>
            </Link>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-950">Create account</h2>
              <p className="mt-2 text-slate-600">Start building a structured path to your target role.</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input id="name" type="text" placeholder="Jane Doe" value={name} onChange={(e) => setName(e.target.value)} className="h-12 rounded-2xl border-slate-200 pl-10" required data-testid="register-name-input" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 rounded-2xl border-slate-200 pl-10" required data-testid="register-email-input" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                  <Input id="password" type="password" placeholder="Minimum 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 rounded-2xl border-slate-200 pl-10" required minLength={6} data-testid="register-password-input" />
                </div>
              </div>
              <Button type="submit" className="h-12 w-full rounded-full bg-slate-950 text-white hover:bg-slate-900" disabled={loading} data-testid="register-submit-btn">
                {loading ? 'Creating account…' : 'Create account'} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600">
              Already have an account? <Link to="/login" className="font-semibold text-slate-900 hover:underline">Sign in</Link>
            </p>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="order-1 hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 p-10 text-white lg:flex lg:flex-col lg:justify-between lg:order-2">
          <div>
            <h1 className="max-w-lg text-5xl font-bold leading-tight">Build a sharper career plan from day one.</h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-200">Set up your account and start using assessments, gap analysis, resource recommendations, and progress tracking in one flow.</p>
          </div>
          <div className="grid gap-4">
            {['Role selection', 'Skill readiness analysis', 'Personalised resources'].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-100">
                <CheckCircle2 className="h-5 w-5 text-slate-300" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
