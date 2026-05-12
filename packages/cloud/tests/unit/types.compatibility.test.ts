/**
 * Type-level compatibility tests for @jira.js/cloud public API.
 *
 * Guards against:
 * - createCloudClient signature changes
 * - CloudClient namespace removal/renaming
 * - Critical method removal from namespaces (issues, projects, etc.)
 * - Return type regressions on high-usage methods
 *
 * Rules:
 * - Every top-level namespace on CloudClient must appear in the namespace-presence test.
 * - Each governance-critical method must have an explicit type assertion.
 * - @ts-expect-error marks intentional negative assertions.
 */
import { describe, expectTypeOf, it } from 'vitest';
import type { ClientConfig } from '@jira.js/base';
import { createCloudClient, type CloudClient } from '../../src/createCloudClient';

describe('@jira.js/cloud — createCloudClient type shape', () => {
  it('createCloudClient accepts ClientConfig', () => {
    expectTypeOf(createCloudClient).parameters.toEqualTypeOf<[ClientConfig]>();
  });

  it('createCloudClient returns CloudClient', () => {
    expectTypeOf(createCloudClient).returns.toMatchTypeOf<CloudClient>();
  });

  it('CloudClient is the return type of createCloudClient', () => {
    type Direct = ReturnType<typeof createCloudClient>;
    expectTypeOf<Direct>().toMatchTypeOf<CloudClient>();
  });
});

describe('@jira.js/cloud — CloudClient namespace presence', () => {
  it('issues namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('issues');
  });

  it('projects namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('projects');
  });

  it('issueComments namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('issueComments');
  });

  it('issueWorklogs namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('issueWorklogs');
  });

  it('issueSearch namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('issueSearch');
  });

  it('users namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('users');
  });

  it('groups namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('groups');
  });

  it('issueFields namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('issueFields');
  });

  it('issueTypes namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('issueTypes');
  });

  it('workflows namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('workflows');
  });

  it('workflowSchemes namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('workflowSchemes');
  });

  it('permissions namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('permissions');
  });

  it('permissionSchemes namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('permissionSchemes');
  });

  it('screens namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('screens');
  });

  it('dashboards namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('dashboards');
  });

  it('filters namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('filters');
  });

  it('serverInfo namespace exists', () => {
    expectTypeOf<CloudClient>().toHaveProperty('serverInfo');
  });
});

describe('@jira.js/cloud — issues namespace method signatures', () => {
  type IssuesNS = CloudClient['issues'];

  it('issues.getIssue is a function', () => {
    expectTypeOf<IssuesNS['getIssue']>().toBeFunction();
  });

  it('issues.createIssue is a function', () => {
    expectTypeOf<IssuesNS['createIssue']>().toBeFunction();
  });

  it('issues.editIssue is a function', () => {
    expectTypeOf<IssuesNS['editIssue']>().toBeFunction();
  });

  it('issues.deleteIssue is a function', () => {
    expectTypeOf<IssuesNS['deleteIssue']>().toBeFunction();
  });

  it('issues.assignIssue is a function', () => {
    expectTypeOf<IssuesNS['assignIssue']>().toBeFunction();
  });

  it('issues.getTransitions is a function', () => {
    expectTypeOf<IssuesNS['getTransitions']>().toBeFunction();
  });

  it('issues.doTransition is a function', () => {
    expectTypeOf<IssuesNS['doTransition']>().toBeFunction();
  });

  it('issues.getIssue returns a Promise', () => {
    type Result = ReturnType<IssuesNS['getIssue']>;
    expectTypeOf<Result>().toMatchTypeOf<Promise<unknown>>();
  });

  it('issues.createIssue returns a Promise', () => {
    type Result = ReturnType<IssuesNS['createIssue']>;
    expectTypeOf<Result>().toMatchTypeOf<Promise<unknown>>();
  });
});

describe('@jira.js/cloud — projects namespace method signatures', () => {
  type ProjectsNS = CloudClient['projects'];

  it('projects.getProject is a function', () => {
    expectTypeOf<ProjectsNS['getProject']>().toBeFunction();
  });

  it('projects.createProject is a function', () => {
    expectTypeOf<ProjectsNS['createProject']>().toBeFunction();
  });

  it('projects.updateProject is a function', () => {
    expectTypeOf<ProjectsNS['updateProject']>().toBeFunction();
  });

  it('projects.deleteProject is a function', () => {
    expectTypeOf<ProjectsNS['deleteProject']>().toBeFunction();
  });

  it('projects.searchProjects is a function', () => {
    expectTypeOf<ProjectsNS['searchProjects']>().toBeFunction();
  });

  it('projects.getProject returns a Promise', () => {
    type Result = ReturnType<ProjectsNS['getProject']>;
    expectTypeOf<Result>().toMatchTypeOf<Promise<unknown>>();
  });
});

describe('@jira.js/cloud — issueSearch namespace method signatures', () => {
  type SearchNS = CloudClient['issueSearch'];

  it('issueSearch.searchAndReconsileIssuesUsingJql is a function', () => {
    expectTypeOf<SearchNS['searchAndReconsileIssuesUsingJql']>().toBeFunction();
  });

  it('issueSearch.countIssues is a function', () => {
    expectTypeOf<SearchNS['countIssues']>().toBeFunction();
  });
});

describe('@jira.js/cloud — issueComments namespace method signatures', () => {
  type CommentsNS = CloudClient['issueComments'];

  it('issueComments.addComment is a function', () => {
    expectTypeOf<CommentsNS['addComment']>().toBeFunction();
  });

  it('issueComments.getComments is a function', () => {
    expectTypeOf<CommentsNS['getComments']>().toBeFunction();
  });

  it('issueComments.updateComment is a function', () => {
    expectTypeOf<CommentsNS['updateComment']>().toBeFunction();
  });

  it('issueComments.deleteComment is a function', () => {
    expectTypeOf<CommentsNS['deleteComment']>().toBeFunction();
  });
});

describe('@jira.js/cloud — compatibility: CloudClient is not assignable from plain object', () => {
  it('CloudClient is not empty — has required namespace properties', () => {
    // {} should not satisfy CloudClient (it has many required properties)
    // @ts-expect-error — plain empty object cannot be CloudClient
    const _bad: CloudClient = {};
    void _bad;
  });
});
