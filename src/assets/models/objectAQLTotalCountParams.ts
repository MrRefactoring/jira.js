import { z } from 'zod';
import { apiObject } from '#/core';
/** An object that is used to find the total count of objects returned for a given AQL query */

export const ObjectAQLTotalCountParamsSchema = apiObject({
  /** The AQL that will filter the objects. */
  qlQuery: z.string(),
});

export type ObjectAQLTotalCountParams = z.infer<typeof ObjectAQLTotalCountParamsSchema>;
