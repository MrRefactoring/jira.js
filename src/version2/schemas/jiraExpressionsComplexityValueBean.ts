import { z } from 'zod';

export const JiraExpressionsComplexityValueBeanSchema = z.object({
  /** The maximum allowed complexity. The evaluation will fail if this value is exceeded. */
  limit: z.number().int(),
  /** The complexity value of the current expression. */
  value: z.number().int(),
});

export type JiraExpressionsComplexityValueBean = z.infer<typeof JiraExpressionsComplexityValueBeanSchema>;
