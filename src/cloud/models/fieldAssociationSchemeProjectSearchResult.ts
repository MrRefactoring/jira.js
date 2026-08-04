import { z } from 'zod';
import { apiObject } from '#/core';
/** Project search results for field association scheme. */

export const FieldAssociationSchemeProjectSearchResultSchema = apiObject({
  avatarUrls: z.record(z.string(), z.any()).optional(),
  deleted: z.boolean().optional(),
  id: z.string().optional(),
  key: z.string().optional(),
  name: z.string().optional(),
});

export type FieldAssociationSchemeProjectSearchResult = z.infer<typeof FieldAssociationSchemeProjectSearchResultSchema>;
