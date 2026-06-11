# Fix Pages private checkout token handling

status: active
task_type: environment_data_flow
review_class: B
human_design_required: no
human_approval_status: not_required
target_files:
  - .github/workflows/deploy-pages.yml
  - README.md
  - docs/agent/SPEC_ENVIRONMENT.md
  - docs/plan/active/006-pages-private-checkout-token.md
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
  - Build job can read CROSS_REPO_READ_TOKEN from the documented github-pages environment.
  - Private sibling repository access is verified before actions/checkout runs.
  - Missing or under-scoped token fails with an actionable error instead of checkout default-branch Not Found.
acceptance_focus:
  - GitHub Actions checkout authentication
  - cross-repository token diagnostics
expected_output: full-implementation
checked_summary_ja: Pages の private 別リポジトリ checkout 認証を修正する。

## Notes

Failure evidence:

- `actions/checkout@v4` cannot determine the default branch for `rectaris/calc-sapo`.
- GitHub API returns `Not Found` while the workflow is checking out the sibling repository.
- Root cause: when the private repository is not publicly readable, `github.token` from `rectaris.github.io` does not have read access to `rectaris/calc-sapo`; additionally, a documented `github-pages` environment secret was not available to the build job.

## Completion

- Public path changes: none.
- Link changes: none.
- Workflow changes:
  - The build job now uses the `github-pages` environment, making documented environment secrets available during sibling repository checkout.
  - The workflow validates `CROSS_REPO_READ_TOKEN` when configured, or confirms public API readability when the token is absent, before external checkout runs.
  - Missing or under-scoped private repository access now fails with an explicit `CROSS_REPO_READ_TOKEN` error instead of an `actions/checkout` default-branch `Not Found`.
- Documentation updated:
  - README clarifies repository secret vs `github-pages` environment secret setup.
  - `docs/agent/SPEC_ENVIRONMENT.md` records the preflight access check.
- Validation:
  - `git diff --check`
  - `python3 scripts/lint-plan-docs.py`
  - `python3 scripts/format-plan-docs.py --check`
  - `python3 scripts/security-static-check.py`
  - `python3 scripts/structure-map.py --check`
  - `python3 scripts/validate-changes.py --all`
  - workflow YAML parse with PyYAML
- Residual risk: GitHub Actions deployment was not rerun locally; the GitHub secret must exist and have read access to `rectaris/gakumasu-timeline` and `rectaris/calc-sapo` if either repository is private.
