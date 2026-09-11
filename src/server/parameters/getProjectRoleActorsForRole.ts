import { z } from 'zod';

export const GetProjectRoleActorsForRoleSchema = z.object({
  /** The role id */
  id: z.number(),
});

export type GetProjectRoleActorsForRole = z.input<typeof GetProjectRoleActorsForRoleSchema>;
