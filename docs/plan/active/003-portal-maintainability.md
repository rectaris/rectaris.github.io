# Portal Maintainability Review Fixes

status: active
task_type: product_logic
review_class: B
human_design_required: no
human_approval_status: not_required
target_files:
  - README.md
  - src/main.js
  - src/style.css
  - scripts/planlib.py
  - scripts/lint-plan-docs.py
  - scripts/validate-changes.py
  - docs/plan/active/003-portal-maintainability.md
target_json:
  - none
required_specs:
  - docs/agent/SPEC_DEVELOPMENT_FLOW.md
  - docs/agent/SPEC_VALIDATION.md
  - docs/agent/SPEC_GIT_WORKFLOW.md
  - docs/agent/SPEC_FILE_MANAGEMENT.md
validation:
  - git diff --check
  - python3 scripts/lint-plan-docs.py
  - python3 scripts/format-plan-docs.py --check
  - python3 scripts/security-static-check.py
  - python3 scripts/structure-map.py --check
  - python3 scripts/validate-changes.py
acceptance:
  - Portal tool cards render from a data definition instead of duplicated card HTML.
  - README describes both currently linked tools.
  - CSS colors and sections are easier to maintain without changing public paths.
  - Plan and change validation scripts reduce duplicated constants and branch-heavy command selection.
acceptance_focus:
  - maintainability
  - public path stability
expected_output: full-implementation
checked_summary_ja: ポータルの保守性レビュー指摘を反映する。

## Notes

Public links remain unchanged:

- `https://rectaris.github.io/gakumasu-timeline/`
- `https://rectaris.github.io/status/`
