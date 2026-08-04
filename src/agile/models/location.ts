import { z } from 'zod';
import { apiObject } from '#/core';

export const LocationSchema = apiObject({
  projectKeyOrId: z.string().optional(),
  type: z.enum(['project', 'user']).optional(),
});

export type Location = z.infer<typeof LocationSchema>;
