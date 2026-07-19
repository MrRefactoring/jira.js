import { z } from 'zod';
import { apiObject } from '#/core';
/** Permissions which a user has on a project. */

export const ProjectPermissionsSchema = apiObject({
  /** Whether the logged user can edit the project. */
  canEdit: z.boolean().optional(),
});

export type ProjectPermissions = z.infer<typeof ProjectPermissionsSchema>;
