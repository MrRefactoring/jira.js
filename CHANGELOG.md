# Jira.js changelog

## 6.2.0

Avatars moved bytes in both directions and the specification described both as JSON, so neither direction worked. Reading an image threw before the response reached the caller; uploading one had no way to send an image at all. Both are fixed here, along with two column endpoints broken by the same reading of the same specification.

### Bug Fixes

* **`getAvatarImageByID`, `getAvatarImageByType` and `getAvatarImageByOwner` return the image.** All three were generated with `StreamingResponseBodySchema` — the specification's `StreamingResponseBody`, an object with no properties — so a response arriving as `image/png` or `image/svg+xml` was reported as `SchemaMismatchError: Expected a JSON response to validate against the schema`. There was no input for which they could succeed. They now return a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob). Fixes [#434](https://github.com/MrRefactoring/jira.js/issues/434).

  A `Blob` rather than the bytes alone, because the content type cannot be worked out from the request: the same avatar URL answers with SVG for a system avatar and PNG for an uploaded one, and `format` is optional. `image.type` is the content type, `await image.arrayBuffer()` the bytes, and `new Response(image)` passes it straight to a browser. In v5 this was `AvatarWithDetails` — `{ avatar, contentType }`; the two fields are now one value.

  Attachment downloads are unchanged. `getAttachmentContent` and `getAttachmentThumbnail` still return the bytes, because an attachment already carries its `mimeType` and `filename` in its metadata.

* **`storeAvatar`, `createProjectAvatar` and `createIssueTypeAvatar` accept an image.** Their request body was generated as `Record<string, any>` — an object of arbitrary keys — because Atlassian declares it under a wildcard media type with an empty schema. It is now a [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob):

  ```ts
  await jira.avatars.storeAvatar({
    type: 'project',
    entityId: project.id,
    size: 48,
    body: new Blob([bytes], { type: 'image/png' }),
  });
  ```

  The `Blob` carries the content type the endpoint reads the image by; `fetch` takes the header from it, so nothing is passed alongside it and nothing can contradict it. The three calls also send `X-Atlassian-Token: no-check`, which Jira requires — without it the upload is refused outright, with it and no content type the image is rejected as an unsupported format. Both were verified against a live site.

* **`setUserColumns` and `setIssueNavigatorDefaultColumns` take the columns.** Both declare a `ColumnRequestBody` reference under a wildcard media type and nowhere else; only `application/json` was read, so the reference was missed and the body degraded to the same shapeless object. They now take `columns: string[]`, like `setColumns` on a filter already did:

  ```ts
  await jira.users.setUserColumns({ columns: ['summary', 'status'] });
  ```

### Types

* **Those three methods are typed `Promise<Blob>`**, where they were `Promise<StreamingResponseBody>`. Nothing that compiled against the old type can have been working — the call threw before returning — so the compiler pointing at these lines is the first honest signal about them. `StreamingResponseBody` itself is still exported; nothing else referenced it.
* **`BlobSchema` is exported from `jira.js/core`,** beside `BufferSchema`. It marks an endpoint whose response is bytes with a content type worth keeping; the client reads such a response with `response.blob()` rather than parsing it as JSON.
* **The three upload bodies are typed `Blob`**, where they were `Record<string, any>`. No call could have worked: the endpoints refuse a request without the XSRF header, which the old shape had no way to send.
* **`setUserColumns` and `setIssueNavigatorDefaultColumns` take `columns: string[]`** in place of `body`. Unlike the avatar uploads, these two had a working form — `{ body: { columns: [...] } }` reached Jira intact — so a call written that way needs the one-line change. `{ body: [...] }`, the other reading the old type invited, was answered with 400.
* **The agile models point at their nested shapes instead of repeating them.** A board's `admins.users` was written out in full in each of the five models that carry a board — `Board`, `CreateBoard`, `GetBoard`, `GetAllBoards` and `PageBoard` — and the same held for changelog histories, column statuses and issue fields across twenty-one others. They now reference `UserSchema`, `GroupSchema`, `BoardLocationSchema`, `RelationSchema`, `ChangelogSchema` and the rest, each of which was exported already and describes the identical shape, field for field and constraint for constraint. Nothing validates differently, no description was lost, and every type is structurally what it was — a nested shape simply reports itself by name in an editor now, and the generated agile sources are a thousand lines shorter.
* **`toggleFeatures` takes a described body.** It was typed `Record<string, any>` — an object of arbitrary keys — because the shape was declared inline and had no name to point at; the operation's own `boardId` collides with the body's, so its fields cannot be spread the way `rankIssues` spreads its own. The body is now `FeatureToggleRequest`: `{ boardId?, enabling?, feature? }`. A call already passing those three fields is unchanged.
* **The agile model `GetQuickFilter` is gone; the type is `QuickFilter`.** The two were the same six optional fields under two names, because the response was declared inline rather than by reference. `import type { QuickFilter } from 'jira.js/agile'` is the whole change, and `getQuickFilter` returns what it always did. The request parameter type of that name is untouched.

### General

* **The writes are covered live now.** All three uploads store an image against the test site and delete it again, the filter, account and site-wide column endpoints are set and restored, and the avatar just uploaded is read back through `getAvatarImageByID` — the two halves proving each other. None of this had a single test before, which is how a body typed as an object survived a major release.
* **The live test for these endpoints was passing without testing anything.** It looked for `avatarId=` in a project's `avatarUrls`, which give the path form and carry no such parameter, so the match failed, the test returned on its second line, and every assertion below it — including the one a `SchemaMismatchError` would have failed — was unreachable. That is why this shipped. The test now takes its avatar id from `getAllSystemAvatars`, asserted non-empty by the test above it, and has no branch that can turn it off; the two remaining image endpoints are covered as well.


## 6.1.0

Atlassian's specification lists the values it knows a field can hold, and that list falls behind the API it describes. Reading a project of a type the list has not caught up with was never an error — the response came back whole — but it printed a warning, once per project, that named neither the values it wanted nor the one it got. All three of those are fixed here.

### Types

Nothing here changes what the library does at runtime. Every call that worked before works now, unchanged, and returns the same thing — the runtime only became more accepting. What may need a moment is TypeScript.

* **Enums in response schemas accept values the specification has not caught up with.** A field documented as `'software' | 'service_desk' | 'business'` is now typed `'software' | 'service_desk' | 'business' | (string & {})`. An editor still suggests the three; the compiler no longer insists on them.

  Most code needs no change. What stops compiling is code that relied on the narrowness: a `switch` with a `never` exhaustiveness check now needs a `default`, and an assignment into a narrower variable — or a call into a function with a narrow signature — needs the check you would write anyway. Narrowing still works exactly as before: `if (project.projectTypeKey === 'software')` gives you the literal.

  Properties that tell the branches of a union apart are unaffected: they stay closed, because that is what makes the union resolvable.
* **Object types are declared as interfaces.** The handful of models emitted as `export type X = { … }` — `CompoundClause`, the `ConditionGroup*` family, `WorkflowCompoundCondition`, `LinkGroup`, `NotificationEvent`, `AttachmentInput` and the rest — are `export interface X { … }`. The type they describe is identical; they now report themselves by name in an editor instead of unfolding into their own body, and you can extend them.

### Bug Fixes

* **`projectTypeKey` was missing two project types.** `product_discovery` (Jira Product Discovery) and `customer_service` (Jira Customer Service) are now listed everywhere the field appears, in all three APIs. Atlassian's specification contradicts itself here — the same document lists four values on `ProjectPayload` and on the project-type operations, five on `WorkflowCapabilities`, and three on `Project`. Fixes [#431](https://github.com/MrRefactoring/jira.js/issues/431).
* **A mismatch on a listed value reported nothing usable.** The message read `expected invalid_value, got string`, which is the name of zod's error code rather than a description of the problem. It now names the values the schema allows and the value that actually arrived — `expected one of 'software' | 'service_desk' | 'business', got "product_discovery"`. Limits, formats and the other checks are spelled out the same way instead of surfacing as codes.

  The value is quoted only for a field the schema describes with a fixed list of values, which by construction cannot be holding free text. Everything else is still reported by type alone, so a response body never reaches a log.
* **One bad field in a paginated response was reported once per element.** The deduplication key included the array index, so a stale enum across four projects printed four identical warnings — and across five hundred, five hundred. Indices no longer distinguish one problem from another; the line that gets printed still points at a concrete element.

### General

* **The schema audit reports a grown enum as drift.** It only ever understood one kind of gap — a key the API sends and the schema does not describe — so a value outside a documented set failed the run under the heading *real breakage, not drift*, which is the opposite of what it is. `pnpm run audit:schemas` now lists such fields in their own table, with the values seen and the values documented. This matters more than it did: an unlisted value no longer reaches a caller's log, so the audit is the only place left that can see one.

## 6.0.0

6.0 replaces the transport, the client shape and the API surface. Read [MIGRATION.md](./MIGRATION.md) before upgrading — a codemod handles the mechanical parts, and the guide is explicit about who should not upgrade at all.

5.x is closed to features and receives security fixes and fixes for critical regressions until the end of 2026, when Atlassian Connect reaches end of support and the JWT users who cannot move have nothing left to stay for.

### Breaking changes

* **One platform surface.** `Version2Client` and `Version3Client` are replaced by `createCloudClient`, generated from Jira's v3 specification. Rich text can still be written as a wiki-markup string; it is always read back as an Atlassian Document Format document.
* **Factories instead of constructors.** `new XClient(config)` → `createCloudClient` / `createAgileClient` / `createServiceDeskClient`, all of which accept one shared client so a single OAuth token state is reused.
* **`fetch` instead of axios.** `middlewares`, `baseRequestConfig` and `newErrorHandling` are gone, and `AxiosError` with them. Failures now arrive as typed errors with predicates — `isNotFoundError`, `isRateLimitError` and the rest.
* **JWT (Atlassian Connect) is not supported.** Stay on 5.x; see the support window below.
* **ESM only, Node.js ≥ 22.** The CommonJS build and the callback-style overloads are removed.
* **One runtime dependency.** `zod`, down from three — `mime-types` is replaced by a built-in table.
* **Models built from a list of alternatives are unions rather than empty objects.** `CustomFieldContextDefaultValue` — twenty-seven branches, discriminated on `type` — along with `JqlQueryClause` and the operand types beneath it, `WorkflowCondition`, were generated as `{}` and therefore accepted anything, and `CustomContextVariable` carried nothing but its discriminator. They now carry the alternatives the specification declares, so narrowing on `type` gives you the branch and building one by hand means naming it.

### Features

* **Runtime validation of responses, non-fatal by default.** Every response is checked against its schema. A mismatch does not end the request: the body is returned unvalidated and the problem is reported once per distinct field, to stderr. Configure with `onSchemaMismatch: 'warn' | 'silent' | 'throw' | (report) => void`.

  The default is `'warn'` because the shapes Jira sends vary with things a library cannot see — tenant locale, whether a feature is enabled, team-managed versus company-managed projects, an enum Atlassian grew without notice. None of those are your bug, and none should stop your program. Use `'throw'` in a test suite, where a mismatch is the thing under test.
* **`SchemaMismatchError` reports structurally.** It carries `report` — endpoint, field paths, expected and received *types* — and no longer carries the response body. The body used to end up in every log line and error tracker that saw the error, carrying issue summaries, display names and custom field contents with it.
* **A v5 → v6 codemod** ships in the package. It rewrites client construction, authentication and imports, and leaves a `TODO(jira.js@6)` wherever a human has to decide — read every one of them.

  ```bash
  npx jscodeshift -t node_modules/jira.js/tools/codemod/v5-to-v6.ts \
    --parser ts --extensions ts,tsx,js,jsx src/
  ```
* **First-class OAuth 2.0 (3LO)**, with automatic refresh before expiry, one retry on `401`, cloud id resolution and rotated-refresh-token callbacks.
* **A browser build.** The package is browser-safe throughout, verified in CI both statically and by loading the built bundle in Chromium.

### Bug Fixes

* **27 endpoints returned `unknown` and validated nothing.** All of them now declare a response type. The causes were an empty response schema in Atlassian's specification being read as a described body, `303 See Other` not counting as success, and open maps and top-level unions having no representation in the generator. Notably `getProjectRoles`, `getRemoteIssueLinks` and the Service Desk attachment downloads — the last of which were typed as JSON and are binary.
* **`attachTemporaryFile` (Service Desk) had no described response.** The ids it returns are the only route to `createAttachment`, so the endpoint was unusable as typed.

### General

* Live suites cover every API module against a real Jira site, and a nightly audit checks the schemas against what that site actually sends.
* The test sources are now type-checked in CI. They never were: `tests/tsconfig.json` inherited a `rootDir` that made every file an error before any type was looked at, and Vitest strips types without checking them.

## 5.4.0

### Features

* **#293:** Re-added JWT (Atlassian Connect) authentication via `authentication.jwt` (`issuer`, `secret`, `expiryTimeSeconds`). Implemented with isomorphic WebCrypto and **zero new runtime dependencies**, so the browser build is unaffected. See the [step-by-step guide](./guides/jwt-authentication.md).
  * Note: [Atlassian Connect is reaching end of support (Q4 2026)](https://www.atlassian.com/blog/development/announcing-connect-end-of-support-timeline-and-next-steps) and new private apps can no longer be installed via a descriptor URL. This auth method is intended for **existing** Connect app installations.
* **#269, #401:** Added full Atlassian **OAuth 2.0 (3LO)** support: stateless flow helpers (`generateAuthorizationUrl`, `exchangeAuthorizationCode`, `refreshOAuth2Token`, `getAccessibleResources`) plus an auto-refreshing client with automatic cloudId resolution via the API gateway. Configure `authentication.oauth2` with `refreshToken`/`clientId`/`clientSecret` (and optional `cloudId`/`siteUrl`/`expiresAt`/`onTokenRefresh`); the access token is refreshed on expiry and on `401`, and the rotated refresh token is surfaced via `onTokenRefresh`. Fully backward compatible — `oauth2: { accessToken }` is unchanged. Partially addresses **#404** (built-in token refresh / `401` retry, though general axios interceptors are still not exposed). See the [OAuth 2.0 guide](./guides/oauth2-authentication.md) and the runnable [`playground/oauth2`](./playground/oauth2).
* **#396:** `IssueAttachments.getAttachmentContent` (`version2` & `version3`) now accepts an optional `range` (HTTP `Range` header) for partial/byte-range downloads, e.g. `getAttachmentContent({ id, range: 'bytes=0-1023' })`. When `range` is set and `redirect` isn't specified explicitly, the request is sent with `redirect=false` so Jira returns `206 Partial Content`. Closes **#396**.

### Bug Fixes

* **#403:** Restored deep subpath imports for the typed `models`/`parameters` barrels (e.g. `jira.js/version3/parameters`, `jira.js/version3/models`, and the `version2`/`agile`/`serviceDesk` equivalents). They were unreachable since `5.2.0` because the `exports` map only had a flat `./*` wildcard, which resolves a directory barrel to a non-existent `*.d.ts`/`*.mjs` file. Added `./*/models` and `./*/parameters` `exports` patterns that point at the barrel `index` files. Requires an `exports`-aware resolver (`moduleResolution: bundler`/`node16`/`nodenext`); with legacy `node` resolution use the root namespace (`Version3.Version3Parameters.*`).

### General

* Updated dependencies (including `axios` to `^1.18.1` and `zod` to `^4.4.3`)
* Bumped the package manager to `pnpm@10.34.4` (kept on the `10.x` line, which still supports Node.js 20; `pnpm@11` requires Node.js ≥ 22.13)
* Adjusted avatar `content-type` parsing in `version2`/`version3` to match the stricter response header types introduced by the `axios` update

## 5.3.1

### Bug Fixes

* **#416:** Fixed `mime.getType is not a function` when using the CommonJS build. Replaced the ESM-only `mime` dependency with `mime-types`, which supports both ESM and CJS. Thanks to [Alxs39](https://github.com/Alxs39) for [reporting this issue](https://github.com/MrRefactoring/jira.js/issues/416).

## 5.3.0

### General

* Updated dependencies
* Improved JSDoc coverage and quality
* Refactored integration tests to use global setup/teardown for better performance and reliability
* Wrapped all integration tests in describe blocks for better organization

### Bug Fixes

* **#410:** Fixed `getWorkflowSchemeProjectAssociations` to properly serialize multiple project IDs as separate query parameters (`projectId=10000&projectId=10001`) instead of comma-separated values. Thanks to [konrad-garus](https://github.com/konrad-garus) for reporting this issue.
* **#411:** Added missing `url` field to `Webhook` model. Thanks to [vrmiguel](https://github.com/vrmiguel) for reporting this issue.

### Version 2 Client

#### New Endpoints

* **Api**
  * Added `Api` endpoints for bulk worklog operations
* **FieldSchemes**
  * Added `FieldSchemes` endpoints for field association scheme management
* **IssueRedaction**
  * Added `IssueRedaction` endpoints for issue field data redaction
* **MigrationOfConnectModulesToForge**
  * Added `MigrationOfConnectModulesToForge` endpoints for Connect to Forge migration
* **AppProperties**
  * Added `AppProperties.getForgeAppPropertyKeys`
  * Added `AppProperties.getForgeAppProperty`
* **IssueFields**
  * Added `IssueFields.getProjectFields`
* **ProjectTemplates**
  * Added `ProjectTemplates.editTemplate`
  * Added `ProjectTemplates.liveTemplate`
  * Added `ProjectTemplates.removeTemplate`
  * Added `ProjectTemplates.saveTemplate`
* **Status**
  * Added `Status.getStatusesByName`
* **Workflows**
  * Added `Workflows.readWorkflowFromHistory`
  * Added `Workflows.listWorkflowHistory`
  * Added `Workflows.getDefaultEditor`
  * Added `Workflows.readWorkflowPreviews`
* **WorkflowSchemes**
  * Added `WorkflowSchemes.switchWorkflowSchemeForProject`

#### Enhancements

* **IssueComments**
  * Added `parentId` parameter to `IssueComments.addComment` to support threaded comment replies. Thanks to [lukiffer](https://github.com/lukiffer) for requesting this feature ([#407](https://github.com/MrRefactoring/jira.js/issues/407)).

#### Deprecations

* Marked `JiraExpressions.evaluateJiraExpression` as deprecated
* Marked `Workflows.createWorkflow` as deprecated
* Marked `Workflows.getWorkflowsPaginated` as deprecated
* Marked the following under `WorkflowTransitionProperties` as deprecated:
  * `getWorkflowTransitionProperties`
  * `createWorkflowTransitionProperty`
  * `updateWorkflowTransitionProperty`
  * `deleteWorkflowTransitionProperty`

### Version 3 Client

#### New Endpoints

* **Api**
  * Added `Api` endpoints
* **FieldSchemes**
  * Added `FieldSchemes` endpoints
* **IssueRedaction**
  * Added `IssueRedaction` endpoints
* **MigrationOfConnectModulesToForge**
  * Added `MigrationOfConnectModulesToForge` endpoints
* **AppProperties**
  * Added `AppProperties.getForgeAppPropertyKeys`
  * Added `AppProperties.getForgeAppProperty`
* **IssueFields**
  * Added `IssueFields.getProjectFields`
* **Issues**
  * Added `appType` param to `Issues.assignIssue`
* **ProjectTemplates**
  * Added `ProjectTemplates.editTemplate`
  * Added `ProjectTemplates.liveTemplate`
  * Added `ProjectTemplates.removeTemplate`
  * Added `ProjectTemplates.saveTemplate`
* **Status**
  * Added `Status.getStatusesByName`
  * Migrated `Status.search` endpoint to use zod-based response schemas (PoC) and added integration tests
* **Workflows**
  * Added `Workflows.readWorkflowFromHistory`
  * Added `Workflows.listWorkflowHistory`
  * Added `Workflows.getDefaultEditor`
  * Added `Workflows.readWorkflowPreviews`
* **WorkflowSchemes**
  * Added `WorkflowSchemes.switchWorkflowSchemeForProject`

#### Enhancements

* **IssueComments**
  * Added `parentId` parameter to `IssueComments.addComment` to support threaded comment replies. Thanks to [lukiffer](https://github.com/lukiffer) for requesting this feature ([#407](https://github.com/MrRefactoring/jira.js/issues/407)).

#### Deprecations

* Marked `JiraExpressions.evaluateJiraExpression` as deprecated
* Marked `Workflows.createWorkflow` as deprecated
* Marked `Workflows.getWorkflowsPaginated` as deprecated
* Marked the following under `WorkflowTransitionProperties` as deprecated:
  * `getWorkflowTransitionProperties`
  * `createWorkflowTransitionProperty`
  * `updateWorkflowTransitionProperty`
  * `deleteWorkflowTransitionProperty`

## 5.2.2
- Fixed url for `version2.issues.bulkFetchIssues`. Thanks @genio, for reporting.

## 5.2.1

### Bug Fixes
- **Removed `~` alias** due to compatibility issues with some build systems. Thanks @ThomasTrepanier, for reporting.

## 5.2.0

### Build & Distribution Improvements
- Added `rollup-plugin-node-externals` to transform `ESNext` `import`/`export` syntax to `NodeNext` format
- Restructured `dist` files to preserve modules

### Documentation Updates
- Updated tree shaking description in `README.md`
- Redesigned `README.md` with a new "Getting Started" section

## 5.1.1

- Fixing CommonJS requiring. Thanks to solshark ([solshark](https://github.com/solshark)) for reporting this issue ([#381](https://github.com/MrRefactoring/jira.js/issues/381))
- Fixing ESM imports in TypeScript declarations. Thanks to Alex Grand ([Arilas](https://github.com/Arilas)) for reporting this issue ([#383](https://github.com/MrRefactoring/jira.js/issues/383))
---
- **Special thanks to [GervinFung](https://github.com/GervinFung) for the npm package [`ts-add-js-extension`](https://github.com/GervinFung/ts-add-js-extension), which helps resolve TypeScript ESM import paths.**

## 5.1.0

- Version 2 Client
  - Add `UserNavProperties` API group
  - Add `ProjectTemplates` API group
  - Add `IssueCustomFieldAssociations` API group
  - `IssueSearch.searchForIssuesUsingJql` deprecated. Use `IssueSearch.searchForIssuesUsingJqlEnhancedSearch` instead
  - `IssueSearch.searchForIssuesUsingJqlPost` deprecated. Use `IssueSearch.searchForIssuesUsingJqlEnhancedSearchPost` instead
  - `IssueSearch.searchForIssuesIds` deprecated
  - Add `projectIds` property to `IssueFields.getFieldsPaginated` method
- Version 3 Client
  - Add `UserNavProperties` API group
  - Add `ProjectTemplates` API group
  - Add `IssueCustomFieldAssociations` API group
  - `IssueSearch.searchForIssuesUsingJql` deprecated. Use `IssueSearch.searchForIssuesUsingJqlEnhancedSearch` instead
  - `IssueSearch.searchForIssuesUsingJqlPost` deprecated. Use `IssueSearch.searchForIssuesUsingJqlEnhancedSearchPost` instead
  - `IssueSearch.searchForIssuesIds` deprecated
  - Add `projectIds` property to `IssueFields.getFieldsPaginated` method
  - Add `submitBulkUnwatch`, `submitBulkWatch` methods to `IssueBulkOperations` API group

## 5.0.0

- Added ESM (ECMAScript Modules) support
- Fixed comment generation logic in `IssueWorklogs.addWorklog` method
- Removed all telemetry-related code and references

### 4.1.3

- **Fix:** Fixed failed `issueBulkOperations.getAvailableTransitions` method call (problem from jira side with headers). Thanks to Michael "Mike" Ferris ([Cellule](https://github.com/Cellule)) for reporting this issue ([#374](https://github.com/MrRefactoring/jira.js/issues/374)) and fix ([#375](https://github.com/MrRefactoring/jira.js/pull/375))

### 4.1.2

- **Fix:** Fixed compilation issues for projects using the `Plans.updatePlan` method in `Version3Client`. Thanks to Jakub Gladykowski ([gladykov](https://github.com/gladykov)) for reporting this issue ([#370](https://github.com/MrRefactoring/jira.js/issues/370)).
- **Improvement:** Added `string` type support for the `projectId` property in the `Version` model for `Version3Client`. Thanks to Carl Fürstenberg ([azatoth](https://github.com/azatoth)) for suggesting this improvement ([#371](https://github.com/MrRefactoring/jira.js/issues/371)).

### 4.1.0

- **General Improvements:** Enhanced JSDoc documentation across the project for better clarity and developer experience.

- **Deprecation:** Marked the `InstanceInformation.getLicense` method as deprecated.
- **Deprecation:** Marked the `Issues.getCreateIssueMeta` method as deprecated.
- **Deprecation:** Marked the `PageBeanFieldConfigurationDetails` class as deprecated. Use `Paginated<FieldConfigurationDetails>` instead.
- **Deprecation:** Marked the `WorkflowUpdateResponse` and `WorkflowCreateResponse` classes as deprecated.

- **New APIs:** Added the following classes to support additional Jira APIs:
  - **`AppDataPolicies`**: Manage app access rule data policies, allowing developers to set and retrieve rules controlling app access ([documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-app-data-policies/#api-group-app-data-policies)).
  - **`ClassificationLevels`**: Define and manage classification levels for sensitive information in Jira ([documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-classification-levels/#api-group-classification-levels)).
  - **`IssueBulkOperations`**: Perform bulk operations on issues, such as moving multiple issues between projects or updating multiple fields in one request. For additional guidance, refer to [Bulk operation APIs: additional examples and FAQ](https://developer.atlassian.com/cloud/jira/platform/bulk-operation-additional-examples-and-faqs/) ([documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-bulk-operations/#api-group-issue-bulk-operations)).
  - **`Plans`**: Manage advanced roadmaps plans, including creating, duplicating, updating, archiving, and trashing plans ([documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-plans/#api-group-plans)).
  - **`PrioritySchemes`**: Create, retrieve, update, and delete issue priority schemes to standardize prioritization across projects ([documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-priority-schemes/#api-group-priority-schemes)).
  - **`ProjectClassificationLevels`**: View and manage classification levels within individual projects to ensure compliance with organizational standards ([documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-classification-levels/#api-group-project-classification-levels)).
  - **`ServiceRegistry`**: Access and manage attributes related to Jira Service Management’s service registry, which helps organize and maintain services ([documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-service-registry/#api-group-service-registry)).
  - **`TeamsInPlan`**: Configure settings for Atlassian and custom teams within advanced roadmaps plans, including creating, updating, and deleting team configurations ([documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-teams-in-plan/#api-group-teams-in-plan)).

- **Improvement:** Changed the return type of `ProjectKeyAndNameValidation.getValidProjectKey` and `ProjectKeyAndNameValidation.getValidProjectName` from `unknown` to `string` for improved type safety and usability.
- **Improvement:** Added the `approximateLastUsed` parameter to the `Filters.createFilter` method.
- **Improvement:** Added the `isSubstringMatch` parameter to the `Filters.getFiltersPaginated` method.
- **Improvement:** Updated the `IssueComments.updateComment` method to allow passing a plain string for the comment instead of requiring a specific object format.
- **Improvement:** Added the `parentId` parameter to the `IssueComments.deleteComment` method.
- **Improvement:** Added the `releasedProjectKeys` property to the `Projects.updateProject` method.
- **Improvement:** Added the `avatarId` parameter to the `IssuePriorities.createPriority` method. This parameter will replace `iconUrl` starting **March 16, 2025**. The `iconUrl` parameter is now marked as deprecated.
- **Improvement:** Added the `priorityName` and `expand` properties to the `IssuePriorities.searchPriorities` method.
- **Improvement:** Added the `avatarId` parameter to the `IssuePriorities.updatePriority` method. This parameter will replace `iconUrl` starting **March 16, 2025**. The `iconUrl` parameter is now marked as deprecated.
- **Improvement:** Added the `issueId` property to the `UserSearch.findAssignableUsers` method.
- **Improvement:** Added the optional `skipNotFoundPrecomputations` property to the `JqlFunctionsApps.updatePrecomputations` method.
- **Improvement:** Added the `failFast` parameter to the `Issues.getIssue` method.
- **Improvement:** Added the `failFast` parameter to the `IssueSearch.searchForIssuesUsingJql` method.
- **Improvement:** Added the `ari` and `metadata` parameters to the `ProjectComponents.createComponent` method.
- **Improvement:** Added the optional `componentSource` parameter to the `ProjectComponents.getProjectComponentsPaginated` method.
- **Improvement:** Added the optional `componentSource` parameter to the `ProjectComponents.getProjectComponents` method.
- **Improvement:** Added the `approvers` and `driver` parameters to the `ProjectVersions.createVersion` and `ProjectVersions.updateVersion` methods.
- **Improvement:** Replaced the `maxResults` property with `maxResult` in the `UserSearch.findUserKeysByQuery` method.
- **Improvement:** Added the `extendAdminPermissions` parameter to the following methods in the `Dashboard` class:
  - `Dashboard.createDashboard`
  - `Dashboard.updateDashboard`
  - `Dashboard.copyDashboard`

- **New Method:** Added the `getCustomFieldsConfigurations` method to the `IssueCustomFieldConfigurationApps` class.
- **New Method:** Added the `replaceCustomFieldOption` method to the `IssueCustomFieldOptions` class.
- **New Methods:** Added the following methods to the `WorkflowSchemes` class:
  - `readWorkflowSchemes`: Retrieve workflow schemes.
  - `updateSchemes`: Update workflow schemes.
  - `updateWorkflowSchemeMappings`: Update workflow scheme mappings.
- **New Method:** Added the `getNotificationSchemeForProject` method to the `Projects` class.
- **New Method:** Added the `getBulkScreenTabs` method to the `ScreenTabs` class.
- **New Method:** Added the `deletePriority` method to the `IssuePriorities` class.
- **New Method:** Added the `getPrecomputationsByID` method to the `JqlFunctionsApps` class.
- **New Methods:** Added the following methods to the `Workflows` class:
  - `readWorkflows`: Retrieve workflows.
  - `workflowCapabilities`: Get workflow capabilities.
  - `createWorkflows`: Create new workflows.
  - `validateCreateWorkflows`: Validate workflow creation.
  - `updateWorkflows`: Update existing workflows.
  - `validateUpdateWorkflows`: Validate workflow updates.
- **New Methods:** Added the following methods to the `Issues` class:
  - `getBulkChangelogs`: Retrieve changelogs for multiple issues in bulk.
  - `bulkFetchIssues`: Fetch multiple issues in bulk.
  - `getCreateIssueMetaIssueTypes`: Retrieve metadata for issue types when creating issues.
  - `getCreateIssueMetaIssueTypeId`: Retrieve metadata for a specific issue type by ID when creating issues.
  - `getIssueLimitReport`: Retrieve a report on issue limits.
- **New Methods:** Added the following methods to the `IssueSearch` class:
  - `countIssues`: Count issues matching a query.
  - `searchForIssuesIds`: Search for issue IDs using a query.
  - `searchForIssuesUsingJqlEnhancedSearch`: Search and reconcile issues using JQL.
  - `searchForIssuesUsingJqlEnhancedSearchPost`: Search and reconcile issues using JQL via POST request.
- **New Methods:** Added the following methods to the `IssueWorklogs` class:
  - `bulkDeleteWorklogs`: Delete multiple worklogs in bulk.
  - `bulkMoveWorklogs`: Move multiple worklogs in bulk.
- **New Method:** Added the `evaluateJiraExpressionUsingEnhancedSearch` method to the `JiraExpressions` class.
- **New Method:** Added the `findComponentsForProjects` method to the `ProjectComponents` class.
- **New Methods:** Added the following methods to the `ProjectVersions` class:
  - `deleteRelatedWork`: Delete related work for a version.
  - `updateRelatedWork`: Update related work for a version.
  - `createRelatedWork`: Create related work for a version.
  - `getRelatedWork`: Retrieve related work for a version.
- **New Method:** Added the `getProjectUsagesForWorkflowScheme` method to the `WorkflowSchemes` class.
- **New Method:** Added the `getWorkflowProjectIssueTypeUsages` method to the `Workflows` class.
- **New Methods:** Added the following methods to the `Status` class:
  - `getProjectIssueTypeUsagesForStatus`
  - `getProjectUsagesForStatus`
  - `getWorkflowUsagesForStatus`

- **Fix:** Updated the following methods in `Version2Client` and `Version3Client` to make the `parameters` argument mandatory (as it should have been initially):
  - `IssueFieldConfigurations.createFieldConfiguration`
  - `IssueFieldConfigurations.createFieldConfigurationScheme`
  - `IssueLinks.linkIssues`
  - `IssueTypeSchemes.createIssueTypeScheme`
  - `IssueTypeSchemes.assignIssueTypeSchemeToProject`
  - `IssueTypeScreenSchemes.createIssueTypeScreenScheme`
  - `JQL.parseJqlQueries`
  - `TimeTracking.setSharedTimeTrackingConfiguration`
  - `WorkflowSchemeProjectAssociations.assignSchemeToProject`
  - `IssueTypes.createIssueType`
  - `IssueSearch.matchIssues`
  - `IssueSearch.searchForIssuesUsingJql`
  - `JiraExpressions.evaluateJiraExpression`
  - `Users.setUserColumns`
  - `Users.getUser`
- **Fix:** Improved the `Avatars.storeAvatar` method:
  - Added the `mimeType` parameter to specify the type of the uploaded avatar.
  - Updated the type of the `avatar` parameter from `any` to `Buffer | ArrayBuffer | Uint8Array | any` for better type safety.
  - Set the default value of the `size` parameter to `0`.
- **Fix:** Improved the `IssueTypes.createIssueTypeAvatar` method:
  - Added the `mimeType` parameter to specify the type of the uploaded avatar.
  - Added the `avatar` parameter with the type `Buffer | ArrayBuffer | Uint8Array`.
  - Set the default value of the `size` parameter to `0`.
- **Fix:** Improved the `ProjectAvatars.createProjectAvatar` method:
  - Added the `mimeType` parameter to specify the type of the uploaded avatar.
  - Updated the type of the `avatar` parameter from `any` to `Buffer | ArrayBuffer | Uint8Array | any`.
  - Set the default value of the `size` parameter to `0`.

- **Change:** Removed the `filter` parameter from the `JqlFunctionsApps.getPrecomputations` method (experimental method, not a breaking change).
- **Change:** Renamed `JiraExpressionEvaluateContextBean` to `JiraExpressionEvaluateContext`.

- **Improvement:** Added type `string` for properties `projectId` in parameters and models:
  - Model `Version`
  - Parameter `GetFieldConfigurationSchemeProjectMapping`
  - Parameter `GetHierarchy`
  - Parameter `GetIssueTypeSchemeForProjects`
  - Parameter `GetIssueTypeScreenSchemeProjectAssociations`
  - Parameter `GetIssueTypesForProject`
  - Parameter `GetProjectEmail`
  - Parameter `GetWorkflowSchemeProjectAssociations`
  - Parameter `UpdateProjectEmail`
- **Improvement:** Added type `number` for properties `projectIdOrKey` in parameters and models:
  - Parameter `AddActorUsers`
  - Parameter `ArchiveProject`
  - Parameter `CreateProjectAvatar`
  - Parameter `DeleteActor`
  - Parameter `DeleteProject`
  - Parameter `DeleteProjectAsynchronously`
  - Parameter `DeleteProjectAvatar`
  - Parameter `DeleteProjectProperty`
  - Parameter `GetAllProjectAvatars`
  - Parameter `GetAllStatuses`
  - Parameter `GetFeaturesForProject`
  - Parameter `GetProjectComponents`
  - Parameter `GetProjectComponentsPaginated`
  - Parameter `GetProjectProperty`
  - Parameter `GetProjectPropertyKeys`
  - Parameter `GetProjectRole`
  - Parameter `GetProjectRoleDetails`
  - Parameter `GetProjectRoles`
  - Parameter `GetProjectVersions`
  - Parameter `GetProjectVersionsPaginated`
  - Parameter `Restore`
  - Parameter `SetActors`
  - Parameter `SetProjectProperty`
  - Parameter `ToggleFeatureForProject`
  - Parameter `UpdateProject`
  - Parameter `UpdateProjectAvatar`

---

- **Special thanks to Ness Li ([nessgor](https://github.com/nessgor)) for implementing the changes above. PR: [#356](https://github.com/MrRefactoring/jira.js/pull/356).**
- **Thanks to Niklas Correnz ([uncaught](https://github.com/uncaught)) for reporting the issue: [#352](https://github.com/MrRefactoring/jira.js/issues/352).**

---

### 4.0.6

- **#347:** Fixed an issue with adding attachments of type `Readable` or `ReadableStream` (e.g., `fs.createReadStream`). Thanks to [Lunatic174](https://github.com/Lunatic174) for [reporting the issue](https://github.com/MrRefactoring/jira.js/issues/347).

---

### 4.0.5

- **#344:** Replaced the `mime-types` library with `mime` to ensure browser compatibility, as `mime-types` relies on the `path` module from Node.js. Thanks to [kang](https://github.com/kang8) for [reporting the issue](https://github.com/MrRefactoring/jira.js/issues/344) and proposing the fix.

---

### 4.0.4

- **#320:** Resolved a tree-shaking issue where importing a single client would still include all clients in the output bundle when using bundlers. Now, only the required client code is included. Thanks to [Nao Yonashiro](https://github.com/orisano) for [reporting the issue](https://github.com/MrRefactoring/jira.js/issues/320) and proposing a fix.
- **#327:** Replaced the `form-data` library with `formdata-node` to enable compatibility with `ESM` projects when adding attachments via the `issueAttachment.addAttachment` method. Thanks to [Paweł Król](https://github.com/xpawk) for [reporting the issue](https://github.com/MrRefactoring/jira.js/issues/327) and [Matyáš Kroupa](https://github.com/krouma) for implementing the fix.
- **Improvement:** The type of the `projectIdOrKey` property was updated from `string` to `number | string` for project update operations. This enhancement improves type safety and flexibility when handling project identifiers.
- **Enhancement:** Added a `mimeType` property to the `version2.issueAttachments.addAttachment`, `version3.issueAttachments.addAttachment`, and `serviceDesk.serviceDesk.attachTemporaryFile` methods. This allows specifying the file type. If `mimeType` is not provided, a default type is inferred from the filename.

  #### Examples:

  **👎 Before:**

  ```typescript
  const client = new Version2Client() || new Version3Client() || new ServiceDeskClient();

  const attachment = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachment: {
          filename: 'issueAttachments.test.ts',
          file: fs.readFileSync('./tests/integration/version2/issueAttachments.test.ts'),
      },
  });

  console.log(attachment[0].mimeType); // Will be 'video/mp2t'
  ```

  **👍 Now:**

  ```typescript
  const client = new Version2Client() || new Version3Client() || new ServiceDeskClient();

  const attachment = await client.issueAttachments.addAttachment({
      issueIdOrKey: issue.key,
      attachment: {
          filename: 'issueAttachments.test.ts',
          file: fs.readFileSync('./tests/integration/version2/issueAttachments.test.ts'),
          mimeType: 'application/typescript',
      },
  });

  console.log(attachment[0].mimeType); // Will be 'application/typescript'
  ```

---

### 4.0.3

- **Bug Fix:** Fixed an issue with the `Users.createUser` method by adding the required `products` property. Thanks to [Appelberg-s](https://github.com/Appelberg-s) for the [fix](https://github.com/MrRefactoring/jira.js/commit/362918093c20036049db334743e2a0f5f41cbcd4#diff-6960050bc2a3d9ffad9eb5e307145969dc4a38eb5434eebf39da545fd18e01b7R12).
- **Documentation Update:** Corrected an error in `README.md`. Thanks to [Maurice de Bruyn](https://github.com/ueberBrot) for the [contribution](https://github.com/MrRefactoring/jira.js/commit/fb6151e1a0c7953b9447aaaf99caea5c2f93bb96).
- **Dependencies:** Updated all dependencies to their latest versions.

---

### 4.0.2

- `getAllProjects` in README and examples replaced to `searchProjects`. Thanks to [Alexander Pivovarov](https://github.com/bladerunner2020) for reporting [the issue](https://github.com/MrRefactoring/jira.js/issues/323).
- Personal access token link changed to actual in README
- Test platform changed from `ava` to `vitest`
- Dependencies updated
- Vulnerabilities fixes

### 4.0.1

- Vulnerabilities fixes

### 4.0.0

- [**#309**](https://github.com/MrRefactoring/jira.js/pull/309) - Added rate limiting headers. Thanks to [Chalenge Masekera](https://github.com/chalenge).
- [**#308**](https://github.com/MrRefactoring/jira.js/pull/308) - Implemented a new error handling mechanism. Thanks to [Dmitry Shilov](https://github.com/bk201-).

#### Breaking changes

- The new error handling mechanism may affect your library usage.

### 3.0.5

- Dependencies updated

### 3.0.3

- Dependencies updated
- Logo fix in README.md

### 3.0.2

- Return type fixed for `issue remote links` endpoint. Thanks to  [Fernando Maia](https://github.com/fsmaia) for reporting and [fixing](https://github.com/MrRefactoring/jira.js/pull/296) [the issue](https://github.com/MrRefactoring/jira.js/issues/295).
- Dependencies upgraded
- CI/CD improvements

### 3.0.1

- Dependencies upgraded

### 3.0.0

#### **Breaking Changes:**
- **Avatar Endpoints Updates:**
  - Methods `avatar.getAvatarImageByID`, `getAvatarImageByType`, and `getAvatarImageByOwner` have an updated return type. Avatars will now be returned as binary data.
  - `storeAvatar` endpoint has been fixed. It now both accepts and sends the `avatar` property.

- **Authentication Changes:**
  - Removed OAuth and JWT authentication. This might be reintroduced with proper testing support in the future.

- **API Clean-Up:**
  - Deprecated and unused components from Agile, ServiceDesk, Version2, and Version3 APIs have been removed.

#### **Enhancements:**
  - Improved browser capability.
  - Enhanced parameter typings.

## Previous major version:

<details>

### 2.20.1

- [#277](https://github.com/MrRefactoring/jira.js/issues/277) newErrorHandling provides additional error codes.

### 2.20.0

- API Updates

### 2.19.1

- `setIssueProperty` method in `IssueProperties` API fixed. `propertyValue` parameter added.
- logo fixed

### 2.19.0

- Version 2, Version 3:
  - `jqlFunctionsApps` API added.
  - A lot of changes in Models.
  - A log of new API added.

### 2.18.0

- Agile
  - `Fields` model added for `Issue` Model.
- Version 3:
  - Support simple string body (comment) was added to `addComment` method of `issueComments` API. Thanks to [Michael "Mike" Ferris](https://github.com/Cellule) for releasing feature.
- Version 2, Version 3:
  - `putAddonProperty` method fixed. Now you can provide property for set.

### 2.17.0

- JSDoc improvements
- Version 2, Version 3:
  - `Component` interface renamed to `ProjectComponent`.
  - `caseInsensitive` property added to `findGroups` method of `groups` API.
  - `expand` property added to `getTrashedFieldsPaginated` method of `issueFields` API.
  - `createNotificationScheme`, `getNotificationSchemeToProjectMappings`, `updateNotificationScheme`, `addNotifications`, `deleteNotificationScheme`, `removeNotificationFromNotificationScheme` methods added to `issueNotificationSchemes` API.
  - `getPrecomputations`, `updatePrecomputations` methods added to `jql` API.
  - `licenseMetrics` API added.
  - `ProjectFeatures` interface renamed to `ContainerForProjectFeatures`.

### 2.16.1

- Agile
  - `Projects` API was deprecated.
  - `type`, `filterId` properties changed from **optional** to **mandatory** in `CreateBoard` parameters interface.
  - `operationType` property added to `storeDevelopmentInformation` method in `DevelopmentInformation` API.
  - `SecurityInformation` API added.
  - #250 `excludeAccountIds` parameter fixed for `findUsersForPicker` method, `UserSearch` API. Thanks to [Rafael Dohms](https://github.com/rdohms) for reporting [the issue](https://github.com/MrRefactoring/jira.js/issues/250).

### 2.16.0

Short parameters were added for applicable methods.

### 2.15.17

- Badge fix
- Dependencies updated

### 2.15.16

- Version 2, 3:
  - `propertyValue` added to `setUserProperty` method of `UserProperties` API. Thanks to [lihongyin](https://github.com/hongyin163) for issue report.

### 2.15.15

- Version 2, 3:
  - `id`, `projectId`, `onlyDefault` properties added to `getNotificationSchemes` method of `IssueNotificationSchemes` API.
  - `replaceWith` property added to `deletePriority` method of `IssuePriorities` API.

### 2.15.14

- Version 2, 3:
  - #240 Fixed ignored body in `setDashboardItemProperty`. Thanks to [Jocelyn Bouchard](https://github.com/jbouchard24) for the fix.

### 2.15.13

- Version 2, 3:
  - `getResolutions` in `IssueResolution` was deprecated.
  - `getResolution` in `IssueResolution` was deprecated.
  - `createResolution` method added to `IssueResolution`.
  - `setDefaultResolution` method added to `IssueResolution`.
  - `moveResolutions` method added to `IssueResolution`.
  - `searchResolutions` method added to `IssueResolution`.
  - `updateResolution` method added to `IssueResolution`.
  - `deleteResolution` method added to `IssueResolution`.

### 2.15.12

- Version 2, 3:
  - `accessType` and `applicationKey` properties added to `bulkGetGroups` method `Groups` API.
  - `movePriorities` and `deletePriority` methods added to `IssuePriorities` API.
  - Models updated

### 2.15.11

- All properties in `PageOfWorklogs` marked as required.
- Examples improved.

### 2.15.10

- `newErrorHandling` console message removed.
- [`example`](https://github.com/MrRefactoring/jira.js/tree/master/example) added.
- Improved example in the `README`.
- Throwing error if `host` has incorrect URL format. Thanks to [Isuru Uthpala Priyaranjana](https://github.com/IsuruUthpala) for [reporting the enhancement](https://github.com/MrRefactoring/jira.js/issues/235).
- Types improvements.

### 2.15.9

- JSDoc improvements
- Version 2, 3:
  - `setDefaultPriority` method added to `IssuePriorities` API.

### 2.15.8

- JSDoc improvements.
- Version 2, 3:
  - `getTrashedFieldsPaginated` method added to `IssueFields` API.
  - `statusCategory` property added to `search` method in `Status` API.

### 2.15.7

Version 2, 3: Added additional properties for `IssueComments.updateComment` method. Thanks to [chandler05](https://github.com/chandler05) for reporting the issue.

### 2.15.6

Version 2, 3: `getAttachmentThumbnail` currently returns correct data (`Buffer`). Thanks to [RealBuddy](https://github.com/RealBuddy) for reporting the issue.


### 2.15.5

Version 3: maxContentLength was increased for attachments upload. Thanks to [RealBuddy](https://github.com/RealBuddy) for reporting the issue.

### 2.15.4

- Version 2, 3:
  - #221 added `responseType: 'arraybuffer'` for `getAttachmentContent` method, `IssueAttachments` API. Thanks [RealBuddy](https://github.com/RealBuddy) for the report.

### 2.15.3

- Version 2, 3:
  - #219 `accountId` serialization fixed in `bulkGetUsers` in `Users` API fixed. Thanks to [Brian Chan](https://github.com/ak4702) for the report.

### 2.15.2

- `isAxiosError` detecting mechanism improved. Thanks to [Stephane Moser](https://github.com/Moser-ss) for the report.

### 2.15.1

- ServiceDesk for experimental API `'X-ExperimentalApi': 'opt-in'` header added.

### 2.15.0

- Version 3: addWorklog and updateWorklog comment field type fixed. Thanks to [RealBuddy](https://github.com/RealBuddy) for reporting the issue.
- Version 2: maxContentLength was increased for attachments upload. Thanks to [RealBuddy](https://github.com/RealBuddy) for reporting the issue.
- Version 2, Version 3:
  - `uiModificationsApps` API added.
  - `query` property added to `getProjectsForIssueTypeScreenScheme` method `IssueTypeScreenSchemes` API.
  - `commentId` property added to `getMyPermissions` method `Permissions` API.
  - `createPriority`, `searchPriorities`, `updatePriority`  methods added to `IssuePriorities` API.

### 2.14.0

- README: Fast jump to basic authentication topic fixed.
- Version 2 and Version 3:
  - `fixVersion` type definition fixed (`Issue.Fields` model). Thanks to [Eloy Lafuente](https://github.com/stronk7) for reporting the issue.
  - `AnnouncementBanner` API added.
  - `Status` API added.
  - `groupId` property added to `getDashboardsPaginated` method in `Dashboard` API.
  - `groupId` property added to `addActorUsers`, `deleteActor`, `addProjectRoleActorsToRole`, `deleteProjectRoleActorsFromRole` methods in `ProjectRoleActors` API.

### 2.13.0

- Service Desk:
  - `getAttachmentContent` method added to `Request` Service Desk API.
  - `getAttachmentThumbnail` method added to `Request` Service Desk API.
- Version 2, Version 3:
  - `IssueAdjustmentsApps` API added.
  - `groupId` property added to `getFiltersPaginated` method in `Filters` API.
  - `groupId` property added to `addSharePermission` method in `FilterSharing` API.

### 2.12.0

- New error handling feature added.
- Readme improved.
- JSDoc improvements.
- Agile:
  - `createdDate` property added to `Agile.Sprint.partiallyUpdateSprint`, `Agile.Sprint.updateSprint`
- Version 2, Version 3:
  - `groupDetails` and `defaultGroupsDetails` properties added to `ApplicationRole` model.
  - `getAllAvailableDashboardGadgets` method added to `Dashboards`.
  - `status` property added to `getDashboardsPaginated` method in `Dashboards`.
  - `getAllGadgets` method added to `Dashboards`.
  - `addGadget` method added to `Dashboards`.
  - `updateGadget` method added to `Dashboard`.
  - `removeGadget` method added to `Dashboard`.
  - `recipient` property added to `EventNotification` model.
  - `configuration` property added to `FieldMetadata` model.
  - `overrideSharePermissions` property added to `createFilter` method in `Filters`.
  - `groupId` property added to `Group` model.
  - `groupId` property added to `GroupName` model.
  - `groupId` property added to `getGroup` method in `Groups`.
  - `groupId` and `swapGroupId` properties added to `removeGroup` method in `Groups`.
  - `groupId` property added to `getUsersFromGroup` method in `Groups`.
  - `groupId` property added to `addUserToGroup` method in `Groups`.
  - `groupId` property added to `removeUserFromGroup` method in `Groups`.
  - `excludeId` property added to `findGroups` method in `Groups`.
  - `orderBy`, `expand` and `queryString` properties added to `getAllIssueTypeSchemes` method in `IssueTypeSchemes`.
  - `queryString`, `orderBy` and `expand` properties added to `getIssueTypeScreenSchemes` method in `IssueTypeScreenSchemes`.
  - `sanitiseJqlQueries` method added to `JQL`.
  - `excludeInactiveUsers` property added to `getProjectRole` method in `ProjectRoles`.
  - `queryString`, `scope` and `orderBy` properties added to `getScreens` method in `Screens`.
  - `expand`, `queryString` and `orderBy` properties added to `getScreenSchemes` method in `ScreenSchemes`.
  - `identifier` property added to `Visibility` model.
  - another small improvements.

### 2.11.0

- Personal access token authentication added. Thanks, [Nizam Moidu](https://github.com/netmaxt3r) for adding this feature!
- Version 2:
  - `notifyUsers` property added to `IssueComments.updateComment` method.
  - `setFieldConfigurationSchemeMapping` method added to `IssueFieldConfigurations`.
  - `removeIssueTypesFromGlobalFieldConfigurationScheme` method added to `IssueFieldConfigurations`.
  - `getIsWatchingIssueBulk` method added to `IssueWatchers`.
  - `queryString`, `orderBy`, `isActive` properties added to `Workflows.getWorkflowsPaginated` method.
  - `AppMigration.updateEntityPropertiesValue` method parameters for sending fixed.
  - `Workflows.getWorkflowsPaginated` parameters serializing fixed.
- Tests improving.
- JSDoc improved.
- Expand properties typings improved for few Parameters.

### 2.10.4

- `accountId` property added to `IssueWatchers`. Thanks, [Brent Van Geertruy](https://github.com/knor-el-snor) for catching and fixing this issue!

### 2.10.3

- Fixing parameters serialization for users.bulkGetUsersMigration. Thanks [Maximilian Heinz](https://github.com/meandmax) for report.

### 2.10.2

- issueComments.updateComment fixed. Thanks [Rafael Dohms](https://github.com/rdohms)!

### 2.10.1

- Models export extended for Version 2 and Version 3 API

### 2.10.0

- [Service Desk API](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/) added

### 2.9.0

- Telemetry removed (deprecated).
- JSDoc improvements.
- Version 2 and Version 3:
  - `jsdAuthorCanSeeRequest` property added to `IssueComments.addComment` method.
  - `id` and `fieldContextId` properties added to `IssueCustomFieldConfigurationApps.getCustomFieldConfiguration` method.
  - `updateFieldConfigurationItems`, `createFieldConfigurationScheme`, `updateFieldConfigurationScheme`, `deleteFieldConfigurationScheme` methods added to `IssueFieldConfigurations`.
  - `bulkSetIssuePropertiesByIssue` method added to `IssueProperties`.
  - `startedBefore` property added to `IssueProperties.getIssueWorklog` method.
  - `renderer` property added to `FieldConfigurationItem` model.
  - `editPermissions` and `expand` properties added to `FilterDetails` model.
  - `tabs` property added to `IssueTransition` model.
  - `emailAddressStatus` property added to `ProjectEmail.updateProjectEmail` method.

### 2.8.0

- JSDoc improvements.
- Version 2 and Version 3
  - `mediaApiFileId` property added to `AttachmentMetadata` model.
  - [`getAvatarImageByType`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-avatars/#api-rest-api-2-universal-avatar-view-type-type-get) method added to `Avatar` group.
  - [`getAvatarImageByID`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-avatars/#api-rest-api-2-universal-avatar-view-type-type-avatar-id-get) method added to `Avatar` group.
  - [`getAvatarImageByOwner`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-avatars/#api-rest-api-2-universal-avatar-view-type-type-owner-entityid-get) method added to `Avatar` group.
  - `editPermissions` property added to `Filter` model.
  - [`getAttachmentContent`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-attachments/#api-rest-api-2-attachment-content-id-get) method added to `IssueAttachments` group.
  - [`getAttachmentThumbnail`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-attachments/#api-rest-api-2-attachment-thumbnail-id-get) method added to `IssueAttachments` group.
  - `overrideScreenSecurity` and `overrideEditableFlag` properties added to `replaceIssueFieldOption` method in `IssueCustomFieldOptionsApps` group.
  - [`updateMultipleCustomFieldValues`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-custom-field-values--apps-/#api-rest-api-2-app-field-value-post) method added to `IssueCustomFieldValuesApps` group.
  - [`createFieldConfiguration`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-field-configurations/#api-rest-api-2-fieldconfiguration-post) method added to `IssueFieldConfigurations` group.
  - [`updateFieldConfiguration`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-field-configurations/#api-rest-api-2-fieldconfiguration-id-put) method added to `IssueFieldConfigurations` group.
  - [`deleteFieldConfiguration`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-field-configurations/#api-rest-api-2-fieldconfiguration-id-delete) method added to `IssueFieldConfigurations` group.
  - `custom` property added to `JiraExpressionEvalContext` model.
  - `schemes` property added to `Workflow` model.

### 2.7.0

- Version 2:
  - JSDoc improvements.
  - [`deleteCustomField`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-fields/#api-rest-api-2-field-id-delete) method added to `IssueFields`.
  - [`restoreCustomField`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-fields/#api-rest-api-2-field-id-restore-post) method added to `IssueFields`.
  - [`trashCustomField`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-fields/#api-rest-api-2-field-id-trash-post) method added to `IssueFields`.
- Version 3:
  - [`deleteCustomField`](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-id-delete) method added to `IssueFields`.
  - [`restoreCustomField`](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-id-restore-post) method added to `IssueFields`.
  - [`trashCustomField`](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-id-trash-post) method added to `IssueFields`.

### 2.6.3

- Missed telemetry data added.

### 2.6.2

- Version 2 and Version 3:
  - [`getEvents`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issues/#api-rest-api-2-events-get) method added to `Issues`.
  - [`getRecent`](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-projects/#api-rest-api-2-project-recent-get) method added to `Projects`.

### 2.6.1

- Common improvements:
  - Fixing vulnerabilities in dependencies.
- Version 2, Version 3:
  - Caught a mistake in issue attachment API [#152](https://github.com/MrRefactoring/jira.js/pull/152). Thanks [prasanna](https://github.com/balaprasanna)!

### 2.6.0

- Agile:
  - JSDOC small improvements
- Version 2 and Version 3:
  - JSDOC small improvements
  - `workflowRuleSearch` method added to `AppMigration`
  - `rules` property added to `CreateWorkflowTransitionDetails` model
  - `isWritable` property added to `Dashboard` model
  - `editPermissions` property added to `DashboardDetails` model
  - `accountId` property added to `filterSharing.addSharePermission`
  - `rights` property added to `filterSharing.addSharePermission`
  - `SearchAutoComplete` model are deprecated
  - `projectKeyOrId` property added to `issueCustomFieldConfigurationApps.getCustomFieldConfiguration`
  - `issueTypeId` property added to `issueCustomFieldConfigurationApps.getCustomFieldConfiguration`
  - `getProjectsForIssueTypeScreenScheme` method added to `IssueTypeScreenSchemes`
  - `workflowNames` property added to `workflowTransitionRules.getWorkflowTransitionRuleConfigurations` method
  - `withTags` property added to `workflowTransitionRules.getWorkflowTransitionRuleConfigurations` method
  - `draft` property added to `workflowTransitionRules.getWorkflowTransitionRuleConfigurations` method
  - `ActorInputBean` renamed to `ActorInput`,
  - `AddFieldBean` renamed to `AddField`,
  - `AddGroupBean` renamed to `AddGroup`,
  - `AssociatedItemBean` renamed to `AssociatedItem`,
  - `AuditRecordBean` renamed to `AuditRecord`,
  - `AvatarUrlsBean` renamed to `AvatarUrls`,
  - `BulkPermissionsRequestBean` renamed to `BulkPermissionsRequest`,
  - `ChangedValueBean` renamed to `ChangedValue`,
  - `CreateUpdateRoleRequestBean` renamed to `CreateUpdateRoleRequest`,
  - `CustomFieldDefinitionJsonBean` renamed to `CustomFieldDefinitionJson`,
  - `DeleteAndReplaceVersionBean` renamed to `DeleteAndReplaceVersion`,
  - `GlobalScopeBean` renamed to `GlobalScope`,
  - `IdBean` renamed to `Id`,
  - `IdOrKeyBean` renamed to `IdOrKey`,
  - `IssueBean` renamed to `Issue`,
  - `IssueCommentListRequestBean` renamed to `IssueCommentListRequest`,
  - `IssueFieldOptionCreateBean` renamed to `IssueFieldOptionCreate`,
  - `IssueFieldOptionScopeBean` renamed to `IssueFieldOptionScope`,
  - `ProjectScopeBean` renamed to `ProjectScope`,
  - `IssuesJqlMetaDataBean` renamed to `IssuesJqlMetaData`,
  - `IssuesMetaBean` renamed to `IssuesMeta`,
  - `IssuesUpdateBean` renamed to `IssuesUpdate`,
  - `IssueTypeCreateBean` renamed to `IssueTypeCreate`,
  - `IssueTypeUpdateBean` renamed to `IssueTypeUpdate`,
  - `JiraExpressionEvalContextBean` renamed to `JiraExpressionEvalContext`,
  - `JiraExpressionEvalRequestBean` renamed to `JiraExpressionEvalRequest`,
  - `JiraExpressionEvaluationMetaDataBean` renamed to `JiraExpressionEvaluationMetaData`,
  - `JiraExpressionsComplexityBean` renamed to `JiraExpressionsComplexity`,
  - `JiraExpressionsComplexityValueBean` renamed to `JiraExpressionsComplexityValue`,
  - `JsonTypeBean` renamed to `JsonType`,
  - `LinkIssueRequestJsonBean` renamed to `LinkIssueRequestJson`,
  - `MoveFieldBean` renamed to `MoveField`,
  - `PageBeanChangelog` renamed to `PageChangelog`,
  - `PageBeanComment` renamed to `PageComment`,
  - `PageBeanComponentWithIssueCount` renamed to `PageComponentWithIssueCount`,
  - `PageBeanContext` renamed to `PageContext`,
  - `PageBeanContextForProjectAndIssueType` renamed to `PageContextForProjectAndIssueType`,
  - `PageBeanCustomFieldContext` renamed to `PageCustomFieldContext`,
  - `PageBeanCustomFieldContextDefaultValue` renamed to `PageCustomFieldContextDefaultValue`,
  - `PageBeanCustomFieldContextOption` renamed to `PageCustomFieldContextOption`,
  - `PageBeanCustomFieldContextProjectMapping` renamed to `PageCustomFieldContextProjectMapping`,
  - `PageBeanCustomFieldOptionDetails` renamed to `PageCustomFieldOptionDetails`,
  - `PageBeanDashboard` renamed to `PageDashboard`,
  - `PageBeanField` renamed to `PageField`,
  - `PageBeanFieldConfiguration` renamed to `PageFieldConfiguration`,
  - `PageBeanFieldConfigurationIssueTypeItem` renamed to `PageFieldConfigurationIssueTypeItem`,
  - `PageBeanFieldConfigurationItem` renamed to `PageFieldConfigurationItem`,
  - `PageBeanFieldConfigurationScheme` renamed to `PageFieldConfigurationScheme`,
  - `PageBeanFieldConfigurationSchemeProjects` renamed to `PageFieldConfigurationSchemeProjects`,
  - `PageBeanFilterDetails` renamed to `PageFilterDetails`,
  - `PageBeanGroupDetails` renamed to `PageGroupDetails`,
  - `PageBeanIssueFieldOption` renamed to `PageIssueFieldOption`,
  - `PageBeanIssueSecurityLevelMember` renamed to `PageIssueSecurityLevelMember`,
  - `PageBeanIssueTypeScheme` renamed to `PageIssueTypeScheme`,
  - `PageBeanIssueTypeSchemeMapping` renamed to `PageIssueTypeSchemeMapping`,
  - `PageBeanIssueTypeSchemeProjects` renamed to `PageIssueTypeSchemeProjects`,
  - `PageBeanIssueTypeScreenScheme` renamed to `PageIssueTypeScreenScheme`,
  - `PageBeanIssueTypeScreenSchemeItem` renamed to `PageIssueTypeScreenSchemeItem`,
  - `PageBeanIssueTypeScreenSchemesProjects` renamed to `PageIssueTypeScreenSchemesProjects`,
  - `PageBeanIssueTypeToContextMapping` renamed to `PageIssueTypeToContextMapping`,
  - `PageBeanNotificationScheme` renamed to `PageNotificationScheme`,
  - `PageBeanProject` renamed to `PageProject`,
  - `PageBeanScreen` renamed to `PageScreen`,
  - `PageBeanScreenScheme` renamed to `PageScreenScheme`,
  - `PageBeanScreenWithTab` renamed to `PageScreenWithTab`,
  - `PageBeanString` renamed to `PageString`,
  - `PageBeanUser` renamed to `PageUser`,
  - `PageBeanUserDetails` renamed to `PageUserDetails`,
  - `PageBeanUserKey` renamed to `PageUserKey`,
  - `PageBeanVersion` renamed to `PageVersion`,
  - `PageBeanWebhook` renamed to `PageWebhook`,
  - `PageBeanWorkflow` renamed to `PageWorkflow`,
  - `PageBeanWorkflowScheme` renamed to `PageWorkflowScheme`,
  - `PageBeanWorkflowTransitionRules` renamed to `PageWorkflowTransitionRules`,
  - `PermissionsKeysBean` renamed to `PermissionsKeys`,
  - `ProjectIdentifierBean` renamed to `ProjectIdentifier`,
  - `ProjectInputBean` renamed to `ProjectInput`,
  - `ProjectRoleActorsUpdateBean` renamed to `ProjectRoleActorsUpdate`,
  - `SearchRequestBean` renamed to `SearchRequest`,
  - `SharePermissionInputBean` renamed to `SharePermissionInput`,
  - `SimpleApplicationPropertyBean` renamed to `SimpleApplicationProperty`,
  - `UpdateUserToGroupBean` renamed to `UpdateUserToGroup`,
  - `UserBean` renamed to `DashboardUser`,
  - `UserBeanAvatarUrls` renamed to `UserAvatarUrls`,
  - `UserMigrationBean` renamed to `UserMigration`,
  - `UserWriteBean` renamed to `UserWrite`,
  - `VersionMoveBean` renamed to `VersionMove`,
  - `WorklogIdsRequestBean` renamed to `WorklogIdsRequest`,
  - `TaskProgressBeanObject` renamed to `TaskProgressObject`,
  - `TaskProgressBeanRemoveOptionFromIssuesResult` renamed to `TaskProgressRemoveOptionFromIssuesResult`,

### 2.5.2

- Common fixes:
  - Vulnerabilities fixed
- Agile:
  - `BoardAdminsBean` renamed to `BoardAdmins`
  - `BoardBean` renamed to `Board`
  - `BoardConfigBean` renamed to `BoardConfig`
  - `BoardCreateBean` renamed to `BoardCreate`
  - `BoardFeatureBean` renamed to `BoardFeature`
  - `BoardFeatureResponseBean` renamed to `BoardFeatureResponse`
  - `BoardFeatureToggleRequestBean` renamed to `BoardFeatureToggleRequest`
  - `BoardFilterBean` renamed to `BoardFilter`
  - `BoardLocationBean` renamed to `BoardLocation`
  - `ChangeHistoryBean` renamed to `ChangeHistory`
  - `ChangeItemBean` renamed to `ChangeItem`
  - `ChangelogBean` renamed to `Changelog`
  - `ColorBean` renamed to `Color`
  - `ColumnBean` renamed to `Column`
  - `ColumnConfigBean` renamed to `ColumnConfig`
  - `EditMetaBean` renamed to `EditMeta`
  - `EpicRankRequestBean` renamed to `EpicRankRequest`
  - `EpicUpdateBean` renamed to `EpicUpdate`
  - `EstimationConfigBean` renamed to `EstimationConfig`
  - `EstimationFieldBean` renamed to `EstimationField`
  - `FieldEditBean` renamed to `FieldEdit`
  - `FieldMetaBean` renamed to `FieldMeta`
  - `IssueAssignRequestBean` renamed to `IssueAssignRequest`
  - `IssueBean` renamed to `Issue`
  - `IssueRankRequestBean` renamed to `IssueRankRequest`
  - `IssueTransitionBean` renamed to `IssueTransition`
  - `JsonTypeBean` renamed to `JsonType`
  - `LinkGroupBean` renamed to `LinkGroup`
  - `LocationBean` renamed to `Location`
  - `PageBean` renamed to `Page`
  - `PageBeanBoardBean` renamed to `PageBoard`
  - `PageBeanBoardFilterBean` renamed to `PageBoardFilter`
  - `PartialSuccessBean` renamed to `PartialSuccess`
  - `QuickFilterBean` renamed to `QuickFilter`
  - `RankingConfigBean` renamed to `RankingConfig`
  - `RelationBean` renamed to `Relation`
  - `ReportBean` renamed to `Report`
  - `ReportsResponseBean` renamed to `ReportsResponse`
  - `SearchResultsBean` renamed to `SearchResults`
  - `SimpleLinkBean` renamed to `SimpleLink`
  - `SprintCreateBean` renamed to `SprintCreate`
  - `SprintSwapBean` renamed to `SprintSwap`
  - `StatusCategoryJsonBean` renamed to `StatusCategoryJson`
  - `StatusJsonBean` renamed to `StatusJson`
  - `SubqueryBean` renamed to `Subquery`
  - `UserJsonBean` renamed to `UserJson`
  - `GroupBean` renamed to `Group`
  - `PageBeanQuickFilterBean` renamed to `PageBeanQuickFilter`
  - `OpsbarBean` renamed to `Opsbar`
  - `PageBeanQuickFilter` renamed to `PageBeanQuickFilter`
- Version 2:
  - `ActorInputBean` renamed to `ActorInput`
  - `AddFieldBean` renamed to `AddField`
  - `AddGroupBean` renamed to `AddGroup`
  - `AssociatedItemBean` renamed to `AssociatedItem`
  - `AuditRecordBean` renamed to `AuditRecord`
  - `AvatarUrlsBean` renamed to `AvatarUrls`
  - `BulkPermissionsRequestBean` renamed to `BulkPermissionsRequest`
  - `ChangedValueBean` renamed to `ChangedValue`
  - `CreateUpdateRoleRequestBean` renamed to `CreateUpdateRoleRequest`
  - `CustomFieldDefinitionJsonBean` renamed to `CustomFieldDefinitionJson`
  - `UserBean` renamed to `DashboardUser`
  - `DeleteAndReplaceVersionBean` renamed to `DeleteAndReplaceVersion`
  - `GlobalScopeBean` renamed to `GlobalScope`
  - `IdBean` renamed to `Id`
  - `IdOrKeyBean` renamed to `IdOrKey`
  - `IssueBean` renamed to `Issue`
  - `IssueCommentListRequestBean` renamed to `IssueCommentListRequest`
  - `IssueFieldOptionCreateBean` renamed to `IssueFieldOptionCreate`
  - `IssueFieldOptionScopeBean` renamed to `IssueFieldOptionScope`
  - `IssuesJqlMetaDataBean` renamed to `IssuesJqlMetaData`
  - `IssuesMetaBean` renamed to `IssuesMeta`
  - `IssuesUpdateBean` renamed to `IssuesUpdate`
  - `IssueTypeCreateBean` renamed to `IssueTypeCreate`
  - `IssueTypeUpdateBean` renamed to `IssueTypeUpdate`
  - `JiraExpressionEvalContextBean` renamed to `JiraExpressionEvalContext`
  - `JiraExpressionEvalRequestBean` renamed to `JiraExpressionEvalRequest`
  - `JiraExpressionEvaluationMetaDataBean` renamed to `JiraExpressionEvaluationMetaData`
  - `JiraExpressionsComplexityBean` renamed to `JiraExpressionsComplexity`
  - `JiraExpressionsComplexityValueBean` renamed to `JiraExpressionsComplexityValue`
  - `JsonTypeBean` renamed to `JsonType`
  - `LinkIssueRequestJsonBean` renamed to `LinkIssueRequestJson`
  - `MoveFieldBean` renamed to `MoveField`
  - `PageBeanChangelog` renamed to `PageChangelog`
  - `PageBeanComment` renamed to `PageComment`
  - `PageBeanComponentWithIssueCount` renamed to `PageComponentWithIssueCount`
  - `PageBeanContext` renamed to `PageContext`
  - `PageBeanContextForProjectAndIssueType` renamed to `PageContextForProjectAndIssueType`
  - `PageBeanCustomFieldContext` renamed to `PageCustomFieldContext`
  - `PageBeanCustomFieldContextDefaultValue` renamed to `PageCustomFieldContextDefaultValue`
  - `PageBeanCustomFieldContextOption` renamed to `PageCustomFieldContextOption`
  - `PageBeanCustomFieldContextProjectMapping` renamed to `PageCustomFieldContextProjectMapping`
  - `PageBeanCustomFieldOptionDetails` renamed to `PageCustomFieldOptionDetails`
  - `PageBeanDashboard` renamed to `PageDashboard`
  - `PageBeanField` renamed to `PageField`
  - `PageBeanFieldConfiguration` renamed to `PageFieldConfiguration`
  - `PageBeanFieldConfigurationIssueTypeItem` renamed to `PageFieldConfigurationIssueTypeItem`
  - `PageBeanFieldConfigurationItem` renamed to `PageFieldConfigurationItem`
  - `PageBeanFieldConfigurationScheme` renamed to `PageFieldConfigurationScheme`
  - `PageBeanFieldConfigurationSchemeProjects` renamed to `PageFieldConfigurationSchemeProjects`
  - `PageBeanFilterDetails` renamed to `PageFilterDetails`
  - `PageBeanGroupDetails` renamed to `PageGroupDetails`
  - `PageBeanIssueFieldOption` renamed to `PageIssueFieldOption`
  - `PageBeanIssueSecurityLevelMember` renamed to `PageIssueSecurityLevelMember`
  - `PageBeanIssueTypeScheme` renamed to `PageIssueTypeScheme`
  - `PageBeanIssueTypeSchemeMapping` renamed to `PageIssueTypeSchemeMapping`
  - `PageBeanIssueTypeSchemeProjects` renamed to `PageIssueTypeSchemeProjects`
  - `PageBeanIssueTypeScreenScheme` renamed to `PageIssueTypeScreenScheme`
  - `PageBeanIssueTypeScreenSchemeItem` renamed to `PageIssueTypeScreenSchemeItem`
  - `PageBeanIssueTypeScreenSchemesProjects` renamed to `PageIssueTypeScreenSchemesProjects`
  - `PageBeanIssueTypeToContextMapping` renamed to `PageIssueTypeToContextMapping`
  - `PageBeanNotificationScheme` renamed to `PageNotificationScheme`
  - `PageBeanProject` renamed to `PageProject`
  - `PageBeanScreen` renamed to `PageScreen`
  - `PageBeanScreenScheme` renamed to `PageScreenScheme`
  - `PageBeanScreenWithTab` renamed to `PageScreenWithTab`
  - `PageBeanString` renamed to `PageString`
  - `PageBeanUser` renamed to `PageUser`
  - `PageBeanUserDetails` renamed to `PageUserDetails`
  - `PageBeanUserKey` renamed to `PageUserKey`
  - `PageBeanVersion` renamed to `PageVersion`
  - `PageBeanWebhook` renamed to `PageWebhook`
  - `PageBeanWorkflow` renamed to `PageWorkflow`
  - `PageBeanWorkflowScheme` renamed to `PageWorkflowScheme`
  - `PageBeanWorkflowTransitionRules` renamed to `PageWorkflowTransitionRules`
  - `PermissionsKeysBean` renamed to `PermissionsKeys`
  - `ProjectIdentifierBean` renamed to `ProjectIdentifier`
  - `ProjectInputBean` renamed to `ProjectInput`
  - `ProjectRoleActorsUpdateBean` renamed to `ProjectRoleActorsUpdate`
  - `ProjectScopeBean` renamed to `ProjectScope`
  - `SearchRequestBean` renamed to `SearchRequest`
  - `SharePermissionInputBean` renamed to `SharePermissionInput`
  - `SimpleApplicationPropertyBean` renamed to `SimpleApplicationProperty`
  - `TaskProgressBeanObject` renamed to `TaskProgressObject`
  - `TaskProgressBeanRemoveOptionFromIssuesResult` renamed to `TaskProgressRemoveOptionFromIssuesResult`
  - `UpdateUserToGroupBean` renamed to `UpdateUserToGroup`
  - `UserBeanAvatarUrls` renamed to `UserAvatarUrls`
  - `UserMigrationBean` renamed to `UserMigration`
  - `UserWriteBean` renamed to `UserWrite`
  - `VersionMoveBean` renamed to `VersionMove`
  - `WorklogIdsRequestBean` renamed to `WorklogIdsRequest`

### 2.5.1

- Version 3:
  - `duedate` property added to `Fields` model.
  - `issuelinks` property added to `Fields` model.
  - `environemnt` property added to `Fields` model.
  - `parent` property added to `Fields` model.
  - `expand` property in `GetIssue` improved.
- Version 2:
  - `duedate` property added to `Fields` model.
  - `issuelinks` property added to `Fields` model.
  - `environemnt` property added to `Fields` model.
  - `parent` property added to `Fields` model.
  - `expand` property in `GetIssue` improved.

### 2.5.0

- Agile:
  - JSDoc descriptions improved.
  - `BoardFeature` are deprecated. Use `Feature` instead.
  - `BoardFeatureResponseBean` are deprecated. Use `FeatureResponse` instead.
  - `BoardFeatureToggleRequest` are deprecated. Use `FeatureToggleRequest` instead.
  - Other minor improvements


- Version 3:
  - JSDoc descriptions improved.
  - `AppMigration` API support added.
  - `generateChangelog` property added to `IssueCustomFieldValuesApps.updateCustomFieldValue` request parameters.
  - `hierarchyLevel` property added to `IssueTypes.createIssueType`.
  - `getChangeLogsByIds` method added to `Issues`.
  - New models added:
    - `ConnectCustomFieldValue`
    - `ConnectCustomFieldValues`
    - `EntityPropertyDetails`
    - `IssueChangelogIds`
    - `GetChangeLogsByIds`
  - Mistake in `CrateWorkflowStatusDetails` fixed. Current name is correct: `CreateWorkflowStatusDetails`.
  - `fieldIdsFilter`, `issuePropertyKeysFilter` properties added to `Webhook` and `WebhookDetails` models.
  - Other minor improvements

- Version 2:
  - JSDoc descriptions improved.
  - `AppMigration` API support added.
  - `generateChangelog` property added to `IssueCustomFieldValuesApps.updateCustomFieldValue` request parameters.
  - `hierarchyLevel` property added to `IssueTypes.createIssueType`.
  - `getChangeLogsByIds` method added to `Issues`.
  - New models added:
    - `ConnectCustomFieldValue`
    - `ConnectCustomFieldValues`
    - `EntityPropertyDetails`
    - `IssueChangelogIds`
    - `PageBeanContextualConfiguration`
    - `GetChangeLogsByIds`
  - Mistake in `CrateWorkflowStatusDetails` fixed. Current name is correct: `CreateWorkflowStatusDetails`.
  - `fieldIdsFilter`, `issuePropertyKeysFilter` properties added to `Webhook` and `WebhookDetails` models.
  - Other minor improvements

### 2.4.2

- [#144](https://github.com/MrRefactoring/jira.js/issues/144) Fixed error when tried vote issue. Thanks [João Lopes](https://github.com/lopis)!
- A lot of small improvements in types for agile and for project API

### 2.4.1

- A lot of small improvements in types for agile and for project API

### 2.4.0

- Some properties to some endpoints added :D
- [IssueCustomFieldConfigurationApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-configuration--apps-/#api-group-issue-custom-field-configuration--apps-) group added
- [#136](https://github.com/MrRefactoring/jira.js/pull/136) Fixed all URLs for Cloud Agile endpoint. Thanks [John Brunton](https://github.com/jbrunton)!
- Internal code styles improved

### 2.3.0

- Huge type improvements

### 2.2.1

- Types error fixed [#124](https://github.com/MrRefactoring/jira.js/issues/124)

### 2.2.0

- Fixed [bug](https://github.com/MrRefactoring/jira.js/issues/120) with transition model
- Telemetry names changed
- Instance information API added
- Issue custom field values apps API added

### 2.1.1

- Typings improved
- Fixed [bug](https://github.com/MrRefactoring/jira.js/issues/117) with typings in createIssue

### 2.1.0

- Typings improved
- projectFeatures API added
- small improvements

### 2.0.6

- searchForIssuesUsingJql request fixed

### 2.0.5

- addAttachment fixed for browsers

### 2.0.4

- addAttachment fixed for browsers

### 2.0.3

- Improved typing
- Fixed the bug that it was impossible to attach an attachment to an issue
- Other small improvements

### 2.0.2

- `Buffer.from` replaced to raw JS code in Basic authorization
- Telemetry config type fixed
- `noCheckAtlassianToken` flag added to config (`X-Atlassian-Token: no-check`)
- Typing improves

### 2.0.1

- Types bug fixes

### 2.0.0

- One client divided to three: [Agile](https://developer.atlassian.com/cloud/jira/software/rest/intro/), [Version2](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/), [Version3](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)
- Improved type system
- A redesigned facade and internal structure of the project
- Added telemetry

</details>

<details>

### 1.8.0

- Authentication: Added [OAuth 1.0](https://developer.atlassian.com/server/jira/platform/oauth/) authentication method
- CI: Migrated from `Travis CI` to `Github CI`

### 1.7.3

- DEPENDENCIES: `atlassian-jwt` installed from npm instead git
- DEPENDENCIES: Updated dependencies versions
- README: Contributors section added, small redesign

### 1.7.2

- FIX: console.log removed

### 1.7.1

- FIX: Headers fixes

### 1.7.0

- IMPROVEMENT: Readme examples updated
---
- IMPROVEMENT: Config typings refactored
- DEPRECATION: Property `timeout` deprecated in `Config`
---
- FEATURE: Property `middlewares` added to `Config`
---
- FEATURE: Property `baseRequestConfig` added to `Config`
---
- FEATURE: Method `getOptionsForContext` added to `IssueCustomFieldOptions` [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-custom-field-options/#api-rest-api-2-customfield-fieldid-context-contextid-option-get)
- FEATURE: Method `deleteCustomFieldOption` added to `IssueCustomFieldOptions` [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-custom-field-options/#api-rest-api-2-customfield-fieldid-context-contextid-option-optionid-delete)
---
- FEATURE: Method `changeOrderOfIssueTypes` added to `IssueTypeSchemes` [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-type-schemes/#api-rest-api-2-issuetypescheme-issuetypeschemeid-issuetype-move-put)
---
- FEATURE: Method `assignWorkflowSchemeToProject` added to `WorkflowSchemeProjectAssociations` [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-workflow-scheme-project-associations/#api-rest-api-2-workflowscheme-project-put)
---
- FEATURE: New API `ScreenSchemes` added. [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-screen-schemes/#api-group-screen-schemes).
- FEATURE: New API `ScreenTabFields` added [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-screen-tab-fields/#api-group-screen-tab-fields)
- FEATURE: New API `ScreenTabs` added [Jira documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-screen-tabs/)
---
- FEATURE: Added models for new endpoints


### 1.6.2

- FIX: Sprints added to client
- IMPROVEMENT: Dependencies updated

### 1.6.1

- FIX: Added the ability to use the library without authorization [#75](https://github.com/MrRefactoring/jira.js/pull/75)

### 1.6.0

- FEATURE: New API `IssueTypeScreenSchemes` added
- FEATURE: New API `ProjectEmail` added
---
- FEATURE: Method `bulkGetGroups` added to `Groups`
- FEATURE: Method `restoreDeletedProject` added to `Projects`
- FEATURE: Method `createIssueTypeScheme` added to `IssueTypeSchemes`
- FEATURE: Method `deleteIssueTypeScheme` added to `IssueTypeSchemes`
- FEATURE: Method `updateIssueTypeScheme` added to `IssueTypeSchemes`
- FEATURE: Method `addIssueTypesToIssueTypeScheme` added to `IssueTypeSchemes`
- FEATURE: Method `deleteIssueTypeFromIssueTypeScheme` added to `IssueTypeSchemes`
---
- FEATURE: Property `id` added to `IssueFieldConfigurations.getAllFieldConfigurations`
- FEATURE: Property `sortByOpsBarAndStatus` added to `Issues.getTransitions`
- FEATURE: Property `accountId` added to `Permissions.getBulkPermissions`
---
- DEPRECATION: Method `getIssueTypeScreenSchemes` are deprecated in `Screens`
- DEPRECATION: Method `getIssueTypeScreenSchemeItems` are deprecated in `Screens`
- DEPRECATION: Method `getIssueTypeScreenSchemesForProjects` are deprecated in `Screens`

### 1.5.0

- FEATURE: Method `getAllFieldConfigurationSchemes` added to `IssueFieldConfigurations`
- FEATURE: Method `getFieldConfigurationSchemesForProjects` added to `IssueFieldConfigurations`
- FEATURE: Property `fieldConfigurationSchemeId` added to `issueFieldConfigurations.getFieldConfigurationIssueTypeItems`
- FEATURE: Method `getIssueSecurityLevelMembers` added to `IssueSecurityLevel`
- FEATURE: Issue type schemes API added
- FEATURE: Method `getLicensedProjectTypes` added to `ProjectTypes`
- FEATURE: Method `deleteProjectAsynchronously` added to `Projects`
- FEATURE: Method `getIssueTypeScreenSchemes` added to `Screens`
- FEATURE: Method `getAllScreenSchemes` renamed to `getScreenSchemes`
- DEPRECATION: `getAllScreenSchemes` are deprecated (Renamed to `getScreenSchemes`)

### 1.4.0

- FEATURE: Now requests where there are no required parameters do not have to pass an empty object to make a request
- FEATURE: `dashboards.createDashboard` was added
- FEATURE: `dashboards.updateDashboard` was added
- FEATURE: `dashboards.deleteDashboard` was added
- FEATURE: `dashboards.copyDashboard` was added
- FEATURE: `screens.getIssueTypeScreenSchemesForProjects` was added
- FEATURE: `issueFieldConfigurations.getAllFieldConfiguration` was added
- FEATURE: `issueFieldConfigurations.getFieldConfigurationItems` was added
- FEATURE: `issueFieldConfigurations.getFieldConfigurationIssueTypeItems` was added
- FEATURE: In `issues.getTransitions` was added `includeUnavailableTransitions` property
- DEPRECATION: `issueFields.getFieldConfigurationItems` are deprecated (Removed from official API, use `issueFieldConfigurations.getFieldConfigurationItems`). Will be removed in next major version

### 1.3.0

- FEATURE: `jiraExpressions.analyseJiraExpression` was added
- FEATURE: `screens.getIssueTypeScreenSchemeItems` was added
- FEATURE: In `projects.getProjectsPaginated` was added `status` property
- FEATURE: In `projects.deleteProject` was added `enableUndo` property
- DEPRECATION: `timeTracking.disableTimeTracking` are deprecated (Removed from official API). Will be removed in next major version

### 1.2.0

- FEATURE: `issueFields.getAllFieldConfigurations` added as experimental
- FEATURE: `issueFields.getFieldConfigurationItems` added as experimental
- IMPROVEMENT: dependencies update

### 1.1.1

- FIX: `strictGDPR` feature fixed
- FIX: `Cannot read property 'Authorization' of undefined` fixed

### 1.1.0

- FEATURE: `strictGDPR` property added to Config. Allows use only [GDPR-compliant functionality](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
- FEATURE: `users.getAllUsersDefault` added
- FEATURE: `issueCustomFieldOptions.updateCustomFieldOptions` added as experimental
- DEPRECATION: `projectRoleActors.getActorsCountForProjectRole` are deprecated (Removed from official API). Will be removed in next major version

### 1.0.3

- DEPRECATION: `permissionsSchemes` and `issueAttachment` are deprecated
- IMPROVEMENT: agile api typings improved
- IMPROVEMENT: dependencies update
- FIX: Authorization parameter excluded for agile API in the request body

### 1.0.2

- FIX: JWT Authentication default expire time added
- IMPROVEMENT: modified `atlassian-jwt` (removed lodash from dependencies, bundle size decreased)
- IMPROVEMENT: small tests for authentication added

### 1.0.1

- FIX: documentation link fixed

### 1.0.0

- RELEASE

</details>
