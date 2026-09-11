import { z } from 'zod';
import { apiObject } from '#/core';
import { EntityTypeSchema } from './entityType';

export const EntityRefSchema = apiObject({
  key: z.string().optional(),
  name: z.string().optional(),
  type: EntityTypeSchema.optional(),
});

export type EntityRef = z.infer<typeof EntityRefSchema>;
