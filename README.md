# JavaScript / TypeScript JIRA API Client

A JavaScript / TypeScript wrapper for the JIRA REST API

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
import { Client } from "jira.js";

// Initialize
const client = new Client({
  host: "https://jira.somehost.com"
});
```

### Working with API (How to get a list of all projects, for example)

```js
// Callbacks
client.projects.getAllProjects({}, (err, data) => {
  if (err) {
    throw err;
  }

  console.log(data);
});


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
import { Client } from "jira.js";

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

## Set middleware for Jira's responses and errors

 ```ts
 import { Client } from "jira.js";

 const client = new Client({
   host: "https://jira.somehost.com",
   middlewares: {
     onError: (error) => {
       console.error(error);
       throw error;
     },
     onResponse: (data) => {
       console.log(data);
       return data;
     }
   }
 });
 ```

## Documentation

Library based on [Jira API v2](https://developer.atlassian.com/cloud/jira/platform/rest/v2) and [Jira Agile API](https://developer.atlassian.com/cloud/jira/software/rest)

Can't find what you need in the readme? Check out our documentation here: https://mrrefactoring.github.io/jira.js/

## Contributors

[<img alt="MrRefactoring" src="https://avatars0.githubusercontent.com/u/10329528?v=4&s=117 width=117">](https://github.com/MrRefactoring) |[<img alt="Swapnull" src="https://avatars0.githubusercontent.com/u/4456346?v=4&s=117 width=117">](https://github.com/Swapnull) |[<img alt="violine1101" src="https://avatars0.githubusercontent.com/u/12451842?v=4&s=117 width=117">](https://github.com/violine1101) |
:---:|:---:|:---:|
[MrRefactoring](https://github.com/MrRefactoring)|[Swapnull](https://github.com/Swapnull)|[violine1101](https://github.com/violine1101)|

## Road map

- Response models ([Check 2.0 version PR](https://github.com/MrRefactoring/jira.js/pull/76))
- Method names reducing ([Check 2.0 version PR](https://github.com/MrRefactoring/jira.js/pull/76))

## Latest version changelog

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
