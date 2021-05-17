# Jira.js changelog

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

## Previous major version:

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
