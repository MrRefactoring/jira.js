import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueTypeJsonSchema = apiObject({
  avatarId: z.number().optional(),
  description: z.string().optional(),
  iconUrl: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  self: z.string().optional(),
  subtask: z.boolean().optional(),
});

export type IssueTypeJson = z.infer<typeof IssueTypeJsonSchema>;
