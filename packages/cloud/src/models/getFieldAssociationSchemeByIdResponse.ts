import { z } from 'zod';
import { FieldAssociationSchemeLinksSchema } from '#/models/fieldAssociationSchemeLinks';

/** Response object for getting a field association scheme by ID. */
export const GetFieldAssociationSchemeByIdResponseSchema = z.object({
  description: z.string().optional(),
  id: z.string().optional(),
  isDefault: z.boolean().optional(),
  links: FieldAssociationSchemeLinksSchema.optional(),
  name: z.string().optional(),
});

export type GetFieldAssociationSchemeByIdResponse = z.infer<typeof GetFieldAssociationSchemeByIdResponseSchema>;
