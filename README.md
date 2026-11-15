# Footsteps in Time

A vertical-scrollytelling retelling of Islamic historical journeys — starting with the Hijrah — built as an immersive, map-anchored narrative. As the reader scrolls, a pinned map background follows the route milestone by milestone, with story cards, a glowing path of waypoints, and a synchronized timeline scrubber tracking progress through the chapter.

## Concept

- **Aesthetic**: Night Desert & Amber Lantern Glow — deep indigo and charcoal tones, warm cream typography, and an amber lantern trail marking the route across a full-screen parchment-style map.
- **Interaction**: the map viewport, active waypoint, and timeline scrubber all stay in sync as the reader scrolls through the narrative, backed by a single source of truth.
- **Content**: each milestone carries its own narrative, location, and optional side encounters (figures, miracles, moments) tied to real coordinates along the route.

## Stack

- [Next.js](https://nextjs.org) (App Router)
- [Zustand](https://zustand-demo.pmnd.rs) for the journey/scroll state (`src/app/store/useJourneyStore.tsx`)
- Journey content as data, not hardcoded markup (`src/app/data/milestones.json`, typed in `src/app/types/journey.ts`)

## Project structure

```
src/app/
├── data/milestones.json      # Journey content: milestones + side encounters
├── types/journey.ts          # Milestone / SideEncounter types
├── store/useJourneyStore.tsx # Zustand store: active milestone, map focus, encounter overlay
├── domain/page.tsx           # The journey experience (in progress)
└── page.tsx                  # Homepage
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it locally. The journey experience lives at `/domain` while it's in progress.

## Status

Early scaffold: data model and state are in place; the scrollytelling map/UI itself is still being built.
