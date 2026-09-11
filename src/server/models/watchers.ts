import { z } from 'zod';
import { apiObject } from '#/core';
import { UserJsonSchema } from './userJson';

export const WatchersSchema = apiObject({
  self: z.string().optional(),
  isWatching: z.boolean().optional(),
  watchCount: z.number().optional(),
  watchers: z.array(UserJsonSchema).optional(),
});

export type Watchers = z.infer<typeof WatchersSchema>;
