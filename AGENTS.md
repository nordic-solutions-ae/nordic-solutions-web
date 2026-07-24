# Agent Rules

These rules apply to every automated agent working in this repository.

## Priorities

1. Preserve security, accessibility, business accuracy, and user data.
2. Prefer deletion, platform features, and existing code over new abstractions or dependencies.
3. Keep changes focused. Do not mix cleanup with unrelated product work.

## Workflow

- Read the relevant implementation, tests, and `CONTRIBUTING.md` before editing.
- Use Bun only. Never create npm, pnpm, or Yarn lockfiles.
- Keep routes thin, domain logic in `src/lib/modules`, and reusable UI in `src/lib/components/ui`.
- Do not commit secrets, `.env` files, generated QA output, or temporary assets.
- Run `bun run verify` before declaring work complete. Never bypass, weaken, or skip a failing gate.
- Do not push directly to `main`. Use a focused branch and a pull request.

## Change Style

- Reuse existing patterns; do not add speculative configuration, wrappers, or one-use abstractions.
- Add a dependency only when the platform, standard library, and installed packages cannot solve the problem cleanly.
- Update the smallest useful test when behavior changes.
- Preserve intentional user changes and avoid destructive Git operations unless explicitly authorized.

## Git and Pull Requests

- Branch: `<type>/<short-kebab-topic>`, for example `fix/mobile-contact-form`.
- Commit and PR title: Conventional Commit format, for example `fix(contact): remove mobile gutters`.
- Allowed types: `feat`, `fix`, `perf`, `refactor`, `docs`, `test`, `build`, `ci`, `chore`.
- Keep commits reviewable and imperative. Do not add AI attribution or co-author trailers unless requested.
- PRs must explain why, summarize the change, list validation, and include visual evidence for UI changes.
