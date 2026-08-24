import { z } from 'zod';
import { apiObject } from '#/core';

export const DefaultTypeSchema = apiObject({
  id: z.number().optional(),
  name: z.string().optional(),
});

export type DefaultType = z.infer<typeof DefaultTypeSchema>;
