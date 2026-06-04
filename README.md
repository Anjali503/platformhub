# PlatformHub

🚀 **Live Demo:** https://platformhub-sand.vercel.app

PlatformHub is a modern opportunity discovery platform designed to help students and early-career professionals explore internships, hackathons, scholarships, fellowships, open-source programs, remote jobs, and career growth opportunities through a clean and interactive user experience.

---

## Features

### Opportunity Discovery

* Browse opportunities across multiple categories
* Search and filter opportunities
* Opportunity detail pages
* Save/bookmark opportunities

### AI-Inspired Recommendations

* Personalized recommendation interface
* Skill-based opportunity matching
* Career-focused suggestions
* Opportunity scoring system

### Dashboard

* Interactive dashboard experience
* Opportunity insights
* User activity overview
* Progress tracking

### Application Tracker

* Track applications visually
* Multiple status stages

  * Applied
  * Under Review
  * Interview
  * Selected
  * Rejected
* Progress monitoring

### User Profile

* Profile management
* Skills and interests
* Personal preferences
* Saved opportunities

### Modern UI/UX

* Responsive design
* Mobile-friendly experience
* Dark mode support
* Toast notifications
* Smooth navigation
* Accessibility improvements

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* CSS

### Storage

* Local Storage

### Deployment

* Vercel

### Version Control

* Git
* GitHub

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
├── App.tsx
├── main.tsx
├── mockData.ts
├── types.ts
├── utils.ts
└── index.css
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Anjali503/platformhub.git
```

Move into the project directory:

```bash
cd platformhub
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

---

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## Deployment

The application is deployed on Vercel.

Live Website:

```text
https://platformhub-sand.vercel.app
```

---

## Quality Assurance

The project has undergone frontend QA testing including:

* Build verification
* TypeScript validation
* Form validation testing
* Accessibility improvements
* Error boundary implementation
* Local storage safety checks
* Responsive design testing
* Navigation testing

---

## Current Architecture

This project is currently a frontend-focused MVP.

Data persistence uses:

* Browser Local Storage
* Client-side state management

No backend or database integration is currently required for operation.

---

## Future Enhancements

* MongoDB integration
* Node.js backend APIs
* User authentication system
* Real-time notifications
* Advanced recommendation engine
* Admin dashboard
* Opportunity management system

---

## Author

**Anjali Agrahari**

GitHub: https://github.com/Anjali503

---

## License

This project is created for educational, portfolio, and demonstration purposes.
