# StudyBuddy Developer Guide

## 1. Project Overview
StudyBuddy is a collaborative web platform for university students to find study partners, plan sessions, and track progress.

### Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Runtime:** Bun
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Backend:** Firebase (Auth, Firestore, Functions, FCM)
- **Deployment:** Vercel

## 2. Getting Started

### Prerequisites
- [Bun](https://bun.sh) installed
- Node.js 18+ (fallback)

### Installation
```bash
git clone https://github.com/Sancerro/StuddyBuddy.git
cd StudyBuddy
bun install
cp .env.example .env.local # Fill Firebase config
bun dev
```

### Common Commands
- `bun dev`: Start development server
- `bun build`: Build for production
- `bun start`: Start production server
- `bun lint`: Run linter
- `bun exec shadcn-ui add [component]`: Add UI component

## 3. Project Structure
```
app/                  # Next.js App Router (pages & layouts)
  (auth)/             # Login, Signup, Profile
  (posts)/            # Post listings & creation
  (chat)/             # Real-time chat
  (planner)/          # Task board & progress
components/           # React Components
  ui/                 # shadcn/ui base components
  auth/, posts/, ...  # Feature-specific components
lib/                  # Utilities & Configuration
  firebase/           # Firebase initialization
  utils.ts            # Tailwind cn() helper
```

## 4. Design System Essentials

### Colors (Tailwind Classes)
- **Backgrounds:** Warm Beige (`bg-[#faf9f7]`), Surface (`bg-[#f5f1ed]`)
- **Primary:** Blue (`bg-blue-500`, `text-blue-500`)
- **Secondary:** Purple (`bg-purple-500`)
- **Status:** Green (Success), Red (Destructive/Error), Amber (Warning)

### Layout & Spacing
- **Base Unit:** 8px (e.g., `gap-2` = 8px, `p-4` = 16px)
- **Breakpoints:** Mobile (<640px), Tablet (640px+), Desktop (1024px+)
- **Container:** Centered, max-width depends on breakpoint.

### Components (shadcn/ui)
- **Installation:** `bun exec shadcn-ui add [name]`
- **Customization:** Edit files in `components/ui/`.
- **Accessibility:** Ensure keyboard nav, focus rings, and ARIA labels.

## 5. Feature Modules (Implementation Status)

1.  **Authentication (Phase 2):** Firebase Auth integration, Profile management.
2.  **Posts (Phase 3):** Listing study sessions, filtering by course/topic.
3.  **Matching (Phase 4):** Request/Accept flow for study partners.
4.  **Chat (Phase 5):** Real-time messaging using Firestore listeners.
5.  **Planner (Phase 6):** Kanban-style task board and progress widgets.
6.  **Notifications (Phase 7):** In-app alerts and Push notifications (FCM).

## 6. Key Development Rules
- **Always** use TypeScript.
- **Always** use Tailwind utility classes (avoid custom CSS files).
- **Always** implement loading (Skeleton) and empty states.
- **Never** commit console logs or secrets.
- **Validation:** Use Zod (implied by shadcn forms) or manual validation for all inputs.

