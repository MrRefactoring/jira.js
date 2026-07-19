import { z } from 'zod';
import { apiObject } from '#/core';

export const RelationSchema = apiObject({
  id: z.string().optional(),
  self: z.string().url().optional(),
});

export type Relation = z.infer<typeof RelationSchema>;
