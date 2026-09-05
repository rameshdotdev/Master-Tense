# Interactive English Tenses Learning App

A modern, full-featured web application designed to help language learners master all 12 English grammatical tenses through structured formulas, interactive exercises, timeline visualizers, quizzes, and cloud-synced progress tracking.

---

## 🛠️ Tech Stack

### Frontend & Core
- **Framework**: [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom CSS custom properties for dynamic light/dark theming
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Motion](https://motion.dev/) (`motion/react`)
- **Delight & Gamification**: `canvas-confetti`

### Backend & Cloud Infrastructure
- **Authentication**: [Firebase Authentication](https://firebase.google.com/docs/auth) with Google Sign-In (`GoogleAuthProvider` via popup flow)
- **Database & Persistence**: [Cloud Firestore](https://firebase.google.com/docs/firestore) for persistent multi-device learning profiles and realtime statistics
- **Security Rules**: Granular user-scoped Firestore rules (`/users/{userId}`) ensuring data isolation and privacy

---

## 🐛 The Hardest Bug (And How It Was Solved)

### 1. State Race Condition During Firebase Cloud Hydration
- **The Problem**: When a user signed in with Google, `AppContext` would immediately observe the new authenticated user via `onAuthStateChanged`. However, because the component's `stats` state already held default guest values in memory, the local persistence `useEffect` triggered before the remote Firestore document could be fetched. This caused freshly signed-in users with existing cloud progress to occasionally have their remote stats overwritten with blank guest stats.
- **The Solution**: 
  - Introduced a synchronizing lifecycle ref (`isCloudLoadedRef`) that starts as `false`.
  - Deferred writing updates to Firestore until `fetchOrInitUserDoc` explicitly completed loading or creating the remote profile.
  - Implemented seamless data migration: if a new user practices as a guest and *then* logs in for the first time, their guest progress is intelligently migrated to their new cloud account without data loss.

### 2. Dark/Light Theme Switching Collision
- **The Problem**: Hardcoded dark hex values (`#0A0A0A`, `#121212`) on the root HTML, body, and input tags conflicted with Tailwind theme toggling, resulting in invisible inputs or unreadable text when switching to light mode.
- **The Solution**:
  - Replaced hardcoded background colors with CSS variables and class-based theming (`.dark` and `.light`).
  - Added explicit contrast rules in `src/index.css` for form elements, modals, and navigation bars to maintain WCAG AA readability in both palettes.

---

## ✨ Features

### 1. 12-Tense Curriculum & Knowledge Base
- Complete coverage of all 12 tenses categorized across Past, Present, and Future (Simple, Continuous, Perfect, Perfect Continuous).
- Detailed breakdown per tense: affirmative/negative/interrogative formulas, usage rules, signal words, common errors, and real-world example dialogues.
- Interactive timeline diagrams visualizing grammatical aspects and time progression.

### 2. Interactive Practice Arena
- Multiple question modes:
  - Fill-in-the-blank with verb conjugation prompts.
  - Multiple choice with instant grammar explanations.
  - Sentence reordering and error spotting.
- Immediate feedback highlighting exactly why a choice was correct or incorrect.

### 3. Timed Quizzes
- Comprehensive multi-tense quizzes with adjustable difficulty.
- Real-time score calculation and detailed end-of-quiz analysis.
- Instant feedback and performance summaries saved to user history.

### 4. Spaced Repetition Flashcards
- Card flip interactions with tense formulas and example sentences.
- Self-assessment ratings: *Easy*, *Good*, or *Hard* that adjust review frequency.

### 5. Side-by-Side Tense Comparison
- Direct comparative analysis of commonly confused tenses (e.g., *Past Simple vs. Present Perfect*, *Past Continuous vs. Past Simple*).
- Side-by-side timelines and signal word charts.

### 6. Smart Mistake Notebook
- Automatically records questions answered incorrectly during practice or quizzes.
- Provides targeted retry sessions so learners can review and master weak spots.

### 7. Printable / Exportable Cheat Sheet
- Compact, high-density matrix of all 12 tenses with formulas, key keywords, and sample sentences for quick offline revision.

### 8. Gamification & Progression
- Earn **XP** and level up ranks from *Tense Beginner* to *Tense Master*.
- Daily streak tracking with activity timestamps.
- Dynamic achievement badges rewarded for milestones (e.g., Perfect Score, First Lesson, 7-Day Streak).

### 9. Google Sign-In & Cloud Session Management
- One-click Google Sign-In to backup XP, level, mistakes, and completed lessons.
- Seamless guest mode with local caching for instant, zero-friction learning.
- Real-time sync indicator displaying the last cloud sync timestamp.

### 10. Global Command Palette (`⌘K` / `Ctrl+K`)
- Quick-search modal allowing rapid navigation directly to any tense, exercise, or utility.

---

## ⚙️ How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                         React UI                            │
│  (Navbar, HomePage, Learn, Practice, Quiz, Flashcards, etc) │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    AppContext Provider                      │
│   • Active Route & Navigation State                         │
│   • Theme State (Dark / Light)                              │
│   • User Statistics (XP, Level, Streak, Completed Lessons)  │
│   • Mistake Notebook & Quiz History                         │
└───────────────────┬─────────────────────┬───────────────────┘
                    │                     │
       Logged Out   │                     │  Logged In (Google)
                    ▼                     ▼
┌─────────────────────────┐  ┌────────────────────────────────┐
│   Local Storage Cache   │  │   Firebase Authentication      │
│   (Guest Session State) │  │   (GoogleAuthProvider Popup)   │
└─────────────────────────┘  └────────────────┬───────────────┘
                                              │
                                              ▼
                             ┌────────────────────────────────┐
                             │       Cloud Firestore          │
                             │       collection: /users/      │
                             │       doc: {userId}            │
                             │       (Stats & Profile Backup) │
                             └────────────────────────────────┘
```

### 1. Application Boot & Session Initialization
1. When the app loads, `AppContext` initializes local state from `localStorage` to display the UI immediately with zero latency.
2. Firebase's `onAuthStateChanged` listener checks for an active session:
   - **If authenticated**: The user's profile and learning statistics are retrieved from Firestore (`/users/{uid}`). If it is a new user's first login, their guest progress is safely seeded to the database.
   - **If guest**: The app operates in local-only mode, caching all progress in `localStorage`.

### 2. State Mutation & Firestore Synchronization
- Every time a user completes a lesson, answers a question, or clears a mistake from their notebook, the `AppContext` updates the local React state.
- If the user is authenticated, an asynchronous background update sends the updated `UserStats` payload to Firestore using `{ merge: true }`, updating the `lastSyncedAt` timestamp.

### 3. Security Rules Architecture
Security rules deployed to Firestore restrict read and write access strictly to the document owner:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
No user can view, modify, or overwrite another user's progress or profile data.

---

## 📂 Project Structure

```
├── firebase-applet-config.json   # Firebase project credentials
├── firebase-blueprint.json       # Database schema & entity definitions
├── firestore.rules               # Firestore security access rules
├── src/
│   ├── components/
│   │   ├── cheatsheet/           # Printable cheat sheet view
│   │   ├── common/               # Navbar, MobileBottomNav, SearchModal
│   │   ├── compare/              # Tense comparison tool
│   │   ├── flashcards/           # Interactive flashcard deck
│   │   ├── home/                 # Dashboard with progress overview
│   │   ├── learn/                # 12-tense lessons & timeline diagrams
│   │   ├── mistakes/             # Smart mistake notebook
│   │   ├── practice/             # Practice arena with multiple question types
│   │   ├── profile/              # User profile, Google sign-in, & cloud stats modal
│   │   └── quiz/                 # Timed quiz engine
│   ├── context/
│   │   └── AppContext.tsx        # Central state, auth management & sync engine
│   ├── data/
│   │   └── tensesData.ts         # Comprehensive dataset for all 12 tenses
│   ├── lib/
│   │   └── firebase.ts           # Firebase client, Auth providers & Firestore helpers
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces for tenses, questions, and stats
│   ├── App.tsx                   # Main router and view container
│   ├── index.css                 # Global Tailwind styles & dark/light variables
│   └── main.tsx                  # React entry point
└── package.json                  # Dependencies and scripts
```
