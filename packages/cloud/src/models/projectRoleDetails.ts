import { z } from 'zod';
import { ScopeSchema } from '#/models/scope';

/** Details about a project role. */
export const ProjectRoleDetailsSchema = z.object({
  /** Whether this role is the admin role for the project. */
  admin: z.boolean().optional(),
  /** Whether this role is the default role for the project. */
  default: z.boolean().optional(),
  /** The description of the project role. */
  description: z.string().optional(),
  /** The ID of the project role. */
  id: z.number().optional(),
  /** The name of the project role. */
  name: z.string().optional(),
  /** Whether the roles are configurable for this project. */
  roleConfigurable: z.boolean().optional(),
  scope: ScopeSchema.optional(),
  /** The URL the project role details. */
  self: z.url().optional(),
  /** The translated name of the project role. */
  translatedName: z.string().optional(),
  /** The type of the project role. This is "DEFAULT" or "GUEST_ROLE". */
  type: z.enum(['DEFAULT', 'GUEST_ROLE']).optional(),
});

export type ProjectRoleDetails = z.infer<typeof ProjectRoleDetailsSchema>;
