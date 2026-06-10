# AGENTS.md

Agent entrypoint for `rectaris.github.io`.

## Purpose

Public portal for the workspace. Link to tools and systems while maintaining public access, SEO, and stable GitHub Pages paths.

## Generated Profile

- Project name: `rectaris.github.io`
- Primary language: `docs`
- Planning style: `active_backlog_checked`
- Codex helper agents: `true`
- Codex hooks: `true`
- Plan lifecycle scripts: `true`
- Change-aware validation: `true`
- Static security checks: `true`
- Structure scanner: `true`
- External service policies: MCP=`false`, Linear=`false`, graph memory=`false`

## Priority

1. Follow parent workspace `AGENTS.md` and `GEMINI.md` first for cross-repository coordination, security, and Git policy.
2. Follow this file for repository-local behavior.
3. Open `docs/agent/spec-index.yaml`.
4. Read only `default_reads` plus the matched route's `required` docs before editing.
5. Add `conditional` docs only when the task or touched files match.

## Operating Rules

- Keep project-specific implementation rules in `docs/agent/SPEC_*.md` or existing domain docs.
- Track non-trivial implementation work in `docs/plan/plan.md` or `docs/plan/active/`.
- Keep Copier-managed workflow files updateable; put portal-specific details outside generated files when practical.
- Use Git for every coherent work unit.
- Preserve user changes you did not make.
- Prefer deterministic checks over prose-only rules.
- Ask before high-impact or ambiguous public-path changes.
- Treat `docs/plan/checked.md` and checked archives as lookup-only history; search metadata first when possible.
- Keep human-facing README files separate from agent-facing operational policy.

## Portal Rules

- Prefer links over duplicated embedded implementations.
- Keep linked tool descriptions short and stable.
- Do not absorb unrelated application logic from linked repositories by default.
- Update `projects.md` and `routing.md` when adding or changing tool links if those files exist in scope.
- Verify both portal links and targets when a public URL changes.

## Cascade Agent Handoff

- Tier 1: Codex CLI for static site structure and integration.
- Tier 2: GitHub Copilot CLI for link checks and minor UI tweaks.
- Tier 3: Gemini CLI for Cloudflare Pages deployment and final QA.
- Handoff documentation: `docs/plan/handoff-latest.md` or `docs/plan/handoffs/`.

## Reports

- State touched repositories.
- State link or public-path changes.
- Report validation run and commit status.
