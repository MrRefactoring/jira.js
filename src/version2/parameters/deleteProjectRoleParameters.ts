import { z } from 'zod';

export const DeleteProjectRoleParametersSchema = z.object({
  /**
   * The ID of the project role to delete. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of
   * project role IDs.
   */
  id: z.number().int(),
  /**
   * The ID of the project role that will replace the one being deleted. The swap will attempt to swap the role in
   * schemes (notifications, permissions, issue security), workflows, worklogs and comments.
   */
  swap: z.number().int().optional(),
});

export type DeleteProjectRoleParameters = z.infer<typeof DeleteProjectRoleParametersSchema>;
