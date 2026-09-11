import { z } from 'zod';
import { apiObject } from '#/core';

export const PriorityJsonSchema = apiObject({
  description: z.string().optional(),
  iconUrl: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  self: z.string().optional(),
  statusColor: z.string().optional(),
});

export type PriorityJson = z.infer<typeof PriorityJsonSchema>;
