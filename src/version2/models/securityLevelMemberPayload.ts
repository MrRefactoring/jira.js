/**
 * The payload for creating a security level member. See
 * https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/
 */
export interface SecurityLevelMemberPayload {
  /**
   * Defines the value associated with the type. For reporter this would be {"null"}; for users this would be the names
   * of specific users); for group this would be group names like {"administrators", "jira-administrators",
   * "jira-users"}
   */
  parameter?: string;
  /** The type of the security level member */
  type?: 'group' | 'reporter' | 'users' | string;
}
