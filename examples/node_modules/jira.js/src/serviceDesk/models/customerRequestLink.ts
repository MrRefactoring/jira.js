export interface CustomerRequestLink {
  self?: string;
  /** REST API URL for the request. */
  jiraRest?: string;
  /** Web URL for the request. */
  web?: string;
  /** Jira agent view URL for the request. */
  agent?: string;
}
