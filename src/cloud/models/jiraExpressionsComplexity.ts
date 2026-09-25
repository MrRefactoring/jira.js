import type { z } from 'zod';
import { apiObject, requireResponseKeys } from '#/core';
import { JiraExpressionsComplexityValueSchema } from './jiraExpressionsComplexityValue';

export const JiraExpressionsComplexitySchema = requireResponseKeys(
  apiObject({
    beans: JiraExpressionsComplexityValueSchema.optional(),
    expensiveOperations: JiraExpressionsComplexityValueSchema.optional(),
    primitiveValues: JiraExpressionsComplexityValueSchema.optional(),
    steps: JiraExpressionsComplexityValueSchema.optional(),
  }),
  ['beans', 'expensiveOperations', 'primitiveValues', 'steps'],
);

export type JiraExpressionsComplexity = z.infer<typeof JiraExpressionsComplexitySchema>;
