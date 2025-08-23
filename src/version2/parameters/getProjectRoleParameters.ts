import { z } from 'zod';

export const GetProjectRoleParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /**
   * The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role
   * IDs.
   */
  id: z.number().int(),
  /** Exclude inactive users. */
  excludeInactiveUsers: z.boolean().optional(),
});

export type GetProjectRoleParameters = z.infer<typeof GetProjectRoleParametersSchema>;
