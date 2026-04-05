import { z } from 'zod';
import { GetPlanResponseForPageSchema } from '#/models/getPlanResponseForPage';

export const PageWithCursorGetPlanResponseForPageSchema = z.object({
  cursor: z.string().optional(),
  last: z.boolean().optional(),
  nextPageCursor: z.string().optional(),
  size: z.number().optional(),
  total: z.number().optional(),
  values: z.array(GetPlanResponseForPageSchema).optional(),
});

export type PageWithCursorGetPlanResponseForPage = z.infer<typeof PageWithCursorGetPlanResponseForPageSchema>;
