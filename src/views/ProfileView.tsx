import React, { useState } from 'react';
import { User, Sparkles, Plus, X, Upload, Check, Settings, Trash, Eye, Mail, Award, CheckSquare, Loader2 } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile | null;
  onUpdateProfile: (p: UserProfile) => void;
  onAddToast: (text: string, type: 'success' | 'error' | 'info' | 'ai') => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateProfile,
  onAddToast,
}) => {
  // Personal detail fields
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [avatar, setAvatar] = useState(user?.avatar || '👨‍💻');
  
  // Skills list state
  const [skills, setSkills] = useState<string[]>(user?.skills || []);
  const [skillInput, setSkillInput] = useState('');

  // Selected goals and interests
  const [interests, setInterests] = useState<string[]>(user?.interests || []);
  const [goals, setGoals] = useState<string[]>(user?.goals || []);

  // Simulated PDF parser loading states
  const [loadingResume, setLoadingResume] = useState(false);
  const [resumeName, setResumeName] = useState(user?.resumeName || '');

  const interestOptions = ['Frontend', 'AI/ML', 'Open Source', 'Mobile', 'Hackathons', 'Fellowships', 'Startups'];
  const goalOptions = ['High Stipend', 'Industry Branding', 'Remote work', 'Academy', 'Networking'];
  const avatarOptions = ['👨‍💻', '👩‍💻', '🚀', '💻', '🔬', '🎓', '🤖', '👾', '✨'];

  const handleUpdateProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    onUpdateProfile({
      ...user,
      name,
      email,
      role,
      bio,
      avatar,
      skills,
      interests,
      goals,
      resumeName
    });

    onAddToast('Personal Profile Saved Successfully!', 'success');
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = skillInput.trim();
    if (!clean) return;
    if (skills.map(s => s.toLowerCase()).includes(clean.toLowerCase())) {
      onAddToast('Skill already annotated.', 'info');
      setSkillInput('');
      return;
    }
    const updated = [...skills, clean];
    setSkills(updated);
    setSkillInput('');
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const toggleInterest = (it: string) => {
    if (interests.includes(it)) {
      setInterests(interests.filter(i => i !== it));
    } else {
      setInterests([...interests, it]);
    }
  };

  const toggleGoal = (gl: string) => {
    if (goals.includes(gl)) {
      setGoals(goals.filter(g => g !== gl));
    } else {
      setGoals([...goals, gl]);
    }
  };

  // Simulated PDF file loader
  const handleDummyResumeUpload = () => {
    setLoadingResume(true);
    onAddToast('Uploading PDF document to simulated parser...', 'info');

    setTimeout(() => {
      setLoadingResume(false);
      setResumeName('Arjun_Sharma_SWE_Resume.pdf');
      
      // Auto-extract complementary skill components
      const extracted = ['Solidity', 'Kubernetes', 'FastAPI', 'Rust'];
      const merged = Array.from(new Set([...skills, ...extracted]));
      setSkills(merged);

      onAddToast('AI Resume Parsing Complete! Extracted: Solidity, Kubernetes, FastAPI, Rust.', 'ai');
    }, 2200);
  };

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 min-h-[80vh] flex items-center shadow-lg">
        <div className="p-8 bg-slate-950/40 border border-slate-850 rounded-2xl text-center backdrop-blur-sm shadow-xl w-full">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-lg mx-auto mb-4">👤</div>
          <h2 className="font-sans font-extrabold text-xl text-white">Unlock Candidate Profile</h2>
          <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed mb-6">
            Log in to adjust technical skills, check goal categories, and test AI resume keyword extractors in active formats.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 min-h-[85vh] text-[#f0f2ff]">
      
      <div className="text-left mb-10">
        <h1 className="font-sans font-extrabold text-3xl text-white tracking-tight">Candidate Profile</h1>
        <p className="text-sm text-slate-400 mt-1 font-light">Adjust your system variables to scale matching probability across listings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: EDIT MAIN INFO form (Col 1-7) */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <form onSubmit={handleUpdateProfileSubmit} className="p-6 bg-slate-900/25 border border-slate-850/80 rounded-2xl flex flex-col gap-5">
            <h3 className="font-sans font-bold text-sm text-slate-200 uppercase tracking-wider pb-3 border-b border-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-blue-400 shrink-0" /> Edit Profile Coordinates
            </h3>

            {/* Avatar picker */}
            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1.5">Selected Avatar Emblem</label>
              <div className="flex flex-wrap gap-2">
                {avatarOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setAvatar(opt)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border transition ${
                      avatar === opt
                        ? 'bg-blue-500/10 border-blue-400 text-white'
                        : 'bg-slate-950 border-slate-850 hover:bg-slate-900'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Full Candidate Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 text-xs py-2.5 px-3 rounded-lg text-slate-200 outline-none focus:border-blue-500/50"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Email Coordinates</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 text-xs py-2.5 px-3 rounded-lg text-slate-200 outline-none focus:border-blue-500/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Active Career Role / Degree info</label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 text-xs py-2.5 px-3 rounded-lg text-slate-200 outline-none focus:border-blue-500/50"
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-1">Brief bio narrative</label>
              <textarea
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 text-xs py-2.5 px-3 rounded-lg text-slate-250 outline-none focus:border-blue-500/50 resize-none font-light leading-relaxed"
              />
            </div>

            {/* INTERESTS checklist block */}
            <div className="border-t border-slate-900 pt-5">
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-2.5">Specific Focus Fields</label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((it) => {
                  const check = interests.includes(it);
                  return (
                    <button
                      key={it}
                      type="button"
                      onClick={() => toggleInterest(it)}
                      className={`text-xs py-1.5 px-3 rounded-lg border font-semibold flex items-center gap-1.5 transition ${
                        check
                          ? 'bg-[#9b5bff]/10 border-[#9b5bff]/30 text-purple-300'
                          : 'bg-slate-950 border-slate-850 hover:bg-slate-900 text-slate-400'
                      }`}
                    >
                      {it}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GOALS checklist block */}
            <div className="border-t border-slate-900 pt-5">
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest font-extrabold mb-2.5">Career Targets & Preferences</label>
              <div className="flex flex-wrap gap-2">
                {goalOptions.map((gl) => {
                  const check = goals.includes(gl);
                  return (
                    <button
                      key={gl}
                      type="button"
                      onClick={() => toggleGoal(gl)}
                      className={`text-xs py-1.5 px-3 rounded-lg border font-semibold flex items-center gap-1.5 transition ${
                        check
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                          : 'bg-slate-950 border-slate-850 hover:bg-slate-900 text-slate-400'
                      }`}
                    >
                      {gl}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="py-3 bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:shadow-lg transition cursor-pointer mt-3"
            >
              Save Profile Configurations
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: Interactive upload resume + skills list (Col 8-12) */}
        <div className="lg:col-span-12 xl:col-span-5 flex flex-col gap-6 text-left">
          
          {/* SKILLS BOX LIST MANAGER */}
          <div className="p-6 bg-slate-900/25 border border-slate-850/80 rounded-2xl">
            <h3 className="font-sans font-bold text-sm text-slate-200 uppercase tracking-wider mb-4 pb-3 border-b border-slate-900 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#9b5bff] shrink-0" /> Technical Skills Inventory
            </h3>

            <form onSubmit={handleAddSkill} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. AWS, Django, Kubernetes"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 text-xs py-2 px-3 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-slate-200 transition"
              >
                Add
              </button>
            </form>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {skills.length === 0 ? (
                <p className="text-xs text-slate-500 font-light">Inventory empty. Insert terms or upload your resume below.</p>
              ) : (
                skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 py-1 px-2 bg-slate-950 border border-slate-850 rounded-md text-xs font-semibold text-slate-300 group"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-slate-500 hover:text-rose-450 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>
          </div>

          {/* SIMULATED AI RESUME PARSER */}
          <div className="p-6 bg-slate-900/25 border border-slate-850/80 rounded-2xl relative overflow-hidden">
            <h3 className="font-sans font-bold text-sm text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
              <Upload className="w-4 h-4 text-[#00d4b4] shrink-0" /> AI Resume Parser
            </h3>
            <p className="text-xs text-slate-500 font-light mb-4">
              Scan your skills directly. Drag and drop your curriculum PDF to match credentials instantly.
            </p>

            {loadingResume ? (
              <div className="py-8 border border-dashed border-slate-800 rounded-xl bg-slate-950/20 text-center flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#00d4b4] animate-spin mb-3" />
                <h4 className="font-sans font-bold text-xs text-slate-300">Evaluating text tokens...</h4>
                <p className="text-[10px] text-slate-500 mt-1">Cross-referencing GitHub architectures against system matches.</p>
              </div>
            ) : resumeName ? (
              <div className="p-4 bg-slate-950/40 border border-slate-850 border-dashed rounded-xl text-center flex flex-col items-center gap-2">
                <span className="text-3xl">📄</span>
                <div>
                  <h4 className="font-sans font-bold text-xs text-slate-200 leading-normal">{resumeName}</h4>
                  <p className="text-[10px] text-[#00d4b4] mt-0.5 uppercase tracking-wider font-extrabold">Active Mapping Configured</p>
                </div>
                <button
                  onClick={handleDummyResumeUpload}
                  className="mt-2 text-[10px] font-bold text-[#9b5bff] hover:underline"
                >
                  Reparse Updated Resume
                </button>
              </div>
            ) : (
              <div
                onClick={handleDummyResumeUpload}
                className="py-10 border-2 border-dashed border-slate-800 hover:border-blue-500/50 rounded-xl cursor-pointer text-center bg-slate-950/10 hover:bg-slate-950/30 transition-all flex flex-col items-center gap-2"
              >
                <div className="p-3 bg-slate-900 rounded-xl">
                  <Upload className="w-6 h-6 text-slate-400" />
                </div>
                <h4 className="font-sans font-bold text-xs text-slate-200">Upload PDF resume</h4>
                <p className="text-[10px] text-slate-500 max-w-xs leading-normal px-4 font-light">
                  Click here to simulate uploading a PDF. It will scan and extract Solidity, Kubernetes, and FastAPI assets automatically.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
