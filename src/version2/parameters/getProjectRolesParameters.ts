import { z } from 'zod';

export const GetProjectRolesParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
});

export type GetProjectRolesParameters = z.infer<typeof GetProjectRolesParametersSchema>;
