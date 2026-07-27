# Nordic Solutions Web

[![CI](https://github.com/nordic-solutions-ae/nordic-solutions-web/actions/workflows/ci.yml/badge.svg)](https://github.com/nordic-solutions-ae/nordic-solutions-web/actions/workflows/ci.yml)
![SvelteKit 2](https://img.shields.io/badge/SvelteKit-2-FF3E00)
![Svelte 5](https://img.shields.io/badge/Svelte-5-FF3E00)
![TypeScript strict](https://img.shields.io/badge/TypeScript-strict-3178C6)
![Bun 1.3.12](https://img.shields.io/badge/Bun-1.3.12-000000)

Corporate presentation website for Nordic Solutions LLC. The site is built as a discreet, bank-friendly, prerendered web presence for institutional review, partner diligence, and first contact.

Production domain: [nordicsolutions.ae](https://nordicsolutions.ae)

## Stack

- SvelteKit 2 + Svelte 5 runes
- TypeScript strict mode
- Bun 1.3.12 as the only package manager, script runner, and test runner
- Vite
- Plain CSS custom properties for design tokens and component styling
- ESLint + Prettier
- Static cPanel deployment via `@sveltejs/adapter-static`

Do not use `npm install`, `pnpm install`, or Yarn in this repo. `bun.lock` is the only committed dependency lockfile.

## Commands

```bash
bun install
bun dev
bun test
bun run check
bun run lint
bun run build
bun run verify
```

Use `bun ci` in CI before running verification:

```bash
bun ci
bun run verify
```

## Deployment

Production is a static cPanel release with one PHP contact endpoint:

```bash
bun run build:cpanel
```

This creates `dist/nordic-solutions-cpanel.zip` with the public pages, static
assets, Apache rules, and the PHP contact endpoint. It needs no runtime secrets
or additional mail provider. Follow [the cPanel cutover runbook](docs/cpanel-cutover.md)
for staging, verification, cutover, and rollback.

GitHub stores the source and history; cPanel stores only a built release.
Every green push to `main` is packaged and deployed automatically over
explicit FTPS. Deployment uploads to a hidden staging directory, validates the
release, then swaps directories while keeping one previous release for
rollback.

```bash
git pull
bun ci
bun run verify
```

Open a focused pull request and merge it after CI passes. The merge deploys
`main`; no Vercel project or manual ZIP upload is involved.

## Routes

- `/`
- `/en`
- `/ar`
- `/privacy`
- `/terms`
- `/ar/privacy`
- `/ar/terms`

The home page narrative is:

```text
Hero -> About -> Services -> Approach -> Why Nordic -> Presence -> Contact
```

## Project Structure

```text
src/
  lib/
    components/       reusable app and UI components
    layouts/          page-level shells
    modules/          domain content, validation, navigation, motion, tests
    styles/           global styles and design tokens
  routes/             SvelteKit file-based routes
static/               deployable fonts, images, icons, robots
docs/                 business brief and implementation notes
```

## Quality Gates

Run the full gate before shipping:

```bash
bun run verify
```

This runs Bun and PHP tests, Svelte diagnostics, formatting/lint checks, and
the production build.

Visual QA screenshots may be generated under `output/playwright` during manual browser checks. Keep only screenshots that are useful as review evidence; do not commit throwaway runs.

## Architecture Notes

- Keep business copy and structured content in `src/lib/modules`.
- Keep reusable UI in `src/lib/components/ui`.
- Keep route pages thin and use route pages primarily as entry points.
- Prefer SvelteKit primitives before adding third-party state, routing, or form libraries.
