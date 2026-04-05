import { z } from 'zod';

export const GetProjectRolesSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
});

export type GetProjectRoles = z.input<typeof GetProjectRolesSchema>;
