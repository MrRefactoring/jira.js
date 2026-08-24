import { z } from 'zod';
import { apiObject } from '#/core';
/** An object that is used to represent the total count of objects returned for a given AQL query */

export const ObjectAQLTotalCountResultSchema = apiObject({
  /** The total number of objects which match the provided query. */
  totalCount: z.number().optional(),
});

export type ObjectAQLTotalCountResult = z.infer<typeof ObjectAQLTotalCountResultSchema>;
