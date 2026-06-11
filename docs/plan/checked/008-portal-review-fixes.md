# Fix portal review findings.

status: active
task_type: ui_layout
review_class: B
human_design_required: no
human_approval_status: not_required
target_files:
  - index.html
  - src/main.js
  - src/style.css
target_json:
  - none
required_specs:
  - docs/agent/SPEC_VALIDATION.md
  - docs/agent/SPEC_GIT_WORKFLOW.md
  - docs/agent/SPEC_FILE_MANAGEMENT.md
  - docs/agent/SPEC_DEVELOPMENT_FLOW.md
  - docs/agent/SPEC_UI_DESIGN.md
validation:
  - git diff --check
  - python3 scripts/validate-changes.py
  - python3 scripts/lint-plan-docs.py
  - python3 scripts/check-agent-completion.sh
acceptance:
  - Mobile URL text wraps or is actionable without horizontal overflow.
  - Hero gives equal access to both published tools.
  - Tool cards, disclosure controls, muted text, ads, and noscript fallback address the review findings without changing public URLs.
acceptance_focus:
  - Public URL stability.
  - Portal scanability.
  - Static fallback and empty ad behavior.
expected_output: full-implementation
checked_summary_ja: ポータルの静的レビュー指摘を修正する。

## Notes

User approved the recommended approach from the decision list. Keep existing tool URLs unchanged.

Implemented without public URL changes:

- Added equal hero CTAs for gakumasu-timeline and supportcard-status.
- Added purpose labels, host metadata, wrapped URL links, and copy buttons.
- Reduced nested card borders and shadows while keeping one card per tool.
- Reworked disclosure summaries with a chevron and focus-visible states.
- Added noscript fallback links.
- Collapses empty ad areas after failed or unfilled rendering and clips injected ad overflow.
- Validated mobile and desktop screenshots through local HTTP at `http://127.0.0.1:4173/`.

Validation:

- `node --check src/main.js`
- `git diff --check`
- `python3 scripts/validate-changes.py`
- `python3 scripts/format-plan-docs.py --check`
