# Contributing

## Local workflow

Use Bun exclusively. Do not create npm, pnpm, or Yarn lockfiles.

```bash
bun ci
bun dev
bun run verify
```

`bun run verify` is the release gate: tests, Svelte diagnostics, formatting,
linting, and the production build must all pass.

## Branches and commits

- Branches use `<type>/<short-kebab-topic>`: `feat/contact-routing`,
  `fix/mobile-header`, or `docs/security-policy`.
- Commits use Conventional Commits: `<type>(optional-scope): imperative summary`.
- Allowed types are `feat`, `fix`, `perf`, `refactor`, `docs`, `test`, `build`,
  `ci`, and `chore`.
- Keep the subject specific and under 72 characters when practical.
- One commit should represent one coherent change. Rebase noisy fixups before review.

## Pull requests

- Open a draft early; mark it ready only after `bun run verify` passes.
- Keep scope narrow and separate unrelated cleanup.
- Explain the problem and the reason for the chosen solution, not only the diff.
- Include validation steps and screenshots for visible UI changes.
- Resolve review threads and keep the branch current with `main`.
- Merge with squash only. The PR title becomes the permanent commit message and
  must follow the commit convention above.

## Engineering taste

- Prefer SvelteKit and browser primitives over new dependencies.
- Reuse existing code before adding helpers or abstractions.
- Keep routes thin, domain logic in `src/lib/modules`, and reusable UI in
  `src/lib/components/ui`.
- Preserve accessibility, security headers, input validation, and reduced-motion behavior.
- Never commit secrets, `.env` files, generated QA output, or temporary assets.
- Agents must also follow `AGENTS.md`.
