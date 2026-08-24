import { z } from 'zod';

export const CreateGroupSchema = z.object({
  /**
   * The SCIM base URL that is generated when [conecting an identity provider with SCIM
   * provisioning](https://support.atlassian.com/provisioning-users/docs/configure-user-provisioning-with-an-identity-provider/#Connect-an-identity-provider-with-SCIM-provisioning).
   */
  directoryId: z.string(),
  body: z.record(z.string(), z.any()).optional(),
});

export type CreateGroup = z.input<typeof CreateGroupSchema>;
