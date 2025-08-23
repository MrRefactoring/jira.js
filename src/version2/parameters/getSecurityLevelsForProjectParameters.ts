import { z } from 'zod';

export const GetSecurityLevelsForProjectParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectKeyOrId: z.string(),
});

export type GetSecurityLevelsForProjectParameters = z.infer<typeof GetSecurityLevelsForProjectParametersSchema>;
