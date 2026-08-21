import { z } from 'zod';
import { apiObject } from '#/core';

export const PropertySchema = apiObject({
  id: z.string().optional(),
  key: z.string().optional(),
  value: z.string().optional(),
});

export type Property = z.infer<typeof PropertySchema>;
