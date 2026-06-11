# Fix Pages Checkout Repository

status: active
task_type: environment_data_flow
review_class: B
human_design_required: no
human_approval_status: not_required
target_files:
  - .github/workflows/deploy-pages.yml
  - README.md
  - docs/agent/SPEC_ENVIRONMENT.md
  - docs/plan/active/005-pages-checkout-repository.md
target_json:
  - none
required_specs:
  - docs/agent/SPEC_DEVELOPMENT_FLOW.md
  - docs/agent/SPEC_ENVIRONMENT.md
  - docs/agent/SPEC_VALIDATION.md
  - docs/agent/SPEC_GIT_WORKFLOW.md
validation:
  - git diff --check
  - python3 scripts/lint-plan-docs.py
  - python3 scripts/format-plan-docs.py --check
  - python3 scripts/security-static-check.py
  - python3 scripts/structure-map.py --check
  - python3 scripts/validate-changes.py --all
acceptance:
  - Pages workflow checks out the actual support card repository.
  - Missing CROSS_REPO_READ_TOKEN no longer fails the workflow before checkout.
  - Documentation describes the token as optional unless the sibling repositories are private.
acceptance_focus:
  - GitHub Actions checkout target
  - optional token behavior
expected_output: full-implementation
checked_summary_ja: Pages デプロイの checkout 先リポジトリと token 扱いを修正する。

## Notes

Failure evidence:

- The current workflow stops at `Verify cross-repository token` because `CROSS_REPO_READ_TOKEN` is not configured.
- The local `supportcard-status` sibling repository points to GitHub repository `rectaris/calc-sapo`, not `rectaris/supportcard-status`.

## Completion

- Commit: `bf38648` (`Fix Pages support checkout target`)
- Public path changes: none.
- Checkout target change: `rectaris/supportcard-status` -> `rectaris/calc-sapo`
- Token behavior: `CROSS_REPO_READ_TOKEN` is optional and falls back to `github.token`.
- Validation:
  - `git diff --check`
  - `python3 scripts/lint-plan-docs.py`
  - `python3 scripts/format-plan-docs.py --check`
  - `python3 scripts/security-static-check.py`
  - `python3 scripts/structure-map.py --check`
  - `python3 scripts/validate-changes.py --all`
- Residual risk: GitHub Actions deployment was not rerun locally.
