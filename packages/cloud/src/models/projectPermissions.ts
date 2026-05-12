import { z } from 'zod';

/** Permissions which a user has on a project. */
export const ProjectPermissionsSchema = z.object({
  /** Whether the logged user can edit the project. */
  canEdit: z.boolean().optional(),
});

export type ProjectPermissions = z.infer<typeof ProjectPermissionsSchema>;
