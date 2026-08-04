import { z } from 'zod';

export const DeleteActorSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /**
   * The ID of the project role. Use [Get all project
   * roles](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-role/#api-rest-api-3-role-get) to get
   * a list of project role IDs.
   */
  id: z.number(),
  /** The user account ID of the user to remove from the project role. */
  user: z.string().optional(),
  /**
   * The name of the group to remove from the project role. This parameter cannot be used with the `groupId` parameter.
   * As a group's name can change, use of `groupId` is recommended.
   */
  group: z.string().optional(),
  /** The ID of the group to remove from the project role. This parameter cannot be used with the `group` parameter. */
  groupId: z.string().optional(),
});

export type DeleteActor = z.input<typeof DeleteActorSchema>;
