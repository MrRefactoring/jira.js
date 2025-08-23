import { z } from 'zod';

export const AddActorUsersParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /**
   * The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role
   * IDs.
   */
  id: z.number().int(),
  /**
   * The name of the group to add. This parameter cannot be used with the `groupId` parameter. As a group's name can
   * change, use of `groupId` is recommended.
   */
  group: z.array(z.string()).optional(),
  /** The ID of the group to add. This parameter cannot be used with the `group` parameter. */
  groupId: z.array(z.string()).optional(),
  /** The user account ID of the user to add. */
  user: z.array(z.string()).optional(),
});

export type AddActorUsersParameters = z.infer<typeof AddActorUsersParametersSchema>;
