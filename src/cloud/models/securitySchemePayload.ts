import { z } from 'zod';
import { apiObject } from '#/core';
import { ProjectCreateResourceIdentifierSchema } from './projectCreateResourceIdentifier';
import { SecurityLevelPayloadSchema } from './securityLevelPayload';
/**
 * The payload for creating a security scheme. See
 * https://support.atlassian.com/jira-cloud-administration/docs/configure-issue-security-schemes/
 */

export const SecuritySchemePayloadSchema = apiObject({
  /** The description of the security scheme */
  description: z.string().optional(),
  /** The name of the security scheme */
  name: z.string().optional(),
  pcri: ProjectCreateResourceIdentifierSchema.optional(),
  /** The security levels for the security scheme */
  securityLevels: z.array(SecurityLevelPayloadSchema).optional(),
});

export type SecuritySchemePayload = z.infer<typeof SecuritySchemePayloadSchema>;
