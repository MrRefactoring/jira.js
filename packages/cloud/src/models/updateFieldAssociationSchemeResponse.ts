import { z } from 'zod';
import { UpdateFieldAssociationSchemeLinksSchema } from '#/models/updateFieldAssociationSchemeLinks';

/** Response object after successfully updating an existing field association scheme. */
export const UpdateFieldAssociationSchemeResponseSchema = z.object({
  description: z.string().optional(),
  id: z.number().optional(),
  links: UpdateFieldAssociationSchemeLinksSchema.optional(),
  name: z.string().optional(),
});

export type UpdateFieldAssociationSchemeResponse = z.infer<typeof UpdateFieldAssociationSchemeResponseSchema>;
