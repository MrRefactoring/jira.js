import { z } from 'zod';
import { apiObject } from '#/core';

export const StatusTypeSchema = apiObject({
  id: z.number().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.number().optional(),
  objectSchemaId: z.number().optional(),
});

export type StatusType = z.infer<typeof StatusTypeSchema>;
