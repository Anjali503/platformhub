import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Cpu, Award, Zap, Compass, Star } from 'lucide-react';
import { mockOpportunities } from '../mockData';

interface HomeViewProps {
  onNavigate: (view: string, filterCategory?: string) => void;
  onAddToast: (text: string, type: 'success' | 'error' | 'info' | 'ai') => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onAddToast }) => {
  const handleCategoryClick = (cat: string) => {
    onNavigate('opportunities', cat);
    onAddToast(`Filtering Opportunities by "${cat}"!`, 'info');
  };

  const categories = [
    { name: 'Internships', icon: '💼', count: '12,400+ listings', color: 'shadow-blue-500/10 hover:border-blue-500/40' },
    { name: 'Hackathons', icon: '🏆', count: '3,200+ events', color: 'shadow-emerald-500/10 hover:border-emerald-500/40' },
    { name: 'Scholarships', icon: '🎓', count: '8,700+ awards', color: 'shadow-amber-500/10 hover:border-amber-500/40' },
    { name: 'Open Source', icon: '🌐', count: '5,900+ programs', color: 'shadow-purple-500/10 hover:border-purple-500/40' },
    { name: 'Fellowships', icon: '🔬', count: '1,800+ programs', color: 'shadow-rose-500/10 hover:border-rose-500/40' },
    { name: 'Remote Jobs', icon: '🏡', count: '22,100+ roles', color: 'shadow-blue-500/10 hover:border-blue-500/40' },
    { name: 'Startups', icon: '🚀', count: '4,500+ opportunities', color: 'shadow-cyan-500/10 hover:border-cyan-500/40' },
    { name: 'Competitions', icon: '🥇', count: '2,600+ contests', color: 'shadow-amber-500/10 hover:border-amber-500/40' },
    { name: 'Workshops', icon: '🎯', count: '7,300+ sessions', color: 'shadow-indigo-500/10 hover:border-indigo-500/40' },
    { name: 'Conferences', icon: '🌍', count: '1,200+ events', color: 'shadow-rose-500/10 hover:border-rose-500/40' },
  ];

  return (
    <div className="w-full pb-16 pt-20 overflow-x-hidden text-slate-100">
      
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[90vh] flex items-center py-12">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400 mb-6 shadow-lg shadow-blue-500/5 animate-[pulse_3s_infinite]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              AI-Powered Opportunity Discovery Platform
            </div>
            
            <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-1.1 text-white">
              Discover Opportunities That{' '}
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-[#10f2d4] bg-clip-text text-transparent">
                Change Your Future
              </span>
            </h1>
            
            <p className="mt-6 text-base sm:text-lg text-slate-400 font-light leading-relaxed max-w-xl">
              One unified workspace to match with internships, hackathons, scholarships, and open source programs specifically tailored to your skills and career trajectory.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate('opportunities')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white py-3.5 px-8 rounded-xl font-bold text-sm shadow-xl shadow-blue-500/20 hover:shadow-blue-500/30 active:scale-98 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                🚀 Explore Opportunities
              </button>
              
              <button
                onClick={() => onNavigate('recommendations')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 border border-slate-800 hover:border-blue-500/40 hover:bg-slate-900/40 text-slate-200 py-3.5 px-8 rounded-xl font-medium text-sm transition-all cursor-pointer"
              >
                ✦ Match with AI Engine
              </button>
            </div>
            
            {/* HERO STATS */}
            <div className="mt-12 flex gap-8 border-t border-slate-940/30 pt-8 w-full">
              <div>
                <div className="font-sans font-extrabold text-2xl text-white">100K+</div>
                <div className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">Opportunities</div>
              </div>
              <div>
                <div className="font-sans font-extrabold text-2xl text-white">50K+</div>
                <div className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">Learners Joined</div>
              </div>
              <div>
                <div className="font-sans font-extrabold text-2xl text-white">98%</div>
                <div className="text-xs text-slate-500 mt-0.5 uppercase tracking-wide">Match Score Rating</div>
              </div>
            </div>
          </div>

          {/* DASHBOARD PREVIEW PANEL */}
          <div className="lg:col-span-6 hidden lg:block">
            <div className="relative p-6 bg-slate-950/70 border border-slate-800/80 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-blue-500/50 before:to-transparent">
              
              <div className="flex items-center gap-1.5 mb-5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                <span className="text-xs text-slate-500 font-medium ml-3">PlatformHub - Opportunity Discovery</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                
                {/* Visual Widget 1: Trending */}
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/60 flex flex-col gap-3">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">🔥 Trending Programs</div>
                  
                  <div className="flex items-center justify-between p-1.5 bg-slate-950/40 rounded-lg">
                    <span className="text-xs font-semibold overflow-hidden text-ellipsis whitespace-nowrap">Google Summer of Code</span>
                    <span className="text-[9px] font-bold py-0.5 px-2 rounded-full bg-rose-400/10 text-rose-400">HOT</span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 bg-slate-950/40 rounded-lg">
                    <span className="text-xs font-semibold overflow-hidden text-ellipsis whitespace-nowrap">MLH Catalyst Hack</span>
                    <span className="text-[9px] font-bold py-0.5 px-2 rounded-full bg-emerald-400/10 text-emerald-400">NEW</span>
                  </div>

                  <div className="flex items-center justify-between p-1.5 bg-slate-950/40 rounded-lg">
                    <span className="text-xs font-semibold overflow-hidden text-ellipsis whitespace-nowrap">Gates Scholarship</span>
                    <span className="text-[9px] font-bold py-0.5 px-2 rounded-full bg-rose-400/10 text-rose-400">HOT</span>
                  </div>
                </div>

                {/* Visual Widget 2: AI scores */}
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/60 flex flex-col gap-2.5">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">✦ AI Match Score</div>
                  
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>React.js Intern</span>
                      <span className="text-emerald-400 font-extrabold">96%</span>
                    </div>
                    <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-emerald-400" style={{ width: '96%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>ML Research Fellow</span>
                      <span className="text-blue-400 font-extrabold">87%</span>
                    </div>
                    <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-blue-400" style={{ width: '87%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Open Source Git</span>
                      <span className="text-[#9b5bff] font-extrabold">79%</span>
                    </div>
                    <div className="h-1 bg-slate-950 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: '79%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Visual Widget 3: Deadlines */}
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/60 flex flex-col gap-2.5">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">⌛ Priority Deadlines</div>
                  <div className="flex flex-col gap-2 text-xs">
                    <div className="flex justify-between items-center text-slate-300">
                      <span>GSoC Apply</span>
                      <span className="text-[10px] bg-rose-500/10 text-rose-400 py-0.5 px-1.5 rounded font-extrabold">2 Days</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>Meta Internship</span>
                      <span className="text-[10px] bg-amber-500/10 text-amber-400 py-0.5 px-1.5 rounded font-extrabold">5 Days</span>
                    </div>
                    <div className="flex justify-between items-center text-slate-300">
                      <span>UNESCO Delegate</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-400 py-0.5 px-1.5 rounded font-extrabold">12 Days</span>
                    </div>
                  </div>
                </div>

                {/* Visual Widget 4: Tracker */}
                <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800/60 flex flex-col gap-2.5">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">📊 Application Pipelines</div>
                  <div className="flex flex-col gap-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Applied</span>
                      <span className="text-[#00d4b4] font-bold">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Interviewing</span>
                      <span className="text-blue-400 font-bold">3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Offers Received</span>
                      <span className="text-[#9b5bff] font-extrabold">2</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            
            {/* Subtle glow background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none -z-10"></div>
          </div>
          
        </div>
      </section>

      {/* ── CONTINUOUS MARQUEE CAROUSEL ── */}
      <div className="border-y border-slate-800/80 bg-slate-950/20 py-5 overflow-hidden w-full select-none">
        <div className="flex gap-16 whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {/* Item 1 */}
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span className="w-6 h-6 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center">☁</span> Google Summer of Code
          </span>
          {/* Item 2 */}
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center">🏆</span> Major League Hacking
          </span>
          {/* Item 3 */}
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span className="w-6 h-6 rounded bg-purple-500/10 text-[#9b5bff] flex items-center justify-center">🎓</span> Fulbright Scholarship
          </span>
          {/* Item 4 */}
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span className="w-6 h-6 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center">💼</span> Meta Swe Internship
          </span>
          {/* Item 5 */}
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span className="w-6 h-6 rounded bg-rose-500/10 text-rose-400 flex items-center justify-center">🚀</span> Y-Combinator School
          </span>
          {/* Item 6 */}
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span className="w-6 h-6 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center">🌸</span> GirlScript Open Source
          </span>
          
          {/* Duplicate Items for continuous flow */}
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span className="w-6 h-6 rounded bg-blue-500/10 text-blue-400 flex items-center justify-center">☁</span> Google Summer of Code
          </span>
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span className="w-6 h-6 rounded bg-emerald-500/10 text-emerald-400 flex items-center justify-center">🏆</span> Major League Hacking
          </span>
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span className="w-6 h-6 rounded bg-purple-500/10 text-[#9b5bff] flex items-center justify-center">🎓</span> Fulbright Scholarship
          </span>
          <span className="inline-flex items-center gap-2.5 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            <span className="w-6 h-6 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center">💼</span> Meta Swe Internship
          </span>
        </div>
      </div>

      {/* ── BENTO CATEGORIES GRID ── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Opportunity Categories
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Every Path. One Platform.
          </h2>
          <p className="mt-4 text-slate-400 font-light max-w-xl mx-auto text-sm sm:text-base">
            Discover opportunities curated, matched, and updated by our AI engines in real time across 10 specialized categories.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => handleCategoryClick(cat.name)}
              className={`p-6 bg-slate-900/30 rounded-xl border border-slate-850/60 hover:bg-slate-900/60 hover:-translate-y-1 transition-all duration-300 shadow-md cursor-pointer flex flex-col justify-between group h-36 ${cat.color}`}
            >
              <div>
                <span className="text-2xl">{cat.icon}</span>
                <h4 className="font-sans font-extrabold text-sm text-white mt-3 group-hover:text-blue-400 transition-colors">
                  {cat.name}
                </h4>
                <p className="text-[11px] text-slate-500 font-light mt-1 whitespace-nowrap">{cat.count}</p>
              </div>
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── AI ENGINE HIGHLIGHTS ── */}
      <section className="py-20 border-y border-slate-900 bg-slate-950/45">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#9b5bff] uppercase tracking-widest">
              <Sparkles className="w-4 h-4" /> AI Discovery Engine
            </div>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              Let AI Hunt Down Your Best Fitting Matches
            </h2>
            <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed">
              Stop browsing infinite boards. Our proprietary learning systems map your current technologies, education limits, and locations to immediately deliver high-probability, high-ticket matches.
            </p>

            <div className="mt-6 flex flex-col gap-4 w-full">
              <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-800/60 bg-slate-900/20">
                <div className="p-2 bg-blue-500/15 text-blue-400 rounded-lg shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-200">Skill-Deep Analyses</h4>
                  <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">Cross-references GitHub skills with listing parameters to estimate a specific applicant match probability.</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-800/60 bg-slate-900/20">
                <div className="p-2 bg-emerald-500/15 text-emerald-400 rounded-lg shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-slate-200">Growth Roadmaps suggestions</h4>
                  <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">Our AI suggests exactly what languages or certifications to acquire next to unlock competitive roles.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative p-6 bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-[#9b5bff] flex items-center justify-center text-2xl text-white shadow-xl shadow-blue-500/20 animate-bounce">
                🤖
              </div>
              <h3 className="font-sans font-extrabold text-lg text-white mt-4">Personalized Discovery Simulator</h3>
              <p className="text-xs text-slate-400 mt-1 font-light max-w-sm">Input your primary skills and see what percentages global roles earn on our intelligence matrix in under a minute.</p>
              
              <button
                onClick={() => onNavigate('recommendations')}
                className="mt-6 w-full py-3 bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-purple-400/30 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                Launch AI Tagger Simulator <Sparkles className="w-3.5 h-3.5 text-[#9b5bff]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── ROADMAP PIPELINE STEPS ── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Process Blueprint</span>
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-1">
            From Onboarding to Offer in 5 Actions
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          
          <div className="p-5 bg-slate-900/20 rounded-xl border border-slate-800/85 relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-[#9b5bff] flex items-center justify-center font-extrabold text-white text-sm mb-4">1</div>
            <h4 className="font-sans font-bold text-sm text-white">Create Profile</h4>
            <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">Sign up and insert details regarding education, fields, and ambitions.</p>
          </div>

          <div className="p-5 bg-slate-900/20 rounded-xl border border-slate-800/85 relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-[#9b5bff] flex items-center justify-center font-extrabold text-white text-sm mb-4">2</div>
            <h4 className="font-sans font-bold text-sm text-white">Highlight Skills</h4>
            <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">Input technologies you know or upload a PDF resume for automatic parsing.</p>
          </div>

          <div className="p-5 bg-slate-900/20 rounded-xl border border-slate-800/85 relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-[#9b5bff] flex items-center justify-center font-extrabold text-white text-sm mb-4">3</div>
            <h4 className="font-sans font-bold text-sm text-white">Compute Fit Scenarios</h4>
            <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">Our neural classifiers score active internships, hackathons, and fellowship entries.</p>
          </div>

          <div className="p-5 bg-slate-900/20 rounded-xl border border-slate-800/85 relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-[#9b5bff] flex items-center justify-center font-extrabold text-white text-sm mb-4">4</div>
            <h4 className="font-sans font-bold text-sm text-white">Review Curated List</h4>
            <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">Get a beautifully structured feed prioritized by deadline relevance and matching metrics.</p>
          </div>

          <div className="p-5 bg-slate-900/20 rounded-xl border border-slate-800/85 relative">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-[#9b5bff] flex items-center justify-center font-extrabold text-white text-sm mb-4">5</div>
            <h4 className="font-sans font-bold text-sm text-white">Initiate & Monitor</h4>
            <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">Bookmark folders, follow deadline notifications, and chart items on the Kanban system.</p>
          </div>

        </div>
      </section>

      {/* ── SUCCESS STORIES ── */}
      <section className="py-24 border-t border-slate-900/60 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Real Outcomes</span>
            <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight mt-1">
              Discover Your Next Big Opportunity
            </h2>
            <p className="mt-4 text-slate-400 font-light max-w-xl mx-auto text-sm sm:text-base">
              Learn how developers worldwide leveraged the intelligence model to land stipends, prizes, and competitive career opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="p-6 bg-slate-900/20 border border-slate-800/80 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[#00d4b4] font-extrabold text-xl font-mono">“</span>
                <p className="text-sm text-slate-300 font-light italic leading-relaxed">
                  PlatformHub matched me with the perfect internship opportunity on my first attempt. The precision matching technology found roles that perfectly aligned with my skills and career goals.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold">👨‍💻</div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">Arjun Sharma</h4>
                  <p className="text-xs text-slate-500">CS student, GSoC Participant</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/20 border border-slate-800/80 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[#00d4b4] font-extrabold text-xl font-mono">“</span>
                <p className="text-sm text-slate-300 font-light italic leading-relaxed">
                  Landed an enterprise remote role at a Web3 fintech. The opportunity dashboard let me monitor deadlines properly so I didn't lose track of vital technical tests.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold">👩‍💻</div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">Sarah Jenkins</h4>
                  <p className="text-xs text-slate-500">Product Engineer, Tech Lab</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/20 border border-slate-800/80 rounded-xl flex flex-col justify-between">
              <div>
                <span className="text-[#00d4b4] font-extrabold text-xl font-mono">“</span>
                <p className="text-sm text-slate-300 font-light italic leading-relaxed">
                  I unlocked a fully funded research fellowship in Bioinformatics through details surfaced here in GSoC folders. Best acceleration workspace for student builders.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold">🔬</div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white">Linus Patel</h4>
                  <p className="text-xs text-slate-500">Research Scholar, Boston Bio</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CALL TO ACTION BANNER ── */}
      <section className="bg-gradient-to-tr from-slate-950 via-blue-950/20 to-slate-950 py-20 border-t border-slate-900/60 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10f2d4]/10 border border-[#10f2d4]/30 text-xs text-[#10f2d4] font-bold uppercase mb-6 tracking-wide">
            🚀 JOIN 50,000+ EARLY CAREER BUILDERS WORLDWIDE
          </div>
          <h2 className="font-sans font-extrabold text-3xl sm:text-5xl tracking-tight text-white">
            Your Next Career Catalyst is{' '}
            <span className="bg-gradient-to-r from-[#4f8dff] to-[#9b5bff] bg-clip-text text-transparent">
              One Matching Query Away
            </span>
          </h2>
          <p className="mt-4 text-slate-400 font-light text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
            Create an account, establish your skills, and let our intelligent engine connect you with highly targeted global tracks today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => onNavigate('signup')}
              className="py-3 px-8 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white hover:shadow-xl hover:shadow-blue-500/20 transition-all cursor-pointer"
            >
              Start Discovering For Free
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="py-3 px-8 rounded-xl font-medium text-sm border border-slate-800 hover:bg-slate-900/60 transition-all cursor-pointer text-slate-300"
            >
              Explore Pro Upgrades
            </button>
          </div>
        </div>
        
        {/* Decorative backdrop elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      </section>

    </div>
  );
};
