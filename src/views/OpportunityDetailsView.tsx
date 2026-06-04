import React, { useState, useMemo } from 'react';
import { ArrowLeft, MapPin, Briefcase, Calendar, Bookmark, ShieldAlert, BadgeCheck, Send, Loader2, Sparkles } from 'lucide-react';
import { mockOpportunities } from '../mockData';
import { Opportunity, UserProfile, ApplicationTrackerCard } from '../types';

interface OpportunityDetailsViewProps {
  opportunityId: string;
  savedOpportunities: string[];
  onToggleBookmark: (id: string) => void;
  onNavigate: (view: string) => void;
  user: UserProfile | null;
  onAddApplication: (opp: Opportunity, notes: string) => void;
  onAddToast: (text: string, type: 'success' | 'error' | 'info' | 'ai') => void;
}

export const OpportunityDetailsView: React.FC<OpportunityDetailsViewProps> = ({
  opportunityId,
  savedOpportunities,
  onToggleBookmark,
  onNavigate,
  user,
  onAddApplication,
  onAddToast,
}) => {
  const [pitch, setPitch] = useState('');
  const [applying, setApplying] = useState(false);
  const [appliedAlready, setAppliedAlready] = useState(false);

  const opp = useMemo(() => {
    return mockOpportunities.find((o) => o.id === opportunityId) || mockOpportunities[0];
  }, [opportunityId]);

  const isSaved = savedOpportunities.includes(opp.id);

  // Skill analysis matching checks
  const matchDetails = useMemo(() => {
    if (!user) return { matched: [], missing: [], percentage: opp.matchScore };
    const matched: string[] = [];
    const missing: string[] = [];
    
    opp.skillsRequired.forEach((skill) => {
      const parsedUserSkills = user.skills.map(s => s.toLowerCase());
      if (parsedUserSkills.includes(skill.toLowerCase())) {
        matched.push(skill);
      } else {
        missing.push(skill);
      }
    });

    const parsedPercentage = Math.round((matched.length / opp.skillsRequired.length) * 100) || opp.matchScore;
    return { matched, missing, percentage: Math.max(parsedPercentage, 60) };
  }, [opp, user]);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApplying(true);

    // Simulate network submission loop
    setTimeout(() => {
      onAddApplication(opp, pitch);
      setApplying(false);
      setAppliedAlready(true);
      setPitch('');
      onNavigate('tracker');
    }, 1800);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-slate-100">
      
      {/* BACK NAVIGATION */}
      <button
        onClick={() => onNavigate('opportunities')}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-8 group transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Opportunities feed
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* DETAILS LEFT FRAME (Columns 1-2) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          <div className="p-6 bg-slate-900/25 border border-slate-850/80 rounded-2xl">
            {/* Header branding */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-900">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-slate-900 border border-slate-850 rounded-2xl flex items-center justify-center text-3xl shadow-lg leading-none shrink-0">
                  {opp.logo}
                </div>
                <div>
                  <h1 className="font-sans font-extrabold text-2xl text-white tracking-tight">{opp.title}</h1>
                  <p className="text-sm text-slate-400 font-light mt-0.5">{opp.organization}</p>
                </div>
              </div>

              {/* Bookmark & Category triggers */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold py-1 px-2.5 rounded-lg bg-blue-500/10 text-blue-400 uppercase tracking-widest leading-none border border-blue-500/20">
                  {opp.category}
                </span>

                <button
                  onClick={() => {
                    onToggleBookmark(opp.id);
                  }}
                  className={`p-2.5 rounded-lg border transition-all ${
                    isSaved
                      ? 'bg-[#00d4b4]/10 border-[#00d4b4]/30 text-[#00d4b4]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
                  }`}
                  title={isSaved ? 'Bookmarked' : 'Save opportunity'}
                >
                  <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#00d4b4]' : ''}`} />
                </button>
              </div>
            </div>

            {/* QUICK FACTS METRIC RIBBON */}
            <div className="grid grid-cols-3 gap-4 py-6 border-b border-slate-900 text-left">
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Salary/Reward</div>
                <div className="text-sm font-semibold text-emerald-400 mt-1">{opp.stipend || 'Unspecified'}</div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Location Status</div>
                <div className="text-sm font-semibold text-slate-300 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span className="line-clamp-1">{opp.location}</span>
                </div>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Application Deadline</div>
                <div className="text-sm font-semibold text-rose-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                  <span>{opp.deadlineDate}</span>
                </div>
              </div>
            </div>

            {/* DESCRIPTION BODY */}
            <div className="py-6 border-b border-slate-900">
              <h3 className="font-sans font-bold text-sm text-slate-200 uppercase tracking-wider mb-3">About the Program</h3>
              <p className="text-sm text-slate-400 font-light leading-relaxed whitespace-pre-line">
                {opp.longDescription || opp.description}
              </p>
            </div>

            {/* ADDITIONAL INFORMATION STAMP */}
            <div className="pt-6">
              <h3 className="font-sans font-bold text-sm text-slate-200 uppercase tracking-wider mb-3">Eligibility Rules</h3>
              <p className="text-xs text-slate-500 font-light leading-relaxed">
                Applicants must be currently enrolled in an accredited academic institution, coding academy program, or demonstrate active contributions to global open-source projects. High communication competency, functional Git version knowledge, and collaborative teamwork capacity are required.
              </p>
            </div>

          </div>
        </div>

        {/* DETAILS RIGHT SIDE PANEL (Column 3) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          
          {/* AI MATCH CARD ANALYSIS */}
          <div className="p-5 bg-[#080d1a] border border-[#9b5bff]/30 rounded-2xl relative overflow-hidden">
            <span className="text-[10px] font-bold text-[#9b5bff] uppercase tracking-widest flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 animate-pulse" /> Alignment Analytics
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-sans font-black text-4xl text-white">{matchDetails.percentage}%</span>
              <span className="text-xs text-slate-400 font-light">Compatibility Index</span>
            </div>

            {/* Horizontal state filler */}
            <div className="h-1.5 bg-slate-950 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-400 to-[#9b5bff]" style={{ width: `${matchDetails.percentage}%` }}></div>
            </div>

            {/* Verified indicator matches vs non */}
            {user ? (
              <div className="flex flex-col gap-3.5 mt-5 pt-5 border-t border-slate-900/60 text-xs">
                
                {/* Matched list */}
                {matchDetails.matched.length > 0 && (
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Skills You Possess ({matchDetails.matched.length})</span>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {matchDetails.matched.map((m) => (
                        <span key={m} className="inline-flex items-center gap-1 py-0.5 px-2 bg-emerald-500/10 text-emerald-400 rounded-md font-semibold text-[10px]">
                          <BadgeCheck className="w-3 h-3 shrink-0" />
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing list */}
                {matchDetails.missing.length > 0 && (
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">Recommended to Learn ({matchDetails.missing.length})</span>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {matchDetails.missing.map((m) => (
                        <span key={m} className="inline-flex items-center gap-1 py-0.5 px-2 bg-amber-500/10 text-amber-500 rounded-md font-semibold text-[10px]">
                          <ShieldAlert className="w-3 h-3 shrink-0" />
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="text-xs text-slate-500 mt-5 leading-normal">
                Sign in to check which required skill assets you have and what to study to optimize matching potentials.
              </div>
            )}
          </div>

          {/* SIMULATED APPLICATION PORTAL FORM */}
          <div className="p-5 bg-slate-950/40 border border-slate-850/80 rounded-2xl">
            <h3 className="font-sans font-bold text-sm text-slate-200 uppercase tracking-wider mb-4 pb-3 border-b border-slate-900">
              Apply Now
            </h3>

            {appliedAlready ? (
              <div className="text-center py-6 bg-slate-900/20 border border-slate-850 rounded-xl">
                <span className="text-2xl">✓</span>
                <h4 className="font-sans font-bold text-sm text-slate-200 mt-2">Document Filed!</h4>
                <p className="text-xs text-slate-400 mt-1 font-light max-w-xs mx-auto px-4">
                  This opportunity has been saved and categorized under "Applied" on your pipeline tracker board.
                </p>
                <button
                  onClick={() => onNavigate('tracker')}
                  className="mt-4 py-1.5 px-4 bg-emerald-500/15 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg transition-colors border border-emerald-500/20"
                >
                  View Kanban Tracker
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="flex flex-col gap-4 text-left">
                
                {/* Dynamic warning if guest */}
                {!user && (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-400 font-medium">
                    Applying as guest. Register an account to populate tracking pipelines automatically.
                  </div>
                )}

                {/* Form fields */}
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    readOnly={!!user}
                    value={user?.name || 'Guest User'}
                    className="w-full bg-slate-900 border border-slate-800 text-xs py-2 px-3 rounded-lg outline-none text-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Email Coordinates</label>
                  <input
                    type="email"
                    required
                    readOnly={!!user}
                    value={user?.email || 'guest@example.com'}
                    className="w-full bg-slate-900 border border-slate-800 text-xs py-2 px-3 rounded-lg outline-none text-slate-300"
                  />
                </div>

                <div>
                  <label className="block text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-1">Explain your fit pitch</label>
                  <textarea
                    rows={4}
                    required
                    maxLength={300}
                    placeholder="Briefly state your core project experiences or why you want to join this program..."
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    className="w-full bg-slate-900/60 border border-slate-850/80 rounded-lg py-2 px-3 text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 resize-none font-light leading-relaxed"
                  />
                  <div className="text-[9px] text-slate-600 text-right mt-1">Chars left: {300 - pitch.length}</div>
                </div>

                <button
                  type="submit"
                  disabled={applying}
                  className={`w-full py-3 bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                    applying ? 'opacity-80 active:translate-y-0' : 'hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-px active:translate-y-px'
                  }`}
                >
                  {applying ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Filing Document...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Submit Application
                    </>
                  )}
                </button>

              </form>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
