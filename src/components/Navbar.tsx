import React, { useState } from 'react';
import { Menu, X, Sparkles, LayoutDashboard, Bookmark, User, Compass, Server, HelpCircle, DollarSign, LogOut, Sun, Moon } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  savedCount: number;
  user: UserProfile | null;
  onLogout: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  savedCount,
  user,
  onLogout,
  theme,
  onToggleTheme
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { view: 'home', label: 'Home', icon: <Compass className="w-4 h-4" /> },
    { view: 'opportunities', label: 'Opportunities', icon: <Server className="w-4 h-4" /> },
    { view: 'recommendations', label: 'AI Engine', icon: <Sparkles className="w-4 h-4" /> },
    { view: 'tracker', label: 'Kanban Tracker', icon: <LayoutDashboard className="w-4 h-4" /> },
    { view: 'dashboard', label: 'Dashboard', icon: <Bookmark className="w-4 h-4" /> },
    { view: 'pricing', label: 'Pricing', icon: <DollarSign className="w-4 h-4" /> },
  ];

  const handleLinkClick = (view: string) => {
    onNavigate(view);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050810]/80 dark:bg-[#050810]/80 light:bg-white/90 backdrop-blur-md border-b border-slate-900 dark:border-slate-800/80 light:border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        
        {/* LOGO */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); handleLinkClick('home'); }}
          className="flex items-center gap-1 font-sans font-extrabold text-xl bg-gradient-to-r from-blue-400 to-[#9b5bff] bg-clip-text text-transparent"
        >
          PlatformHub
        </a>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeView === item.view;
            return (
              <a
                key={item.view}
                href="#"
                onClick={(e) => { e.preventDefault(); handleLinkClick(item.view); }}
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 py-1.5 px-3 rounded-lg ${
                  isActive
                    ? 'text-white dark:text-white light:text-slate-900 bg-slate-900 dark:bg-slate-800/40 light:bg-slate-100'
                    : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900 hover:bg-slate-900/40 dark:hover:bg-slate-800/25 light:hover:bg-slate-100/50'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* ACTIONS */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* THEME TOGGLE */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 dark:hover:bg-slate-800/40 light:hover:bg-slate-100 border border-slate-800/40 light:border-slate-200 transition-colors"
            title="Toggle theme mode"
            aria-label="Toggle between dark and light theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          {/* Bookmarks Pill */}
          <button
            onClick={() => handleLinkClick('dashboard')}
            className="flex items-center gap-1.5 py-1.5 px-3 bg-slate-900/60 dark:bg-slate-950/40 border border-slate-800 dark:border-slate-800 light:border-slate-200 text-xs font-semibold rounded-lg text-[#00d4b4] hover:border-[#00d4b4]/40 transition-all"
            title="Saved Opportunities"
            aria-label="View saved opportunities"
          >
            <Bookmark className="w-3.5 h-3.5 fill-[#00d4b4]/20" />
            <span>Saved ({savedCount})</span>
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleLinkClick('profile')}
                className="flex items-center gap-2 text-sm font-medium text-slate-200 dark:text-slate-200 light:text-slate-700 py-1 px-3 border border-slate-800/60 hover:border-slate-700/80 rounded-lg hover:bg-slate-900/20 transition-all"
              >
                <div className="text-base">{user.avatar}</div>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-xs font-semibold">{user.name}</span>
                  <span className="text-[9px] text-[#9b5bff] font-extrabold uppercase mt-0.5 tracking-wider">
                    {user.membershipPlan}
                  </span>
                </div>
              </button>
              
              <button
                onClick={onLogout}
                className="p-2 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-lg transition-colors border border-transparent hover:border-rose-500/20"
                title="Sign Out"
                aria-label="Sign out from your account"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLinkClick('login')}
                className="text-xs font-semibold py-2 px-4 rounded-lg bg-transparent border border-slate-800 hover:border-blue-400/50 hover:bg-slate-900 text-slate-300 transition-all"
              >
                Sign In
              </button>
              <button
                onClick={() => handleLinkClick('signup')}
                className="text-xs font-bold py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white shadow-md hover:shadow-blue-500/20 active:translate-y-px transition-all"
              >
                Register
              </button>
            </div>
          )}
        </div>

        {/* MOBILE INTERFACE ICON */}
        <div className="flex items-center gap-3 lg:hidden">
          <button
            onClick={onToggleTheme}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Toggle between dark and light theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>
          
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-lg text-slate-400 hover:text-white transition-colors"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE NAV OVERLAY */}
      {mobileOpen && (
        <div className="lg:hidden animate-[fadeUp_0.2s_ease] bg-[#050810] dark:bg-[#050810] light:bg-white border-b border-slate-900/60 dark:border-slate-800/80 px-6 py-6 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = activeView === item.view;
              return (
                <a
                  key={item.view}
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleLinkClick(item.view); }}
                  className={`flex items-center gap-2.5 p-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[#4f8dff] bg-blue-500/10'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="border-t border-slate-900 dark:border-slate-800/60 pt-4 flex flex-col gap-3">
            <button
              onClick={() => handleLinkClick('dashboard')}
              className="flex items-center justify-between p-2.5 bg-slate-950/40 border border-slate-800/80 rounded-lg text-slate-300 hover:text-[#00d4b4] text-sm"
            >
              <span className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#00d4b4]" />
                Saved Opportunities
              </span>
              <span className="bg-[#00d4b4]/15 text-[#00d4b4] px-1.5 py-0.5 text-xs rounded-full font-bold">
                {savedCount}
              </span>
            </button>

            {user ? (
              <div className="flex flex-col gap-2.5">
                <div
                  onClick={() => handleLinkClick('profile')}
                  className="flex items-center gap-3 p-2.5 border border-slate-800/60 rounded-lg hover:bg-slate-900/20 cursor-pointer"
                >
                  <div className="text-xl">{user.avatar}</div>
                  <div>
                    <div className="text-sm font-semibold text-slate-100">{user.name}</div>
                    <div className="text-[10px] text-[#9b5bff] font-extrabold uppercase mt-0.5 tracking-wider">
                      {user.membershipPlan} MEMBER
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onLogout();
                    setMobileOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 border border-rose-950/40 hover:bg-rose-500/10 hover:text-rose-200 text-rose-400 rounded-lg text-sm font-medium transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3 mt-2">
                <button
                  onClick={() => handleLinkClick('login')}
                  className="flex-1 py-2.5 text-center font-semibold bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-800 rounded-lg text-sm transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleLinkClick('signup')}
                  className="flex-1 py-2.5 text-center font-bold bg-gradient-to-r from-blue-500 to-[#9b5bff] text-white rounded-lg text-sm transition-all"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
