import type { z } from 'zod';
import { apiObject } from '#/core';
import { JiraExpressionsComplexityValueSchema } from './jiraExpressionsComplexityValue';

export const JiraExpressionsComplexitySchema = apiObject({
  beans: JiraExpressionsComplexityValueSchema.optional(),
  expensiveOperations: JiraExpressionsComplexityValueSchema.optional(),
  primitiveValues: JiraExpressionsComplexityValueSchema.optional(),
  steps: JiraExpressionsComplexityValueSchema.optional(),
});

export type JiraExpressionsComplexity = z.infer<typeof JiraExpressionsComplexitySchema>;
