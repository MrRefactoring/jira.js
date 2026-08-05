import { z } from 'zod';
import { apiObject, openEnum } from '#/core';

export const LocationSchema = apiObject({
  projectKeyOrId: z.string().optional(),
  type: openEnum(['project', 'user']).optional(),
});

export type Location = z.infer<typeof LocationSchema>;
