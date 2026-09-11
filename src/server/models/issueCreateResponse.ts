import { z } from 'zod';
import { apiObject } from '#/core';

export const IssueCreateResponseSchema = apiObject({
  id: z.string().optional(),
  key: z.string().optional(),
  self: z.string().optional(),
});

export type IssueCreateResponse = z.infer<typeof IssueCreateResponseSchema>;
