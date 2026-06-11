# Fix Pages Cross-Repository Checkout

status: active
task_type: environment_data_flow
review_class: B
human_design_required: no
human_approval_status: not_required
target_files:
  - .github/workflows/deploy-pages.yml
  - README.md
  - docs/agent/SPEC_ENVIRONMENT.md
  - docs/plan/active/004-pages-cross-repo-token.md
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
  - Pages workflow uses an explicit cross-repository read token for sibling private repository checkouts.
  - Missing token configuration fails before checkout with an actionable error.
  - Required secret setup is documented without committing secret values.
acceptance_focus:
  - GitHub Actions checkout authentication
  - secret hygiene
expected_output: full-implementation
checked_summary_ja: Pages デプロイの別リポジトリ checkout 失敗を修正する。

## Notes

Failure evidence:

- `actions/checkout@v4` cannot determine the default branch for `rectaris/supportcard-status`.
- GitHub API returns `Not Found` for `rectaris/supportcard-status` when using the workflow token.
- Root cause: the `rectaris.github.io` workflow `GITHUB_TOKEN` does not have read access to the sibling private repository.
