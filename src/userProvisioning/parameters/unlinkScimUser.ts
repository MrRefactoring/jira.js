import { z } from 'zod';

export const UnlinkScimUserSchema = z.object({
  /**
   * Your organization is identified by a Unique ID. You get your organization ID and Organization API key
   * simultaneously.
   */
  orgId: z.string(),
  /**
   * The SCIM base URL that is generated when [conecting an identity provider with SCIM
   * provisioning](https://support.atlassian.com/provisioning-users/docs/configure-user-provisioning-with-an-identity-provider/#Connect-an-identity-provider-with-SCIM-provisioning).
   */
  scimDirectoryId: z.string(),
  /**
   * The SCIM user ID to unlink. Use the [Get SCIM Links for an email
   * API](https://developer.atlassian.com/cloud/admin/user-provisioning/rest/api-group-admin-apis/#api-admin-user-provisioning-v1-org-orgid-get-scim-links-for-email-post)
   * to get the SCIM User ID.
   */
  scimUserId: z.string(),
});

export type UnlinkScimUser = z.input<typeof UnlinkScimUserSchema>;
