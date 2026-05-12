import { z } from 'zod';

export const DeletePermissionSchemeEntitySchema = z.object({
  /** The ID of the permission scheme to delete the permission grant from. */
  schemeId: z.number(),
  /** The ID of the permission grant to delete. */
  permissionId: z.number(),
});

export type DeletePermissionSchemeEntity = z.input<typeof DeletePermissionSchemeEntitySchema>;
