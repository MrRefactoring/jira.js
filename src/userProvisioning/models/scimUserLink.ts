import { z } from 'zod';
import { apiObject } from '#/core';
/** Represents a SCIM user link with associated IDs. */

export const ScimUserLinkSchema = apiObject({
  /** The SCIM user ID. */
  scimUserId: z.string(),
  /** The Atlassian Account ID (can be null). */
  atlassianAccountId: z.string().nullish(),
  /** The organization ID */
  orgId: z.string(),
  /**
   * The SCIM base URL that is generated when [conecting an identity provider with SCIM
   * provisioning](https://support.atlassian.com/provisioning-users/docs/configure-user-provisioning-with-an-identity-provider/#Connect-an-identity-provider-with-SCIM-provisioning).
   */
  directoryId: z.string(),
});

export type ScimUserLink = z.infer<typeof ScimUserLinkSchema>;
