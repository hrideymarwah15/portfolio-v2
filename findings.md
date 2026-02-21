# Findings

_Research, discoveries, and constraints for Portfolio V2._

## User-Specified Design Direction

- **Pattern:** Storytelling + Case Studies
- **Focus:** Visual impact, project showcases, personality
- **Layout:** Full-screen sections, horizontal scroll galleries, immersive transitions

## Skills Internalized (from `~/.agent/skills/`)

| Skill             | Key Takeaway                                                                                                  |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| `brand-identity`  | React + TypeScript, Tailwind CSS mandatory, shadcn/ui primitives, Lucide icons, dark mode via `dark:` variant |
| `brainstorming`   | Do NOT code until design is approved (done)                                                                   |
| `planning`        | Atomic test-driven steps, exact file paths                                                                    |
| `handling-errors` | Result type pattern for TS, graceful degradation, circuit breaker for external APIs                           |
| `creating-skills` | For reference if we need to create new skills later                                                           |

## Design Tokens (from `design-tokens.json`)

- Primary: `#000000`, Hover: `#333333`, Foreground: `#FFFFFF`
- Background: `#FFFFFF`, Foreground: `#09090B`
- Typography: Inter (headings), Roboto (body)
- Border Radius: `0.5rem` default, `0.25rem` small
- Spacing Base: `4px`

## Voice & Tone

- Professional but approachable, direct, tech-savvy but jargon-free
- Title Case for H1/H2, sentence case for H3+
- No exclamation points in UI copy, active voice

## API Integration Findings

### GitHub GraphQL API

- Endpoint: `https://api.github.com/graphql`
- Auth: Bearer token (PAT)
- Key query: `contributionsCollection > contributionCalendar`
- Returns `totalContributions` and `weeks[].contributionDays[]` with `date` and `contributionCount`
- **Verified:** ✅ 234 contributions for `hrideymarwah15`

### LeetCode API

- Community endpoint: `https://alfa-leetcode-api.onrender.com/{username}/calendar`
- No auth required
- Returns `submissionCalendar` (JSON string of timestamp → count)
- **Verified:** ✅ Endpoint reachable (rate-limited 429 confirms alive)
- Fallback: Direct GraphQL to `https://leetcode.com/graphql`

### Supabase

- Project: `uojswwwkvzzloytmniok`
- **Verified:** ✅ Connection successful
- Tables needed: `daily_stats` (new), existing tables available

## Portfolio Section Architecture

| Section        | Type                      | Key Feature                                             |
| -------------- | ------------------------- | ------------------------------------------------------- |
| Hero           | Full-screen               | Bold typography, animated tagline, CTA                  |
| About          | Full-screen               | Developer story, philosophy, personality                |
| Projects       | Horizontal scroll gallery | Case study cards with live demos, immersive transitions |
| Experience     | Timeline                  | Career journey with role highlights                     |
| Skills         | Bento grid                | Categorized tech stack with icons                       |
| GitHub Stats   | Full-screen               | Live contribution heatmap graph                         |
| LeetCode Stats | Card                      | Streak, solved counts, ranking                          |
| Contact        | Full-screen               | Form + social links                                     |

## Tech Stack Decision

- **Framework:** Next.js 15 (App Router, Server Components)
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Animations:** Framer Motion (immersive transitions, scroll-based)
- **Icons:** Lucide React
- **Data:** Supabase (no separate backend)
- **Deployment:** Vercel
