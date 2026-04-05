import { SubmittedBulkOperationSchema, type SubmittedBulkOperation } from '#/models/submittedBulkOperation';
import { BulkEditGetFieldsSchema, type BulkEditGetFields } from '#/models/bulkEditGetFields';
import {
  BulkTransitionGetAvailableTransitionsSchema,
  type BulkTransitionGetAvailableTransitions,
} from '#/models/bulkTransitionGetAvailableTransitions';
import { BulkOperationProgressSchema, type BulkOperationProgress } from '#/models/bulkOperationProgress';
import { type SubmitBulkDelete } from '#/parameters/submitBulkDelete';
import { type GetBulkEditableFields } from '#/parameters/getBulkEditableFields';
import { type SubmitBulkEdit } from '#/parameters/submitBulkEdit';
import { type SubmitBulkMove } from '#/parameters/submitBulkMove';
import { type GetAvailableTransitions } from '#/parameters/getAvailableTransitions';
import { type SubmitBulkTransition } from '#/parameters/submitBulkTransition';
import { type SubmitBulkUnwatch } from '#/parameters/submitBulkUnwatch';
import { type SubmitBulkWatch } from '#/parameters/submitBulkWatch';
import { type GetBulkOperationProgress } from '#/parameters/getBulkOperationProgress';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Use this API to submit a bulk delete request. You can delete up to 1,000 issues in a single operation.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - Global bulk change
 *   [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
 * - Delete [issues
 *   permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Delete-issues/)
 *   in all projects that contain the selected issues.
 * - Browse [project permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
 *   in all projects that contain the selected issues.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function submitBulkDelete(client: Client, parameters: SubmitBulkDelete): Promise<SubmittedBulkOperation> {
  const config: SendRequestOptions<SubmittedBulkOperation> = {
    url: '/rest/api/3/bulk/issues/delete',
    method: 'POST',
    body: {
      selectedIssueIdsOrKeys: parameters.selectedIssueIdsOrKeys,
      sendBulkNotification: parameters.sendBulkNotification,
    },
    schema: SubmittedBulkOperationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Use this API to get a list of fields visible to the user to perform bulk edit operations. You can pass single or
 * multiple issues in the query to get eligible editable fields. This API uses pagination to return responses,
 * delivering 50 fields at a time.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - Global bulk change
 *   [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
 * - Browse [project permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
 *   in all projects that contain the selected issues.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 * - Depending on the field, any field-specific permissions required to edit it.
 */
export async function getBulkEditableFields(
  client: Client,
  parameters: GetBulkEditableFields,
): Promise<BulkEditGetFields> {
  const config: SendRequestOptions<BulkEditGetFields> = {
    url: '/rest/api/3/bulk/issues/fields',
    method: 'GET',
    searchParams: {
      issueIdsOrKeys: parameters.issueIdsOrKeys,
      searchText: parameters.searchText,
      endingBefore: parameters.endingBefore,
      startingAfter: parameters.startingAfter,
    },
    schema: BulkEditGetFieldsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Use this API to submit a bulk edit request and simultaneously edit multiple issues. There are limits applied to the
 * number of issues and fields that can be edited. A single request can accommodate a maximum of 1000 issues (including
 * subtasks) and 200 fields.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - Global bulk change
 *   [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
 * - Browse [project permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
 *   in all projects that contain the selected issues.
 * - Edit [issues permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in
 *   all projects that contain the selected issues.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function submitBulkEdit(client: Client, parameters: SubmitBulkEdit): Promise<SubmittedBulkOperation> {
  const config: SendRequestOptions<SubmittedBulkOperation> = {
    url: '/rest/api/3/bulk/issues/fields',
    method: 'POST',
    body: {
      editedFieldsInput: parameters.editedFieldsInput,
      selectedActions: parameters.selectedActions,
      selectedIssueIdsOrKeys: parameters.selectedIssueIdsOrKeys,
      sendBulkNotification: parameters.sendBulkNotification,
    },
    schema: SubmittedBulkOperationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Use this API to submit a bulk issue move request. You can move multiple issues from multiple projects in a single
 * request, but they must all be moved to a single project, issue type, and parent. You can't move more than 1000 issues
 * (including subtasks) at once.
 *
 * #### Scenarios:
 *
 * This is an early version of the API and it doesn't have full feature parity with the Bulk Move UI experience.
 *
 * - Moving issue of type A to issue of type B in the same project or a different project: `SUPPORTED`
 * - Moving multiple issues of type A in one or more projects to multiple issues of type B in one of the source projects
 *   or a different project: `SUPPORTED`
 * - Moving issues of multiple issue types in one or more projects to issues of a single issue type in one of the source
 *   project or a different project: **`SUPPORTED`**\
 *   E.g. Moving issues of story and task issue types in project 1 and project 2 to issues of task issue type in project 3
 * - Moving a standard parent issue of type A with its multiple subtask issue types in one project to standard issue of
 *   type B and multiple subtask issue types in the same project or a different project: `SUPPORTED`
 * - Moving standard issues with their subtasks to a parent issue in the same project or a different project without
 *   losing their relation: `SUPPORTED`
 * - Moving an epic issue with its child issues to a different project without losing their relation: `SUPPORTED`\
 *   This usecase is **supported using multiple requests**. Move the epic in one request and then move the children in a
 *   separate request with target parent set to the epic issue id
 *
 *   (Alternatively, move them individually and stitch the relationship back with the Bulk Edit API)
 *
 * #### Limits applied to bulk issue moves:
 *
 * When using the bulk move, keep in mind that there are limits on the number of issues and fields you can include.
 *
 * - You can move up to 1,000 issues in a single operation, including any subtasks.
 * - The total combined number of fields across all issues must not exceed 1,500,000. For example, if each issue includes
 *   15,000 fields, then the maximum number of issues that can be moved is 100.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - Global bulk change
 *   [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
 * - Move [issues permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/) in
 *   source projects.
 * - Create [issues permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
 *   in destination projects.
 * - Browse [project permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
 *   in destination projects, if moving subtasks only.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function submitBulkMove(client: Client, parameters: SubmitBulkMove): Promise<SubmittedBulkOperation> {
  const config: SendRequestOptions<SubmittedBulkOperation> = {
    url: '/rest/api/3/bulk/issues/move',
    method: 'POST',
    body: {
      sendBulkNotification: parameters.sendBulkNotification,
      targetToSourcesMapping: parameters.targetToSourcesMapping,
    },
    schema: SubmittedBulkOperationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Use this API to retrieve a list of transitions available for the specified issues that can be used or bulk transition
 * operations. You can submit either single or multiple issues in the query to obtain the available transitions.
 *
 * The response will provide the available transitions for issues, organized by their respective workflows. **Only the
 * transitions that are common among the issues within that workflow and do not involve any additional field updates
 * will be included.** For bulk transitions that require additional field updates, please utilise the Jira Cloud UI.
 *
 * You can request available transitions for up to 1,000 issues in a single operation. This API uses pagination to
 * return responses, delivering 50 workflows at a time.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - Global bulk change
 *   [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
 * - Transition [issues
 *   permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Transition-issues/)
 *   in all projects that contain the selected issues.
 * - Browse [project permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
 *   in all projects that contain the selected issues.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function getAvailableTransitions(
  client: Client,
  parameters: GetAvailableTransitions,
): Promise<BulkTransitionGetAvailableTransitions> {
  const config: SendRequestOptions<BulkTransitionGetAvailableTransitions> = {
    url: '/rest/api/3/bulk/issues/transition',
    method: 'GET',
    searchParams: {
      issueIdsOrKeys: parameters.issueIdsOrKeys,
      endingBefore: parameters.endingBefore,
      startingAfter: parameters.startingAfter,
    },
    schema: BulkTransitionGetAvailableTransitionsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Use this API to submit a bulk issue status transition request. You can transition multiple issues, alongside with
 * their valid transition Ids. You can transition up to 1,000 issues in a single operation.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - Global bulk change
 *   [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
 * - Transition [issues
 *   permission](https://support.atlassian.com/jira-cloud-administration/docs/permissions-for-company-managed-projects/#Transition-issues/)
 *   in all projects that contain the selected issues.
 * - Browse [project permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
 *   in all projects that contain the selected issues.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function submitBulkTransition(
  client: Client,
  parameters: SubmitBulkTransition,
): Promise<SubmittedBulkOperation> {
  const config: SendRequestOptions<SubmittedBulkOperation> = {
    url: '/rest/api/3/bulk/issues/transition',
    method: 'POST',
    body: {
      bulkTransitionInputs: parameters.bulkTransitionInputs,
      sendBulkNotification: parameters.sendBulkNotification,
    },
    schema: SubmittedBulkOperationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Use this API to submit a bulk unwatch request. You can unwatch up to 1,000 issues in a single operation.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - Global bulk change
 *   [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
 * - Browse [project permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
 *   in all projects that contain the selected issues.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function submitBulkUnwatch(
  client: Client,
  parameters: SubmitBulkUnwatch,
): Promise<SubmittedBulkOperation> {
  const config: SendRequestOptions<SubmittedBulkOperation> = {
    url: '/rest/api/3/bulk/issues/unwatch',
    method: 'POST',
    body: {
      selectedIssueIdsOrKeys: parameters.selectedIssueIdsOrKeys,
    },
    schema: SubmittedBulkOperationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Use this API to submit a bulk watch request. You can watch up to 1,000 issues in a single operation.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - Global bulk change
 *   [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
 * - Browse [project permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-project-permissions/)
 *   in all projects that contain the selected issues.
 * - If [issue-level security](https://confluence.atlassian.com/x/J4lKLg) is configured, issue-level security permission
 *   to view the issue.
 */
export async function submitBulkWatch(client: Client, parameters: SubmitBulkWatch): Promise<SubmittedBulkOperation> {
  const config: SendRequestOptions<SubmittedBulkOperation> = {
    url: '/rest/api/3/bulk/issues/watch',
    method: 'POST',
    body: {
      selectedIssueIdsOrKeys: parameters.selectedIssueIdsOrKeys,
    },
    schema: SubmittedBulkOperationSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Use this to get the progress state for the specified bulk operation `taskId`.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 *
 * - Global bulk change
 *   [permission](https://support.atlassian.com/jira-cloud-administration/docs/manage-global-permissions/).
 *
 * If the task is running, this resource will return:
 *
 *     {
 *       "taskId": "10779",
 *       "status": "RUNNING",
 *       "progressPercent": 65,
 *       "submittedBy": { "accountId": "5b10a2844c20165700ede21g" },
 *       "created": 1690180055963,
 *       "started": 1690180056206,
 *       "updated": 169018005829
 *     }
 *
 * If the task has completed, then this resource will return:
 *
 *     {
 *       "processedAccessibleIssues": [10001, 10002],
 *       "created": 1709189449954,
 *       "progressPercent": 100,
 *       "started": 1709189450154,
 *       "status": "COMPLETE",
 *       "submittedBy": { "accountId": "5b10a2844c20165700ede21g" },
 *       "invalidOrInaccessibleIssueCount": 0,
 *       "taskId": "10000",
 *       "totalIssueCount": 2,
 *       "updated": 1709189450354
 *     }
 *
 * **Note:** You can view task progress for up to 14 days from creation.
 */
export async function getBulkOperationProgress(
  client: Client,
  parameters: GetBulkOperationProgress,
): Promise<BulkOperationProgress> {
  const config: SendRequestOptions<BulkOperationProgress> = {
    url: `/rest/api/3/bulk/queue/${parameters.taskId}`,
    method: 'GET',
    schema: BulkOperationProgressSchema,
  };

  return await client.sendRequest(config);
}
