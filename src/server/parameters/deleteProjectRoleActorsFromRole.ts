import { z } from 'zod';

export const DeleteProjectRoleActorsFromRoleSchema = z.object({
  /** The role id to remove the actors from */
  id: z.number(),
  /** If given, removes an actor from given role */
  user: z.string().optional(),
  /** If given, removes an actor from given role */
  group: z.string().optional(),
});

export type DeleteProjectRoleActorsFromRole = z.input<typeof DeleteProjectRoleActorsFromRoleSchema>;
