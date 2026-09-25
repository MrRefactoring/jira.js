import type { z } from 'zod';
import { apiObject } from '#/core';
import { requiredInResponse } from '#/core/compatibility';
import { JiraExpressionsComplexityValueSchema } from './jiraExpressionsComplexityValue';

export const JiraExpressionsComplexitySchema = apiObject({
  beans: requiredInResponse(JiraExpressionsComplexityValueSchema),
  expensiveOperations: requiredInResponse(JiraExpressionsComplexityValueSchema),
  primitiveValues: requiredInResponse(JiraExpressionsComplexityValueSchema),
  steps: requiredInResponse(JiraExpressionsComplexityValueSchema),
});

export type JiraExpressionsComplexity = z.infer<typeof JiraExpressionsComplexitySchema>;
