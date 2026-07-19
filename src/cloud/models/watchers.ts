import { z } from 'zod';
import { apiObject } from '#/core';
import { UserDetailsSchema } from './userDetails';
/** The details of watchers on an issue. */

export const WatchersSchema = apiObject({
  /** Whether the calling user is watching this issue. */
  isWatching: z.boolean().optional(),
  /** The URL of these issue watcher details. */
  self: z.string().optional(),
  /** The number of users watching this issue. */
  watchCount: z.number().optional(),
  /** Details of the users watching this issue. */
  watchers: z.array(UserDetailsSchema).optional(),
});

export type Watchers = z.infer<typeof WatchersSchema>;
