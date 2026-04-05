# Changesets

This directory is used by [@changesets/cli](https://github.com/changesets/changesets) to manage versioning and changelog entries for jira.js.

## Workflow

1. **Make changes** — implement your feature or fix
2. **Add a changeset** — `pnpm changeset` (interactive prompt)
3. **Commit** — include the generated `.md` file in your commit
4. **Release** — maintainers run `pnpm changeset version` to bump versions, then publish

## Changeset types

| Type | When |
|------|------|
| `major` | Breaking changes (see `SEMVER_POLICY.md`) |
| `minor` | Additive changes (new endpoints, new exports) |
| `patch` | Bug fixes, internal improvements, declaration fixes |

## Rules

- Every PR that affects public API **must** include a changeset
- PRs that only affect tests, docs, or CI may omit a changeset
- Breaking changes require a `major` changeset with migration guidance
- See `SEMVER_POLICY.md` for exact classification rules
- See `DEPRECATION_POLICY.md` for the deprecation lifecycle
