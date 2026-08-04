import { z } from 'zod';
import { apiObject } from '#/core';
import { JqlQueryFieldSchema } from './jqlQueryField';
/** An element of the order-by JQL clause. */

export const JqlQueryOrderByClauseElementSchema = apiObject({
  /** The direction in which to order the results. */
  direction: z.enum(['asc', 'desc']).optional(),
  field: JqlQueryFieldSchema,
});

export type JqlQueryOrderByClauseElement = z.infer<typeof JqlQueryOrderByClauseElementSchema>;
