import { z } from 'zod';

/** Matched filters for field association scheme search. */
export const FieldAssociationSchemeMatchedFiltersSchema = z.object({
  projectIds: z.array(z.number()).optional(),
  query: z.string().optional(),
});

export type FieldAssociationSchemeMatchedFilters = z.infer<typeof FieldAssociationSchemeMatchedFiltersSchema>;
