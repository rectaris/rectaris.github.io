# Add editing notice for gakumasu-timeline.

status: active
task_type: ui_layout
review_class: B
human_design_required: no
human_approval_status: not_required
target_files:
  - src/main.js
  - src/style.css
  - index.html
  - README.md
target_json:
  - none
required_specs:
  - docs/agent/SPEC_VALIDATION.md
  - docs/agent/SPEC_GIT_WORKFLOW.md
  - docs/agent/SPEC_FILE_MANAGEMENT.md
  - docs/agent/SPEC_DEVELOPMENT_FLOW.md
  - docs/agent/SPEC_UI_DESIGN.md
  - docs/agent/SPEC_ENVIRONMENT.md
validation:
  - git diff --check
  - python3 scripts/validate-changes.py
  - google-chrome-stable --headless=new --disable-gpu --dump-dom http://127.0.0.1:4174/
  - scripts/check-agent-completion.sh
acceptance:
  - gakumasu-timeline is visibly marked as being edited in the rendered portal.
  - The public timeline URL remains https://rectaris.github.io/timeline/.
  - README and noscript fallback carry the same editing status.
acceptance_focus:
  - clear status copy
  - no public path change
expected_output: full-implementation
checked_summary_ja: gakumasu-timeline が編集中であることをポータルで明示する。

## Notes

- Added an editing status to the timeline portal card, hero CTA, noscript fallback, and README summary.
- Kept the public timeline URL unchanged at `https://rectaris.github.io/timeline/`.
- Validation run:
  - `git diff --check` passed.
  - `python3 scripts/validate-changes.py` passed.
  - Headless Chrome DOM check against a temporary local server confirmed rendered `編集中` labels.
  - Local `HEAD /timeline/` returned 404 because this repository alone does not contain the cross-repository Pages artifact; no public URL was changed.
