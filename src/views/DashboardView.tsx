import React, { useMemo } from 'react';
import { Bookmark, Sparkles, LayoutDashboard, Compass, Trash, Clock, ArrowRight, Server, Shield, FileText } from 'lucide-react';
import { mockOpportunities } from '../mockData';
import { Opportunity, UserProfile, ActivityLog, ApplicationTrackerCard } from '../types';

interface DashboardViewProps {
  user: UserProfile | null;
  savedOpportunities: string[];
  onToggleBookmark: (id: string) => void;
  onNavigate: (view: string, detailId?: string) => void;
  activityLog: ActivityLog[];
  applicationCards: ApplicationTrackerCard[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  savedOpportunities,
  onToggleBookmark,
  onNavigate,
  activityLog,
  applicationCards,
}) => {
  // Grab real objects for saved opportunities
  const savedList = useMemo(() => {
    return mockOpportunities.filter((o) => savedOpportunities.includes(o.id));
  }, [savedOpportunities]);

  const upcomingDeadlines = useMemo(() => {
    return savedList
      .sort((a, b) => a.daysLeft - b.daysLeft)
      .slice(0, 3);
  }, [savedList]);

  const stats = useMemo(() => {
    const totalApplied = applicationCards.filter((c) => c.stage === 'Applied').length;
    const totalInterviewing = applicationCards.filter((c) => c.stage === 'Interview').length;
    const totalOffers = applicationCards.filter((c) => c.stage === 'Selected').length;
    
    return {
      saved: savedOpportunities.length,
      pipelines: applicationCards.length,
      applied: totalApplied,
      interviewing: totalInterviewing,
      offers: totalOffers,
    };
  }, [savedOpportunities, applicationCards]);

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-6 py-24 min-h-[80vh] flex flex-row items-center">
        <div className="p-8 bg-slate-950/40 border border-slate-850 rounded-2xl text-center backdrop-blur-sm shadow-xl w-full">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 text-lg mx-auto mb-4">🔓</div>
          <h2 className="font-sans font-extrabold text-xl text-white">Unlock Your Dashboard</h2>
          <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed mb-6">
            Sign in to track your opportunities progress, catalog application pipelines on the Kanban board, and access precise match scoring.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => onNavigate('login')}
              className="py-2.5 bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white rounded-xl font-semibold text-xs uppercase cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => onNavigate('signup')}
              className="py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl font-semibold text-xs uppercase border border-slate-800"
            >
              Register Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 min-h-[85vh] text-slate-100">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 text-left">
        <div>
          <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Dashboard Workspace
          </h1>
          <p className="mt-1.5 text-slate-400 font-light text-sm sm:text-base">
            Welcome back, <span className="text-[#00d4b4] font-semibold">{user.name}</span>! Track alignment scores and organize your pipelines.
          </p>
        </div>

        {/* Quick action badges */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('opportunities')}
            className="py-2 px-4 rounded-xl font-semibold text-xs bg-blue-500/10 hover:bg-blue-500/15 text-blue-400 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" /> Explore Feed
          </button>
          <button
            onClick={() => onNavigate('recommendations')}
            className="py-2 px-4 rounded-xl font-semibold text-xs bg-purple-500/10 hover:bg-purple-500/15 text-purple-300 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Compute AI Matches
          </button>
        </div>
      </div>

      {/* METRIC CARD MODULE */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        
        <div className="p-5 bg-slate-900/15 border border-slate-850/80 rounded-xl">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold">Saved Opportunities</span>
          <div className="font-sans font-black text-3xl text-white mt-1.5">{stats.saved}</div>
          <p className="text-[10px] text-slate-400 mt-1 font-light">Saved slots on dashboard</p>
        </div>

        <div className="p-5 bg-slate-900/15 border border-slate-850/80 rounded-xl">
          <span className="text-[10px] text-[#9b5bff] uppercase tracking-widest font-extrabold">Active Pipelines</span>
          <div className="font-sans font-black text-3xl text-purple-400 mt-1.5">{stats.pipelines}</div>
          <p className="text-[10px] text-slate-400 mt-1 font-light">Items on Kanban tracker</p>
        </div>

        <div className="p-5 bg-slate-900/15 border border-slate-850/80 rounded-xl">
          <span className="text-[10px] text-emerald-400 uppercase tracking-widest font-extrabold">Interviews Setup</span>
          <div className="font-sans font-black text-3xl text-emerald-400 mt-1.5">{stats.interviewing}</div>
          <p className="text-[10px] text-slate-400 mt-1 font-light">Interactive review screens</p>
        </div>

        <div className="p-5 bg-slate-900/15 border border-slate-850/80 rounded-xl">
          <span className="text-[10px] text-[#00d4b4] uppercase tracking-widest font-extrabold">Hires & Selections</span>
          <div className="font-sans font-black text-3xl text-[#00d4b4] mt-1.5">{stats.offers}</div>
          <p className="text-[10px] text-slate-400 mt-1 font-light">Approved role offers!</p>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Saved Opportunities + deadlines (Col 1-8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* SAVED OPPORTUNITIES TABLE */}
          <div className="p-6 bg-slate-900/25 border border-slate-850/80 rounded-2xl">
            <h3 className="font-sans font-bold text-sm text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-theme-1 text-blue-400 shrink-0" /> Supported Saved Items
            </h3>

            {savedList.length === 0 ? (
              <div className="py-12 text-center border border-dashed border-slate-800 rounded-xl">
                <span className="text-2xl">🔖</span>
                <h4 className="font-sans font-bold text-sm text-slate-300 mt-2">Saved slots is empty</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto font-light">
                  When you find a listing on the feed, tap the bookmark icon to save it for easy access here.
                </p>
                <button
                  onClick={() => onNavigate('opportunities')}
                  className="mt-4 py-1.5 px-4 bg-blue-500/15 text-blue-400 hover:bg-blue-500/20 rounded-lg text-xs font-semibold border border-blue-500/20"
                >
                  Locate Opportunities
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {savedList.map((opp) => (
                  <div
                    key={opp.id}
                    className="p-4 bg-slate-950/40 hover:bg-slate-900/20 border border-slate-850/60 rounded-xl flex items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xl shrink-0">{opp.logo}</span>
                      <div className="min-w-0">
                        <h4 className="font-sans font-extrabold text-xs text-slate-100 group-hover:text-blue-400 transition-colors truncate">
                          {opp.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-light truncate">{opp.organization}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right hidden sm:block">
                        <div className="text-xs font-semibold text-emerald-400">{opp.matchScore}% Match</div>
                        <span className="text-[9px] text-slate-500 font-light">{opp.daysLeft} days left</span>
                      </div>

                      <div className="flex gap-1.5">
                        <button
                          onClick={() => onNavigate('opportunity-details', opp.id)}
                          className="py-1 px-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800/80 text-[10px] font-bold rounded-lg text-slate-300 transition"
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => onToggleBookmark(opp.id)}
                          className="p-1.5 bg-slate-950 hover:bg-rose-500/10 border border-slate-850/60 text-slate-500 hover:text-rose-400 rounded-lg transition"
                          title="Remove bookmark"
                        >
                          <Trash className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SIMULATED PIPELINE DEADLINES TIMELINE */}
          {savedList.length > 0 && (
            <div className="p-6 bg-slate-900/25 border border-slate-850/80 rounded-2xl">
              <h3 className="font-sans font-bold text-sm text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-rose-400 shrink-0" /> Immediate Deadlines Schedule
              </h3>
              <div className="flex flex-col gap-3">
                {upcomingDeadlines.map((opp) => (
                  <div key={opp.id} className="flex justify-between items-center bg-slate-950/20 border border-slate-900 p-3.5 rounded-xl">
                    <div className="text-left">
                      <h4 className="text-xs font-bold text-slate-200 leading-tight">{opp.title}</h4>
                      <p className="text-[10px] text-slate-500 mt-1 font-light leading-none">{opp.organization}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`text-[10px] font-extrabold py-1 px-2.5 rounded-lg uppercase ${
                          opp.daysLeft <= 5
                            ? 'bg-rose-500/10 text-rose-400'
                            : 'bg-amber-400/10 text-amber-400'
                        }`}
                      >
                        {opp.daysLeft} Days Remaining
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Chronology logs + Membership tier (Col 9-12) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* PROFILE SECURITY BOX CARD */}
          <div className="p-5 bg-gradient-to-tr from-slate-950 to-slate-900 border border-slate-850 rounded-2xl">
            <h3 className="font-sans font-bold text-[11px] text-slate-500 uppercase tracking-widest mb-3">Subscription Status</h3>
            <div className="flex items-center justify-between text-left">
              <div>
                <span className="font-sans font-black text-xl text-white">{user.membershipPlan} Premium</span>
                <p className="text-[10px] text-slate-500 mt-1 font-light">Premium match queries unlocked</p>
              </div>
              <button
                onClick={() => onNavigate('pricing')}
                className="py-1.5 px-3 rounded-lg bg-[#9b5bff]/10 border border-[#9b5bff]/30 hover:bg-[#9b5bff]/20 text-[#a78bfa] text-xs font-bold uppercase transition"
              >
                Upgrades
              </button>
            </div>
          </div>

          {/* CHRONOLOGY ACTIVITY LOGS */}
          <div className="p-5 bg-slate-900/25 border border-slate-850/80 rounded-2xl text-left">
            <h3 className="font-sans font-bold text-xs text-slate-200 uppercase tracking-wider mb-4">Activity Log</h3>
            
            {activityLog.length === 0 ? (
              <p className="text-xs text-slate-500 font-light">No logged actions recorded yet.</p>
            ) : (
              <div className="flex flex-col gap-4 relative pl-3 border-l border-slate-850">
                {activityLog.slice(0, 5).map((log) => (
                  <div key={log.id} className="relative text-xs leading-relaxed">
                    {/* Circle bulb icon indicator */}
                    <span className="absolute -left-5 top-1 w-2.5 h-2.5 bg-blue-500 rounded-full border border-slate-900"></span>
                    <p className="text-slate-300 font-light">{log.text}</p>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
