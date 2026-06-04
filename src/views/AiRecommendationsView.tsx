import React, { useState, useMemo } from 'react';
import { Sparkles, Plus, X, Loader2, Bookmark, CheckCircle2, ChevronRight, AlertCircle } from 'lucide-react';
import { mockOpportunities } from '../mockData';
import { Opportunity, UserProfile } from '../types';

interface AiRecommendationsViewProps {
  user: UserProfile | null;
  savedOpportunities: string[];
  onToggleBookmark: (id: string) => void;
  onNavigate: (view: string, detailId?: string) => void;
  onAddToast: (text: string, type: 'success' | 'error' | 'info' | 'ai') => void;
}

interface CustomRecommendationResult {
  opportunity: Opportunity;
  score: number;
  whyMatched: string;
}

export const AiRecommendationsView: React.FC<AiRecommendationsViewProps> = ({
  user,
  savedOpportunities,
  onToggleBookmark,
  onNavigate,
  onAddToast,
}) => {
  // Local state for the dynamic matcher form
  const [skillInput, setSkillInput] = useState('');
  const [userSkills, setUserSkills] = useState<string[]>(
    user?.skills || ['React.js', 'Python', 'Git', 'JavaScript']
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    user?.interests || ['Frontend', 'Open Source', 'Hackathons']
  );
  const [selectedGoals, setSelectedGoals] = useState<string[]>(
    user?.goals || ['High Stipend', 'Remote work']
  );

  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CustomRecommendationResult[] | null>(null);

  const interestOptions = [
    { label: 'Frontend UI', keyword: 'Frontend' },
    { label: 'AI/ML Engineering', keyword: 'AI/ML' },
    { label: 'Open Source Software', keyword: 'Open Source' },
    { label: 'Mobile Interfaces', keyword: 'Mobile' },
    { label: 'Competitive Hackathons', keyword: 'Hackathons' },
    { label: 'Fellowships & Research', keyword: 'Fellowships' },
    { label: 'VC Startups', keyword: 'Startups' },
  ];

  const goalOptions = [
    { label: 'Earn stipends & pay', keyword: 'High Stipend' },
    { label: 'Establish global credentials/brands', keyword: 'Industry Branding' },
    { label: 'Work remote-first', keyword: 'Remote work' },
    { label: 'Scientific research publishing', keyword: 'Academy' },
    { label: 'Peer connections & networking', keyword: 'Networking' },
  ];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = skillInput.trim();
    if (!clean) return;
    if (userSkills.map((s) => s.toLowerCase()).includes(clean.toLowerCase())) {
      onAddToast('Skill already annotated!', 'info');
      setSkillInput('');
      return;
    }
    setUserSkills([...userSkills, clean]);
    setSkillInput('');
    onAddToast(`Added skills asset: "${clean}"`, 'success');
  };

  const handleRemoveSkill = (idx: number) => {
    setUserSkills(userSkills.filter((_, i) => i !== idx));
  };

  const handleToggleInterest = (keyword: string) => {
    if (selectedInterests.includes(keyword)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== keyword));
    } else {
      setSelectedInterests([...selectedInterests, keyword]);
    }
  };

  const handleToggleGoal = (keyword: string) => {
    if (selectedGoals.includes(keyword)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== keyword));
    } else {
      setSelectedGoals([...selectedGoals, keyword]);
    }
  };

  const handleTriggerMatching = () => {
    if (userSkills.length === 0) {
      onAddToast('Please list at least one technology asset to start.', 'error');
      return;
    }
    
    setLoading(true);
    setResults(null);

    // Simulate high-density matching network latency
    setTimeout(() => {
      const formattedResults: CustomRecommendationResult[] = mockOpportunities
        .map((opp) => {
          let score = 50; // Base baseline score
          const reasons: string[] = [];

          // 1. Skill alignment points
          const matchedSkills = opp.skillsRequired.filter((skill) =>
            userSkills.some((us) => us.toLowerCase().includes(skill.toLowerCase()))
          );
          score += matchedSkills.length * 10;
          if (matchedSkills.length > 0) {
            reasons.push(
              `Matched critical tech skill(s): ${matchedSkills.slice(0, 3).join(', ')}`
            );
          }

          // 2. Category / Interest overlap
          const matchesCategory = selectedInterests.some((interest) => {
            if (interest === 'Open Source' && opp.category === 'Open Source') return true;
            if (interest === 'Hackathons' && opp.category === 'Hackathons') return true;
            if (interest === 'Fellowships' && opp.category === 'Fellowships') return true;
            if (interest === 'Startups' && opp.category === 'Startups') return true;
            if (interest === 'Frontend' && opp.skillsRequired.some(s => ['react.js', 'ui', 'figma', 'css', 'typescript'].includes(s.toLowerCase()))) return true;
            return false;
          });
          if (matchesCategory) {
            score += 15;
            reasons.push(`Perfect overlap with your focal area: ${opp.category}`);
          }

          // 3. Compensation / Goal overlap
          const wantsStipend = selectedGoals.includes('High Stipend');
          if (wantsStipend && opp.stipend?.includes('$')) {
            score += 10;
            reasons.push(`Compensated with standard stipends (${opp.stipend}) aligning with reward goals`);
          }

          const wantsRemote = selectedGoals.includes('Remote work');
          if (wantsRemote && opp.location.toLowerCase().includes('remote')) {
            score += 10;
            reasons.push(`Remote execution structure targets workspace preference`);
          }

          // Bound between 60 and 99
          const finalScore = Math.min(Math.max(score, 60), 99);

          // Construct whyMatched response text based on computed items
          let whyMatched = reasons.length > 0 
            ? reasons.join('. ') + '.'
            : `Highly matched due to overall difficulty grade and active category slots.`;

          return {
            opportunity: opp,
            score: finalScore,
            whyMatched,
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 3); // Top 3 matching recommendations

      setResults(formattedResults);
      setLoading(false);
      onAddToast('AI Opportunity Analysis Complete!', 'ai');
    }, 1800);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-24 pb-16 min-h-[85vh] text-[#f0f2ff]">
      
      {/* HEADER SECTION */}
      <div className="text-center mb-12">
        <span className="inline-flex items-center gap-1 bg-purple-500/10 border border-purple-500/25 px-3 py-1 rounded-full text-xs font-bold text-[#a78bfa] uppercase tracking-widest leading-none">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Smart Matchmaker
        </span>
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-3">
          Curated Discovery Engine
        </h1>
        <p className="mt-2 text-slate-400 font-light text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Establish your developer profile, career coordinates, and priorities to run our matrix recommendations model in real-time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* INPUT QUESTIONNAIRE (Grid Columns 1-5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 bg-slate-900/25 border border-slate-850/80 rounded-2xl">
            <h3 className="font-sans font-bold text-sm text-slate-200 uppercase tracking-wider mb-5 pb-3 border-b border-slate-900">
              Matcher Variables
            </h3>

            {/* 1. SKILLS MANAGER */}
            <div className="mb-6">
              <label className="block text-[11px] text-slate-500 uppercase tracking-widest font-extrabold mb-2">
                Annotate Your Tech Skills
              </label>
              
              <form onSubmit={handleAddSkill} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. React, Python, Ruby, Figma"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  className="w-full bg-slate-950/60 border border-slate-800 text-xs py-2 px-3 rounded-lg text-slate-300 placeholder-slate-600 focus:outline-none focus:border-[#9b5bff]/50"
                />
                <button
                  type="submit"
                  className="p-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              {/* Skill capsule pills */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {userSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 py-1 px-2 bg-slate-900 border border-slate-800 rounded-md text-[10px] sm:text-xs font-semibold text-slate-300"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="text-slate-500 hover:text-rose-400 transition"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 2. AREA INTEREST SELECTIONS */}
            <div className="mb-6 border-t border-slate-900/60 pt-5">
              <label className="block text-[11px] text-slate-500 uppercase tracking-widest font-extrabold mb-2">
                Focal Project Trajectories
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                {interestOptions.map((opt) => {
                  const isActive = selectedInterests.includes(opt.keyword);
                  return (
                    <button
                      key={opt.keyword}
                      onClick={() => handleToggleInterest(opt.keyword)}
                      className={`text-left py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all ${
                        isActive
                          ? 'bg-[#9b5bff]/10 border-[#9b5bff]/30 text-purple-300'
                          : 'bg-slate-950/20 border-slate-850/80 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#9b5bff]"></div>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. GOALS CHECKLIST */}
            <div className="mb-6 border-t border-slate-900/60 pt-5">
              <label className="block text-[11px] text-slate-500 uppercase tracking-widest font-extrabold mb-2">
                Primary Compensation Goals
              </label>
              
              <div className="flex flex-col gap-2 mt-2">
                {goalOptions.map((opt) => {
                  const isActive = selectedGoals.includes(opt.keyword);
                  return (
                    <button
                      key={opt.keyword}
                      onClick={() => handleToggleGoal(opt.keyword)}
                      className={`text-left py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-between transition-all ${
                        isActive
                          ? 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                          : 'bg-slate-950/20 border-slate-850/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {isActive && <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* TRIGGER SUBMIT */}
            <button
              onClick={handleTriggerMatching}
              disabled={loading}
              className={`w-full py-3.5 bg-gradient-to-r from-blue-500 via-[#9b5bff] to-[#10f2d4] text-white rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
                loading ? 'opacity-80' : 'hover:shadow-lg hover:shadow-purple-500/20 active:translate-y-px text-white font-extrabold'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating matches...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Compute AI Matches
                </>
              )}
            </button>

          </div>
        </div>

        {/* RESULTS FEED (Grid Columns 6-12) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          
          {loading && (
            <div className="py-24 text-center bg-slate-950/40 border border-slate-850 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-[#9b5bff] animate-spin mb-4" />
              <h3 className="font-sans font-bold text-base text-slate-200">Rebuilding Matching Matrix...</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm font-light">
                Running tokenized vector comparisons across 100,000+ databases. Finding high-ticket slot correlations.
              </p>
            </div>
          )}

          {!loading && results === null && (
            <div className="py-24 text-center bg-slate-950/40 border border-slate-850 rounded-2xl backdrop-blur-sm flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 text-lg mb-4">🤖</div>
              <h3 className="font-sans font-bold text-base text-slate-200">Your feed is ready to compute</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm px-4 font-light">
                Set up your skill asset list and goals in the Left Variables sidebar, then click "Compute AI Matches" to see your curated high-score recommendations.
              </p>
            </div>
          )}

          {!loading && results !== null && (
            <div className="flex flex-col gap-4">
              <h3 className="font-sans font-extrabold text-[#10f2d4] text-xs uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Top Recommendation Results
              </h3>

              {results.map(({ opportunity, score, whyMatched }, ri) => {
                const isSaved = savedOpportunities.includes(opportunity.id);
                return (
                  <div
                    key={opportunity.id}
                    className="p-5 bg-slate-900/30 border border-slate-850/80 rounded-xl hover:border-slate-800 transition-all flex flex-col sm:flex-row items-start justify-between gap-5 relative overflow-hidden group shadow-lg"
                  >
                    {/* Badge for rank */}
                    <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white text-[9px] font-extrabold px-2.5 py-1 rounded-br-lg uppercase">
                      Rank #{ri + 1}
                    </div>

                    <div className="flex-1 mt-2 text-left">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{opportunity.logo}</span>
                        <div>
                          <h4 className="font-sans font-extrabold text-sm text-slate-100 group-hover:text-blue-400 transition-colors">
                            {opportunity.title}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-light">{opportunity.organization}</p>
                        </div>
                      </div>

                      {/* Brief text description */}
                      <p className="text-xs text-slate-400 mt-3 font-light leading-relaxed">
                        {opportunity.description}
                      </p>

                      {/* Explicit Why AI Selected This */}
                      <div className="mt-4 p-3 bg-[#080d1a] border border-[#9b5bff]/20 rounded-lg text-xs leading-relaxed text-[#c4b5fd] font-light italic flex gap-2">
                        <Sparkles className="w-4 h-4 text-[#a78bfa] shrink-0" />
                        <div>
                          <strong className="text-[#e9d5ff] font-sans font-bold not-italic">Match Rationale: </strong>
                          {whyMatched}
                        </div>
                      </div>
                    </div>

                    {/* Score section and action column */}
                    <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 sm:gap-6 self-stretch border-t sm:border-t-0 border-slate-900 sm:pt-0 pt-4 w-full sm:w-auto">
                      
                      <div className="text-left sm:text-right">
                        <div className="text-lg font-mono font-black text-emerald-400">
                          {score}% Match
                        </div>
                        <span className="text-[9px] text-[#9b5bff] font-extrabold uppercase mt-0.5 tracking-wider">
                          Excellent Fit
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Bookmark */}
                        <button
                          onClick={() => onToggleBookmark(opportunity.id)}
                          className={`p-2 rounded-lg border transition-all ${
                            isSaved
                              ? 'bg-[#00d4b4]/10 border-[#00d4b4]/30 text-[#00d4b4]'
                              : 'bg-slate-900/60 border-slate-800 text-slate-500'
                          }`}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#00d4b4]' : ''}`} />
                        </button>
                        
                        <button
                          onClick={() => onNavigate('opportunity-details', opportunity.id)}
                          className="py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-[11px] font-semibold text-slate-200 border border-slate-800 hover:border-slate-700 rounded-lg transition flex items-center gap-1"
                        >
                          View Details <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
