# JavaScript / TypeScript JIRA API Client

A JavaScript / TypeScript wrapper for the JIRA REST API

[![NPM](https://img.shields.io/npm/v/jira.js.svg?style=flat-square)](https://www.npmjs.com/package/jira.js)
[![Downloads](https://img.shields.io/npm/dm/jira.js.svg?style=flat-square)](https://npmjs.com/jira.js)
[![Minizipped size](https://badgen.net/bundlephobia/minzip/jira.js?style=flat-square)](https://bundlephobia.com/result?p=jira.js)
[![Dependencies Status](https://david-dm.org/mrrefactoring/jira.js/status.svg?style=flat-square)](https://david-dm.org/mrrefactoring/jira.js)
[![DevDependencies Status](https://david-dm.org/mrrefactoring/jira.js/dev-status.svg?style=flat-square)](https://david-dm.org/mrrefactoring/jira.js?type=dev)
![Build status](https://github.com/mrrefactoring/jira.js/workflows/CI/badge.svg)

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

### OAuth1.0 authentication

```js
const client = new Client({
  host: "https://jira.somehost.com",
  authentication: {
    oauth1: {
      consumerKey: "your consumer key",
      consumerSecret: "-----BEGIN RSA PRIVATE KEY-----\n" + "some private key\n" + "-----END RSA PRIVATE KEY-----",
      accessToken: "your access token",
      tokenSecret: "your token secret"
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

[<img alt="MrRefactoring" src="https://avatars0.githubusercontent.com/u/10329528?v=4&s=117 width=117">](https://github.com/MrRefactoring) |[<img alt="jayree" src="https://avatars3.githubusercontent.com/u/14836154?s=400&v=4">](https://github.com/jayree) |[<img alt="Swapnull" src="https://avatars0.githubusercontent.com/u/4456346?v=4&s=117 width=117">](https://github.com/Swapnull) |[<img alt="violine1101" src="https://avatars0.githubusercontent.com/u/12451842?v=4&s=117 width=117">](https://github.com/violine1101) |
:---:|:---:|:---:|:---:|
[MrRefactoring](https://github.com/MrRefactoring)|[jayree](https://github.com/jayree)|[Swapnull](https://github.com/Swapnull)|[violine1101](https://github.com/violine1101)|

## Road map

- Response models ([Check 2.0 version PR](https://github.com/MrRefactoring/jira.js/pull/76))
- Method names reducing ([Check 2.0 version PR](https://github.com/MrRefactoring/jira.js/pull/76))

## Latest version changelog

### 1.8.0

- Authentication: Added [OAuth 1.0](https://developer.atlassian.com/server/jira/platform/oauth/) authentication method
- CI: Migrated from `Travis CI` to `Github CI`
