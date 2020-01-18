# JavaScript JIRA API Client

[![npm](https://img.shields.io/npm/v/jira.js.svg)](https://www.npmjs.com/package/jira.js)
[![Downloads](https://img.shields.io/npm/dm/jira.js.svg)](https://npmjs.com/jira.js)
[![Minizipped size](https://badgen.net/bundlephobia/minzip/jira.js)](https://bundlephobia.com/result?p=jira.js)
[![dependencies Status](https://david-dm.org/mrrefactoring/jira.js/status.svg)](https://david-dm.org/mrrefactoring/jira.js)
[![devDependencies Status](https://david-dm.org/mrrefactoring/jira.js/dev-status.svg)](https://david-dm.org/mrrefactoring/jira.js?type=dev)

## Installation

Install with the npm:

```shell
$ npm install jira.js
```

Install with the yarn:

```shell
$ yarn add jira.js
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

```js
const client = new Client({
  host: "https://jira.somehost.com",
  authentication: {
    basic: {
      username: "MyUsername",
      apiToken: "My Password or API Token"
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
      iss: 'id';
      secret: 'secret key';
    }
  }
});
```

### OAuth2.0 authentication

```js
const client = new Client({
  host: 'https://jira.somehost.com',
  authentication: {
    accessToken: 'my access token'
  }
});
```

## Documentation

Can't find what you need in the readme? Check out our documentation here: https://mrrefactoring.github.io/jira.js/

## Road map

- Response models
- Method names reducing

## Changelog

### 1.1.0

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
