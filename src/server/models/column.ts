import { z } from 'zod';
import { apiObject } from '#/core';
import { RelationSchema } from './relation';

export const ColumnSchema = apiObject({
  max: z.number().optional(),
  min: z.number().optional(),
  name: z.string().optional(),
  statuses: z.array(RelationSchema).optional(),
});

export type Column = z.infer<typeof ColumnSchema>;
