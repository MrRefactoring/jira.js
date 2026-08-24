import { z } from 'zod';

export const GetProjectRolesSchema = z.object({
  /** The project id or project key */
  projectIdOrKey: z.string(),
});

export type GetProjectRoles = z.input<typeof GetProjectRolesSchema>;
