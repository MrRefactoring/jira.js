# Minimal Data Center issue responses

Captured on 2026-11-09 from a local Jira Software Data Center 10.3.27 sandbox, issue `JMIG-1` (ID `10000`).
The platform and Agile endpoints were called with `fields=id` using the sandbox administrator's normal Basic authentication.
Both responses contain `fields: null`. The JSON bodies retain the server's response, including its issue ID and URL;
credentials and request headers are not included. `verification.json` records the request paths, version and HTTP statuses.

These fixtures establish the minimal response shape. Object-valued and omitted `fields`, invalid scalar/array values,
and unknown integration fields are covered separately by unit cases.

The public Data Center `Issue.fields` type now includes `null` as well as an object and `undefined`. Consumers should use
optional chaining or `issue.fields ?? {}` when reading fields. Code that previously narrowed only against `undefined`
must also handle `null`; the SDK preserves Jira's actual value instead of replacing it with an empty object.
