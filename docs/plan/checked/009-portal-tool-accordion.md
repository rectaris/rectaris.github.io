# Make portal tool cards expandable.

status: active
task_type: ui_layout
review_class: B
human_design_required: no
human_approval_status: not_required
target_files:
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
  - scripts/check-agent-completion.sh
acceptance:
  - Tool entries render as compact clickable rows by default.
  - Expanding a tool reveals the previous detail layout and actions.
acceptance_focus:
  - Compact summary text
  - Existing detail actions preserved
expected_output: full-implementation
checked_summary_ja: ポータルのツール表示を簡易行から詳細展開できる形にする。

## Notes

- Implemented compact `details` rows for each portal tool.
- Preserved existing detail content, outbound links, copy button, and guide disclosure inside the expanded area.
- Validation completed:
  - `git diff --check`
  - `python3 scripts/validate-changes.py`
  - Browser smoke at `http://127.0.0.1:4174/`
  - Chrome screenshot of compact state: `/tmp/portal-compact.png`
  - Chrome CDP click check: first tool state changed to `true,false`
  - Chrome screenshot of expanded state: `/tmp/portal-expanded.png`
