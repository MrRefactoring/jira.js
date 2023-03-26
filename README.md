<div align="center">
  <img alt="Jira.js logo" src="https://svgshare.com/i/T6B.svg"/>

  <a href="https://www.npmjs.com/package/jira.js"><img alt="NPM version" src="https://img.shields.io/npm/v/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/jira.js"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://github.com/MrRefactoring/jira.js"><img alt="build status" src="https://img.shields.io/github/actions/workflow/status/mrrefactoring/jira.js/.github/workflows/ci.yaml?branch=master&style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/jira.js/blob/develop/LICENSE"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/jira.js?color=green&style=flat-square"/></a>

  <span>JavaScript / TypeScript library for Node.JS and browsers to easily interact with Atlassian Jira API</span>
</div>

## About

jira.js is a powerful [Node.JS](https://nodejs.org/) / Browser module that allows you to interact with the [Jira Cloud API](https://developer.atlassian.com/cloud/jira/platform/rest/), [Jira Agile Cloud API](https://developer.atlassian.com/cloud/jira/software/rest/intro/), [Jira ServiceDesk Cloud API](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/) very easily.

Usability, consistency, and performance are key focuses of jira.js, and it also has nearly 100% coverage of the Jira API. It receives new Jira features shortly after they arrive in the API.

## Table of contents

- [Installation](#installation)
- [Documentation](#documentation)
- [Deprecation warnings](#deprecation-warnings)
- [Usage](#usage)
  - [Authentication](#authentication)
    - [Basic](#basic-authentication)
    - [OAuth](#oauth)
    - [OAuth 2.0](#oauth-20)
    - [JWT](#jwt)
    - [Personal access token](#personal-access-token)
  - [Example and using algorithm](#example-and-using-algorithm)
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

## Documentation

You can find the documentation [here](https://mrrefactoring.github.io/jira.js/).

## Deprecation warnings

1.  Deprecation warning: New error handling mechanism added. Please use `newErrorHandling: true` in config
> We are using a new error handling mechanism (instead throwing raw axios error will be showed API response). For enable it, make following changes in your config:
> ```ts
> const client = new Version3Client({
>   host: '...',
>   newErrorHandling: true, // This flag enable new error handling.
> });
>
> // Examples
>
> /** Old error handling **/
>
> const client = new Version3Client({ host: '...' });
>
> client.issues.createIssue();
>
> // Output:
> // {
> //   code: 'ERR_BAD_REQUEST',
> //   config: { a lot of stuff here },
> //   request: { a lot of stuff here },
> //   response: {
> //     a lot of stuff here
> //     data: {
> //       errorMessages: [],
> //       errors: { project: 'Specify a valid project ID or key' }
> //     },
> //     a lot of stuff here
> //   },
> //   a lot of stuff here
> // }
>
> /** New error handling **/
>
> const client = new Version3Client({ host: '...', newErrorHandling: true });
>
> client.issues.createIssue();
>
> // Output:
> // {
> //   errorMessages: [],
> //   errors: { project: 'Specify a valid project ID or key' }
> // }
> ```


## Usage

#### Authentication

There are several types of authentication to gain access to the Jira API. Let's take a look at a few of them below

##### [Basic authentication](https://developer.atlassian.com/cloud/jira/platform/basic-auth-for-rest-apis/)

Basic authentication allows you to log in with credentials. You can use username and password, but this login method is not supported in the online version and most standalone versions, so it's better to release API Token, read how to do it [here](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/), and use it together with email.

Username and password example:

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
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
import { Version3Client } from 'jira.js';

const client = new Version3Client({
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
import { Version3Client } from 'jira.js';

const client = new Version3Client({
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
import { Version3Client } from 'jira.js';

const client = new Version3Client({
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
import { Version3Client } from 'jira.js';

const client = new Version3Client({
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

##### [Personal access token](https://confluence.atlassian.com/enterprise/using-personal-access-tokens-1026032365.html)

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    personalAccessToken: 'secrectPAT',
  },
});
```

#### Example and using algorithm

1. Example

You can find out [examples project here](https://github.com/MrRefactoring/jira.js/tree/master/examples) or perform the following actions:

   - Change the `host`, `email` and `apiToken` to your data
   - Run script

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host,
  authentication: {
    basic: {
      email,
      apiToken,
    },
  },
  newErrorHandling: true,
});

async function main() {
  const projects = await client.projects.getAllProjects();

  if (projects.length) {
    const project = projects[0];

    const { id } = await client.issues.createIssue({
      fields: {
        summary: 'My first issue',
        issuetype: {
          name: 'Task'
        },
        project: {
          key: project.key,
        },
      }
    });

    const issue = await client.issues.getIssue({ issueIdOrKey: id });

    console.log(`Issue '${issue.fields.summary}' was successfully added to '${project.name}' project.`);
  } else {
    const myself = await client.myself.getCurrentUser();

    const { id } = await client.projects.createProject({
      key: 'PROJECT',
      name: "My Project",
      leadAccountId: myself.accountId,
      projectTypeKey: 'software',
    });

    const project = await client.projects.getProject({ projectIdOrKey: id.toString() });

    console.log(`Project '${project.name}' was successfully created.`);
  }
}

main();
```

2. The algorithm for using the library:

```typescript
client.<group>.<methodName>(parametersObject);
```

Available groups:
  <details>
    <summary>Agile Cloud API group</summary>

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
  - [securityInformation](https://developer.atlassian.com/cloud/jira/software/rest/api-group-security-information/#api-group-security-information)
  - [otherOperations](https://developer.atlassian.com/cloud/jira/software/rest/api-group-other-operations/#api-group-other-operations)
  </details>
  <details>
    <summary>Version 2 Cloud REST API group</summary>

  - [announcementBanner](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-announcement-banner/#api-group-announcement-banner)
  - [applicationRoles](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-application-roles/#api-group-application-roles)
  - [appMigration](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-app-migration/#api-group-app-migration)
  - [auditRecords](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-audit-records/#api-group-audit-records)
  - [avatars](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-avatars/#api-group-avatars)
  - [dashboards](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-dashboards/#api-group-dashboards)
  - [filters](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-filters/#api-group-filters)
  - [filterSharing](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-filter-sharing/#api-group-filter-sharing)
  - [groupAndUserPicker](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-group-and-user-picker/#api-group-group-and-user-picker)
  - [groups](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-groups/#api-group-groups)
  - [instanceInformation](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-instance-information/#api-group-instance-information)
  - [issues](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issues/#api-group-issues)
  - [issueAdjustmentsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-issue-adjustments--apps-/#api-group-issue-adjustments--apps-)
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
  - [licenseMetrics](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-license-metrics/#api-group-license-metrics)
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
  - [status](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-status/#api-group-status)
  - [tasks](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-tasks/#api-group-tasks)
  - [timeTracking](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-time-tracking/#api-group-time-tracking)
  - [uiModificationsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v2/api-group-ui-modifications--apps-/#api-group-ui-modifications--apps-)
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
  </details>
  <details>
    <summary>Version 3 Cloud REST API group</summary>

  - [announcementBanner](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-announcement-banner/#api-group-announcement-banner)
  - [applicationRoles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-application-roles/#api-group-application-roles)
  - [appMigration](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-migration/#api-group-app-migration)
  - [auditRecords](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records)
  - [avatars](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-group-avatars)
  - [dashboards](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dashboards/#api-group-dashboards)
  - [filters](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filters/#api-group-filters)
  - [filterSharing](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filter-sharing/#api-group-filter-sharing)
  - [groupAndUserPicker](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-group-and-user-picker/#api-group-group-and-user-picker)
  - [groups](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-groups/#api-group-groups)
  - [instanceInformation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-instance-information/#api-group-instance-information)
  - [issues](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-group-issues)
  - [issueAdjustmentsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-adjustments--apps-/#api-group-issue-adjustments--apps-)
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
  - [licenseMetrics](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-license-metrics/#api-group-license-metrics)
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
  - [status](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-status/#api-group-status)
  - [tasks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-group-tasks)
  - [timeTracking](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-time-tracking/#api-group-time-tracking)
  - [uiModificationsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-ui-modifications--apps-/#api-group-ui-modifications--apps-)
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
  </details>
  <details>
    <summary>Service Desk Cloud API group</summary>

  - [customer](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-customer/)
  - [info](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-info/#api-group-info)
  - [insight](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-insight/#api-group-insight)
  - [knowledgeBase](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-knowledgebase/#api-group-knowledgebase)
  - [organizations](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-organization/#api-group-organization)
  - [request](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-request/#api-group-request)
  - [requestType](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-requesttype/#api-group-requesttype)
  - [serviceDesk](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-group-servicedesk)
  </details>

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
