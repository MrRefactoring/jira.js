<div align="center">
  <img alt="Jira.js logo" src="https://svgshare.com/i/T6B.svg"/>

  <a href="https://www.npmjs.com/package/jira.js"><img alt="NPM version" src="https://img.shields.io/npm/v/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/jira.js"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://github.com/MrRefactoring/jira.js"><img alt="build status" src="https://img.shields.io/github/workflow/status/mrrefactoring/jira.js/CI?style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/jira.js/blob/develop/LICENSE"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/jira.js?color=green&style=flat-square"/></a>

  <span>JavaScript / TypeScript library for Node.JS and browsers to easily interact with Atlassian Jira API</span>
</div>

## About

jira.js is a powerful [Node.JS](https://nodejs.org/) / Browser module that allows you to interact with the [Jira API](https://developer.atlassian.com/cloud/jira/platform/rest/) very easily.

Usability, consistency, and performance are key focuses of jira.js, and it also has nearly 100% coverage of the Jira API. It receives new Jira features shortly after they arrive in the API.


## Table of contents

- [Installation](#installation)
- [Telemetry information collection agreement](#telemetry-information-collection-agreement)
  - [Customizing telemetry collection data example](#customizing-telemetry-collection-data-example)
  - [Disabling telemetry collection example](#disabling-telemetry-collection-example)
- [Usage](#usage)
- [Decreasing Webpack bundle size](#decreasing-webpack-bundle-size)
- [Take a look at our other products](#take-a-look-at-our-other-products)
- [License](#license)

## Installation

**Node.js 10.0.0 or newer is required.**

Install with the npm:

```bash
npm install jira.js
```

Install with the yarn:

```bash
yarn add jira.js
```

## Telemetry information collection agreement

The use of this library may collect, record and transmit data about the operation of the library and related data, as well as potentially personal data, including ip address from which the request is made, user agent from the device from which the request is made, version of the library used, version of the telemetry sending library, name of the invoked method, authorization type information (can be configured), base configuration request usage information, callback information, onResponse middleware usage information, onError middleware usage information, queries usage information, body usage information in request, headers usage information in request, strict GDPR flag enabling information, HTTP response code (can be configured), request start date and time and response receipt date and time (can be configured).

The type and amount of data may vary with the version of the libraries and can be changed at any time without notice.

Telemetry data collection is enabled by default.

The following tracking parameters can be configured:

- Authentication type
- Request status code
- Request timings

#### Customizing telemetry collection data example

```typescript
import { Config } from 'jira.js';

const config: Config = {
  host: 'https://your-domain.atlassian.net',
  telemetry: {
    allowedToPassAuthenticationType: false,  // true by default
    allowedToPassRequestStatusCode: true,  // true by default
    allowedToPassRequestTimings: false,  // true by default
  },
};
```

If you want to disable telemetry, set the `telemetry` field to `false`.

#### Disabling telemetry collection example

```typescript
import { Config } from 'jira.js';

const config: Config = {
  host: 'https://your-domain.atlassian.net',
  telemetry: false, // Telemetry will not be collected
};
```

## Usage

## Decreasing Webpack bundle size

If you use Webpack and need to reduce the size of the assembly, you can create your client with only the groups you use.

```typescript
import { BaseClient } from 'jira.js';
import { Board } from 'jira.js/out/agile';
import { Groups } from 'jira.js/out/version2';
import { Issues } from 'jira.js/out/version3';

export class CustomJiraClient extends BaseClient {
  board = new Board(this);
  groups = new Groups(this);
  issues = new Issues(this);
}
```

## Take a look at our other products

* [Trello.js](https://github.com/MrRefactoring/trello.js) - JavaScript / TypeScript library for Node.JS and browsers to easily interact with Atlassian Trello API

## License

Distributed under the MIT License. See `LICENSE` for more information.
