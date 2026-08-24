import { z } from 'zod';

export const DeleteProvisioningRecordSchema = z.object({
  /**
   * Your organization is identified by a Unique ID. You get your organization ID and Organization API key
   * simultaneously.
   */
  orgId: z.string(),
  /**
   * Unique ID of the user's account. The AAID can either be found in the URL of a user's profile, when browsing in the
   * "Users" tab or the "Managed Users" tab or use the [Get Users
   * API](https://developer.atlassian.com/cloud/admin/user-provisioning/rest/api-group-users/#api-scim-directory-directoryid-users-get)
   * to get the AAID. The URL could look like:
   *
   * `https://admin.atlassian.com/o/{orgId}/users/{aaId}`
   *
   * `https://admin.atlassian.com/o/{orgId}/members/{aaId}`
   *
   * `https://admin.atlassian.com/s/{siteId}/users/{aaId}`
   */
  aaId: z.string(),
});

export type DeleteProvisioningRecord = z.input<typeof DeleteProvisioningRecordSchema>;
