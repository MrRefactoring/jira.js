import type { SecurityLevelMemberPayload } from './securityLevelMemberPayload';

/**
 * The payload for creating a security level. See
 * https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/
 */
export interface SecurityLevelPayload {
  /** The description of the security level */
  description?: string;
  /** Whether the security level is default for the security scheme */
  isDefault?: boolean;
  /** The name of the security level */
  name?: string;
  /** The members of the security level */
  securityLevelMembers?: SecurityLevelMemberPayload[];
}
