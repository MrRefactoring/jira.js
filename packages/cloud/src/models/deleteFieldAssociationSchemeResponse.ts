import { z } from 'zod';

/** Response object after successfully deleting a field association scheme. */
export const DeleteFieldAssociationSchemeResponseSchema = z.object({
  deleted: z.boolean().optional(),
  id: z.string().optional(),
});

export type DeleteFieldAssociationSchemeResponse = z.infer<typeof DeleteFieldAssociationSchemeResponseSchema>;
