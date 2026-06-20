# Ensure Pages artifact includes timeline dev build

status: active
task_type: tooling
review_class: B
human_design_required: no
human_approval_status: not_required
target_files:
  - .github/workflows/deploy-pages.yml
  - docs/plan/active/013-pages-timeline-dev-artifact.md
target_json:
  - none
required_specs:
  - docs/agent/SPEC_VALIDATION.md
  - docs/agent/SPEC_GIT_WORKFLOW.md
  - docs/agent/SPEC_FILE_MANAGEMENT.md
  - docs/agent/SPEC_DEVELOPMENT_FLOW.md
  - docs/agent/SPEC_ENVIRONMENT.md
validation:
  - git diff --check
  - python3 scripts/lint-plan-docs.py
  - python3 scripts/format-plan-docs.py --check
  - python3 scripts/validate-changes.py
  - scripts/check-agent-completion.sh
acceptance:
  - Pages artifact assembly copies portal/timeline/dev into public/timeline/dev when present.
  - Timeline production build is forced to use /timeline/ asset base from this workflow.
  - Static artifact simulation contains timeline/index.html, timeline/dev/index.html, and both asset directories.
acceptance_focus:
  - GitHub Pages 404 at /timeline/dev/ and stale production asset paths.
expected_output: full-implementation
checked_summary_ja: Pages artifact に timeline/dev 配信物を含める。

## Notes

- `gakumasu-timeline` dev already publishes built assets into this repository under `timeline/dev/`.
- Keep dev artifact ownership in that repository and include the committed output in this repository's single Pages artifact.
- `gakumasu-timeline` `origin/main` still has Vite base `/gakumasu-timeline/`, while `origin/dev` has `/timeline/` and `/timeline/dev/`.
- The Pages workflow now forces the production build base with `npm run build -- --base=/timeline/`.
- Static artifact simulation in `/tmp/rectaris-pages-check/public` contained:
  - `timeline/index.html`
  - `timeline/dev/index.html`
  - `timeline/assets/`
  - `timeline/dev/assets/`
- Validation passed:
  - `git diff --check`
  - `python3 scripts/lint-plan-docs.py`
  - `python3 scripts/format-plan-docs.py --check`
  - `python3 scripts/security-static-check.py`
  - `python3 scripts/structure-map.py --check`
  - `python3 scripts/validate-changes.py`
