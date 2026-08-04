import { z } from 'zod';
import { apiObject } from '#/core';
import { SearchResultFieldParametersSchema } from './searchResultFieldParameters';
import { SearchResultWorkTypeParametersSchema } from './searchResultWorkTypeParameters';
/** Field association scheme field search results. */

export const FieldAssociationSchemeFieldSearchResultSchema = apiObject({
  allowedOperations: z.array(z.string()).optional(),
  fieldId: z.string().optional(),
  parameters: SearchResultFieldParametersSchema.optional(),
  restrictedToWorkTypes: z.array(z.string()).optional(),
  workTypeParameters: z.array(SearchResultWorkTypeParametersSchema).optional(),
});

export type FieldAssociationSchemeFieldSearchResult = z.infer<typeof FieldAssociationSchemeFieldSearchResultSchema>;
