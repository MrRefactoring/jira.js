# Data Center cluster snapshot verification

## Captured fixture

`verification.json` records a real successful request on Jira Software Data Center 10.3.27, captured on
2026-11-09 Europe/Moscow (2026-11-08 UTC). Two nodes, `jira650-node1` and `jira650-node2`, were active and alive in
a dedicated licensed Docker cluster sharing PostgreSQL and a shared-home volume. Node 1 requested a snapshot from
node 2; the server accepted the bodyless request with HTTP 200 and zero response bytes.

`negative-cases.json` records the license capability check and the actual permission/missing-node probes. Jira 11.3
clusters and alternate search platforms were unavailable. Snapshot transfer completion was not verified.

## Reproducing the check

Use a dedicated licensed Jira Data Center cluster with two active nodes. Point `JIRA_SERVER_BASE_URL` at the current
node and choose the other node as the snapshot source. The request asks that source to prepare an index snapshot
asynchronously; an empty successful response establishes that the request was accepted, not that transfer completed.

After building the SDK, configure `JIRA_SERVER_USERNAME` and `JIRA_SERVER_PASSWORD` for the sandbox administrator and run:

```bash
JIRA_SERVER_BASE_URL=http://localhost:8082 \
JIRA_SERVER_CLUSTER_CURRENT_NODE_ID=jira650-node1 \
JIRA_SERVER_CLUSTER_SOURCE_NODE_ID=jira650-node2 \
JIRA_SERVER_CLUSTER_CAPTURE_DIR=/tmp/cluster-snapshot \
pnpm check:cluster-snapshot
```

The verifier uses the public SDK with strict validation, checks both nodes are active, sends the bodyless PUT and
requires an empty success response. It records server version, node metadata, response status and byte count in
`verification.json`. A single-node 405, permission failure or unsupported search platform fails verification and must
not be recorded as successful coverage. Unit cases cover ordinary HTTP errors, cancellation and path encoding.

The method is deprecated by Atlassian since Jira 10.4 and marked for removal. Availability depends on the actual server
version and search platform. Positive verification on one fixture does not establish support on every deployment.
