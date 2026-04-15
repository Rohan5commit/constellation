# Constellation

**One-line pitch**  
An AI-assisted space for recovering forgotten ideas, moments, and connections from scattered digital fragments before they disappear.

**Prototype**  
Web prototype link: `TBD after deployment`  
Figma prototype link: `TBD after Figma build`

## Theme Fit

Constellation interprets **Lost & Found** as the recovery of fragments that were never deleted, only dispersed. Screenshots, half-written notes, voice thoughts, saved links, names, and unfinished intentions drift across a user's digital life until the product helps them find what still matters.

The first screen makes that premise legible immediately: forgotten fragments are visualized as stars in a calm night field, then gathered into constellations that restore meaning.

## Feature Overview

- **Story-led landing page** that frames the emotional cost of fragmented memory.
- **Lightweight onboarding** that explains how fragments become constellations.
- **Fragment capture flow** for notes, screenshots, links, voice thoughts, memory prompts, and people-based reminders.
- **Rediscovery feed** that surfaces items based on unfinished intent, emotional weight, repetition, and timing.
- **Constellation map** that groups scattered fragments into meaningful themes.
- **Fragment detail view** that reconstructs context and explains why an item resurfaced.
- **Reconnect flow** for people-related fragments with low-pressure next-step prompts.
- **Weekly reflection** that turns saved clutter into a gentle personal narrative.
- **Privacy and trust page** that explains boundaries for AI assistance.
- **Optional NVIDIA NIM integration** for clustering, context recovery, reflection prompts, and reconnection suggestions.

## Why This Stands Out

- It addresses a widely felt but under-designed problem: **context loss**, not just storage.
- It feels emotionally resonant without becoming sentimental or intrusive.
- It uses AI with restraint, clarity, and transparent uncertainty.
- It is memorable in seconds because the product metaphor is immediate and cohesive.
- It gives judges a visible design process, not just a polished UI.

## Repository Structure

```text
/
├── README.md
├── SUBMISSION_SUMMARY.md
├── PROBLEM_STATEMENT.md
├── SOLUTION_OVERVIEW.md
├── DESIGN_PROCESS.md
├── RESEARCH_PLAN.md
├── USER_PERSONAS.md
├── JTBD.md
├── COMPETITIVE_ANALYSIS.md
├── HOW_MIGHT_WE.md
├── USER_FLOW.md
├── WIREFRAME_NOTES.md
├── USABILITY_TEST_PLAN.md
├── USABILITY_SYNTHESIS_TEMPLATE.md
├── PITCH_SCRIPT.md
├── JUDGING_TALK_TRACK.md
├── TEAM_ROLES_TEMPLATE.md
├── app/
├── components/
├── lib/
├── public/
└── .env.example
```

## Prototype Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deployment Instructions

### GitHub to Vercel

1. Import this repository into Vercel.
2. Set the environment variables from `.env.example` only if you want live NVIDIA NIM responses.
3. Deploy the project with the **Next.js** framework preset.
4. Replace the prototype placeholders in `README.md` and `SUBMISSION_SUMMARY.md` with the production URL.

### Judging Demo Recommendation

- Start on `/`
- Continue to `/onboarding`
- Enter the seeded prototype via `/demo`
- Open one constellation, then one resurfaced fragment
- End on `/reconnect/[id]` or `/reflection`

## NVIDIA NIM Setup

NVIDIA NIM is used only where AI materially improves rediscovery.

**Suggested environment variables**

```bash
NVIDIA_NIM_API_KEY=
NVIDIA_NIM_BASE_URL=
NVIDIA_NIM_MODEL=
```

**Current integration points**

- `Clustering Agent`: group fragments into possible constellations.
- `Context Recovery Agent`: write short “why this may matter” explanations.
- `Reflection Agent`: produce gentle resurfacing prompts.
- `Reconnection Agent`: suggest low-pressure next steps for people, projects, or unfinished intentions.

If the variables are blank, the app falls back to seeded demo responses so the judging prototype stays stable.

## Architecture Overview

- **Frontend:** Next.js App Router + TypeScript
- **Styling:** Tailwind CSS with custom celestial tokens in `app/globals.css`
- **Motion:** Framer Motion for subtle reveal, clustering, and feedback moments
- **Data layer:** seeded in-memory demo data from `lib/demo-data.ts`
- **AI integration:** optional `app/api/nim/route.ts` with safe, explicit fallbacks
- **Design strategy:** landing + guided onboarding + route-based demo narrative

## Screenshots

Replace this section before final submission with exported screenshots or GIFs from the deployed prototype and Figma file.

- `TODO: Landing page hero`
- `TODO: Rediscovery feed`
- `TODO: Constellation view`
- `TODO: Fragment detail and why resurfaced`
- `TODO: Reconnect flow`
- `TODO: Weekly reflection`

## Research Integrity

This repository intentionally **does not fake user research**.

The following files are structured so the team can add real evidence fast:

- `RESEARCH_PLAN.md`
- `USER_PERSONAS.md` (provisional; validate with interviews)
- `JTBD.md` (provisional; validate with interviews)
- `USABILITY_TEST_PLAN.md`
- `USABILITY_SYNTHESIS_TEMPLATE.md`

## What Must Be Replaced With Real User Research Before Judging

- Actual participant quotes
- Actual interview notes and synthesis
- Real usability test findings and iteration decisions
- Any claims about preference, pain intensity, or behavior frequency that currently rely on design hypotheses
- Final screenshots and live prototype URL placeholders

## Credits

Created for **UCI Design-a-thon 2026** as a General Track + Most Novel submission concept centered on rediscovering what still matters.
