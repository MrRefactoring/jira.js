> 🌐 **English** · [Русский](README.ru.md)

# jira.js playground

A set of **self-contained** mini-projects for trying `jira.js` against a live Jira — fill in a
minimal config for a scenario and immediately get a response from Jira.

Each folder below is a **separate, independent npm project** (its own `package.json`, `tsconfig`,
dependencies, instructions). They run on their own and can even be lifted out into another repo.

## Scenarios

| Scenario               | What it demonstrates                                                                                       |
|------------------------|------------------------------------------------------------------------------------------------------------|
| [`oauth2/`](./oauth2/) | Full OAuth 2.0 (3LO) auto-flow: browser consent → tokens → auto-cloudId → `GET /myself`, with auto-refresh |

_(more can be added the same way: `jwt/`, `basic/`, etc.)_

## Common step: local build

The scenarios link against the **local** build of the library (`"jira.js": "file:../.."`) so they can
see not-yet-published features. So, before running any scenario, build the root once:

```bash
# from the repository root
pnpm install
pnpm build:src
```

Then go into the scenario you want and follow its `README.md`.

## Adding a new scenario

1. Copy any scenario folder (e.g. `oauth2/`) to `playground/<name>/`.
2. Replace the contents of `src/`, update `name` in `package.json` and the text in `README.md`.
3. Add a row to the table above.

There are no shared files between scenarios — a deliberate choice so each stays independent and easy
to move.
