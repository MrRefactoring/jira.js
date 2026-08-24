import { z } from 'zod';

export const DeletePermissionSchemeSchema = z.object({
  /** The id of the permission scheme. */
  schemeId: z.number(),
});

export type DeletePermissionScheme = z.input<typeof DeletePermissionSchemeSchema>;
