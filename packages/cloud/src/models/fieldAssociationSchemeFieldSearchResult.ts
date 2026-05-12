import { z } from 'zod';
import { SearchResultFieldParametersSchema } from '#/models/searchResultFieldParameters';
import { SearchResultWorkTypeParametersSchema } from '#/models/searchResultWorkTypeParameters';

/** Field association scheme field search results. */
export const FieldAssociationSchemeFieldSearchResultSchema = z.object({
  allowedOperations: z.array(z.string()).optional(),
  fieldId: z.string().optional(),
  parameters: SearchResultFieldParametersSchema.optional(),
  restrictedToWorkTypes: z.array(z.string()).optional(),
  workTypeParameters: z.array(SearchResultWorkTypeParametersSchema).optional(),
});

export type FieldAssociationSchemeFieldSearchResult = z.infer<typeof FieldAssociationSchemeFieldSearchResultSchema>;
