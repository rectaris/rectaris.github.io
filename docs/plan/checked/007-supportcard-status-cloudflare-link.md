# Use Cloudflare deployment for supportcard-status

status: active
task_type: tooling
review_class: B
human_design_required: no
human_approval_status: not_required
target_files:
  - .github/workflows/deploy-pages.yml
  - src/main.js
  - README.md
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
  - git diff --check
  - python3 scripts/validate-changes.py --all
acceptance:
  - GitHub Pages workflow no longer checks out or builds rectaris/calc-sapo.
  - Portal supportcard-status link points to the existing Cloudflare Workers deployment.
  - Environment docs describe supportcard-status as an external deployment.
acceptance_focus:
  - Fix Pages deployment failure without requiring CROSS_REPO_READ_TOKEN for calc-sapo.
expected_output: full-implementation
checked_summary_ja: supportcard-status を Cloudflare Workers の外部公開 URL に切り替え、Pages workflow から calc-sapo checkout を外す。

## Notes

- User provided supportcard-status URL: `https://supportcard-status-calculate.curiretas.workers.dev/`.
- Confirmed the Workers URL returns HTTP 200.
- Removed `rectaris/calc-sapo` checkout/build/copy from the Pages workflow.
- Updated the portal card link from `/status/` to the Workers deployment.
- Validation passed:
  - `curl -fsSLI https://supportcard-status-calculate.curiretas.workers.dev/`
  - `git diff --check`
  - `python3 -c "import pathlib, yaml; yaml.safe_load(pathlib.Path('.github/workflows/deploy-pages.yml').read_text()); print('deploy-pages workflow yaml parse passed')"`
  - `python3 scripts/lint-plan-docs.py`
  - `python3 scripts/format-plan-docs.py --check`
  - `python3 scripts/security-static-check.py`
  - `python3 scripts/structure-map.py --check`
  - `python3 scripts/validate-changes.py --all`
