import { z } from 'zod';

export const DeletePermissionSchemeEntitySchema = z.object({
  /** The id of the permission grant. */
  permissionId: z.number(),
  /** The id of the permission scheme. */
  schemeId: z.number(),
});

export type DeletePermissionSchemeEntity = z.input<typeof DeletePermissionSchemeEntitySchema>;
