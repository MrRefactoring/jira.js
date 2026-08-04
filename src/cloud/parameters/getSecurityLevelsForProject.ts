import { z } from 'zod';

export const GetSecurityLevelsForProjectSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectKeyOrId: z.string(),
});

export type GetSecurityLevelsForProject = z.input<typeof GetSecurityLevelsForProjectSchema>;
