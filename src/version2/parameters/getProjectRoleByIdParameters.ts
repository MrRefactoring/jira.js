import { z } from 'zod';

export const GetProjectRoleByIdParametersSchema = z.object({
  /**
   * The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role
   * IDs.
   */
  id: z.number().int(),
});

export type GetProjectRoleByIdParameters = z.infer<typeof GetProjectRoleByIdParametersSchema>;
