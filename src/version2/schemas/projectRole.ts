import { z } from 'zod';
import { RoleActorSchema } from './roleActor';

/** Details about the roles in a project. */
export const ProjectRoleSchema = z.object({
  /** The list of users who act in this role. */
  actors: z.array(RoleActorSchema).optional(),
  /** Whether this role is the admin role for the project. */
  admin: z.boolean().optional(),
  /** Whether the calling user is part of this role. */
  currentUserRole: z.boolean().optional(),
  /** Whether this role is the default role for the project */
  default: z.boolean().optional(),
  /** The description of the project role. */
  description: z.string().optional(),
  /** The ID of the project role. */
  id: z.number().int().optional(),
  /** The name of the project role. */
  name: z.string().optional(),
  /** Whether the roles are configurable for this project. */
  roleConfigurable: z.boolean().optional(),
  /**
   * The scope of the role. Indicated for roles associated with [next-gen
   * projects](https://confluence.atlassian.com/x/loMyO).
   */
  scope: z.unknown().optional(),
  /** The URL the project role details. */
  self: z.string().optional(),
  /** The translated name of the project role. */
  translatedName: z.string().optional(),
});

export type ProjectRole = z.infer<typeof ProjectRoleSchema>;
