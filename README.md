# BabyTrack

A Progressive Web App for parents and caregivers to track a baby's daily activities in real-time. Log feedings, sleep, diaper changes, playtime, health events, pumping sessions, and measurements with an intuitive mobile-first interface.

## Features

- **Activity Tracking** — seven categories with detailed subcategories:
  - Feeding (breast left/right, bottle, solids) with timer-based duration
  - Pumping (left/right/both) measured in milliliters
  - Diaper changes (dirty/wet) with instant logging
  - Sleeping (naps/night) with timer-based duration
  - Playing (tummy time, outdoors, bath, gym) with timer
  - Health (vaccination, medicine, sick, temperature) with comments
  - Measurements (height, weight, head circumference)
- **Daily Summaries** — aggregated stats for feeding duration, pumping amount, sleep duration, and activity counts
- **Calendar View** — monthly calendar with day-specific comments and age calculation from birth date
- **Dark Mode** — system-preference aware with manual toggle
- **Offline Support** — installable PWA with service worker caching

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Vite PWA Plugin + Workbox
- LocalStorage for data persistence

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start development server   |
| `npm run build`   | Type-check and build       |
| `npm run preview` | Preview production build   |
| `npm run lint`    | Run ESLint                 |
