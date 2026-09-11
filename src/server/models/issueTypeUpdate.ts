import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueTypeUpdateSchema = apiObject({
  avatarId: z.number().optional(),
  description: z.string().optional(),
  name: z.string().optional(),
});

export type IssueTypeUpdate = z.infer<typeof IssueTypeUpdateSchema>;
