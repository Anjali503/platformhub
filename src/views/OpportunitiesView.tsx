import React, { useState, useMemo } from 'react';
import { Search, Filter, Bookmark, Calendar, Briefcase, MapPin, Award, Check, ArrowRight } from 'lucide-react';
import { mockOpportunities } from '../mockData';
import { Opportunity } from '../types';

interface OpportunitiesViewProps {
  onNavigate: (view: string, option?: string) => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  savedOpportunities: string[];
  onToggleBookmark: (id: string) => void;
}

export const OpportunitiesView: React.FC<OpportunitiesViewProps> = ({
  onNavigate,
  selectedCategory,
  onSelectCategory,
  savedOpportunities,
  onToggleBookmark,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('MatchScore'); // 'MatchScore' | 'DaysLeft' | 'Title'

  const categoriesList = [
    'All',
    'Internships',
    'Hackathons',
    'Scholarships',
    'Open Source',
    'Fellowships',
    'Remote Jobs',
    'Startups',
    'Competitions',
    'Workshops',
    'Conferences',
  ];

  // Apply filters in sequence
  const filteredOpportunities = useMemo(() => {
    return mockOpportunities
      .filter((opp) => {
        // Search query
        const textSeed = `${opp.title} ${opp.organization} ${opp.description} ${opp.skillsRequired.join(' ')}`.toLowerCase();
        const matchesSearch = textSeed.includes(searchQuery.toLowerCase());
        
        // Category
        const matchesCategory = selectedCategory === 'All' || opp.category === selectedCategory;
        
        // Difficulty
        const matchesDifficulty = selectedDifficulty === 'All' || opp.difficulty === selectedDifficulty;
        
        return matchesSearch && matchesCategory && matchesDifficulty;
      })
      .sort((a, b) => {
        if (sortBy === 'MatchScore') {
          return b.matchScore - a.matchScore;
        } else if (sortBy === 'DaysLeft') {
          return a.daysLeft - b.daysLeft;
        } else if (sortBy === 'Title') {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy]);

  const handleCardClick = (id: string) => {
    onNavigate('opportunity-details', id);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16 min-h-[85vh] text-slate-100">
      
      {/* HEADER SECTION */}
      <div className="mb-10 text-left">
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          Explore Outstanding Career Tracks
        </h1>
        <p className="mt-2 text-slate-400 font-light text-sm sm:text-base max-w-xl">
          Filter and matching over thousands of verified global opportunities synced from authoritative developer and student ecosystems.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* SIDEBAR FILTERS (Column 1) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="p-5 bg-slate-900/40 border border-slate-800/80 rounded-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-800 mb-4">
              <Filter className="w-4 h-4 text-blue-400" />
              <h3 className="font-sans font-bold text-sm text-slate-200">Refine Categories</h3>
            </div>

            {/* Category selection */}
            <div className="flex flex-col gap-1">
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`flex items-center justify-between text-left py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/45 border border-transparent'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 pb-4 border-b border-slate-800 my-6">
              <Award className="w-4 h-4 text-[#9b5bff]" />
              <h3 className="font-sans font-bold text-sm text-slate-200">Difficulty Grade</h3>
            </div>

            {/* Difficulty selection */}
            <div className="flex flex-col gap-1.5 text-xs font-semibold">
              {['All', 'Beginner', 'Intermediate', 'Advanced'].map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`text-left py-2 px-3 rounded-lg transition-all ${
                    selectedDifficulty === diff
                      ? 'bg-purple-500/10 text-[#9b5bff] border border-purple-500/20'
                      : 'text-slate-400 hover:text-white hover:bg-slate-850/40 border border-transparent'
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* FEED & RESULTS (Columns 2-4) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          
          {/* SEARCH & SORT PANEL */}
          <div className="p-4 bg-slate-900/20 border border-slate-850 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search matching title, company, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500/60 transition-colors"
              />
            </div>

            {/* Sorting trigger */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-end">
              <span className="text-xs text-slate-500 font-semibold whitespace-nowrap">Sort By</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-950/60 border border-slate-800 text-xs font-semibold text-slate-400 py-2.5 px-3 rounded-xl focus:border-blue-500/60 outline-none"
              >
                <option value="MatchScore">Highest AI Compatibility</option>
                <option value="DaysLeft">Closest Deadlines</option>
                <option value="Title">Alphabetical Title</option>
              </select>
            </div>

          </div>

          {/* GRID OF LISTING CARDS */}
          {filteredOpportunities.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-slate-800/80 rounded-2xl">
              <span className="text-3xl">🔍</span>
              <h3 className="font-sans font-bold text-base text-slate-300 mt-4">No matching slots found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-light">
                Try amending your search term or selecting a different category from the filter rail.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  onSelectCategory('All');
                  setSelectedDifficulty('All');
                }}
                className="mt-4 text-xs font-bold py-1.5 px-4 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOpportunities.map((opp) => {
                const isSaved = savedOpportunities.includes(opp.id);
                return (
                  <div
                    key={opp.id}
                    className="p-5 bg-slate-950/40 hover:bg-slate-900/30 border border-slate-850/80 hover:border-slate-800 hover:-translate-y-0.5 transition-all duration-300 rounded-xl shadow-lg relative flex flex-col justify-between group h-full"
                  >
                    <div>
                      {/* Top Row: icon, score matches, and bookmarks */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-lg shadow-md shrink-0">
                            {opp.logo}
                          </div>
                          <div>
                            <h4 className="font-sans font-extrabold text-sm text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1">
                              {opp.title}
                            </h4>
                            <span className="text-xs text-slate-400 font-light">{opp.organization}</span>
                          </div>
                        </div>

                        {/* Save Bookmark button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(opp.id);
                          }}
                          className={`p-2 rounded-lg border transition-all shrink-0 ${
                            isSaved
                              ? 'bg-[#00d4b4]/10 border-[#00d4b4]/30 text-[#00d4b4]'
                              : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-300 hover:border-slate-700'
                          }`}
                          title={isSaved ? 'Remove bookmark' : 'Bookmark opportunity'}
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#00d4b4]' : ''}`} />
                        </button>
                      </div>

                      {/* Brief description */}
                      <p className="text-xs text-slate-400 font-light leading-relaxed mb-4 line-clamp-2">
                        {opp.description}
                      </p>

                      {/* Info lines (Location & Compensation) */}
                      <div className="flex flex-col gap-2.5 mb-5 self-stretch border-t border-slate-900 pt-3">
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                          <span className="line-clamp-1">{opp.location}</span>
                        </div>
                        {opp.stipend && (
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                            <Briefcase className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                            <span className="text-emerald-400 font-semibold">{opp.stipend}</span>
                          </div>
                        )}
                      </div>

                      {/* Skills match block */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {opp.skillsRequired.slice(0, 4).map((skill, si) => (
                          <span
                            key={si}
                            className="text-[9px] font-bold py-0.5 px-2 bg-slate-900 border border-slate-800 rounded-md text-slate-400 uppercase tracking-wide"
                          >
                            {skill}
                          </span>
                        ))}
                        {opp.skillsRequired.length > 4 && (
                          <span className="text-[9px] font-bold py-0.5 px-1.5 bg-slate-900 border border-slate-800 rounded-md text-slate-500">
                            +{opp.skillsRequired.length - 4}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action bar */}
                    <div className="border-t border-slate-900/30 pt-3 flex items-center justify-between gap-4 mt-auto">
                      <div className="flex items-center gap-2.5">
                        {/* Match indicator pill */}
                        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">{opp.matchScore}% Match</span>
                        </div>
                        
                        {/* Urgencies days left status */}
                        <span
                          className={`text-[10px] font-bold tracking-tight rounded-lg py-1 px-2 uppercase ${
                            opp.daysLeft <= 5
                              ? 'bg-rose-500/10 text-rose-400'
                              : opp.daysLeft <= 12
                              ? 'bg-amber-400/10 text-amber-400'
                              : 'bg-blue-500/10 text-blue-400'
                          }`}
                        >
                          {opp.daysLeft} days left
                        </span>
                      </div>

                      <button
                        onClick={() => handleCardClick(opp.id)}
                        className="py-1.5 px-4 bg-slate-900 hover:bg-slate-800 text-xs font-semibold rounded-lg border border-slate-800 hover:border-blue-500/30 text-slate-200 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
                      >
                        Details <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </button>
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

