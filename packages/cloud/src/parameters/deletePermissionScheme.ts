import { z } from 'zod';

export const DeletePermissionSchemeSchema = z.object({
  /** The ID of the permission scheme being deleted. */
  schemeId: z.number(),
});

export type DeletePermissionScheme = z.input<typeof DeletePermissionSchemeSchema>;
