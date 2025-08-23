import { z } from 'zod';

export const CreateUpdateRoleRequestBeanSchema = z.object({
  /**
   * A description of the project role. Required when fully updating a project role. Optional when creating or partially
   * updating a project role.
   */
  description: z.string().optional(),
  /**
   * The name of the project role. Must be unique. Cannot begin or end with whitespace. The maximum length is 255
   * characters. Required when creating a project role. Optional when partially updating a project role.
   */
  name: z.string().optional(),
});

export type CreateUpdateRoleRequestBean = z.infer<typeof CreateUpdateRoleRequestBeanSchema>;
