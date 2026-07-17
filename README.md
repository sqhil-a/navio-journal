# Navio Journal

The public editorial site for Navio Pathways. It is a dependency-free static site deployed through GitHub Pages at `journal.naviopathways.com`.

## Local preview

Serve the repository root with any static file server. Run `npm run check` before publishing to verify routes, metadata, assets, and placeholder copy.

## Publishing

Pushes to `main` trigger the GitHub Pages workflow. The repository custom domain is stored in `CNAME`. DNS should keep `journal.naviopathways.com` as a CNAME to `sqhil-a.github.io`.
