# Contributing

Thank you for wanting to help. One thing is worth knowing before you open an editor, because it decides where a patch
belongs.

## Most of `src/` is generated

These directories are machine-written from Atlassian's OpenAPI documents and are overwritten wholesale on the next
regeneration:

```
src/cloud/**
src/agile/**
src/serviceDesk/**
src/core/**
```

A surface directory is generated *whole*, not just its `api`, `models` and `parameters`. Its `index.ts` and its
`create*Client.ts` come out of the generator too — `createIndexFile.ts` and `createClientFactoryCode.ts` write them —
so those are as overwritten as the rest.

A change made there disappears. It is nobody's fault that this is not obvious — the files carry no banner, and there is
no build step in this repository that would produce them.

The generator lives in [`MrRefactoring/apis-code-gen`](https://github.com/MrRefactoring/apis-code-gen). A fix to a
generated file belongs there, in one of three places:

- **`packages/base/core/**`** — the transport, authentication, errors and schema handling. Shared with `confluence.js`
  and `trello.js`, so a change here reaches every client.
- **`packages/base/src/creators/**`** — the emitters that turn a specification into TypeScript. Change these when the
  *shape* of every generated function is wrong.
- **`packages/jira/src/{config.ts,patches/}`** — where Atlassian's documents are corrected. Most fixes land here:
  a response typed as one object that arrives as a list, an endpoint that does not take JSON, a body the document
  declares under a wildcard media type. Each patch is a small, tested transform over the document.

If you are not sure which, open an issue describing what the API actually returns — a request and its real response is
worth more than a guess at the cause, and it is what a patch gets written from.

## What is hand-written here

Everything else: `src/index.ts`, `tests/`, `scripts/`, `tools/`, `docs/` and the files in the repository root.
Pull requests against those are ordinary pull requests.

## Running things

```bash
pnpm install
pnpm build            # tsc + the browser bundle
pnpm typecheck        # sources and tests
pnpm lint
pnpm test             # unit tests; no network
pnpm check:consumers  # packs the tarball and consumes it from a clean project
pnpm check:browser    # static browser-safety scan of dist/
```

The live suites talk to a real Jira site and need credentials in a repo-root `.env` (`JIRA_BASE_URL`, `JIRA_EMAIL`,
`JIRA_API_TOKEN`). They are not required for a pull request; CI runs them nightly.

## Reporting a bug

The useful report names the endpoint, shows the call, and shows what came back. In 6.x an error carries the response
body as `error.body`, and a schema mismatch carries `error.report` — both are worth pasting. Neither contains anything
the API did not already send you, but read them before pasting.
