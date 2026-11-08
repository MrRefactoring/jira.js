import { DevelopmentStatusDetailSchema, type DevelopmentStatusDetail } from '../models/developmentStatusDetail';
import type { GetIssueDevelopmentStatusDetail } from '../parameters/getIssueDevelopmentStatusDetail';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns development information associated with an issue. Uses the internal Jira Software Data Center Development
 * panel API, whose contract may change between Jira versions and integrations. Integration-specific response fields are
 * preserved. See [Atlassian development detail
 * examples](https://support.atlassian.com/jira/kb/how-to-retrieve-pull-request-and-bitbucket-repo-and-branch-information-from-an-issue-using-rest-api/)
 * and [a repository
 * response](https://support.atlassian.com/jira/kb/access-git-repo-commit-data-via-jira-rest-api-in-development-panel-data/).
 */
export async function getIssueDevelopmentStatusDetail(
  client: Client,
  parameters: GetIssueDevelopmentStatusDetail,
  options?: RequestOptions,
): Promise<DevelopmentStatusDetail> {
  const config: SendRequestOptions<DevelopmentStatusDetail> = {
    url: '/rest/dev-status/1.0/issue/detail',
    method: 'GET',
    searchParams: {
      issueId: parameters.issueId,
      applicationType: parameters.applicationType,
      dataType: parameters.dataType,
    },
    schema: DevelopmentStatusDetailSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
