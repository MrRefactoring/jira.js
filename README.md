# JavaScript JIRA API Client

A JavaScript/TypeScript wrapper for the JIRA REST API

[![npm](https://img.shields.io/npm/v/jira.js.svg?style=flat-square)](https://www.npmjs.com/package/jira.js)
[![Downloads](https://img.shields.io/npm/dm/jira.js.svg?style=flat-square)](https://npmjs.com/jira.js)
[![Minizipped size](https://badgen.net/bundlephobia/minzip/jira.js?style=flat-square)](https://bundlephobia.com/result?p=jira.js)
[![dependencies Status](https://david-dm.org/mrrefactoring/jira.js/status.svg?style=flat-square)](https://david-dm.org/mrrefactoring/jira.js)
[![devDependencies Status](https://david-dm.org/mrrefactoring/jira.js/dev-status.svg?style=flat-square)](https://david-dm.org/mrrefactoring/jira.js?type=dev)
[![Build Status](https://img.shields.io/travis/mrrefactoring/jira.js/master.svg?style=flat-square)](https://travis-ci.org/MrRefactoring/jira.js)

## Installation

Install with the npm:

```bash
npm install jira.js
```

Install with the yarn:

```bash
yarn add jira.js
```

## Examples

### Create the JIRA client

```js
// ES5
var { Client } = require("jira.js");

// ES6
import { Client } from "jira.js";

// Initialize
var client = new Client({
  host: "https://jira.somehost.com"
});
```

### Get all projects

```js
// ES5/ES6
client.projects
  .getAllProjects()
  .then(projects => console.log(projects))
  .catch(error => console.log(error));

// ES7
async function getProjects() {
  const projects = await client.projects.getAllProjects();

  console.log(projects);

  return projects;
}
```

## Authorization

### Basic authorization

##### With API token

```ts
const client = new Client({
  host: "https://jira.somehost.com",
  authentication: {
    basic: {
      username: "MyUsername",
      apiToken: "API_Token"
    }
  }
});
```

##### With password

```ts
const client = new Client({
  host: "https://jira.somehost.com",
  authentication: {
    basic: {
      username: "MyUsername",
      password: "MyPassword"
    }
  }
});
```

### JWT authentication

```js
const client = new Client({
  host: 'https://jira.somehost.com',
  authentication: {
    jwt: {
      iss: 'id',
      secret: 'secret key'
    }
  }
});
```

### OAuth2.0 authentication

```js
const client = new Client({
  host: "https://jira.somehost.com",
  authentication: {
    accessToken: "my access token"
  }
});
```

## Base request config

If you want to add headers, timeout, withCredentials or other data for each of the requests that will be called,
then pass them to baseRequestConfig.

Full list of properties for baseRequestConfig you can find here:
https://github.com/axios/axios#request-config

```ts
const client = new Client({
  host: 'https://jira.somehost.com',
  baseRequestConfig: {
    timeout: 20000,
    headers: {
      'Content-Type': 'application/json',
    },
    timeoutErrorMessage: 'Error message',
    withCredentials: false,
    responseType: 'arraybuffer',
    maxContentLength: 100,
    // and others properties
  },
});
```

## Set global handlers for Jira's responses

 ```ts
 import { Client } from "jira.js";
 
 const client = new Client({
   host: "https://jira.somehost.com",
   globalHandlers: {
     error: (error) => {
       console.error(error);
       throw error;
     },
     response: (data) => {
       console.log(data);
       return data;
     }
   }
 });
 ```

## Documentation

Can't find what you need in the readme? Check out our documentation here: https://mrrefactoring.github.io/jira.js/

## Road map

- Response models
- Method names reducing

## Changelog

### 1.7.0

- IMPROVEMENT: Readme examples updated
---
- IMPROVEMENT: Config typings refactored
- DEPRECATION: Property `timeout` deprecated in `Config`
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
