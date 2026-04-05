import { IssueSchema, type Issue } from '#/models/issue';
import { GetIssueEstimationForBoardSchema, type GetIssueEstimationForBoard } from '#/models/getIssueEstimationForBoard';
import { EstimateIssueForBoardSchema, type EstimateIssueForBoard } from '#/models/estimateIssueForBoard';
import { type RankIssues } from '#/parameters/rankIssues';
import { type GetIssue } from '#/parameters/getIssue';
import { type GetIssueEstimationForBoard as GetIssueEstimationForBoardParameters } from '#/parameters/getIssueEstimationForBoard';
import { type EstimateIssueForBoard as EstimateIssueForBoardParameters } from '#/parameters/estimateIssueForBoard';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Moves (ranks) issues before or after a given issue. At most 50 issues may be ranked at once.
 *
 * This operation may fail for some issues, although this will be rare. In that case the 207 status code is returned for
 * the whole response and detailed information regarding each issue is available in the response body.
 *
 * If rankCustomFieldId is not defined, the default rank field will be used.
 */
export async function rankIssues(client: Client, parameters: RankIssues): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/agile/1.0/issue/rank',
    method: 'PUT',
    body: {
      issues: parameters.issues,
      rankAfterIssue: parameters.rankAfterIssue,
      rankBeforeIssue: parameters.rankBeforeIssue,
      rankCustomFieldId: parameters.rankCustomFieldId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Returns a single issue, for a given issue ID or issue key. Issues returned from this resource include Agile fields,
 * like sprint, closedSprints, flagged, and epic.
 */
export async function getIssue(client: Client, parameters: GetIssue): Promise<Issue> {
  const config: SendRequestOptions<Issue> = {
    url: `/rest/agile/1.0/issue/${parameters.issueIdOrKey}`,
    method: 'GET',
    searchParams: {
      fields: parameters.fields,
      expand: parameters.expand,
      updateHistory: parameters.updateHistory,
    },
    schema: IssueSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the estimation of the issue and a fieldId of the field that is used for it. `boardId` param is required. This
 * param determines which field will be updated on a issue.
 *
 * Original time internally stores and returns the estimation as a number of seconds.
 *
 * The field used for estimation on the given board can be obtained from [board configuration
 * resource](https://developer.atlassian.com/cloud/jira/software/rest/intro#agile/1.0/board-getConfiguration). More
 * information about the field are returned by [edit meta
 * resource](https://developer.atlassian.com/cloud/jira/software/rest/intro#api-rest-api-3-issue-getEditIssueMeta) or
 * [field resource](https://developer.atlassian.com/cloud/jira/software/rest/intro#api-rest-api-3-field-get).
 */
export async function getIssueEstimationForBoard(
  client: Client,
  parameters: GetIssueEstimationForBoardParameters,
): Promise<GetIssueEstimationForBoard> {
  const config: SendRequestOptions<GetIssueEstimationForBoard> = {
    url: `/rest/agile/1.0/issue/${parameters.issueIdOrKey}/estimation`,
    method: 'GET',
    searchParams: {
      boardId: parameters.boardId,
    },
    schema: GetIssueEstimationForBoardSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the estimation of the issue. boardId param is required. This param determines which field will be updated on
 * a issue.
 *
 * Note that this resource changes the estimation field of the issue regardless of appearance the field on the screen.
 *
 * Original time tracking estimation field accepts estimation in formats like "1w", "2d", "3h", "20m" or number which
 * represent number of minutes. However, internally the field stores and returns the estimation as a number of seconds.
 *
 * The field used for estimation on the given board can be obtained from [board configuration
 * resource](https://developer.atlassian.com/cloud/jira/software/rest/intro#agile/1.0/board-getConfiguration). More
 * information about the field are returned by [edit meta
 * resource](https://developer.atlassian.com/cloud/jira/software/rest/intro#api-rest-api-3-issue-issueIdOrKey-editmeta-get)
 * or [field resource](https://developer.atlassian.com/cloud/jira/software/rest/intro#api-rest-api-3-field-get).
 */
export async function estimateIssueForBoard(
  client: Client,
  parameters: EstimateIssueForBoardParameters,
): Promise<EstimateIssueForBoard> {
  const config: SendRequestOptions<EstimateIssueForBoard> = {
    url: `/rest/agile/1.0/issue/${parameters.issueIdOrKey}/estimation`,
    method: 'PUT',
    searchParams: {
      boardId: parameters.boardId,
    },
    body: {
      value: parameters.value,
    },
    schema: EstimateIssueForBoardSchema,
  };

  return await client.sendRequest(config);
}
