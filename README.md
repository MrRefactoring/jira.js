<div align="center">
  <img alt="Jira.js logo" src="https://bad37fb3-cb50-4e0b-9035-a3e09e8afb3b.selstorage.ru/jira.js%2Flogo.svg"/>

  <a href="https://www.npmjs.com/package/jira.js" target="_blank" rel="noopener noreferrer"><img alt="NPM version" src="https://img.shields.io/npm/v/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/jira.js" target="_blank" rel="noopener noreferrer"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://github.com/MrRefactoring/jira.js" target="_blank" rel="noopener noreferrer"><img alt="build status" src="https://img.shields.io/github/actions/workflow/status/mrrefactoring/jira.js/.github/workflows/ci.yaml?branch=master&style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/jira.js/blob/develop/LICENSE" target="_blank" rel="noopener noreferrer"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/jira.js?color=green&style=flat-square"/></a>

  <span>JavaScript / TypeScript library for Node.js and browsers to interact with Atlassian Jira APIs</span>
</div>

## About

Jira.js is a powerful [Node.js](https://nodejs.org/) and browser-compatible module that provides seamless interaction with:
- [Jira Cloud API](https://developer.atlassian.com/cloud/jira/platform/rest/)
- [Jira Agile Cloud API](https://developer.atlassian.com/cloud/jira/software/rest/intro/)
- [Jira ServiceDesk Cloud API](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/)

Designed for usability, consistency, and performance, it covers nearly 100% of Jira APIs and stays updated with new features.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Quick Example](#quick-example)
- [Documentation](#documentation)
- [Usage](#usage)
  - [Authentication](#authentication)
    - [Email and API Token](#email-and-api-token)
    - [OAuth 2.0](#oauth-20)
  - [Error Handling](#error-handling)
  - [API Structure](#api-structure)
- [Tree Shaking](#tree-shaking)
- [Other Products](#other-products)
- [License](#license)

## Getting Started

### Installation

**Requires Node.js 20.0.0 or newer.**

```bash
# Using npm
npm install jira.js

# Using yarn
yarn add jira.js

# Using pnpm
pnpm add jira.js
```

### Quick Example

Create your first Jira issue in under 5 minutes:

```typescript
import { Version3Client } from 'jira.js';

const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: {
      email: 'your@email.com',
      apiToken: 'YOUR_API_TOKEN', // Create one: https://id.atlassian.com/manage-profile/security/api-tokens
    },
  },
});

async function createIssue() {
  const project = await client.projects.getProject({ projectIdOrKey: 'Your project id or key' });

  const newIssue = await client.issues.createIssue({
    fields: {
      summary: 'Hello Jira.js!',
      issuetype: { name: 'Task' },
      project: { key: project.key },
    },
  });

  console.log(`Issue created: ${newIssue.id}`);
}

createIssue();
```

## Documentation

Full API reference and guides available at:
[https://mrrefactoring.github.io/jira.js/](https://mrrefactoring.github.io/jira.js/)

## Usage

### Authentication

#### Email and API Token

1. Create an API token: [https://id.atlassian.com/manage-profile/security/api-tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
2. Configure the client:

```typescript
const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    basic: { email: 'YOUR@EMAIL.ORG', apiToken: 'YOUR_API_TOKEN' },
  },
});
```

#### OAuth 2.0

Only authorization code grants are supported. Implement your own token acquisition flow using Atlassian's [OAuth 2.0 documentation](https://developer.atlassian.com/cloud/jira/platform/oauth-2-3lo-apps/).

```typescript
const client = new Version3Client({
  host: 'https://your-domain.atlassian.net',
  authentication: {
    oauth2: { accessToken: 'YOUR_ACCESS_TOKEN' },
  },
});
```

### Error Handling

Errors are categorized as:
- `HttpException`: Server responded with an error (includes parsed error details)
- `AxiosError`: Network/configuration issues (e.g., timeouts)

**Example handling:**

```typescript
try {
  await client.issues.getIssue({ issueIdOrKey: 'INVALID-123' });
} catch (error) {
  if (error instanceof HttpException) {
    console.error('Server error:', error.message);
    console.debug('Response headers:', error.cause.response?.headers);
  } else if (error instanceof AxiosError) {
    console.error('Network error:', error.code);
  } else {
    console.error('Unexpected error:', error);
  }
}
```

### API Structure

Access endpoints using the `client.<group>.<method>` pattern:

```typescript
// Get all projects
const projects = await client.projects.searchProjects();

// Create a sprint
const sprint = await client.sprint.createSprint({ name: 'Q4 Sprint' });
```

**Available API groups:**
<details>
  <summary>🔽 Agile Cloud API</summary>

  - [backlog](https://developer.atlassian.com/cloud/jira/software/rest/api-group-backlog/#api-group-backlog)
  - [board](https://developer.atlassian.com/cloud/jira/software/rest/api-group-board/#api-group-board)
  - [builds](https://developer.atlassian.com/cloud/jira/software/rest/api-group-builds/#api-group-builds)
  - [deployments](https://developer.atlassian.com/cloud/jira/software/rest/api-group-deployments/#api-group-deployments)
  - [developmentInformation](https://developer.atlassian.com/cloud/jira/software/rest/api-group-development-information/#api-group-development-information)
  - [devopsComponents](https://developer.atlassian.com/cloud/jira/software/rest/api-group-devops-components/#api-group-devops-components)
  - [epic](https://developer.atlassian.com/cloud/jira/software/rest/api-group-epic/#api-group-epic)
  - [featureFlags](https://developer.atlassian.com/cloud/jira/software/rest/api-group-feature-flags/#api-group-feature-flags)
  - [issue](https://developer.atlassian.com/cloud/jira/software/rest/api-group-issue/#api-group-issue)
  - [operations](https://developer.atlassian.com/cloud/jira/software/rest/api-group-operations/#api-group-operations)
  - [remoteLinks](https://developer.atlassian.com/cloud/jira/software/rest/api-group-remote-links/#api-group-remote-links)
  - [securityInformation](https://developer.atlassian.com/cloud/jira/software/rest/api-group-security-information/#api-group-security-information)
  - [sprint](https://developer.atlassian.com/cloud/jira/software/rest/api-group-sprint/#api-group-sprint)
</details>

<details>
  <summary>🔽 Core REST API (v2/v3)</summary>

  - [announcementBanner](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-announcement-banner/#api-group-announcement-banner)
  - [appDataPolicy](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-data-policies/#api-group-app-data-policies)
  - [applicationRoles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-application-roles/#api-group-application-roles)
  - [appMigration](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-migration/#api-group-app-migration)
  - [auditRecords](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records)
  - [avatars](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-group-avatars)
  - [classificationLevels](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-classification-levels/#api-group-classification-levels)
  - [dashboards](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dashboards/#api-group-dashboards)
  - [filters](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filters/#api-group-filters)
  - [filterSharing](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filter-sharing/#api-group-filter-sharing)
  - [groupAndUserPicker](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-group-and-user-picker/#api-group-group-and-user-picker)
  - [groups](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-groups/#api-group-groups)
  - [instanceInformation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-instance-information/#api-group-instance-information)
  - [issues](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issues/#api-group-issues)
  - [issueAttachments](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-attachments/#api-group-issue-attachments)
  - [issueBulkOperations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-bulk-operations/#api-group-issue-bulk-operations)
  - [issueComments](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-comments/#api-group-issue-comments)
  - [issueCustomFieldAssociations](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-custom-field-associations/#api-group-issue-custom-field-associations)
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
  - [jqlFunctionsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-jql-functions--apps-/#api-group-jql-functions--apps-)
  - [labels](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-labels/#api-group-labels)
  - [licenseMetrics](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-license-metrics/#api-group-license-metrics)
  - [myself](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-myself/#api-group-myself)
  - [permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permissions/#api-group-permissions)
  - [permissionSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes/#api-group-permission-schemes)
  - [plans](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-plans/#api-group-plans)
  - [prioritySchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-priority-schemes/#api-group-priority-schemes)
  - [projects](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-projects/#api-group-projects)
  - [projectTemplates](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-templates/#api-group-project-templates)
  - [projectAvatars](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-avatars/#api-group-project-avatars)
  - [projectCategories](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-categories/#api-group-project-categories)
  - [projectClassificationLevels](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project-classification-levels/#api-group-project-classification-levels)
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
  - [serviceRegistry](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-service-registry/#api-group-service-registry)
  - [status](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-status/#api-group-status)
  - [tasks](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-tasks/#api-group-tasks)
  - [teamsInPlan](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-teams-in-plan/#api-group-teams-in-plan)
  - [timeTracking](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-time-tracking/#api-group-time-tracking)
  - [uiModificationsApps](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-ui-modifications--apps-/#api-group-ui-modifications--apps-)
  - [users](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-users/#api-group-users)
  - [userNavProperties](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-other-operations/#api-group-other-operations)
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
  <summary>🔽 Service Desk API</summary>

  - [customer](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-customer/)
  - [info](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-info/#api-group-info)
  - [insight](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-insight/#api-group-insight)
  - [knowledgeBase](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-knowledgebase/#api-group-knowledgebase)
  - [organizations](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-organization/#api-group-organization)
  - [request](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-request/#api-group-request)
  - [requestType](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-requesttype/#api-group-requesttype)
  - [serviceDesk](https://developer.atlassian.com/cloud/jira/service-desk/rest/api-group-servicedesk/#api-group-servicedesk)
</details>

See full group list in [original documentation](#usage).

## Tree Shaking

Optimize bundle size by importing only needed modules:

```typescript
// custom-client.ts
import { BaseClient } from 'jira.js';
import { Issues } from 'jira.js/version3';
import { Board } from 'jira.js/agile';

export class CustomClient extends BaseClient {
  issues = new Issues(this);
  board = new Board(this);
}

// Usage
const client = new CustomClient({ /* config */ });
await client.issues.getIssue({ issueIdOrKey: 'KEY-1' });
```

## Other Products

Explore our other Atlassian integration libraries:
- [Confluence.js](https://github.com/MrRefactoring/confluence.js) - Interact with Confluence API
- [Trello.js](https://github.com/MrRefactoring/trello.js) - Trello API integration

## License

MIT License © MrRefactoring
See [LICENSE](https://github.com/mrrefactoring/jira.js/blob/develop/LICENSE) for details.
