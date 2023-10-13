export interface SubmitWorkspaces {
  /**
   * The IDs of Security Workspaces to link to this Jira site. These must follow this regex pattern:
   * `[a-zA-Z0-9\\-_.~@:{}=]+(\/[a-zA-Z0-9\\-_.~@:{}=]+)*`
   */
  workspaceIds: string[];
}
