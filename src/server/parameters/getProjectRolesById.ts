import { z } from 'zod';

export const GetProjectRolesByIdSchema = z.object({
  /** The role id */
  id: z.number(),
});

export type GetProjectRolesById = z.input<typeof GetProjectRolesByIdSchema>;
