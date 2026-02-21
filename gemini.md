## Project Constitution (gemini.md)

## 1. Project Vision (North Star)

A highly aesthetic, modern portfolio that showcases daily developer details, integrates live data (GitHub contributions, LeetCode streaks), and is powered entirely by Supabase with no separate backend, targeting deployment on Vercel.

## 2. Integrations & Source of Truth

- **Source of Truth:** Supabase (Database, Auth, Edge Functions if needed).
- **Integrations:**
  - GitHub API (Contribution graphs, Repositories).
  - LeetCode API (Streaks, Solved counts).
  - Web deployments (Vercel).

## 3. Behavioral Rules

- Priority: Reliability over speed.
- Invariants: Never guess at business logic.
- Design: Must be wow-inducing, premium, aesthetic, and modern (no generic templates).
- Workflow: Utilize NotebookLM, web research, and established skills located in `~/.agent/skills/`.
- The "Data-First" Rule: Coding only begins once the Payload shape is confirmed.
- Self-Annealing Loop: Analyze, Patch, Test, Update Architecture.
- Local vs Global: `.tmp/` is ephemeral, globals are delivered payloads.

## 4. Data Schemas

### Input Shape (Raw Data from Integrations / User)

```json
{
  "user": {
    "name": "string",
    "bio": "string",
    "github_handle": "string",
    "leetcode_handle": "string"
  },
  "github_stats": {
    "contributions": "array[object]",
    "total_commits": "number"
  },
  "leetcode_stats": {
    "streak": "number",
    "solved": "object (easy, medium, hard)",
    "ranking": "number"
  },
  "projects": "array[object] (title, description, image_url, live_link, github_link, prep_tech_stack)",
  "experience": "array[object] (role, company, start, end, details)"
}
```

### Output Shape (Delivery Payload for the Frontend UI)

```json
{
  "portfolio_state": {
    "profile": "Database Profile Object",
    "live_metrics": {
      "github_graph": "Processed Timeline Data",
      "leetcode_status": "Aggregated Stat Object"
    },
    "dynamic_content": "Array of Projects and Experiences fetched directly from Supabase via client-side/server-components"
  }
}
```

## Architectural Invariants

- 3-Layer Architecture (A.N.T.)
  - Layer 1 (`architecture/`): Technical SOPs
  - Layer 2 (Navigation): Route data between SOPs and Tools
  - Layer 3 (`tools/`): Deterministic Python scripts
