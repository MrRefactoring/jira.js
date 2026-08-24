import { z } from 'zod';
import { apiObject } from '#/core';
import { StatusJsonSchema } from './statusJson';

export const IssueTypeWithStatusJsonSchema = apiObject({
  id: z.string().optional(),
  name: z.string().optional(),
  self: z.string().optional(),
  statuses: z.array(StatusJsonSchema).optional(),
  subtask: z.boolean().optional(),
});

export type IssueTypeWithStatusJson = z.infer<typeof IssueTypeWithStatusJsonSchema>;
