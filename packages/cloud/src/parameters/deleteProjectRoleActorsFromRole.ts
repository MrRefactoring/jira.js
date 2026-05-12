import { z } from 'zod';

export const DeleteProjectRoleActorsFromRoleSchema = z.object({
  /**
   * The ID of the project role. Use [Get all project
   * roles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-role/#api-rest-api-3-role-get) to get
   * a list of project role IDs.
   */
  id: z.number(),
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

export type DeleteProjectRoleActorsFromRole = z.input<typeof DeleteProjectRoleActorsFromRoleSchema>;
