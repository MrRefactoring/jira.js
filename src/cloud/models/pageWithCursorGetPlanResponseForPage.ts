import { z } from 'zod';
import { apiObject } from '#/core';
import { GetPlanResponseForPageSchema } from './getPlanResponseForPage';

export const PageWithCursorGetPlanResponseForPageSchema = apiObject({
  cursor: z.string().optional(),
  last: z.boolean().optional(),
  nextPageCursor: z.string().optional(),
  size: z.number().optional(),
  total: z.number().optional(),
  values: z.array(GetPlanResponseForPageSchema).optional(),
});

export type PageWithCursorGetPlanResponseForPage = z.infer<typeof PageWithCursorGetPlanResponseForPageSchema>;
