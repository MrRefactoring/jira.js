import { z } from 'zod';

export const GetProjectRoleSchema = z.object({
  /** The project id or project key */
  projectIdOrKey: z.string(),
  /** The project role id */
  id: z.number(),
});

export type GetProjectRole = z.input<typeof GetProjectRoleSchema>;
