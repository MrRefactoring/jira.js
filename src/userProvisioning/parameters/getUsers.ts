import { z } from 'zod';

export const GetUsersSchema = z.object({
  /**
   * The SCIM base URL that is generated when [conecting an identity provider with SCIM
   * provisioning](https://support.atlassian.com/provisioning-users/docs/configure-user-provisioning-with-an-identity-provider/#Connect-an-identity-provider-with-SCIM-provisioning).
   */
  directoryId: z.string(),
  /**
   * Resource attributes to be included in response. Mutually exclusive from `excludedAttributes`. Example:
   * `userName,emails.value`
   */
  attributes: z.string().optional(),
  /**
   * Resource attributes to be excluded from response. Mutually exclusive from `attributes`. Example:
   * `timezone,emails.type,department`
   */
  excludedAttributes: z.string().optional(),
  /** Filter for `userName` or `externalId`. Example: `userName eq "Atlassian"` */
  filter: z.string().optional(),
  /** A 1-based index of the first query result. */
  startIndex: z.number().optional(),
  /** Desired maximum number of query results in the list response page. */
  count: z.number().optional(),
});

export type GetUsers = z.input<typeof GetUsersSchema>;
