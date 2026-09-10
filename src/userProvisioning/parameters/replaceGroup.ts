import { z } from 'zod';
import { ScimGroupMemberSchema } from '../models';
import { ScimMetadataSchema } from '../models';

export const ReplaceGroupSchema = z.object({
  /**
   * The SCIM base URL that is generated when [conecting an identity provider with SCIM
   * provisioning](https://support.atlassian.com/provisioning-users/docs/configure-user-provisioning-with-an-identity-provider/#Connect-an-identity-provider-with-SCIM-provisioning).
   */
  directoryId: z.string(),
  /**
   * Unique SCIM id that serves as reference to the group. Use the [Get groups API]
   * (https://developer.atlassian.com/cloud/admin/user-provisioning/rest/api-group-groups/#api-scim-directory-directoryid-groups-get)
   * to get the SCIM id.
   */
  id: z.string(),
  /**
   * SCIM schemas that define the attributes present in the current JSON structure. This ia a required field during user
   * creation or modification.
   */
  schemas: z.array(z.string()).optional(),
  /** Identifier defined by provisioning client. CaseExact. Uniqueness is controlled by client. */
  externalId: z.string().optional(),
  /** Group display name. This is a immutable, required, and read-only field. */
  displayName: z.string().optional(),
  /** Group members */
  members: z.array(ScimGroupMemberSchema).optional(),
  /** Group metadata information. */
  meta: ScimMetadataSchema.optional(),
});

export type ReplaceGroup = z.input<typeof ReplaceGroupSchema>;
