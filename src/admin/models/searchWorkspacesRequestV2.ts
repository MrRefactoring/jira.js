import { z } from 'zod';
import { apiObject } from '#/core';
import { QueryVariantsSchema } from './queryVariants';
import { SortFieldSchema } from './sortField';
/** Workspaces request supporting enhanced Workspace searching. */

export const SearchWorkspacesRequestV2Schema = apiObject({
  query: QueryVariantsSchema.optional(),
  /** Specifies the maximum page size. */
  limit: z.number().optional(),
  sort: z.array(SortFieldSchema).nullish(),
  /**
   * A base-64 encoded continuation token used for pagination. When a cursor is provided in the request body, no other
   * properties may be present.
   */
  cursor: z.string().nullish(),
});

export type SearchWorkspacesRequestV2 = z.infer<typeof SearchWorkspacesRequestV2Schema>;
