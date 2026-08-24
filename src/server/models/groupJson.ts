import { z } from 'zod';
import { apiObject } from '#/core';

export const GroupJsonSchema = apiObject({
  name: z.string().optional(),
  self: z.url().optional(),
});

export type GroupJson = z.infer<typeof GroupJsonSchema>;
