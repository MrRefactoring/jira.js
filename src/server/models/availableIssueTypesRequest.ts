import { z } from 'zod';
import { apiObject } from '#/core';

export const AvailableIssueTypesRequestSchema = apiObject({
  ignoredIssueTypeIds: z.array(z.string()).optional(),
});

export type AvailableIssueTypesRequest = z.infer<typeof AvailableIssueTypesRequestSchema>;
