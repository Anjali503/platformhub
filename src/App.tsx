import React, { useState, useEffect, useMemo } from 'react';
import { initialUserProfile, initialApplicationCards, initialActivityLog } from './mockData';
import { UserProfile, ApplicationTrackerCard, ActivityLog, Opportunity } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer, ToastMessage } from './components/Toast';
import { ErrorBoundary } from './components/ErrorBoundary';

// Views
import { HomeView } from './views/HomeView';
import { OpportunitiesView } from './views/OpportunitiesView';
import { OpportunityDetailsView } from './views/OpportunityDetailsView';
import { AiRecommendationsView } from './views/AiRecommendationsView';
import { DashboardView } from './views/DashboardView';
import { TrackerView } from './views/TrackerView';
import { ProfileView } from './views/ProfileView';
import { PricingView } from './views/PricingView';
import { ContactView } from './views/ContactView';
import { AuthView } from './views/AuthView';

export default function App() {
  // Global View Navigation State
  const [activeView, setActiveView] = useState<string>('home');
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string>('gsoc-2025');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Persistence States (linked to localStorage)
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('platformhub_user');
      return saved ? JSON.parse(saved) : initialUserProfile;
    } catch (error) {
      console.warn('Failed to parse user from localStorage:', error);
      return initialUserProfile;
    }
  });

  const [savedOpportunities, setSavedOpportunities] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('platformhub_saved_opportunities');
      return saved ? JSON.parse(saved) : ['gsoc-2025', 'meta-swe-intern'];
    } catch (error) {
      console.warn('Failed to parse saved opportunities from localStorage:', error);
      return ['gsoc-2025', 'meta-swe-intern'];
    }
  });

  const [applicationCards, setApplicationCards] = useState<ApplicationTrackerCard[]>(() => {
    try {
      const saved = localStorage.getItem('platformhub_application_cards');
      return saved ? JSON.parse(saved) : initialApplicationCards;
    } catch (error) {
      console.warn('Failed to parse application cards from localStorage:', error);
      return initialApplicationCards;
    }
  });

  const [activityLog, setActivityLog] = useState<ActivityLog[]>(() => {
    try {
      const saved = localStorage.getItem('platformhub_activity_log');
      return saved ? JSON.parse(saved) : initialActivityLog;
    } catch (error) {
      console.warn('Failed to parse activity log from localStorage:', error);
      return initialActivityLog;
    }
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('platformhub_theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
      return 'dark';
    } catch (error) {
      console.warn('Failed to read theme from localStorage:', error);
      return 'dark';
    }
  });

  // Toast Alerts States
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Local Storage Sync Effects
  useEffect(() => {
    if (user) {
      localStorage.setItem('platformhub_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('platformhub_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('platformhub_saved_opportunities', JSON.stringify(savedOpportunities));
  }, [savedOpportunities]);

  useEffect(() => {
    localStorage.setItem('platformhub_application_cards', JSON.stringify(applicationCards));
  }, [applicationCards]);

  useEffect(() => {
    localStorage.setItem('platformhub_activity_log', JSON.stringify(activityLog));
  }, [activityLog]);

  useEffect(() => {
    localStorage.setItem('platformhub_theme', theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  // Scroll disclosure transitions on view shifts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeView]);

  // Toast helper action
  const handleAddToast = (text: string, type: ToastMessage['type'] = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, text, type }]);
  };

  const handleRemoveToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Activity logger helper
  const logActivity = (text: string, type: ActivityLog['type']) => {
    const logItem: ActivityLog = {
      id: Date.now().toString(),
      text,
      timestamp: 'Just now',
      type,
    };
    setActivityLog((prev) => [logItem, ...prev]);
  };

  // Navigation handlers
  const handleNavigate = (view: string, option?: string) => {
    if (view === 'opportunity-details' && option) {
      setSelectedOpportunityId(option);
    }
    if (view === 'opportunities' && option) {
      setSelectedCategory(option);
    }
    setActiveView(view);
  };

  // Bookmark Toggle
  const handleToggleBookmark = (id: string) => {
    setSavedOpportunities((prev) => {
      const isBookmarked = prev.includes(id);
      if (isBookmarked) {
        handleAddToast('Removed opportunity from board bookmarks.', 'info');
        logActivity(`Removed opportunity slot ${id} from saved folder`, 'bookmark');
        return prev.filter((oId) => oId !== id);
      } else {
        handleAddToast('Added opportunity to board bookmarks!', 'success');
        logActivity(`Bookmarked opportunity item ${id}`, 'bookmark');
        return [...prev, id];
      }
    });
  };

  // Submit dynamic job application integration
  const handleAddApplication = (opp: Opportunity, notes: string) => {
    const isAlreadTracked = applicationCards.some((c) => c.opportunityId === opp.id && c.stage === 'Applied');
    if (isAlreadTracked) {
      handleAddToast(`Already tracking active application for ${opp.title}!`, 'error');
      return;
    }

    const card: ApplicationTrackerCard = {
      id: `app-${Date.now().toString()}`,
      opportunityId: opp.id,
      title: opp.title,
      organization: opp.organization,
      category: opp.category,
      stage: 'Applied',
      appliedDate: new Date().toISOString().split('T')[0],
      notes: notes,
      matchScore: opp.matchScore
    };

    setApplicationCards((prev) => [card, ...prev]);
    handleAddToast(`Filed application: ${opp.title}!`, 'success');
    logActivity(`Flipped active pipeline for "${opp.title}" onto Applied column`, 'application');
  };

  // Shift column level under Kanban Tracker
  const handleUpdateCardStage = (cardId: string, nextStage: ApplicationTrackerCard['stage']) => {
    setApplicationCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          if (c.stage !== nextStage) {
            handleAddToast(`Shifted card stage to: ${nextStage}.`, 'info');
            logActivity(`Moved pipeline for "${c.title}" to ${nextStage}`, 'application');
          }
          return { ...c, stage: nextStage };
        }
        return c;
      })
    );
  };

  const handleDeleteCard = (cardId: string) => {
    const entity = applicationCards.find((c) => c.id === cardId);
    setApplicationCards((prev) => prev.filter((c) => c.id !== cardId));
    handleAddToast(`Deleted workflow card: "${entity?.title || 'Job Slot'}"`, 'info');
    logActivity(`Deleted tracker application for "${entity?.title || 'Unknown'}"`, 'application');
  };

  // Form custom application additions under Kanban UI
  const handleAddCustomCard = (cardDetails: Omit<ApplicationTrackerCard, 'id' | 'appliedDate'>) => {
    const card: ApplicationTrackerCard = {
      ...cardDetails,
      id: `app-${Date.now().toString()}`,
      appliedDate: new Date().toISOString().split('T')[0],
    };
    setApplicationCards((prev) => [card, ...prev]);
    handleAddToast(`Added tracking entry: "${card.title}"!`, 'success');
    logActivity(`Logged manual tracker role submission for "${card.title}"`, 'application');
  };

  const handleUpdateProfileDetails = (updated: UserProfile) => {
    setUser(updated);
    logActivity('Saved updated profile metrics', 'profile');
  };

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
    logActivity('Successfully authenticated user session', 'profile');
  };

  const handleLogout = () => {
    setUser(null);
    setSavedOpportunities([]);
    setApplicationCards([]);
    localStorage.removeItem('platformhub_user');
    localStorage.removeItem('platformhub_saved_opportunities');
    localStorage.removeItem('platformhub_application_cards');
    localStorage.removeItem('platformhub_activity_log');
    localStorage.removeItem('platformhub_theme');
    handleAddToast('Successfully signed out of PlatformHub.', 'info');
    setActiveView('home');
  };

  const handleToggleThemeMode = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    handleAddToast(`Switched presentation layout to ${theme === 'dark' ? 'Sleek Light' : 'Cosmic Dark'} Mode!`, 'info');
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#050810] text-[#f0f2ff]' : 'bg-slate-50 text-slate-800'} transition-colors duration-200`}>
      
      {/* Dynamic Orbs background decorators for premium design depth */}
      {theme === 'dark' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-[-200px] left-[-200px] w-[700px] h-[700px] rounded-full blur-[100px] bg-gradient-to-br from-blue-500/10 to-transparent"></div>
          <div className="absolute bottom-[20%] right-[-150px] w-[600px] h-[600px] rounded-full blur-[110px] bg-gradient-to-tr from-purple-500/10 to-transparent"></div>
          <div className="absolute top-[60%] left-[30%] w-[400px] h-[400px] rounded-full blur-[90px] bg-gradient-to-br from-[#00d4b4]/5 to-transparent"></div>
        </div>
      )}

      {/* STICKY HEADER NAVBAR */}
      <Navbar
        activeView={activeView}
        onNavigate={handleNavigate}
        savedCount={savedOpportunities.length}
        user={user}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={handleToggleThemeMode}
      />

      {/* DYNAMIC VIEW ROUTER PANEL CONTAINER */}
      <main className="min-h-[85vh] h-full relative z-10 transition-all duration-300">
        
        {activeView === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onAddToast={handleAddToast}
          />
        )}

        {activeView === 'opportunities' && (
          <OpportunitiesView
            onNavigate={handleNavigate}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            savedOpportunities={savedOpportunities}
            onToggleBookmark={handleToggleBookmark}
          />
        )}

        {activeView === 'opportunity-details' && (
          <OpportunityDetailsView
            opportunityId={selectedOpportunityId}
            savedOpportunities={savedOpportunities}
            onToggleBookmark={handleToggleBookmark}
            onNavigate={handleNavigate}
            user={user}
            onAddApplication={handleAddApplication}
            onAddToast={handleAddToast}
          />
        )}

        {activeView === 'recommendations' && (
          <AiRecommendationsView
            user={user}
            savedOpportunities={savedOpportunities}
            onToggleBookmark={handleToggleBookmark}
            onNavigate={handleNavigate}
            onAddToast={handleAddToast}
          />
        )}

        {activeView === 'dashboard' && (
          <DashboardView
            user={user}
            savedOpportunities={savedOpportunities}
            onToggleBookmark={handleToggleBookmark}
            onNavigate={handleNavigate}
            activityLog={activityLog}
            applicationCards={applicationCards}
          />
        )}

        {activeView === 'tracker' && (
          <TrackerView
            user={user}
            applicationCards={applicationCards}
            onUpdateCardStage={handleUpdateCardStage}
            onDeleteCard={handleDeleteCard}
            onAddCustomCard={handleAddCustomCard}
            onAddToast={handleAddToast}
          />
        )}

        {activeView === 'profile' && (
          <ProfileView
            user={user}
            onUpdateProfile={handleUpdateProfileDetails}
            onAddToast={handleAddToast}
          />
        )}

        {activeView === 'pricing' && (
          <PricingView
            user={user}
            onUpdateProfile={handleUpdateProfileDetails}
            onAddToast={handleAddToast}
            onNavigate={handleNavigate}
          />
        )}

        {activeView === 'contact' && (
          <ContactView
            onAddToast={handleAddToast}
          />
        )}

        {activeView === 'login' && (
          <AuthView
            initialTab="login"
            onLogin={handleLogin}
            onNavigate={handleNavigate}
            onAddToast={handleAddToast}
          />
        )}

        {activeView === 'signup' && (
          <AuthView
            initialTab="signup"
            onLogin={handleLogin}
            onNavigate={handleNavigate}
            onAddToast={handleAddToast}
          />
        )}

      </main>

      {/* CORE FOOTER */}
      <Footer
        onAddToast={handleAddToast}
        onNavigate={handleNavigate}
      />

      {/* ACTIVE TOAST MESSAGES FEED */}
      <ToastContainer
        toasts={toasts}
        removeToast={handleRemoveToast}
      />

    </div>
    </ErrorBoundary>
  );
}
