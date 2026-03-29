# Branch Protection Checklist (GitHub)

Apply these rules to `main`:

## Required

1. Require pull request before merging
2. Require at least 1 approval
3. Dismiss stale approvals when new commits are pushed
4. Require status checks to pass:
   - `CI / build`
5. Require branches to be up to date before merging
6. Require conversation resolution before merging

## Optional (Recommended for stricter control)

1. Require signed commits
2. Require linear history
3. Restrict who can push to `main`

These settings keep `main` always releasable and ensure changesets and
governance are not bypassed.
