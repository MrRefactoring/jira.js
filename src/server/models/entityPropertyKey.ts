import { z } from 'zod';
import { apiObject } from '#/core';

export const EntityPropertyKeySchema = apiObject({
  key: z.string().optional(),
  self: z.string().optional(),
});

export type EntityPropertyKey = z.infer<typeof EntityPropertyKeySchema>;
