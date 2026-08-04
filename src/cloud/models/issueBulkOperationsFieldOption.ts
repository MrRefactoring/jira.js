import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueBulkOperationsFieldOptionSchema = apiObject({
  id: z.string().optional(),
  description: z.string().optional(),
  isDisabled: z.boolean().optional(),
  issueType: z.string().optional(),
  optionId: z.number().optional(),
  priority: z.string().optional(),
  value: z.string().optional(),
});

export type IssueBulkOperationsFieldOption = z.infer<typeof IssueBulkOperationsFieldOptionSchema>;
