# StudyBuddy

A collaborative web platform designed to help university students find compatible study partners, plan study sessions, and track their academic progress.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Runtime:** Bun
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Backend:** Firebase (Authentication, Firestore, Cloud Functions, FCM)
- **Deployment:** Vercel
- **Linting:** ESLint

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your system
- Node.js 18+ (if Bun is not available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sancerro/StuddyBuddy.git
cd StudyBuddy
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your Firebase configuration values in `.env.local`:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` (optional)

4. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
StudyBuddy/
├── app/                      # Next.js App Router pages and layouts
│   ├── (auth)/              # Authentication routes (route groups)
│   ├── (posts)/             # Post-related routes
│   ├── (chat)/              # Chat routes
│   ├── (matching)/          # Matching routes
│   ├── (planner)/           # Planner routes
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   ├── error.tsx            # Error boundary
│   ├── loading.tsx          # Loading boundary
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── ui/                  # Base UI components (buttons, inputs, etc.)
│   ├── auth/                # Authentication components
│   ├── posts/               # Post-related components
│   ├── matching/            # Match request components
│   ├── chat/                # Chat UI components
│   ├── planner/             # Planner components
│   └── notifications/       # Notification components
├── lib/                     # Utility libraries
│   ├── firebase/            # Firebase utilities
│   └── utils/               # Shared utility functions
├── hooks/                   # Custom React hooks
├── types/                   # TypeScript type definitions
├── firebase/                # Firebase configuration and services
│   ├── config.ts            # Firebase app initialization
│   ├── auth.ts              # Authentication utilities
│   └── firestore.ts         # Firestore utilities
├── public/                  # Static assets
├── .env.example             # Environment variable template
├── next.config.ts           # Next.js configuration
├── tsconfig.json            # TypeScript configuration
├── postcss.config.mjs        # PostCSS configuration (Tailwind v4)
└── package.json             # Dependencies and scripts
```

## Feature Modules (WBS Alignment)

The project is organized according to the Work Breakdown Structure:

1. **Authentication & Profile (D1)** - `components/auth/`, `app/(auth)/`
2. **Posts & Listing (D2)** - `components/posts/`, `app/(posts)/`
3. **Matching Requests (D3)** - `components/matching/`, `app/(matching)/`
4. **Real-Time Chat (D4)** - `components/chat/`, `app/(chat)/`
5. **Planner & Progress (D5)** - `components/planner/`, `app/(planner)/`
6. **Notifications (D6)** - `components/notifications/`
7. **Recommendation & Filtering (D7)** - Will be added as features develop
8. **External Data Integration (D8)** - Will be added in `lib/` or `firebase/`

## Development Scripts

```bash
# Development server
bun dev

# Production build
bun build

# Start production server
bun start

# Lint code
bun lint
```

## Environment Variables

All environment variables should be prefixed with `NEXT_PUBLIC_` to be available in the browser. See `.env.example` for the required variables.

## Deployment

The project is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Preview deployments are automatically created for pull requests
4. Production deployments are triggered on the main branch

## Contributing

Please follow the project structure and coding standards:
- Use TypeScript for all new files
- Follow the existing folder structure
- Write accessible, semantic HTML
- Use Tailwind CSS for styling
- Keep components focused and reusable

## License

[Add license information here]
