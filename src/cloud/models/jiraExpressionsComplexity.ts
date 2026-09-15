import type { z } from 'zod';
import { apiObject } from '#/core';
import { JiraExpressionsComplexityValueSchema } from './jiraExpressionsComplexityValue';

export const JiraExpressionsComplexitySchema = apiObject({
  beans: JiraExpressionsComplexityValueSchema,
  expensiveOperations: JiraExpressionsComplexityValueSchema,
  primitiveValues: JiraExpressionsComplexityValueSchema,
  steps: JiraExpressionsComplexityValueSchema,
});

export type JiraExpressionsComplexity = z.infer<typeof JiraExpressionsComplexitySchema>;
