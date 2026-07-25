# Response Validation

Every response is checked against a schema before you see it. Dates are turned into `Date`, and a field
the endpoint promises is a field you can rely on.

When a response does **not** match, the library does not throw. The body comes back unvalidated and the
problem is reported once:

```
[jira.js] GET /rest/api/3/project/{projectIdOrKey}/role answered with something the schema
does not describe: at `10002`, expected string, got number. The response is returned
unvalidated. Set `onSchemaMismatch` to 'silent' to stop these, or pass a function to handle
them yourself.
```

## Why it warns instead of throwing

The shapes Jira sends depend on things a library cannot see: your site's locale, which features are
switched on, whether a project is team-managed or company-managed, the custom fields your admins added,
and whatever Atlassian added to an enum this week.

A schema shipped here being wrong about one of those is not your bug, and it should not take your
integration down. So the default reports it and gets out of the way.

## Configuring it

```typescript
const jira = createCloudClient({
  host,
  auth,
  onSchemaMismatch: 'warn',
});
```

| Value | Behaviour |
| --- | --- |
| `'warn'` *(default)* | Report once per distinct problem on stderr, return the body unvalidated |
| `'silent'` | Return the body unvalidated, say nothing |
| `'throw'` | Raise `SchemaMismatchError` |
| a function | Receives the report; nothing is printed |

### `'throw'` belongs in tests

In a test suite a mismatch **is** the thing under test, and failing loudly is what you want:

```typescript
const jira = createCloudClient({
  host,
  auth,
  onSchemaMismatch: process.env.NODE_ENV === 'test' ? 'throw' : 'warn',
});
```

### Handling it yourself

Pass a function and the printing stops entirely — route it to your own logger, a counter, or an error
tracker:

```typescript
import type { SchemaMismatchReport } from 'jira.js';

const jira = createCloudClient({
  host,
  auth,
  onSchemaMismatch: (report: SchemaMismatchReport) => {
    logger.warn({ endpoint: report.endpoint, issues: report.issues }, 'jira schema drift');
  },
});
```

## The report

```typescript
interface SchemaMismatchReport {
  endpoint: string;              // 'GET /rest/api/3/project/{projectIdOrKey}/role'
  issues: {
    path: string;                // 'values.0.created' — empty for the response root
    expected: string;            // what the schema wanted
    received: string;            // what arrived, named by type
  }[];
}
```

**It never contains values.** Paths and type names only. That is deliberate: the report is meant to be
pasted into a bug report, and the body it describes is yours — issue summaries, display names, custom
field contents. `SchemaMismatchError` carries the same object on `.report`.

## Noise

Warnings are deduplicated by endpoint and field for the life of the process, so paginating five hundred
issues past one bad field produces one line, not five hundred.

They go to **stderr**, not stdout. Redirecting or piping a CLI's output is unaffected:

```bash
my-cli issues > out.json      # the warning stays in the terminal, out.json is clean
my-cli issues | jq '.total'   # jq never sees it
my-cli issues 2>/dev/null     # silenced
```

## Found drift? Report it

A mismatch usually means the schema here is behind Jira, and the report has everything needed to fix it.
[Open an issue](https://github.com/MrRefactoring/jira.js/issues/new) and paste it in.
