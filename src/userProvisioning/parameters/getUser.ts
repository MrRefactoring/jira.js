import { z } from 'zod';

export const GetUserSchema = z.object({
  /**
   * The SCIM base URL that is generated when [conecting an identity provider with SCIM
   * provisioning](https://support.atlassian.com/provisioning-users/docs/configure-user-provisioning-with-an-identity-provider/#Connect-an-identity-provider-with-SCIM-provisioning).
   */
  directoryId: z.string(),
  /**
   * Unique ID to identiy the users. Use the [Get users
   * API](https://developer.atlassian.com/cloud/admin/user-provisioning/rest/api-group-users/#api-scim-directory-directoryid-users-get)
   * to get the userId.
   */
  userId: z.string(),
  /**
   * Resource attributes to be included in response. Mutually exclusive with `excludedAttributes`. Example:
   * `userName,emails.value`
   */
  attributes: z.string().optional(),
  /**
   * Resource attributes to be excluded from response. Mutually exclusive with `attributes`. Example:
   * `timezone,emails.type,department`
   */
  excludedAttributes: z.string().optional(),
});

export type GetUser = z.input<typeof GetUserSchema>;
