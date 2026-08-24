import { z } from 'zod';
import { apiObject } from '#/core';

export const QueueCreateSchema = apiObject({
  name: z.string().optional(),
  jql: z.string().optional(),
  fields: z.array(z.string()).optional(),
});

export type QueueCreate = z.infer<typeof QueueCreateSchema>;
