import { z } from 'zod';
import { ScimGroupSchema } from '../models';

export const CreateGroupSchema = z.object(ScimGroupSchema.shape).extend({
  /**
   * The SCIM base URL that is generated when [conecting an identity provider with SCIM
   * provisioning](https://support.atlassian.com/provisioning-users/docs/configure-user-provisioning-with-an-identity-provider/#Connect-an-identity-provider-with-SCIM-provisioning).
   */
  directoryId: z.string(),
});

export type CreateGroup = z.input<typeof CreateGroupSchema>;
