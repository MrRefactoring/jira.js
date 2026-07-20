import { z } from 'zod';
import { apiObject } from '#/core';

export const GroupSchema = apiObject({
  name: z.string().optional(),
  self: z.url().optional(),
});

export type Group = z.infer<typeof GroupSchema>;
