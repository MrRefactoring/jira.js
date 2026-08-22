import { z } from 'zod';
import { apiObject } from '#/core';
/** The Assets Group type */

export const GroupSchema = apiObject({
  avatarUrl: z.string(),
  name: z.string(),
});

export type Group = z.infer<typeof GroupSchema>;
