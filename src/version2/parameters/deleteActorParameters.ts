import { z } from 'zod';

export const DeleteActorParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /**
   * The ID of the project role. Use [Get all project roles](#api-rest-api-2-role-get) to get a list of project role
   * IDs.
   */
  id: z.number().int(),
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

export type DeleteActorParameters = z.infer<typeof DeleteActorParametersSchema>;
