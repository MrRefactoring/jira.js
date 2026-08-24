import { z } from 'zod';

export const GetGroupsSchema = z.object({
  /**
   * The SCIM base URL that is generated when [conecting an identity provider with SCIM
   * provisioning](https://support.atlassian.com/provisioning-users/docs/configure-user-provisioning-with-an-identity-provider/#Connect-an-identity-provider-with-SCIM-provisioning).
   */
  directoryId: z.string(),
  /** Filter for `displayName`. Example: `displayName eq "SCIM_GROUP"` */
  filter: z.string().optional(),
  /** A 1-based index of the first query result. */
  startIndex: z.number().optional(),
  /** Desired maximum number of query results in the list response page. */
  count: z.number().optional(),
});

export type GetGroups = z.input<typeof GetGroupsSchema>;
