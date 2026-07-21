import { z } from 'zod';
import { apiObject } from '#/core';
import { FieldAssociationSchemeLinksBeanSchema } from './fieldAssociationSchemeLinksBean';
import { FieldAssociationSchemeMatchedFiltersSchema } from './fieldAssociationSchemeMatchedFilters';
/** Response object for getting a field association scheme. */

export const GetFieldAssociationSchemeResponseSchema = apiObject({
  description: z.string().optional(),
  fieldsCount: z.number().optional(),
  id: z.number().optional(),
  isDefault: z.boolean().optional(),
  links: FieldAssociationSchemeLinksBeanSchema.optional(),
  matchedFilters: FieldAssociationSchemeMatchedFiltersSchema.optional(),
  name: z.string().optional(),
});

export type GetFieldAssociationSchemeResponse = z.infer<typeof GetFieldAssociationSchemeResponseSchema>;
