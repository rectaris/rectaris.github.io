# Timeline link integration

status: active
task_type: environment_data_flow
review_class: B
human_design_required: no
human_approval_status: not_required
target_files:
  - index.html
  - src/main.js
  - .github/workflows/deploy-pages.yml
  - docs/agent/SPEC_ENVIRONMENT.md
target_json:
  - none
required_specs:
  - docs/agent/SPEC_VALIDATION.md
  - docs/agent/SPEC_GIT_WORKFLOW.md
  - docs/agent/SPEC_FILE_MANAGEMENT.md
  - docs/agent/SPEC_DEVELOPMENT_FLOW.md
  - docs/agent/SPEC_ENVIRONMENT.md
validation:
  - scripts/validate-changes.py
  - git diff --check
  - scripts/check-agent-completion.sh
acceptance:
  - Timeline public links point to https://rectaris.github.io/timeline/.
  - Pages artifact assembles the app under public/timeline.
  - Remaining legacy Timeline path references are historical or repository identifiers, not current public links.
acceptance_focus:
  - Public-path correctness
  - Pages artifact path
expected_output: full-implementation
checked_summary_ja: Timeline ツールの公開パスを /timeline/ に更新する。

## Notes

- User requested no deployment.
- Updated portal links and noscript fallback to `https://rectaris.github.io/timeline/`.
- Updated Pages artifact assembly to copy `gakumasu-timeline/dist` into `public/timeline/`.
- Validation run:
  - `scripts/validate-changes.py --print-only`
  - `git diff --check`
  - `python3 scripts/structure-map.py --check`
  - `scripts/validate-changes.py`
  - `python3 scripts/security-static-check.py`
  - `python3 scripts/lint-plan-docs.py`
  - `python3 scripts/format-plan-docs.py --check`
- Link inspection: no current-file references to the legacy Timeline public path outside checked history.
