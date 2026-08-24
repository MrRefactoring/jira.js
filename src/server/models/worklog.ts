import { z } from 'zod';
import { apiObject } from '#/core';
import { UserJsonSchema } from './userJson';
import { VisibilityJsonSchema } from './visibilityJson';

export const WorklogSchema = apiObject({
  author: UserJsonSchema.optional(),
  comment: z.string().optional(),
  created: z.string().optional(),
  id: z.string().optional(),
  issueId: z.string().optional(),
  self: z.url().optional(),
  started: z.string().optional(),
  timeSpent: z.string().optional(),
  timeSpentSeconds: z.number().optional(),
  updateAuthor: UserJsonSchema.optional(),
  updated: z.string().optional(),
  visibility: VisibilityJsonSchema.optional(),
});

export type Worklog = z.infer<typeof WorklogSchema>;
