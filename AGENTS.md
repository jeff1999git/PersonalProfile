# Agent instructions

The project handbook is [`project_context.md`](project_context.md). It is the single source of truth for this repository. If it and the code disagree, the code wins: fix the handbook and say so in its changelog.

## Before you change anything

1. Read sections 0 to 4 of `project_context.md`: how to use the file, snapshot, golden rules, product overview, tech stack.
2. Follow the golden rules in section 2. If a request conflicts with a rule in 2.1 or 2.2, stop and ask.
3. Read the feature's subsection in section 8 and the open items for that area in section 15.

## After every change

1. Add a changelog entry at the top of section 18, using the template in section 0.3 (date · branch · title · What / Why / Verified / Follow-ups).
2. Fix every section the change made stale, including cited line numbers in the files you touched.
3. Update the open-items tables in section 15: move what you fixed to "Recently resolved", add what you found with the next free ID.
4. Bump the "Last updated" line at the top of the handbook (date · branch · commit).

## Always

- Never handle secrets. Do not open, print or copy `.env` files, keystores, private keys, service-account files or anything under `.next/`. Never write a secret value, an email address, a phone number or a personal profile link into a doc; cite the file and line instead.
- Do not commit, push or open a pull request unless asked. The owner reviews and commits.
- Do not delete tracked files or rewrite git history without the owner's explicit go-ahead.
- Check whether a dev server is already running on port 3000 before starting one. Do not stop a server you did not start.
- Lint with `npx eslint app components contexts lib` and type-check with `npx tsc --noEmit`. `npm run lint` is broken.
