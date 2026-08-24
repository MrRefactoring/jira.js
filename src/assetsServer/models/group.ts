import { z } from 'zod';
import { apiObject } from '#/core';

export const GroupSchema = apiObject({
  avatarUrl: z.string().optional(),
  name: z.string().optional(),
});

export type Group = z.infer<typeof GroupSchema>;
