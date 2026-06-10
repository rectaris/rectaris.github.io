# Unified Static Gateway Plan

status: active
task_type: environment_data_flow
review_class: B
human_design_required: no
human_approval_status: not_required
completion_deferred_reason: Static integration remains a separate active work item.
target_files:
  - .github/workflows/
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

- [ ] Directory Structure:
  - `/` (Root): Main portal (current `rectaris.github.io` src).
  - `/timeline/`: `gakumasu-timeline` build artifacts.
  - `/status/`: `supportcard-status` (Ported TS version) build artifacts.

### 2. Build & Deployment Automation

- [ ] Create a consolidated GitHub Actions workflow to:
  1. Build `gakumasu-timeline` (Vite).
  2. Build `supportcard-status` (Vite/TS).
  3. Aggregate all artifacts into the `rectaris.github.io` repository or a single deployment branch.

### 3. Routing & Assets

- [ ] Configure `base` paths for all sub-projects to ensure correct asset loading on GitHub Pages.
- [ ] Ensure cross-linking between the portal and sub-apps works without a reverse proxy.
