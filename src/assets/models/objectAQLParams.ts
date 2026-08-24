import { z } from 'zod';
import { apiObject } from '#/core';
/** An object that is used to find a paginated result set based on an AQL query */

export const ObjectAQLParamsSchema = apiObject({
  /** The AQL that will fetch the objects. */
  qlQuery: z.string(),
});

export type ObjectAQLParams = z.infer<typeof ObjectAQLParamsSchema>;
