<div align="center">
  <img alt="Jira.js logo" src="https://bad37fb3-cb50-4e0b-9035-a3e09e8afb3b.selstorage.ru/jira.js%2Flogo.svg"/>

  <a href="https://www.npmjs.com/package/jira.js" target="_blank" rel="noopener noreferrer"><img alt="NPM version" src="https://img.shields.io/npm/v/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/jira.js" target="_blank" rel="noopener noreferrer"><img alt="NPM downloads per month" src="https://img.shields.io/npm/dm/jira.js.svg?maxAge=3600&style=flat-square" /></a>
  <a href="https://github.com/MrRefactoring/jira.js" target="_blank" rel="noopener noreferrer"><img alt="build status" src="https://img.shields.io/github/actions/workflow/status/mrrefactoring/jira.js/.github/workflows/ci.yaml?branch=master&style=flat-square"></a>
  <a href="https://github.com/mrrefactoring/jira.js/blob/develop/LICENSE" target="_blank" rel="noopener noreferrer"><img alt="license" src="https://img.shields.io/github/license/mrrefactoring/jira.js?color=green&style=flat-square"/></a>
  <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-Ready-blue?style=flat-square&logo=typescript" /></a>
  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-20%2B-green?style=flat-square&logo=node.js" /></a>

  <span>JavaScript / TypeScript library for Node.js and browsers to interact with Atlassian Jira APIs</span>
</div>

## About

**Jira.js** is a powerful, production-ready [Node.js](https://nodejs.org/) and browser-compatible TypeScript library that provides seamless interaction with Atlassian Jira Cloud APIs. This npm package offers comprehensive support for:

- **[Jira Cloud REST API v2/v3](https://developer.atlassian.com/cloud/jira/platform/rest/)** - Complete platform API coverage
- **[Jira Agile Cloud API](https://developer.atlassian.com/cloud/jira/software/rest/intro/)** - Sprint, board, and backlog management
- **[Jira Service Desk Cloud API](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/)** - Service desk operations

### Key Features

- ✅ **Type-Safe**: Full TypeScript support with comprehensive type definitions and IntelliSense
- ✅ **Tree-Shakable**: Optimize bundle size by importing only what you need (perfect for browser apps)
- ✅ **Universal**: Works in Node.js (v20+) and modern browsers with full ESM/CJS support
- ✅ **Complete Coverage**: Nearly 100% of Jira Cloud REST API v2/v3, Agile, and Service Desk APIs
- ✅ **Well Documented**: Extensive JSDoc, API reference, and code examples
- ✅ **Modern Stack**: Built with TypeScript, supports ES Modules and CommonJS
- ✅ **Actively Maintained**: Regular updates with new Jira API features and bug fixes
- ✅ **Production Ready**: Used by thousands of developers in production environments

Perfect for building Jira integrations, automation tools, webhooks, CI/CD pipelines, custom Jira applications, and browser-based Jira management tools.

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

Install the Jira.js npm package using your preferred package manager. **Requires Node.js 20.0.0 or newer.**

```bash
# Using npm
npm install jira.js

# Using yarn
yarn add jira.js

# Using pnpm
pnpm add jira.js
```

**TypeScript users**: Type definitions are included - no additional `@types` package needed!

### Quick Example

Get started with Jira.js in under 5 minutes. This example shows how to create a Jira issue using the TypeScript client:

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

📚 **Full API reference, guides, and examples** available at:
**[https://mrrefactoring.github.io/jira.js/](https://mrrefactoring.github.io/jira.js/)**

The documentation includes:
- Complete API reference for all endpoints
- TypeScript examples and code samples
- Authentication guides
- Error handling patterns
- Best practices and tips

## Supported APIs

Jira.js provides comprehensive support for all major Jira Cloud APIs:

- **Jira Platform REST API v2**: Legacy API endpoints for projects, issues, users, and more
- **Jira Platform REST API v3**: Modern API with enhanced features and improved performance
- **Jira Software (Agile) API**: Sprint management, boards, backlogs, and agile workflows
- **Jira Service Desk API**: Service desk operations, customer management, and request handling

All APIs are fully typed with TypeScript definitions, making development faster and safer.

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

  - [api](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-other-operations/#api-group-other-operations)
  - [announcementBanner](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-announcement-banner/#api-group-announcement-banner)
  - [appDataPolicy](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-data-policies/#api-group-app-data-policies)
  - [applicationRoles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-application-roles/#api-group-application-roles)
  - [appMigration](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-app-migration/#api-group-app-migration)
  - [auditRecords](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-audit-records/#api-group-audit-records)
  - [avatars](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-avatars/#api-group-avatars)
  - [classificationLevels](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-classification-levels/#api-group-classification-levels)
  - [dashboards](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dashboards/#api-group-dashboards)
  - [filters](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filters/#api-group-filters)
  - [fieldSchemes](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-field-schemes/#api-group-field-schemes)
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
  - [issueRedaction](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-redaction/#api-group-issue-redaction)
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
  - [migrationOfConnectModulesToForge](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-migration-of-connect-modules-to-forge/#api-group-migration-of-connect-modules-to-forge)
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

## Tree Shaking & Bundle Optimization

Jira.js supports tree shaking to minimize your bundle size. Import only the modules you need:

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

**Benefits:**
- Smaller bundle sizes for browser applications
- Faster load times
- Better performance in production

## Use Cases

Jira.js is perfect for:

- 🔄 **CI/CD Integration**: Automate issue creation and updates in your deployment pipelines
- 🤖 **Automation Scripts**: Build custom automation for Jira workflows and processes
- 📊 **Reporting & Analytics**: Extract and analyze Jira data for custom dashboards
- 🔗 **Webhook Handlers**: Process Jira webhooks and integrate with external systems
- 🛠️ **Custom Tools**: Build admin tools, migration scripts, and custom Jira applications
- 📱 **Browser Apps**: Create browser-based Jira management interfaces
- 🔌 **Third-Party Integrations**: Connect Jira with other services and platforms

## Common Questions

**Q: Does this work with Jira Server/Data Center?**  
A: No, Jira.js is designed specifically for Jira Cloud. For on-premise Jira, consider using the REST API directly.

**Q: Is TypeScript required?**  
A: No, but TypeScript is fully supported with comprehensive type definitions. You can use Jira.js with plain JavaScript too.

**Q: Can I use this in the browser?**  
A: Yes! Jira.js works in both Node.js and modern browsers. Make sure to handle CORS if calling Jira APIs from a browser.

**Q: How do I handle authentication?**  
A: Jira.js supports Basic Auth (email + API token) and OAuth 2.0. See the [Authentication](#authentication) section above.

## Other Products

Explore our other Atlassian integration libraries:
- [Confluence.js](https://github.com/MrRefactoring/confluence.js) - Interact with Confluence API
- [Trello.js](https://github.com/MrRefactoring/trello.js) - Trello API integration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT License © MrRefactoring  
See [LICENSE](https://github.com/mrrefactoring/jira.js/blob/develop/LICENSE) for details.
