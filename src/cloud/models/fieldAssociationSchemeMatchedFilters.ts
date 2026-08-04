import { z } from 'zod';
import { apiObject } from '#/core';
/** Matched filters for field association scheme search. */

export const FieldAssociationSchemeMatchedFiltersSchema = apiObject({
  projectIds: z.array(z.number()).optional(),
  query: z.string().optional(),
});

export type FieldAssociationSchemeMatchedFilters = z.infer<typeof FieldAssociationSchemeMatchedFiltersSchema>;
