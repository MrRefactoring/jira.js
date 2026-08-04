import { z } from 'zod';
import { apiObject } from '#/core';

export const JiraExpressionsComplexityValueSchema = apiObject({
  /** The maximum allowed complexity. The evaluation will fail if this value is exceeded. */
  limit: z.number(),
  /** The complexity value of the current expression. */
  value: z.number(),
});

export type JiraExpressionsComplexityValue = z.infer<typeof JiraExpressionsComplexityValueSchema>;
