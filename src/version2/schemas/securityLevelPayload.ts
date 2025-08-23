import { z } from 'zod';
import { SecurityLevelMemberPayloadSchema } from './securityLevelMemberPayload';

/**
 * The payload for creating a security level. See
 * https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/
 */
export const SecurityLevelPayloadSchema = z.object({
  /** The description of the security level */
  description: z.string().optional(),
  /** Whether the security level is default for the security scheme */
  isDefault: z.boolean().optional(),
  /** The name of the security level */
  name: z.string().optional(),
  /** The members of the security level */
  securityLevelMembers: z.array(SecurityLevelMemberPayloadSchema).optional(),
});

export type SecurityLevelPayload = z.infer<typeof SecurityLevelPayloadSchema>;
