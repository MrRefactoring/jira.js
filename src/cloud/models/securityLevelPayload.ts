import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';
import { SecurityLevelMemberPayloadSchema } from './securityLevelMemberPayload';
/**
 * The payload for creating a security level. See
 * https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/
 */

export const SecurityLevelPayloadSchema = apiObject({
  /** The description of the security level */
  description: z.string().optional(),
  /** Whether the security level is default for the security scheme */
  isDefault: z.enum(['true', 'false']).optional(),
  /** The name of the security level */
  name: z.string().optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  /** The members of the security level */
  securityLevelMembers: z.array(SecurityLevelMemberPayloadSchema).optional(),
});

export type SecurityLevelPayload = z.infer<typeof SecurityLevelPayloadSchema>;
