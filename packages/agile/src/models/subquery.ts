import { z } from 'zod';

export const SubquerySchema = z.object({
  query: z.string().optional(),
});

export type Subquery = z.infer<typeof SubquerySchema>;
