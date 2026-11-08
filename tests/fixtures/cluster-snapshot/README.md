# Data Center cluster snapshot verification

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
