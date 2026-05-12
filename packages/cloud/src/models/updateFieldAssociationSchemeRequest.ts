import { z } from 'zod';

/** Request object for updating an existing field association scheme. */
export const UpdateFieldAssociationSchemeRequestSchema = z.object({
  /** The description value to update */
  description: z.string().optional(),
  /** The name value to update */
  name: z.string().optional(),
});

export type UpdateFieldAssociationSchemeRequest = z.infer<typeof UpdateFieldAssociationSchemeRequestSchema>;
