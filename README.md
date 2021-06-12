<div align="center">
  <img alt="Jira.js logo" src="https://svgshare.com/i/T6B.svg"/>

  <a href="https://www.npmjs.com/package/jira.js"><img alt="NPM version" src="https://img.shields.io/npm/v/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/jira.js"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://github.com/MrRefactoring/jira.js"><img alt="build status" src="https://img.shields.io/github/workflow/status/mrrefactoring/jira.js/CI?style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/jira.js/blob/develop/LICENSE"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/jira.js?color=green&style=flat-square"/></a>

  <span>JavaScript / TypeScript library for Node.JS and browsers to easily interact with Atlassian Jira API</span>
</div>

## About

jira.js is a powerful [Node.JS](https://nodejs.org/) / Browser module that allows you to interact with the [Jira Cloud API](https://developer.atlassian.com/cloud/jira/platform/rest/) very easily.

Usability, consistency, and performance are key focuses of jira.js, and it also has nearly 100% coverage of the Jira API. It receives new Jira features shortly after they arrive in the API.

## Table of contents

- [Installation](#installation)
- [Telemetry information collection agreement](#telemetry-information-collection-agreement)
  - [Customizing telemetry collection data example](#customizing-telemetry-collection-data-example)
  - [Disabling telemetry collection example](#disabling-telemetry-collection-example)
- [Usage](#usage)
  - [Authentication](#authentication)
    - [Basic](#basic-authenticationhttpsdeveloperatlassiancomcloudjiraplatformbasic-auth-for-rest-apis)
    - [OAuth](#oauth)
    - [OAuth 2.0](#oauth-20)
    - [JWT](#jwt)
  - [Your first request and using algorithm](#your-first-request-and-using-algorithm)
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

The use of this library may collect, record and transmit data about the operation of the library and related data, as well as potentially personal data, including ip address from which the request is made, user agent from the device from which the request is made, version of the library used, version of the telemetry sending library, name of the invoked method, authorization type information (can be configured), base configuration request usage information, callback information, onResponse middleware usage information, onError middleware usage information, queries usage information, body usage information in request, headers usage information in request, strict GDPR flag enabling information, HTTP response code (can be configured), request start date and time and response receipt date and time (can be configured), No check atlassian token flag enabling information.

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

#### Authentication

There are several types of authentication to gain access to the Jira API. Let's take a look at a few of them below

##### [Basic authentication](https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/)

Basic authentication allows you to log in with credentials. You can use username and password, but this login method is not supported in the online version and most standalone versions, so it's better to release API Token, read how to do it [here](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/), and use it together with email.

Username and password example:

```typescript
import { Version2Client } from 'jira.js';

const client = new Version2Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      username: 'YOUR_USERNAME',
      password: 'YOUR_PASSWORD',
    },
  },
});
```

Email and API Token example:

```typescript
import { Version2Client } from 'jira.js';

const client = new Version2Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      email: 'YOUR@EMAIL.ORG',
      apiToken: 'YOUR_API_TOKEN',
    },
  },
});
```

##### [OAuth](https://developer.atlassian.com/cloud/jira/platform/jira-rest-api-oauth-authentication/)

```typescript
import { Version2Client } from 'jira.js';

const client = new Version2Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    oauth: {
      consumerKey: 'your consumer key',
      consumerSecret: '-----BEGIN RSA PRIVATE KEY-----\n" + "some private key\n" + "-----END RSA PRIVATE KEY-----',
      accessToken: 'your access token',
      tokenSecret: 'your token secret',
    },
  },
});
```

##### [OAuth 2.0](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/)

Only the authorization token is currently supported. To release it, you need to read the [documentation](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/) and write your own code to get the token.

Example of usage

```typescript
import { Version2Client } from 'jira.js';

const client = new Version2Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    oauth2: {
      accessToken: 'YOUR_ACCESS_TOKEN',
    },
  },
});
```

##### [JWT](https://developer.atlassian.com/cloud/jira/platform/understanding-jwt-for-connect-apps/)

```typescript
import { Version2Client } from 'jira.js';

const client = new Version2Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    jwt: {
      issuer: 'ISSUER',
      secret: 'shhhh',
      expiryTimeSeconds: 180,
    },
  },
});
```

#### Your first request and using algorithm

```typescript
import { Version2Client } from 'jira.js';

const client = new Version2Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      email: 'YOUR_EMAIL',
      apiToken: 'YOUR_API_TOKEN',
    },
  },
});

async function main() {
  const projects = await client.projects.getAllProjects();

  console.log(projects);
}

main();

// Expected output:
// [
//   {
//     expand: 'description,lead,issueTypes,url,projectKeys,permissions,insight',
//     self: 'https://your-domain.atlassian.net/rest/api/2/project/10000',
//     id: '10000',
//     key: 'TEST',
//     name: 'test',
//     avatarUrls: {
//       '48x48': 'https://your-domain.atlassian.net/secure/projectavatar?pid=10000&avatarId=10425',
//       '24x24': 'https://your-domain.atlassian.net/secure/projectavatar?size=small&s=small&pid=10000&avatarId=10425',
//       '16x16': 'https://your-domain.atlassian.net/secure/projectavatar?size=xsmall&s=xsmall&pid=10000&avatarId=10425',
//       '32x32': 'https://your-domain.atlassian.net/secure/projectavatar?size=medium&s=medium&pid=10000&avatarId=10425'
//     },
//     projectTypeKey: 'software',
//     simplified: true,
//     style: 'next-gen',
//     isPrivate: false,
//     properties: {},
//     entityId: 'e0a412bd-1510-4841-bdbc-84180db3ee3b',
//     uuid: 'e0a412bd-1510-4841-bdbc-84180db3ee3b'
//   }
// ]
```

The algorithm for using the library:

```typescript
client.<group>.<methodName>(parametersObject);
```

Available groups:
- Agile group:
  - [backlog](https://developer.atlassian.com/cloud/jira/software/rest/api-group-backlog/#api-group-backlog)
  - [board](https://developer.atlassian.com/cloud/jira/software/rest/api-group-board/#api-group-board)
  - [epic](https://developer.atlassian.com/cloud/jira/software/rest/api-group-epic/#api-group-epic)
  - [issue](https://developer.atlassian.com/cloud/jira/software/rest/api-group-issue/#api-group-issue)
  - [sprint](https://developer.atlassian.com/cloud/jira/software/rest/api-group-sprint/#api-group-sprint)
  - [developmentInformation](https://developer.atlassian.com/cloud/jira/software/rest/api-group-development-information/#api-group-development-information)
  - [featureFlags](https://developer.atlassian.com/cloud/jira/software/rest/api-group-feature-flags/#api-group-feature-flags)
  - [deployments](https://developer.atlassian.com/cloud/jira/software/rest/api-group-deployments/#api-group-deployments)
  - [builds](https://developer.atlassian.com/cloud/jira/software/rest/api-group-builds/#api-group-builds)
  - [remoteLinks](https://developer.atlassian.com/cloud/jira/software/rest/api-group-remote-links/#api-group-remote-links)
  - [otherOperations](https://developer.atlassian.com/cloud/jira/software/rest/api-group-other-operations/#api-group-other-operations)
- Version 2 group:
  - [applicationRoles](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-application-roles/#api-group-application-roles)
  - [auditRecords](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-audit-records/#api-group-audit-records)
  - [avatars](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-avatars/#api-group-avatars)
  - [dashboards](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-dashboards/#api-group-dashboards)
  - [filters](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-filters/#api-group-filters)
  - [filterSharing](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-filter-sharing/#api-group-filter-sharing)
  - [groupAndUserPicker](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-group-and-user-picker/#api-group-group-and-user-picker)
  - [groups](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-groups/#api-group-groups)
  - [instanceInformation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-instance-information/#api-group-instance-information)
  - [issues](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issues/#api-group-issues)
  - [issueAttachments](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-attachments/#api-group-issue-attachments)
  - [issueComments](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-comments/#api-group-issue-comments)
  - [issueCustomFieldConfigurationApps](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-custom-field-configuration--apps-/#api-group-issue-custom-field-configuration--apps-)
  - [issueCommentProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-comment-properties/#api-group-issue-comment-properties)
  - [issueFields](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-fields/#api-group-issue-fields)
  - [issueFieldConfigurations](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-field-configurations/#api-group-issue-field-configurations)
  - [issueCustomFieldContexts](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-custom-field-contexts/#api-group-issue-custom-field-contexts)
  - [issueCustomFieldOptions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-custom-field-options/#api-group-issue-custom-field-options)
  - [issueCustomFieldOptionsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-custom-field-options--apps-/#api-group-issue-custom-field-options--apps-)
  - [issueCustomFieldValuesApps](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-custom-field-values--apps-/#api-group-issue-custom-field-values--apps-)
  - [issueLinks](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-links/#api-group-issue-links)
  - [issueLinkTypes](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-link-types/#api-group-issue-link-types)
  - [issueNavigatorSettings](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-navigator-settings/#api-group-issue-navigator-settings)
  - [issueNotificationSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-notification-schemes/#api-group-issue-notification-schemes)
  - [issuePriorities](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-priorities/#api-group-issue-priorities)
  - [issueProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-properties/#api-group-issue-properties)
  - [issueRemoteLinks](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-remote-links/#api-group-issue-remote-links)
  - [issueResolutions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-resolutions/#api-group-issue-resolutions)
  - [issueSearch](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-search/#api-group-issue-search)
  - [issueSecurityLevel](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-security-level/#api-group-issue-security-level)
  - [issueSecuritySchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-security-schemes/#api-group-issue-security-schemes)
  - [issueTypes](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-types/#api-group-issue-types)
  - [issueTypeSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-type-schemes/#api-group-issue-type-schemes)
  - [issueTypeScreenSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-type-screen-schemes/#api-group-issue-type-screen-schemes)
  - [issueTypeProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-type-properties/#api-group-issue-type-properties)
  - [issueVotes](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-votes/#api-group-issue-votes)
  - [issueWatchers](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-watchers/#api-group-issue-watchers)
  - [issueWorklogs](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-worklogs/#api-group-issue-worklogs)
  - [issueWorklogProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-worklog-properties/#api-group-issue-worklog-properties)
  - [jiraExpressions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-jira-expressions/#api-group-jira-expressions)
  - [jiraSettings](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-jira-settings/#api-group-jira-settings)
  - [jql](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-jql/#api-group-jql)
  - [labels](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-labels/#api-group-labels)
  - [myself](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-myself/#api-group-myself)
  - [permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-permissions/#api-group-permissions)
  - [permissionSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-permission-schemes/#api-group-permission-schemes)
  - [projects](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-projects/#api-group-projects)
  - [projectAvatars](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-avatars/#api-group-project-avatars)
  - [projectCategories](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-categories/#api-group-project-categories)
  - [projectComponents](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-components/#api-group-project-components)
  - [projectEmail](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-email/#api-group-project-email)
  - [projectFeatures](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-features/#api-group-project-features)
  - [projectKeyAndNameValidation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-key-and-name-validation/#api-group-project-key-and-name-validation)
  - [projectPermissionSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-permission-schemes/#api-group-project-permission-schemes)
  - [projectProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-properties/#api-group-project-properties)
  - [projectRoles](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-roles/#api-group-project-roles)
  - [projectRoleActors](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-role-actors/#api-group-project-role-actors)
  - [projectTypes](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-types/#api-group-project-types)
  - [projectVersions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-project-versions/#api-group-project-versions)
  - [screens](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-screens/#api-group-screens)
  - [screenTabs](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-screen-tabs/#api-group-screen-tabs)
  - [screenTabFields](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-screen-tab-fields/#api-group-screen-tab-fields)
  - [screenSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-screen-schemes/#api-group-screen-schemes)
  - [serverInfo](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-server-info/#api-group-server-info)
  - [tasks](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-tasks/#api-group-tasks)
  - [timeTracking](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-time-tracking/#api-group-time-tracking)
  - [users](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-users/#api-group-users)
  - [userProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-user-properties/#api-group-user-properties)
  - [userSearch](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-user-search/#api-group-user-search)
  - [webhooks](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-webhooks/#api-group-webhooks)
  - [workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-workflows/#api-group-workflows)
  - [workflowTransitionRules](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-workflow-transition-rules/#api-group-workflow-transition-rules)
  - [workflowSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-workflow-schemes/#api-group-workflow-schemes)
  - [workflowSchemeProjectAssociations](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-workflow-scheme-project-associations/#api-group-workflow-scheme-project-associations)
  - [workflowSchemeDrafts](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-workflow-scheme-drafts/#api-group-workflow-scheme-drafts)
  - [workflowStatuses](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-workflow-statuses/#api-group-workflow-statuses)
  - [workflowStatusCategories](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-workflow-status-categories/#api-group-workflow-status-categories)
  - [workflowTransitionProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-workflow-transition-properties/#api-group-workflow-transition-properties)
  - [appProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-app-properties/#api-group-app-properties)
  - [dynamicModules](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-dynamic-modules/#api-group-dynamic-modules)
- Version 3 group:
  - [applicationRoles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-application-roles/#api-group-application-roles)
  - [auditRecords](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records)
  - [avatars](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-group-avatars)
  - [dashboards](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dashboards/#api-group-dashboards)
  - [filters](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filters/#api-group-filters)
  - [filterSharing](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filter-sharing/#api-group-filter-sharing)
  - [groupAndUserPicker](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-group-and-user-picker/#api-group-group-and-user-picker)
  - [groups](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-groups/#api-group-groups)
  - [instanceInformation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-instance-information/#api-group-instance-information)
  - [issues](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-group-issues)
  - [issueAttachments](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-attachments/#api-group-issue-attachments)
  - [issueComments](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comments/#api-group-issue-comments)
  - [issueCustomFieldConfigurationApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-configuration--apps-/#api-group-issue-custom-field-configuration--apps-)
  - [issueCommentProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comment-properties/#api-group-issue-comment-properties)
  - [issueFields](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-group-issue-fields)
  - [issueFieldConfigurations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-field-configurations/#api-group-issue-field-configurations)
  - [issueCustomFieldContexts](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-contexts/#api-group-issue-custom-field-contexts)
  - [issueCustomFieldOptions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options/#api-group-issue-custom-field-options)
  - [issueCustomFieldOptionsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-options--apps-/#api-group-issue-custom-field-options--apps-)
  - [issueCustomFieldValuesApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-values--apps-/#api-group-issue-custom-field-values--apps-)
  - [issueLinks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-links/#api-group-issue-links)
  - [issueLinkTypes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-link-types/#api-group-issue-link-types)
  - [issueNavigatorSettings](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-navigator-settings/#api-group-issue-navigator-settings)
  - [issueNotificationSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-notification-schemes/#api-group-issue-notification-schemes)
  - [issuePriorities](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-priorities/#api-group-issue-priorities)
  - [issueProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-properties/#api-group-issue-properties)
  - [issueRemoteLinks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-remote-links/#api-group-issue-remote-links)
  - [issueResolutions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-resolutions/#api-group-issue-resolutions)
  - [issueSearch](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-search/#api-group-issue-search)
  - [issueSecurityLevel](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-level/#api-group-issue-security-level)
  - [issueSecuritySchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-schemes/#api-group-issue-security-schemes)
  - [issueTypes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-types/#api-group-issue-types)
  - [issueTypeSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-schemes/#api-group-issue-type-schemes)
  - [issueTypeScreenSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-screen-schemes/#api-group-issue-type-screen-schemes)
  - [issueTypeProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-type-properties/#api-group-issue-type-properties)
  - [issueVotes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-votes/#api-group-issue-votes)
  - [issueWatchers](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-watchers/#api-group-issue-watchers)
  - [issueWorklogs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklogs/#api-group-issue-worklogs)
  - [issueWorklogProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-worklog-properties/#api-group-issue-worklog-properties)
  - [jiraExpressions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jira-expressions/#api-group-jira-expressions)
  - [jiraSettings](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jira-settings/#api-group-jira-settings)
  - [jql](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql/#api-group-jql)
  - [labels](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-labels/#api-group-labels)
  - [myself](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-myself/#api-group-myself)
  - [permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permissions/#api-group-permissions)
  - [permissionSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes/#api-group-permission-schemes)
  - [projects](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects/#api-group-projects)
  - [projectAvatars](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-avatars/#api-group-project-avatars)
  - [projectCategories](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-categories/#api-group-project-categories)
  - [projectComponents](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-components/#api-group-project-components)
  - [projectEmail](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-email/#api-group-project-email)
  - [projectFeatures](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-features/#api-group-project-features)
  - [projectKeyAndNameValidation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-key-and-name-validation/#api-group-project-key-and-name-validation)
  - [projectPermissionSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-permission-schemes/#api-group-project-permission-schemes)
  - [projectProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-properties/#api-group-project-properties)
  - [projectRoles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-roles/#api-group-project-roles)
  - [projectRoleActors](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-role-actors/#api-group-project-role-actors)
  - [projectTypes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-types/#api-group-project-types)
  - [projectVersions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-versions/#api-group-project-versions)
  - [screens](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screens/#api-group-screens)
  - [screenTabs](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tabs/#api-group-screen-tabs)
  - [screenTabFields](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-tab-fields/#api-group-screen-tab-fields)
  - [screenSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-screen-schemes/#api-group-screen-schemes)
  - [serverInfo](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-server-info/#api-group-server-info)
  - [tasks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-group-tasks)
  - [timeTracking](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-time-tracking/#api-group-time-tracking)
  - [users](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-users/#api-group-users)
  - [userProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-properties/#api-group-user-properties)
  - [userSearch](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-user-search/#api-group-user-search)
  - [webhooks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-webhooks/#api-group-webhooks)
  - [workflows](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflows/#api-group-workflows)
  - [workflowTransitionRules](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-rules/#api-group-workflow-transition-rules)
  - [workflowSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-schemes/#api-group-workflow-schemes)
  - [workflowSchemeProjectAssociations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-scheme-project-associations/#api-group-workflow-scheme-project-associations)
  - [workflowSchemeDrafts](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-scheme-drafts/#api-group-workflow-scheme-drafts)
  - [workflowStatuses](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-statuses/#api-group-workflow-statuses)
  - [workflowStatusCategories](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-status-categories/#api-group-workflow-status-categories)
  - [workflowTransitionProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-transition-properties/#api-group-workflow-transition-properties)
  - [appProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-properties/#api-group-app-properties)
  - [dynamicModules](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dynamic-modules/#api-group-dynamic-modules)

The name of the methods is the name of the endpoint in the group without spaces and in `camelCase`.

The parameters depend on the specific endpoint. For more information, [see here](https://mrrefactoring.github.io/jira.js/).

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

* [Confluence.js](https://github.com/MrRefactoring/confluence.js) - confluence.js is a powerful Node.JS / Browser module that allows you to interact with the Confluence API very easily
* [Trello.js](https://github.com/MrRefactoring/trello.js) - JavaScript / TypeScript library for Node.JS and browsers to easily interact with Atlassian Trello API

## License

Distributed under the MIT License. See `LICENSE` for more information.
