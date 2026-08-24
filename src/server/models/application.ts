import { z } from 'zod';
import { apiObject } from '#/core';

export const ApplicationSchema = apiObject({
  name: z.string().optional(),
  type: z.string().optional(),
});

export type Application = z.infer<typeof ApplicationSchema>;
