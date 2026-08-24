import { z } from 'zod';
import { apiObject } from '#/core';
import { ScimGroupMemberSchema } from './scimGroupMember';
import { ScimMetadataSchema } from './scimMetadata';
/** SCIM group */

export const ScimGroupSchema = apiObject({
  /**
   * SCIM schemas that define the attributes present in the current JSON structure. This ia a required field during user
   * creation or modification.
   */
  schemas: z.array(z.string()).optional(),
  /**
   * Unique identifier defined by Atlassian SCIM Service. This is a read-only and case-sensitive field. It is ignored if
   * specified in the payload during user creation or modification.
   */
  id: z.string().optional(),
  /** Identifier defined by provisioning client. CaseExact. Uniqueness is controlled by client. */
  externalId: z.string().optional(),
  /** Group display name. This is a immutable, required, and read-only field. */
  displayName: z.string().optional(),
  /** Group members */
  members: z.array(ScimGroupMemberSchema).optional(),
  meta: ScimMetadataSchema.optional(),
});

export type ScimGroup = z.infer<typeof ScimGroupSchema>;
