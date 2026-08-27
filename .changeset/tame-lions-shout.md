---
---

Fix `changeset-release/main` push failing with a 403 by authenticating `actions/checkout` with the `PUBLISH_PACKAGES` PAT instead of the default `GITHUB_TOKEN` (CI/workflow-only change, no version bump needed).
