# Environment

Record project-specific environment, build, generated-file, hosting, and CI assumptions here.

Keep secrets out of repository files. Use environment variables or the platform secret store.

## GitHub Pages Deployment

- `.github/workflows/deploy-pages.yml` builds a single Pages artifact from this portal plus sibling repositories.
- External repository checkouts require the `CROSS_REPO_READ_TOKEN` GitHub secret.
- The token must have read-only contents access to `rectaris/gakumasu-timeline` and `rectaris/supportcard-status`.
- Do not replace this with the default `GITHUB_TOKEN` unless those repositories are public or explicitly accessible to this workflow token.
