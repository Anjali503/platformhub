# PlatformHub

PlatformHub is a modern AI-inspired opportunity discovery platform built with React, TypeScript, and Vite. The platform helps students and professionals discover internships, hackathons, scholarships, fellowships, open-source programs, remote jobs, and career opportunities through an intuitive dashboard experience.

## Features

### Opportunity Discovery

* Browse opportunities across multiple categories
* Search and filter opportunities
* View detailed opportunity information
* Save opportunities for later review

### AI Recommendations

* Personalized recommendation interface
* Skill-based opportunity matching
* Career goal tracking
* Opportunity scoring system

### Dashboard

* Modern analytics dashboard
* Opportunity statistics
* Activity tracking
* Personalized insights

### Application Tracker

* Track application progress
* Status management
* Visual workflow organization
* Progress monitoring

### User Profile

* Profile management
* Skills and interests tracking
* Personalized preferences
* Saved opportunities management

### Authentication UI

* Login interface
* Signup interface
* Form validation
* User-friendly error handling

### Responsive Design

* Mobile-friendly
* Tablet optimized
* Desktop experience
* Modern UI/UX design

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* CSS3

### State Management

* React Hooks
* Local Storage

### Development Tools

* Git
* GitHub
* Vercel

---

## Project Structure

```text
src/
├── components/
├── views/
│   ├── HomeView.tsx
│   ├── DashboardView.tsx
│   ├── OpportunitiesView.tsx
│   ├── OpportunityDetailsView.tsx
│   ├── AiRecommendationsView.tsx
│   ├── ProfileView.tsx
│   ├── TrackerView.tsx
│   ├── AuthView.tsx
│   ├── PricingView.tsx
│   └── ContactView.tsx
├── types.ts
├── mockData.ts
├── utils.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Anjali503/platformhub.git
```

Navigate into the project:

```bash
cd platformhub
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Deployment

This project is deployed using Vercel.

Deploy your own version:

1. Fork the repository
2. Import the project into Vercel
3. Configure build settings:

   * Build Command: `npm run build`
   * Output Directory: `dist`
4. Deploy

---

## Current Architecture

This version of PlatformHub is a frontend-focused MVP.

Data persistence currently uses:

* Local Storage
* Client-side state management

Future enhancements may include:

* MongoDB Atlas integration
* Node.js backend APIs
* User authentication
* Real-time notifications
* Opportunity management dashboard
* AI-powered recommendation engine

---

## Accessibility & Quality

* Responsive design
* Error boundaries
* Form validation
* Accessibility improvements
* Local storage error handling
* TypeScript type safety
* Production build verified

---

## Author

**Anjali Agrahari**

GitHub: https://github.com/Anjali503

---

## License

This project is intended for educational, portfolio, and demonstration purposes.

