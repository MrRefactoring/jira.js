export interface GetRepository {
  /** The ID of repository to fetch */
  repositoryId: string;
  /** All requests must be signed with either a Connect JWT token or OAuth token for an on-premise integration that corresponds to an app installed in Jira. If the JWT token corresponds to a Connect app that does not define the jiraDevelopmentTool module it will be rejected with a 403. See https://developer.atlassian.com/blog/2015/01/understanding-jwt/ for more details about Connect JWT tokens. See https://developer.atlassian.com/cloud/jira/software/integrate-jsw-cloud-with-onpremises-tools/ for details about on-premise integrations. */
  Authorization: string;
}
