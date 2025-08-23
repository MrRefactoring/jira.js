import { z } from 'zod';
import { GetPlanResponseForPageSchema } from './getPlanResponseForPage';

export const PageWithCursorGetPlanResponseForPageSchema = z.object({
  cursor: z.string().optional(),
  last: z.boolean().optional(),
  nextPageCursor: z.string().optional(),
  size: z.number().int().optional(),
  total: z.number().int().optional(),
  values: z.array(GetPlanResponseForPageSchema).optional(),
});

export type PageWithCursorGetPlanResponseForPage = z.infer<typeof PageWithCursorGetPlanResponseForPageSchema>;
