import { z } from 'zod';

export const DeleteProjectRoleSchema = z.object({
  /** If given, removes a role even if it is used in scheme by replacing the role with the given one */
  swap: z.number().optional(),
  /** The role id */
  id: z.number(),
});

export type DeleteProjectRole = z.input<typeof DeleteProjectRoleSchema>;
