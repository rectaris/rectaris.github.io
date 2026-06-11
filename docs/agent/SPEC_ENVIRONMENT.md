# Environment

Record project-specific environment, build, generated-file, hosting, and CI assumptions here.

Keep secrets out of repository files. Use environment variables or the platform secret store.

## GitHub Pages Deployment

- `.github/workflows/deploy-pages.yml` builds a single Pages artifact from this portal plus sibling repositories.
- The support card checkout target is `rectaris/calc-sapo`, mounted locally as `supportcard-status`.
- The build job uses the `github-pages` environment so `CROSS_REPO_READ_TOKEN` may be configured as either a repository secret or a `github-pages` environment secret.
- The workflow verifies public access or token-backed access to sibling repositories before running `actions/checkout` for them.
- External repository checkouts use `CROSS_REPO_READ_TOKEN` when configured, otherwise they fall back to `github.token`.
- `CROSS_REPO_READ_TOKEN` is required only when `rectaris/gakumasu-timeline` or `rectaris/calc-sapo` cannot be read with the default workflow token.
- If configured, the token must have read-only contents access to those repositories.
