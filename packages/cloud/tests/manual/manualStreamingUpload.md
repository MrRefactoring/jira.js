# Manual Streaming Upload Stress Harness

This harness is manual-only and designed for local diagnostics of very large attachment uploads.

It does not run in CI.

## What it validates

- progressive chunk generation for a huge logical payload
- bounded memory behavior during upload
- memory spikes and likely buffering patterns
- lifecycle timings for fetch call, first chunk generation, and first downstream body pull
- source backpressure indicators (`_read` calls, pause/resume counters)

## Safety model

- default logical upload size is `2GB` for faster local runs
- payload is generated lazily in chunks
- no 8GB buffer is allocated
- memory is sampled periodically
- upload aborts when RSS crosses a configurable ceiling

## Required environment variables

- `JIRA_BASE_URL`
- `JIRA_EMAIL`
- `JIRA_API_TOKEN`

## Optional environment variables

- `JIRA_STRESS_LOGICAL_SIZE` default `2GB`
- `JIRA_STRESS_CHUNK_SIZE` default `1MB`
- `JIRA_STRESS_CHUNK_THROTTLE_MS` default `0`
- `JIRA_STRESS_LOG_INTERVAL_MS` default `2000`
- `JIRA_STRESS_PROGRESS_STEP_PERCENT` default `5`
- `JIRA_STRESS_HIGH_WATER_MARK` default `1MB`
- `JIRA_STRESS_MEMORY_CEILING_RSS` default `2GB`
- `JIRA_STRESS_FILENAME` default `manual-stream-<timestamp>.bin`
- `JIRA_STRESS_ISSUE_ID_OR_KEY` optional explicit target issue
- `JIRA_STRESS_AUTO_PREPARE` default `1` (auto-create project+issue if target issue is missing)
- `JIRA_STRESS_AUTO_CLEANUP` default `1` (delete auto-created issue+project after run)

Accepted byte units: `B`, `KB`, `MB`, `GB`.

## Run

From repository root:

```bash
pnpm --filter @jira.js/cloud test:manual:streaming
```

This script uses:

- `NODE_OPTIONS=--max-old-space-size=2048`
- default harness logical size `2GB`

Example with explicit 8GB and slower generation:

```bash
JIRA_STRESS_LOGICAL_SIZE=8GB \
JIRA_STRESS_CHUNK_SIZE=2MB \
JIRA_STRESS_CHUNK_THROTTLE_MS=5 \
JIRA_STRESS_MEMORY_CEILING_RSS=3GB \
pnpm --filter @jira.js/cloud test:manual:streaming
```

Or use dedicated 8GB profile:

```bash
pnpm --filter @jira.js/cloud test:manual:streaming:8gb
```

Case where Node old-space is smaller than logical file size:

```bash
pnpm --filter @jira.js/cloud test:manual:streaming:heap-smaller-than-file
```

This profile uses:

- `NODE_OPTIONS=--max-old-space-size=512`
- `JIRA_STRESS_LOGICAL_SIZE=3GB`

It is intended to validate streaming behavior when heap limit is significantly below the logical upload size.

Example using an existing issue instead of auto-prepared resources:

```bash
JIRA_STRESS_ISSUE_ID_OR_KEY=PROJ-123 \
JIRA_STRESS_AUTO_PREPARE=0 \
pnpm --filter @jira.js/cloud test:manual:streaming
```

## Output summary

The harness prints:

- runtime diagnostics
- upload lifecycle timestamps
- periodic memory snapshots
- progress milestones
- throughput
- peak memory
- streamed-vs-buffered heuristic verdict

## CI behavior

- test file uses `describe.skipIf` unless `MANUAL_STREAMING_STRESS=1`
- test is always skipped when `CI=true` or `CI=1`
