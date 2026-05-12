import { z } from 'zod';
import { CreateFieldAssociationSchemeLinksSchema } from '#/models/createFieldAssociationSchemeLinks';

/** Response object after successfully creating a new field association scheme. */
export const CreateFieldAssociationSchemeResponseSchema = z.object({
  description: z.string().optional(),
  id: z.number().optional(),
  links: CreateFieldAssociationSchemeLinksSchema.optional(),
  name: z.string().optional(),
});

export type CreateFieldAssociationSchemeResponse = z.infer<typeof CreateFieldAssociationSchemeResponseSchema>;
