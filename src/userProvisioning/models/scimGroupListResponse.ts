import { z } from 'zod';
import { apiObject } from '#/core';
import { ScimGroupSchema } from './scimGroup';
/** SCIM group list response */

export const ScimGroupListResponseSchema = apiObject({
  /** SCIM schemas that define list of response. */
  schemas: z.array(z.string()).optional(),
  /**
   * The total number of results returned by the query operation. The value may be larger than the number of resources
   * returned, such as when returning a single page of results from a larger result set.
   */
  totalResults: z.number().optional(),
  /** The 1-based index of the first result in the current set of list results. */
  startIndex: z.number().optional(),
  /** The number of resources returned in a list response page. */
  itemsPerPage: z.number().optional(),
  /** The list of resource objects. */
  Resources: z.array(ScimGroupSchema).optional(),
});

export type ScimGroupListResponse = z.infer<typeof ScimGroupListResponseSchema>;
