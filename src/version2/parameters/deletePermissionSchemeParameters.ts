import { z } from 'zod';

export const DeletePermissionSchemeParametersSchema = z.object({
  /** The ID of the permission scheme being deleted. */
  schemeId: z.number().int(),
});

export type DeletePermissionSchemeParameters = z.infer<typeof DeletePermissionSchemeParametersSchema>;
