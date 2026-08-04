import { z } from 'zod';
import { apiObject } from '#/core';

export const ErrorSchema = apiObject({
  count: z.number().optional(),
  issueIdsOrKeys: z.array(z.string()).optional(),
  message: z.string().optional(),
});

export type Error = z.infer<typeof ErrorSchema>;
