import { z } from 'zod';

export const DeletePermissionSchemeEntityParametersSchema = z.object({
  /** The ID of the permission scheme to delete the permission grant from. */
  schemeId: z.number().int(),
  /** The ID of the permission grant to delete. */
  permissionId: z.number().int(),
});

export type DeletePermissionSchemeEntityParameters = z.infer<typeof DeletePermissionSchemeEntityParametersSchema>;
