/**
 * PlatformHub Brand Identity System
 * Centralized branding constants for consistent application of brand across all components
 */

export const BRAND = {
  // Primary Identity
  name: 'PlatformHub',
  tagline: 'Smart Opportunity Discovery Platform',
  shortDescription: 'Where talent meets opportunity',
  
  // Full Descriptions
  fullDescription: 'The world\'s most intelligent opportunity discovery platform matching students, developers, and early-career learners with high-impact internships, hackathons, and scholarships.',
  
  // Mission & Vision
  mission: 'Democratize access to world-class opportunities for talented individuals worldwide',
  vision: 'Become the trusted platform for opportunity discovery and career acceleration',
  
  // Company Info
  company: 'PlatformHub, Inc.',
  year: 2026,
  location: 'San Francisco, CA',
  website: 'platformhub.app',
  
  // Contact Information
  emails: {
    support: 'hello@platformhub.app',
    partnerships: 'partners@platformhub.app',
    careers: 'careers@platformhub.app'
  },
  
  // Social & External
  social: {
    twitter: 'https://x.com/platformhub',
    linkedin: 'https://linkedin.com/company/platformhub',
    github: 'https://github.com/platformhub',
    instagram: 'https://instagram.com/platformhub'
  },
  
  // Color Palette
  colors: {
    // Primary Colors
    primary: {
      blue: '#3b82f6',      // Vibrant Blue
      purple: '#9b5bff',    // Rich Purple
      teal: '#00d4b4'       // Modern Teal
    },
    // Secondary Colors
    secondary: {
      cyan: '#06b6d4',
      amber: '#f59e0b',
      rose: '#f43f5e'
    },
    // Neutral
    neutral: {
      dark: '#050810',
      darkGray: '#0f172a',
      gray: '#64748b',
      lightGray: '#e2e8f0',
      light: '#f8fafc'
    },
    // Semantic
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#0ea5e9'
  },
  
  // Typography
  typography: {
    fontFamily: {
      sans: 'system-ui, -apple-system, sans-serif',
      mono: 'Menlo, Monaco, monospace'
    }
  },
  
  // localStorage Keys (Updated from old "ph_" prefix)
  localStorage: {
    user: 'platformhub_user',
    savedOpps: 'platformhub_saved_opportunities',
    appCards: 'platformhub_application_cards',
    activityLog: 'platformhub_activity_log',
    theme: 'platformhub_theme'
  },
  
  // Feature Flags & Names
  features: {
    opportunitiesFeed: 'Opportunities Feed',
    aiMatchmaker: 'Smart Matchmaker',
    trackerApp: 'Application Tracker',
    dashboard: 'Dashboard',
    pricing: 'Pricing Plans',
    profile: 'My Profile'
  },
  
  // Messaging
  messages: {
    welcomeLogin: 'Welcome back to PlatformHub!',
    welcomeSignup: 'Account created successfully! Welcome to PlatformHub.',
    loading: 'PlatformHub is loading...',
    noResults: 'No opportunities found. Try adjusting your filters.',
    error: 'An error occurred. Please try again.',
    success: 'Success! Changes saved to PlatformHub.'
  }
} as const;

export type BrandConfig = typeof BRAND;
