import { z } from 'zod';

export const DeleteUserSchema = z.object({
  /** The ID assigned to your identity provider when linked to your Atlassian organization. */
  directoryId: z.string(),
  /**
   * Unique ID to identiy the SCIM users. Use the [Get users
   * API](https://developer.atlassian.com/cloud/admin/user-provisioning/rest/api-group-users/#api-scim-directory-directoryid-users-get)
   * to get the userId.
   */
  userId: z.string(),
});

export type DeleteUser = z.input<typeof DeleteUserSchema>;
