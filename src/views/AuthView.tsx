import React, { useState, useMemo } from 'react';
import { Mail, Lock, User, Eye, EyeOff, ShieldAlert, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { UserProfile } from '../types';
import { isValidEmail } from '../utils';

interface AuthViewProps {
  initialTab: 'login' | 'signup';
  onLogin: (user: UserProfile) => void;
  onNavigate: (view: string) => void;
  onAddToast: (text: string, type: 'success' | 'error' | 'info' | 'ai') => void;
}

export const AuthView: React.FC<AuthViewProps> = ({
  initialTab,
  onLogin,
  onNavigate,
  onAddToast,
}) => {
  const [tab, setTab] = useState<'login' | 'signup'>(initialTab);
  
  // Input fields state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  
  // Visibility toggler
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Simple password strength calculation
  const strength = useMemo(() => {
    if (!password) return { percent: 0, text: 'Empty', color: 'bg-slate-800' };
    
    let score = 0;
    if (password.length >= 6) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    if (score === 1) return { percent: 25, text: 'Poor/Weak', color: 'bg-rose-500' };
    if (score === 2) return { percent: 50, text: 'Moderate', color: 'bg-amber-400' };
    if (score === 3) return { percent: 75, text: 'Strong', color: 'bg-blue-400' };
    return { percent: 100, text: 'Exquisite Strength!', color: 'bg-emerald-400' };
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      onAddToast('Please enter your email address.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      onAddToast('Please enter a valid email address.', 'error');
      return;
    }
    
    if (!password.trim()) {
      onAddToast('Please enter your password.', 'error');
      return;
    }

    if (tab === 'signup' && !name.trim()) {
      onAddToast('Please insert your Candidate Name.', 'error');
      return;
    }

    setSubmitting(true);
    onAddToast(tab === 'login' ? 'Authenticating candidate coordinates...' : 'Deploying account nodes...', 'info');

    setTimeout(() => {
      // Simulate successful registration or sign in payload
      const dummyProfile: UserProfile = {
        name: tab === 'signup' ? name : 'Arjun Sharma',
        email: email,
        role: 'Full Stack Engineer Developer',
        bio: 'Passionate and open-source enthusiast eager to solve complex data metrics.',
        avatar: '👨‍💻',
        skills: ['React.js', 'TypeScript', 'Node.js', 'Python', 'Git'],
        interests: ['Frontend', 'AI/ML', 'Open Source', 'Hackathons'],
        goals: ['High Stipend', 'Remote work'],
        resumeName: 'Arjun_Sharma_SWE_Resume.pdf',
        membershipPlan: 'Free',
      };

      onLogin(dummyProfile);
      setSubmitting(false);
      onAddToast(tab === 'login' ? 'Welcome back to PlatformHub!' : 'Account created successfully! Welcome to PlatformHub.', 'success');
      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto px-6 py-24 min-h-[85vh] flex items-center">
      <div className="p-7 bg-slate-950/40 border border-slate-850/80 rounded-2xl w-full text-left backdrop-blur-sm shadow-xl">
        
        {/* UPPER TABS TOGGLE */}
        <div className="grid grid-cols-2 gap-2 mb-6 bg-slate-900/60 p-1.5 rounded-xl border border-slate-900">
          <button
            onClick={() => setTab('login')}
            className={`py-2 text-center text-xs font-semibold rounded-lg transition ${
              tab === 'login'
                ? 'bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          
          <button
            onClick={() => setTab('signup')}
            className={`py-2 text-center text-xs font-semibold rounded-lg transition ${
              tab === 'signup'
                ? 'bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* SUBTITLE INFORMATION */}
        <div className="mb-6 text-center">
          <h2 className="font-sans font-extrabold text-lg text-white">
            {tab === 'login' ? 'Access Candidate Portal' : 'Register Developer Node'}
          </h2>
          <p className="text-[11px] text-slate-500 leading-normal mt-1 font-light">
            {tab === 'login'
              ? 'Provide your registered email to synchronize saved items.'
              : 'Sign up in under 1 minute to test AI matching percentage calculations.'}
          </p>
        </div>

        {/* INPUT FIELDS */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {tab === 'signup' && (
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Full Member Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  placeholder="Arjun Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-850 text-xs py-2.5 pl-10 pr-4 rounded-lg outline-none text-slate-300 focus:border-blue-500/50"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Email Coordinates *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                placeholder="your.email@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-slate-850 text-xs py-2.5 pl-10 pr-4 rounded-lg outline-none text-slate-300 focus:border-blue-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Secure Password *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type={showPass ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-850 text-xs py-2.5 pl-10 pr-10 rounded-lg outline-none text-slate-300 focus:border-blue-500/50"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200 transition"
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* PASSWORD STRENGTH BAR FOR SIGNUP */}
            {tab === 'signup' && password && (
              <div className="mt-2 text-[10px] leading-none">
                <div className="flex justify-between items-center text-slate-400 mb-1 font-semibold">
                  <span>Cryptographic Strength:</span>
                  <span className="font-bold">{strength.text}</span>
                </div>
                <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: `${strength.percent}%` }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Remember me & Forget link */}
          <div className="flex items-center justify-between text-[11px] text-slate-500 font-semibold select-none leading-none mt-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="accent-blue-500 rounded text-blue-500 shrink-0 select-none bg-slate-900 border-slate-800"
              />
              Stay remember checked
            </label>
            <a href="#" onClick={(e) => { e.preventDefault(); onAddToast('Simulating email credential recovery.', 'info'); }} className="hover:text-blue-400 transition-colors">
              Recover password?
            </a>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3 bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg transition flex items-center justify-center gap-1.5 mt-3 ${submitting ? 'opacity-80' : ''}`}
          >
            {submitting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Connecting nodes...
              </>
            ) : (
              <>{tab === 'login' ? 'Authorize entry tag' : 'Consolidate registration'}</>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
