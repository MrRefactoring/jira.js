import { z } from 'zod';

export const JiraExpressionsComplexityValueSchema = z.object({
  /** The maximum allowed complexity. The evaluation will fail if this value is exceeded. */
  limit: z.number(),
  /** The complexity value of the current expression. */
  value: z.number(),
});

export type JiraExpressionsComplexityValue = z.infer<typeof JiraExpressionsComplexityValueSchema>;
