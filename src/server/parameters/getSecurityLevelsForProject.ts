import { z } from 'zod';

export const GetSecurityLevelsForProjectSchema = z.object({
  /** Key or id of project to list the security levels for */
  projectKeyOrId: z.string(),
});

export type GetSecurityLevelsForProject = z.input<typeof GetSecurityLevelsForProjectSchema>;
