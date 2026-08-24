import { z } from 'zod';
import { apiObject } from '#/core';

export const SecurityLevelJsonSchema = apiObject({
  description: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  self: z.string().optional(),
});

export type SecurityLevelJson = z.infer<typeof SecurityLevelJsonSchema>;
