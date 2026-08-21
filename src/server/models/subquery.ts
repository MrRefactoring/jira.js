import { z } from 'zod';
import { apiObject } from '#/core';

export const SubquerySchema = apiObject({
  query: z.string().optional(),
});

export type Subquery = z.infer<typeof SubquerySchema>;
