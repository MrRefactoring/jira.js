import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/**
 * The payload for creating a security level member. See
 * https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/
 */

export const SecurityLevelMemberPayloadSchema = apiObject({
  /**
   * Defines the value associated with the type. For reporter this would be {"null"}; for users this would be the names
   * of specific users); for group this would be group names like {"administrators", "jira-administrators",
   * "jira-users"}
   */
  parameter: z.string().optional(),
  /** The type of the security level member */
  type: openEnum(['group', 'reporter', 'users']).optional(),
});

export type SecurityLevelMemberPayload = z.infer<typeof SecurityLevelMemberPayloadSchema>;
