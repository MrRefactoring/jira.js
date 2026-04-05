# TESTING.md

## Overview

This repository uses a layered testing strategy, with a special focus on **live API tests** for `packages/agile`.

The goal of the test setup is to keep the SDK:

- reliable
- maintainable
- safe to evolve
- verified against the real Jira Cloud API where it matters

This is an SDK repository, so tests should validate:

- request construction
- endpoint wiring
- typed API contracts
- real Jira compatibility

---

## Test Types

### 1. Unit Tests

Use unit tests for fast, isolated validation of SDK behavior.

Examples:

- request path construction
- query parameter serialization
- request body construction
- client method wiring
- helper behavior
- edge-case parameter handling

Unit tests should not require network access or a Jira tenant.

These are the default and most important test layer.

---

### 2. Contract / Shape Tests

Use contract tests to validate the package boundary and public SDK surface.

Examples:

- client exposes expected methods
- endpoint methods are wired correctly
- public exports remain stable
- internal composition still matches expected API shape

These help catch regressions when refactoring SDK internals.

---

### 3. Integration Tests

Use integration tests only when needed to verify behavior across multiple internal layers.

Examples:

- feature package → base client request path
- endpoint assembly + serialization + response normalization

These should still avoid hitting the real Jira API unless there is a clear reason.

---

### 4. Live Tests

Use live tests to validate the SDK against a **real Jira Cloud tenant**.

Live tests are useful for verifying:

- auth compatibility
- real endpoint behavior
- real request/response correctness
- real-world Jira quirks that mocks do not catch

Live tests should remain:

- small
- practical
- opt-in
- easy to maintain

---

## Current Live Test Scope

At the moment, live tests are intended only for:

- `packages/agile`

Live tests are **not currently in scope** for:

- `packages/cloud`
- `packages/serviceDesk`

Those packages are currently stubs and should not be included in testing work unless there is an explicit separate task.

---

## Recommended Test Folder Structure

### For `packages/agile`

```txt
packages/agile/
├── tests/
│   ├── unit/
│   ├── live/
│   │   ├── helpers/
│   │   ├── board.live.test.ts
│   │   ├── sprint.live.test.ts
│   │   ├── backlog.live.test.ts
│   │   ├── boardProperties.live.test.ts
│   │   └── issueMovement.live.test.ts
│   └── shared/
```

### Folder purposes

#### `tests/unit/`
Use for:
- endpoint wiring tests
- request construction tests
- public client tests
- helper unit tests

#### `tests/live/`
Use for:
- real Jira Cloud validation

#### `tests/live/helpers/`
Use for:
- env handling
- authenticated client setup
- board/sprint/issue resolution
- shared live test setup logic

#### `tests/shared/`
Use for:
- shared non-live test utilities

---

## Environment Configuration

Use a single `.env` file.

### Minimal required config

```env
JIRA_BASE_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_API_TOKEN=your_api_token_here
```

### Optional config

```env
JIRA_TEST_BOARD_ID=
JIRA_TEST_PROJECT_KEY=
```

### Notes

- `JIRA_TEST_BOARD_ID` is optional and can make board resolution faster
- `JIRA_TEST_PROJECT_KEY` is optional and can help issue/sprint setup helpers
- live tests should work with only the minimal required config whenever possible

---

## Running Tests

### Default tests

Run standard tests:

```bash
pnpm test
```

### Unit tests only

```bash
pnpm test:unit
```

### Live tests

```bash
pnpm test:live
```

---

## Recommended Scripts

### `packages/agile/package.json`

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:unit": "vitest run tests/unit",
    "test:live": "vitest run tests/live"
  }
}
```

---

## Live Test Rules

### 1. Live tests must not run by default

Live tests should only run when explicitly requested with:

```bash
pnpm test:live
```

They should not be part of the default fast test path.

---

### 2. Live tests must skip cleanly if env is missing

If required env variables are missing:

- skip the suite
- do not fail the test run

Use a shared helper such as:

- `skipIfNoLiveEnv()`

This makes local development and CI more predictable.

---

### 3. Do not hardcode tenant-specific IDs

Avoid this:

```ts
const boardId = 12;
const sprintId = 44;
const issueKey = "SDK-123";
```

Prefer this:

```ts
const board = await resolveTestBoard(client, config);
const sprint = await resolveOrCreateTestSprint(client, board.id);
const issue = await resolveOrCreateTestIssue(config);
```

This keeps tests portable across Jira tenants.

---

### 4. Every live test should own its setup

A live test should resolve or create the resources it needs.

Do not assume:

- a sprint already exists
- a board property already exists
- an issue is already in the right state

Use helpers for setup instead.

---

### 5. Live tests must be independent

Do not rely on test execution order.

Avoid patterns like:

- “this test uses the sprint created in the previous test”
- “this test assumes the previous board property test already ran”

Each test should be valid on its own.

---

### 6. Use unique names for created resources

If a test creates a resource, use a unique prefix, for example:

- `sdk-live-test-<timestamp>`
- `sdk-live-test-<randomSuffix>`

This prevents collisions and makes cleanup/debugging easier.

---

### 7. Read before mutate

If a test performs a mutation:

- first confirm the target resource exists
- then perform the mutation
- then verify the expected result

This reduces noisy failures and improves diagnostics.

---

## Recommended Live Helpers

Create shared helpers under:

```txt
packages/agile/tests/live/helpers/
```

### `liveEnv.ts`

Responsible for:

- reading `.env`
- validating required values
- exposing a normalized config object

Suggested functions:

- `getLiveEnv()`
- `hasLiveEnv()`

---

### `createLiveAgileClient.ts`

Responsible for:

- creating an authenticated Agile client from env

Suggested return shape:

```ts
{
  client,
  config: {
    baseUrl,
    email,
    projectKey,
    boardId,
  }
}
```

---

### `skipIfNoLiveEnv.ts`

Responsible for:

- skipping live tests cleanly when env is incomplete

---

### `resolveTestBoard.ts`

Responsible for:

- finding a board for tests

Recommended resolution order:

1. use `JIRA_TEST_BOARD_ID` if provided
2. otherwise discover a usable board dynamically
3. otherwise skip/fail clearly

---

### `resolveOrCreateTestSprint.ts`

Responsible for:

- finding or creating a sprint for sprint-related tests

---

### `resolveOrCreateTestIssue.ts`

Responsible for:

- finding or creating a test issue for movement/ranking tests

Important note:

Issue creation may require using a non-agile Jira endpoint if `agile.jira.js` itself does not expose issue creation.  
That is acceptable as long as it is isolated to helper/setup code.

---

## Recommended First Live Test Files

Start with these files:

```txt
packages/agile/tests/live/helpers/liveEnv.ts
packages/agile/tests/live/helpers/createLiveAgileClient.ts
packages/agile/tests/live/helpers/skipIfNoLiveEnv.ts
packages/agile/tests/live/helpers/resolveTestBoard.ts
packages/agile/tests/live/helpers/resolveOrCreateTestSprint.ts
packages/agile/tests/live/helpers/resolveOrCreateTestIssue.ts
packages/agile/tests/live/board.live.test.ts
packages/agile/tests/live/sprint.live.test.ts
packages/agile/tests/live/backlog.live.test.ts
packages/agile/tests/live/boardProperties.live.test.ts
```

---

## Recommended Live Test Order

Implement in this order.

### 1. `board.live.test.ts`

Suggested coverage:

- `getAllBoards`
- `getBoard`
- optionally `getConfiguration`

Why start here:

- validates auth
- validates connectivity
- validates board endpoint correctness
- low maintenance

---

### 2. `sprint.live.test.ts`

Suggested coverage:

- `getAllSprints`
- `getSprint`

Why it matters:

- validates board-scoped sprint retrieval
- common Agile workflow coverage

---

### 3. `backlog.live.test.ts`

Suggested coverage:

- `getIssuesForBacklog`
- `getIssuesForBoard`
- optionally `getIssuesWithoutEpicForBoard`

Why it matters:

- issue listing is a core SDK use case
- often exposes real Jira quirks

---

### 4. `boardProperties.live.test.ts`

Suggested coverage:

- `setBoardProperty`
- `getBoardProperty`
- `deleteBoardProperty`

Why it matters:

- excellent first write-oriented live test
- low blast radius
- easy cleanup

---

### 5. `issueMovement.live.test.ts`

Suggested coverage:

- `moveIssuesToSprintAndRank`
- `moveIssuesToBacklog`
- `rankIssues`

Why it matters:

- high-value Agile workflow coverage

---

## Anti-Flake Rules

To keep the suite healthy:

### Do

- assert shape/presence rather than exact counts
- resolve resources dynamically
- use helper-driven setup
- keep tests narrow
- verify only the intended effect

### Don’t

- do not assert exact board counts
- do not assume fixed issue ordering
- do not depend on execution order
- do not use shared production boards as test state
- do not bundle too many mutations into one test

---

## CI Guidance

### Default CI

Run only:

- unit tests
- non-live integration tests

### Live tests

If live tests are added to CI later, they should run:

- explicitly
- on demand
- nightly
- before release

Do not make live tests part of the default fast CI path.

---

## Contributor Guardrails

### Do

- preserve package boundaries
- add tests for new endpoints where appropriate
- keep live test setup simple and reusable
- prefer maintainability over “perfect coverage”

### Don’t

- do not hardcode tenant-specific IDs
- do not make live tests destructive by default
- do not over-engineer the live test harness
- do not include stub packages in testing work unless explicitly asked

---

## Final Recommendation

Treat testing as a confidence tool, not a ceremony generator.

The best test setup for this repo is:

- simple
- typed
- predictable
- focused on real value
