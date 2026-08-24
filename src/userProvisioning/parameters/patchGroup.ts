import { z } from 'zod';
import { RequestPayloadToPatchSchema } from '../models';

export const PatchGroupSchema = z.object(RequestPayloadToPatchSchema.shape).extend({
  /**
   * The SCIM base URL that is generated when [conecting an identity provider with SCIM
   * provisioning](https://support.atlassian.com/provisioning-users/docs/configure-user-provisioning-with-an-identity-provider/#Connect-an-identity-provider-with-SCIM-provisioning).
   */
  directoryId: z.string(),
  /**
   * Unique SCIM id that serves as reference to the group. Use the [Get groups
   * API](https://developer.atlassian.com/cloud/admin/user-provisioning/rest/api-group-groups/#api-scim-directory-directoryid-groups-get)
   * to get the SCIM id.
   */
  id: z.string(),
});

export type PatchGroup = z.input<typeof PatchGroupSchema>;
