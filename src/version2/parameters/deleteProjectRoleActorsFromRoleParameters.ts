import { z } from 'zod';

export const DeleteProjectRoleActorsFromRoleParametersSchema = z.object({
  /**
   * The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role
   * IDs.
   */
  id: z.number().int(),
  /** The user account ID of the user to remove as a default actor. */
  user: z.string().optional(),
  /**
   * The group ID of the group to be removed as a default actor. This parameter cannot be used with the `group`
   * parameter.
   */
  groupId: z.string().optional(),
  /**
   * The group name of the group to be removed as a default actor.This parameter cannot be used with the `groupId`
   * parameter. As a group's name can change, use of `groupId` is recommended.
   */
  group: z.string().optional(),
});

export type DeleteProjectRoleActorsFromRoleParameters = z.infer<typeof DeleteProjectRoleActorsFromRoleParametersSchema>;
