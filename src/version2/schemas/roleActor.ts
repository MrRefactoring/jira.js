import { z } from 'zod';

/** Details about a user assigned to a project role. */
export const RoleActorSchema = z.object({
  actorGroup: z.unknown().optional(),
  actorUser: z.unknown().optional(),
  /** The avatar of the role actor. */
  avatarUrl: z.string().optional(),
  /**
   * The display name of the role actor. For users, depending on the user’s privacy setting, this may return an
   * alternative value for the user's name.
   */
  displayName: z.string().optional(),
  /** The ID of the role actor. */
  id: z.number().int().optional(),
  /**
   * This property is no longer available and will be removed from the documentation soon. See the [deprecation
   * notice](https://developer.atlassian.com/cloud/jira/platform/deprecation-notice-user-privacy-api-migration-guide/)
   * for details.
   */
  name: z.string().optional(),
  /** The type of role actor. */
  type: z.enum(['atlassian-group-role-actor', 'atlassian-user-role-actor']).optional(),
});

export type RoleActor = z.infer<typeof RoleActorSchema>;
