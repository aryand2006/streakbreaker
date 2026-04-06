<div align="center">

# STREAKBREAKER

**Break routine. Post proof. Let your friends decide.**

A social anti-routine game that turns everyday mundane behaviors into playful micro-challenges among friends.

[![Live Demo](https://img.shields.io/badge/Live_Demo-streakbreaker.vercel.app-BFFF00?style=for-the-badge&logo=vercel&logoColor=black)](https://streakbreaker.vercel.app)
[![XHacks CMU](https://img.shields.io/badge/XHacks_CMU-Best_Use_of_V0-A855F7?style=for-the-badge)](https://xhacks.xyz)
[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

<br/>

<img src="https://img.shields.io/badge/status-live-BFFF00?style=flat-square" alt="Status" />
<img src="https://img.shields.io/github/languages/top/aryand2006/streakbreaker?style=flat-square&color=3178C6" alt="Top Language" />
<img src="https://img.shields.io/github/last-commit/aryand2006/streakbreaker?style=flat-square" alt="Last Commit" />

</div>

---

## The Problem

Daily life, especially for college students, runs on autopilot. Same route, same lunch, same hangout pattern. Most social apps encourage passive scrolling, and most habit apps demand too much commitment. **Nobody is solving this:** how do you make ordinary life feel playful without asking people to overhaul themselves?

## The Solution

Streakbreaker takes something mundane (like where you eat, how you text, how you walk to class) and turns it into a lightweight social game.

The loop is simple:

```
Pick a tiny task  ->  Complete it  ->  Post a receipt  ->  Friends react & copy  ->  Chains spread
```

You participate *before* you consume. The feed is locked until you upload a receipt. One person's small break from routine becomes a shared social behavior.

---

## How It Works

| Step | Action | Description |
|------|--------|-------------|
| 1 | **Pick a task** | Go random, choose your own, or let a friend decide for you |
| 2 | **Post a receipt** | Prove you did it with a photo, caption, or text |
| 3 | **Friends react** | Swipe to hype, challenge, or join in |
| 4 | **Start a chain** | Hit "I'm in" on someone's task and watch it spread |

---

## Key Features

### Three Ways to Play
- **Feeling Lucky**: Random task from the full pool. No thinking, just doing.
- **Pick My Own**: Browse tasks by realm (category). Find what fits your energy.
- **Ask a Friend**: Hand the decision to someone else entirely. They pick from 3 options and send it back with a note.

### Social Mechanics
- **Tinder-style reaction deck**: Swipe left (*Could do more*), right (*Let's gooo*), or up (*I'm in*)
- **"I'm in" chains**: When you join someone's task, it clones to your queue and the original poster gains influence. One act becomes a trend.
- **Feed lock**: You can't lurk until you participate. *Break first. Lurk later.*
- **Friend circles (Pods)**: Play happens inside real social groups, not a global feed
- **Weekly duo challenges**: Get paired with a friend for a shared task each week

### 8 Realms of Chaos
Tasks are organized across 8 categories of pattern-breaking behavior:

`Food` · `Place` · `Social` · `Communication` · `Style` · `Tiny Chaos` · `Campus` · `Comfort Zone`

### Identity & Progression
- Influence score, current run, badges, and "known for" labels
- Badges like *Chaos Merchant*, *Soft Menace*, *Copycat Magnet*, *Comfort Zone Criminal*
- Public profiles with receipt galleries and realm stats
- Rerolls earned through friend invites

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Components | shadcn/ui, Base UI |
| Animation | Motion (Framer Motion) |
| State | Zustand |
| Icons | Lucide React |
| Charts | Recharts |
| Deployment | Vercel |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/aryand2006/streakbreaker.git
cd streakbreaker

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app ships with fully seeded demo data (12+ mock users, active friend groups, rich task activity, reactions, chains, notifications, and duo pairings).

---

## Architecture

```
streakbreaker/
├── app/                    # Next.js App Router pages
│   ├── (app)/              # Authenticated app shell (today, feed, profile, etc.)
│   ├── onboarding/         # Multi-step onboarding flow
│   └── page.tsx            # Landing page
├── components/
│   ├── layout/             # App shell, bottom nav, page header
│   ├── streakbreaker/      # Feature-specific components
│   │   ├── feed/           # Feed items, chain indicators, reactions
│   │   ├── friends/        # Pods, member lists, duo pairings
│   │   ├── lucky/          # Task reveal animations
│   │   ├── onboarding/     # Step-by-step onboarding screens
│   │   ├── profile/        # Stats, badges, receipt gallery
│   │   ├── reactions/      # Swipe deck, swipe cards
│   │   ├── receipt/        # Photo upload, receipt preview
│   │   ├── rewards/        # Badge cards, progress rings
│   │   ├── shared/         # Reusable UI (avatars, glow cards, counters)
│   │   └── today/          # Realm cards, action buttons, activity
│   └── ui/                 # shadcn/ui primitives
├── lib/
│   ├── data/               # Seeded mock data (users, tasks, receipts, etc.)
│   └── utils/              # Animation variants, date helpers, realm utils
└── stores/                 # Zustand global state
```

---

## App Screens

| Screen | Description |
|--------|-------------|
| **Landing** | Product launch page with animated hero, 4-step explainer, realm preview, and social proof |
| **Onboarding** | Immersive multi-step flow: vibe selection, realm picks, username, avatar, group join, first realm reveal |
| **Today** | Daily command center with Feeling Lucky, Pick My Own, Ask a Friend actions |
| **React** | Tinder-style swipe deck for authenticating friends' receipts |
| **Feed** | Locked until you post — then a dense social feed with chain indicators |
| **Friends** | Pod-based friend circles with group stats, trending tasks, weekly pairings |
| **Profile** | Identity-rich page with activity, badges, "I'm in" history, and private section |
| **Rewards** | Badge showcase and progression tracking |
| **Notifications** | Dense, grouped social inbox |

---

## Design Philosophy

- **Dark mode** with electric lime, coral, violet, and cyan accents
- **Mobile-first**, app-store quality feel
- **Motion-rich** but tasteful — page transitions, swipe gestures, card reveals, micro-celebrations
- **Socially dense** — every screen shows signs of active users, trending tasks, and real dynamics
- **Playful, not productivity** — this is a social game, not a habit tracker

---

## Why It Works (Social Psychology)

1. **Do first, then browse** — Participation before consumption flips the typical social app dynamic
2. **Social contagion** — "I'm in" turns individual acts into group behaviors
3. **Low-friction entry** — The daily loop takes under a minute to start
4. **Taste & identity** — Users become recognizable through their realm preferences, receipt style, and badges
5. **Mild judgment, not cruelty** — Lightly chaotic, never hostile

---

## Award

**Best Use of V0** — XHacks 2025, Carnegie Mellon University

---

## Team

- **Aryan Daga** — [GitHub](https://github.com/aryand2006)
- **Khushi Juneja** — [GitHub](https://github.com/junejakhushi)

---

<div align="center">

*Take something mundane. Make it slightly unexpected. Make it visible. Let it spread.*

[![Live Demo](https://img.shields.io/badge/Try_It_Live-streakbreaker.vercel.app-BFFF00?style=for-the-badge&logo=vercel&logoColor=black)](https://streakbreaker.vercel.app)

</div>
