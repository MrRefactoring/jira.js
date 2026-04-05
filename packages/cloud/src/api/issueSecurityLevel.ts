import {
  PageIssueSecurityLevelMemberSchema,
  type PageIssueSecurityLevelMember,
} from '#/models/pageIssueSecurityLevelMember';
import { SecurityLevelSchema, type SecurityLevel } from '#/models/securityLevel';
import { type GetIssueSecurityLevelMembers } from '#/parameters/getIssueSecurityLevelMembers';
import { type GetIssueSecurityLevel } from '#/parameters/getIssueSecurityLevel';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns issue security level members.
 *
 * Only issue security level members in context of classic projects are returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function getIssueSecurityLevelMembers(
  client: Client,
  parameters: GetIssueSecurityLevelMembers,
): Promise<PageIssueSecurityLevelMember> {
  const config: SendRequestOptions<PageIssueSecurityLevelMember> = {
    url: `/rest/api/3/issuesecurityschemes/${parameters.issueSecuritySchemeId}/members`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      issueSecurityLevelId: parameters.issueSecurityLevelId,
      expand: parameters.expand,
    },
    schema: PageIssueSecurityLevelMemberSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns details of an issue security level.
 *
 * Use [Get issue security
 * scheme](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-security-schemes/#api-rest-api-3-issuesecurityschemes-id-get)
 * to obtain the IDs of issue security levels associated with the issue security scheme.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getIssueSecurityLevel(client: Client, parameters: GetIssueSecurityLevel): Promise<SecurityLevel> {
  const config: SendRequestOptions<SecurityLevel> = {
    url: `/rest/api/3/securitylevel/${parameters.id}`,
    method: 'GET',
    schema: SecurityLevelSchema,
  };

  return await client.sendRequest(config);
}
