---
name: nextjs-code-review
description: Review JavaScript/TypeScript, React, and Next.js code in this repo for clean-code quality (naming, duplication, function size, dead code, separation of concerns) and React/Next.js-specific correctness (Server vs Client Component boundaries, data fetching placement, hooks rules, rendering and performance pitfalls, App Router conventions). Use this whenever the user asks to review, audit, clean up, or sanity-check a component, route, hook, or diff in this codebase, or asks "is this good code" / "does this follow best practices" / "clean this up" — even without the word "review." Report findings first, then offer to apply fixes.
---

# Next.js / React Code Reviewer

You're reviewing code in a Next.js + React + TypeScript app (this repo currently runs Next 16, React 19, with the React Compiler babel plugin enabled and Tailwind v4 — check `package.json` if that ever looks stale). Two things make this review different from a generic JS lint pass:

1. **The framework moves fast and your training data lags behind it.** This repo's `AGENTS.md` already says not to trust your memory of Next.js conventions. Before flagging anything about Server/Client Components, data fetching, caching, route handlers, or App Router file conventions, skim the relevant page under `node_modules/next/dist/docs/01-app/` if you're not certain the convention still holds in this version. Don't invent a rule that sounds right — check it.
2. **Clean code and framework correctness are different failure modes**, and conflating them produces noise. A component can be idiomatic Next.js and still be a 300-line wall of nested conditionals; a function can be beautifully named and still fetch data in a Client Component where it should be a Server Component. Look for both, but report them as what they are.

## What to look at

Figure out the review's scope from what the user gave you: a diff (`git diff`), a specific file or directory, or "review what I just wrote." When nothing is specified, default to the current uncommitted changes (`git status` / `git diff`) rather than the whole repo — a review of everything at once is rarely what's wanted and buries the signal.

## Clean code checks

For each file in scope, read it whole (not a grep snippet) before judging it — naming and duplication issues are often only visible in context. Look for:

- **Naming** that doesn't say what a thing is or does — generic names (`data`, `handleClick2`, `temp`), names that lie about behavior, or names that only make sense next to code that's since moved.
- **Function/component size and responsibility** — a function or component doing several unrelated things (fetching + formatting + rendering + side effects all in one body) is harder to test and change than three small ones. Don't demand extraction on principle; flag it when the mixing actually costs something (untestable, duplicated elsewhere, hard to follow).
- **Duplication** — the same logic copy-pasted across components/routes/hooks instead of shared. Three near-identical lines is fine; a whole data-shaping block repeated three times is not.
- **Dead code** — unused exports, commented-out blocks, unreachable branches, leftover scaffold code (the default Next.js starter boilerplate left in place is a common one in this repo specifically).
- **Separation of concerns** — UI components doing business logic or raw fetch/storage calls that belong in `src/app/domain` or `src/app/data` (this repo already has those directories — code that reinvents their job inline is a sign something's misplaced, not that the directories are wrong).

## React / Next.js checks

- **Server vs Client Component boundaries** — a `"use client"` directive added only because of one small interactive piece, when the rest of the component could stay a Server Component; or, conversely, client-only APIs (browser globals, event handlers, state) used without the directive. Pushing `"use client"` as far down the tree as possible usually keeps more of the app server-rendered.
- **Data fetching placement** — fetching in a Client Component via `useEffect` when it could be done in a Server Component or route handler; fetching duplicated across sibling components instead of lifted or cached once.
- **Hooks rules** — conditional hook calls, hooks called inside loops/callbacks, missing dependencies that are actually used inside an effect (don't just check the linter did this — eslint-plugin-react-hooks catches the mechanical cases; look for dependency *omissions that change behavior*, which the linter can still miss with refs or stale closures).
- **React Compiler interactions** — this repo has `babel-plugin-react-compiler` enabled, which auto-memoizes in many cases. Flag manual `useMemo`/`useCallback`/`React.memo` only when it's clearly compensating for something the compiler won't catch (e.g., referential stability needed across a boundary the compiler can't see), not as a reflex — redundant manual memoization added "just in case" is clutter here, not an optimization.
- **Key props and list rendering** — index-as-key on lists that reorder or filter, or missing keys entirely.
- **State placement** — local component state that's actually shared/global being duplicated instead of lifted, or over-use of the zustand store (`src/app/store`) for state that's genuinely local to one component.
- **Rendering/perf pitfalls** — objects/functions created fresh every render and passed to children or effect dependencies in a way that defeats memoization that *does* matter (e.g., crossing a Server/Client boundary, or feeding a dependency array); large client bundles pulled in for something that only needs a small slice of a library.

## Severity and reporting

Rank findings by actual impact, not rule-violation count. A missing Server/Client boundary that ships unnecessary JS to the browser matters more than a slightly-too-generic variable name. For each finding, give:

- the file and line (or a short quote if line numbers aren't stable),
- what's wrong and why it matters *in this codebase* (not a generic rule restatement),
- a concrete fix, not just "consider refactoring."

Group findings under two headings — **Clean code** and **React/Next.js** — so the user can see which kind of issue they're looking at. Skip the heading if a review turns up nothing in that category rather than writing "no issues found."

After the report, ask whether to apply the fixes. If the user says yes, apply them and give a short diff-level summary of what changed — don't re-paste the whole report.

## What not to flag

Don't re-litigate intentional project choices visible in `package.json`, `tsconfig.json`, or existing conventions across multiple files — e.g., this repo uses zustand for some global state, Tailwind utility classes instead of CSS modules, and a `domain`/`data`/`types`/`store` split under `src/app`. Treat a pattern repeated consistently across the codebase as the project's convention, not a bug, even if you'd personally choose differently — flag it only if the user asks for an architectural opinion, not during a routine review.
