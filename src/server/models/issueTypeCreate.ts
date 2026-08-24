import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const IssueTypeCreateSchema = apiObject({
  description: z.string().optional(),
  name: z.string().optional(),
  type: openEnum(['subtask', 'standard']).optional(),
});

export type IssueTypeCreate = z.infer<typeof IssueTypeCreateSchema>;
