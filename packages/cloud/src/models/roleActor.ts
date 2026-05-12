import { z } from 'zod';
import { ProjectRoleGroupSchema } from '#/models/projectRoleGroup';
import { ProjectRoleUserSchema } from '#/models/projectRoleUser';

/** Details about a user assigned to a project role. */
export const RoleActorSchema = z.object({
  actorGroup: ProjectRoleGroupSchema.optional(),
  actorUser: ProjectRoleUserSchema.optional(),
  /** The avatar of the role actor. */
  avatarUrl: z.url().optional(),
  /**
   * The display name of the role actor. For users, depending on the user’s privacy setting, this may return an
   * alternative value for the user's name.
   */
  displayName: z.string().optional(),
  /** The ID of the role actor. */
  id: z.number().optional(),
  /** The type of role actor. */
  type: z.enum(['atlassian-group-role-actor', 'atlassian-user-role-actor']).optional(),
});

export type RoleActor = z.infer<typeof RoleActorSchema>;
