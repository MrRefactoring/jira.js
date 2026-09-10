import { z } from 'zod';
import { ScimUserSchema } from '../models';

export const CreateUserSchema = z.object(ScimUserSchema.shape).extend({
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
});

export type CreateUser = z.input<typeof CreateUserSchema>;
