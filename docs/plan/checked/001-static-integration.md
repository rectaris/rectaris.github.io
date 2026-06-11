# Unified Static Gateway Plan

status: active
task_type: environment_data_flow
review_class: B
human_design_required: no
human_approval_status: not_required
completion_deferred_reason: Static integration remains a separate active work item.
target_files:
  - .github/workflows/
  - .gitignore
  - src/
  - status/
  - docs/plan/plan.md
target_json:
  - none
required_specs:
  - docs/agent/SPEC_DEVELOPMENT_FLOW.md
  - docs/agent/SPEC_ENVIRONMENT.md
  - docs/agent/SPEC_VALIDATION.md
validation:
  - git diff --check
  - python3 scripts/security-static-check.py
  - link and routing checks when public paths change
acceptance:
  - GitHub Pages static deployment can serve the portal and sub-projects without container infrastructure.
  - Cross-linking between the portal and sub-apps works without a reverse proxy.
acceptance_focus:
  - public path stability
  - build artifact ownership
expected_output: full-implementation
checked_summary_ja: GitHub Pages 上の静的統合計画を完了する。

## Goal

Establish a unified static deployment workflow for all sub-projects under the `rectaris.github.io` domain using GitHub Actions. Remove the need for any container-based infrastructure.

## Tasks

### 1. Static Integration Strategy

- [x] Directory Structure:
  - `/` (Root): Main portal (current `rectaris.github.io` src).
  - `/timeline/`: `gakumasu-timeline` build artifacts.
  - `/status/`: `supportcard-status` (Ported TS version) build artifacts.

Decision: keep the existing public paths `/gakumasu-timeline/` and `/status/`. Do not introduce `/timeline/`; the earlier `/timeline/` note is superseded by public URL stability.

### 2. Build & Deployment Automation

- [x] Create a consolidated GitHub Actions workflow to:
  1. Build `gakumasu-timeline` (Vite).
  2. Build `supportcard-status` (Vite/TS).
  3. Aggregate all artifacts into the `rectaris.github.io` repository or a single deployment branch.

### 3. Routing & Assets

- [x] Configure `base` paths for all sub-projects to ensure correct asset loading on GitHub Pages.
- [x] Ensure cross-linking between the portal and sub-apps works without a reverse proxy.

Implementation notes:

- `gakumasu-timeline` already builds with `base: "/gakumasu-timeline/"`.
- `supportcard-status` is built by the Pages workflow with `npm run build -- --base=/status/`.
- Tracked `status/` build artifacts, including `status/static/cards.json.bak`, were removed from this repository. The Pages workflow now owns generated `/status/` output.

## Completion

- Commit: `338f285` (`Build Pages artifact in workflow`)
- Public path changes: none. Existing `/gakumasu-timeline/` and `/status/` paths are preserved.
- Validation:
  - `git diff --check`
  - `python3 scripts/security-static-check.py`
  - `python3 scripts/lint-plan-docs.py`
  - `python3 scripts/validate-changes.py --all`
- Residual risk: GitHub Actions deployment was not executed locally; it must run on GitHub after push.
