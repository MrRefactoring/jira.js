import { z } from 'zod';
import { JiraExpressionsComplexityValueSchema } from '#/models/jiraExpressionsComplexityValue';

export const JiraExpressionsComplexitySchema = z.object({
  beans: JiraExpressionsComplexityValueSchema.optional(),
  expensiveOperations: JiraExpressionsComplexityValueSchema.optional(),
  primitiveValues: JiraExpressionsComplexityValueSchema.optional(),
  steps: JiraExpressionsComplexityValueSchema.optional(),
});

export type JiraExpressionsComplexity = z.infer<typeof JiraExpressionsComplexitySchema>;
