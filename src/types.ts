export interface Opportunity {
  id: string;
  title: string;
  organization: string;
  logo: string; // Emoji or short symbol
  category: 'Internships' | 'Hackathons' | 'Scholarships' | 'Open Source' | 'Fellowships' | 'Remote Jobs' | 'Startups' | 'Competitions' | 'Workshops' | 'Conferences';
  description: string;
  longDescription?: string;
  stipend?: string;
  location: string;
  deadlineDate: string; // YYYY-MM-DD
  daysLeft: number;
  skillsRequired: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  matchScore: number;
  isFeatured?: boolean;
}

export type ApplicationStage = 'Applied' | 'Under Review' | 'Interview' | 'Selected' | 'Rejected';

export interface ApplicationTrackerCard {
  id: string;
  opportunityId?: string;
  title: string;
  organization: string;
  category: string;
  stage: ApplicationStage;
  appliedDate: string;
  notes?: string;
  matchScore?: number;
}

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  bio: string;
  avatar: string;
  skills: string[];
  interests: string[];
  goals: string[];
  resumeName?: string;
  membershipPlan: 'Free' | 'Pro' | 'Premium';
}

export interface ActivityLog {
  id: string;
  text: string;
  timestamp: string; // e.g. "2 hours ago"
  type: 'bookmark' | 'application' | 'profile' | 'ai';
}
