# AGENTS.md

This file is the agent-only operations memo for the `rectaris.github.io` repository.

## Repository Role

- This repository is the public portal for the workspace.
- It is not the main implementation home of `gakumasu-timeline`.
- It should link to tools, not absorb unrelated application logic by default.

## Top Priorities

- Keep the portal simple, clear, and easy to navigate.
- Preserve public access to linked tools.
- Avoid portal changes that create duplicated ownership of application behavior already defined in another repository.

## Rules

- Prefer links over duplicated embedded implementations.
- If the portal text describes a linked tool, keep the description short and stable.
- When adding a new tool link, also update the parent workspace `projects.md` and `routing.md`.
- If a linked tool URL changes, update the portal and verify the target.

## Changes That Require Extra Care

- Public link updates
- GitHub Pages root behavior
- AdSense / review / verification code on the portal
- Visual changes that affect discoverability of linked tools

## Documentation

- Human-facing explanations belong in this repository's `README.md` or `docs/`.
- Do not use portal docs as a replacement for tool-specific docs.

## Verification

- Confirm the portal loads publicly.
- Confirm every visible external or internal tool link works.
- Confirm mobile layout still exposes the important links clearly.
