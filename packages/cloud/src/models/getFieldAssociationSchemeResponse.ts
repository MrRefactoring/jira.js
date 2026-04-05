import { z } from 'zod';
import { FieldAssociationSchemeLinksSchema } from '#/models/fieldAssociationSchemeLinks';
import { FieldAssociationSchemeMatchedFiltersSchema } from '#/models/fieldAssociationSchemeMatchedFilters';

/** Response object for getting a field association scheme. */
export const GetFieldAssociationSchemeResponseSchema = z.object({
  description: z.string().optional(),
  id: z.number().optional(),
  isDefault: z.boolean().optional(),
  links: FieldAssociationSchemeLinksSchema.optional(),
  matchedFilters: FieldAssociationSchemeMatchedFiltersSchema.optional(),
  name: z.string().optional(),
});

export type GetFieldAssociationSchemeResponse = z.infer<typeof GetFieldAssociationSchemeResponseSchema>;
