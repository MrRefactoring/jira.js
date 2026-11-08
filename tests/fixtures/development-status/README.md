# Data Center development-status fixtures

Captured on 2026-11-08 through the public SDK method
`developmentStatus.getIssueDevelopmentStatusDetail`, with strict response validation.
These are actual responses from an isolated local Jira Software Data Center 10.3.27
and Bitbucket Data Center 9.6.5 deployment, connected through reciprocal Application
Links using OAuth with impersonation and a shared test user.

Jira issue `JMIG-1` has numeric ID `10000`. Bitbucket project `JMIG`, repository
`development-status`, contains branch `feature/JMIG-1`, an issue-linked commit, and
real open pull request `#1` titled `JMIG-1 Verify development status`.
The addresses and application IDs belong to this disposable local fixture.
The responses contain no authentication headers or credentials.

Each request used `GET /rest/dev-status/1.0/issue/detail`, `issueId=10000`, and
`applicationType=stash`:

| File / dataType                    | HTTP status | Integration errors | Pull requests | Branches | Repositories   |
| ---------------------------------- | ----------- | ------------------ | ------------- | -------- | -------------- |
| `pullrequest.json` / `pullrequest` | 200         | 0                  | 1             | 1        | 0              |
| `repository.json` / `repository`   | 200         | 0                  | 0             | 0        | 1 (one commit) |
| `branch.json` / `branch`           | 200         | 0                  | 0             | 0        | 0              |

Branch payload coverage comes from the nonempty `branches` array returned for
`dataType=pullrequest`; the separate `branch` query returned an empty envelope.
`verification.json` records the read-only verifier result.

GitHub, GitHub Enterprise, and Bitbucket Cloud fixtures were unavailable and have
not been live verified. The `bitbucket`, `github`, `githube`, and custom integration
identifiers have query-forwarding tests only; they are not aliases for `stash`.
Only observed fields are typed, with open status strings and unknown additional
fields preserved at every modeled object level. Empty reviewer arrays do not
establish a reviewer element schema; commit-specific fields remain unknown.

To capture another fixture, build the SDK, set `JIRA_SERVER_BASE_URL`,
`JIRA_SERVER_USERNAME`, `JIRA_SERVER_PASSWORD`, `JIRA_SERVER_DEV_ISSUE_KEY`,
`JIRA_SERVER_DEV_APPLICATION_TYPE`, and optionally `JIRA_SERVER_DEV_CAPTURE_DIR`,
then run `pnpm check:development-status`. Inspect any captured integration errors
for sensitive authorization links before sharing them.
