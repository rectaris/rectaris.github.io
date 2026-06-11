# Environment

Record project-specific environment, build, generated-file, hosting, and CI assumptions here.

Keep secrets out of repository files. Use environment variables or the platform secret store.

## GitHub Pages Deployment

- `.github/workflows/deploy-pages.yml` builds a single Pages artifact from this portal plus `rectaris/gakumasu-timeline`.
- `supportcard-status` is deployed separately on Cloudflare Workers and is linked from the portal as `https://supportcard-status-calculate.curiretas.workers.dev/`.
- The Pages workflow does not checkout or build `rectaris/calc-sapo`.
- The `rectaris/gakumasu-timeline` checkout uses the default workflow token because that repository is publicly readable.
