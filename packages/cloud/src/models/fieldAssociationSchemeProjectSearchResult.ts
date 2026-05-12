import { z } from 'zod';

/** Project search results for field association scheme. */
export const FieldAssociationSchemeProjectSearchResultSchema = z.object({
  avatarUrls: z.record(z.string(), z.any()).optional(),
  id: z.string().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
});

export type FieldAssociationSchemeProjectSearchResult = z.infer<typeof FieldAssociationSchemeProjectSearchResultSchema>;
