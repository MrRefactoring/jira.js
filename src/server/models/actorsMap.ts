import { z } from 'zod';
import { apiObject } from '#/core';

export const ActorsMapSchema = apiObject({
  /** The usernames to add to the role. */
  user: z.array(z.string()).optional(),
  /** The groups to add to the role. */
  group: z.array(z.string()).optional(),
});

export type ActorsMap = z.infer<typeof ActorsMapSchema>;
