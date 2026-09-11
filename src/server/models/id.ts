import { z } from 'zod';
import { apiObject } from '#/core';

export const IdSchema = apiObject({
  id: z.number().optional(),
});

export type Id = z.infer<typeof IdSchema>;
