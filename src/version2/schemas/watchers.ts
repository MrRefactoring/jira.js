import { z } from 'zod';
import { UserDetailsSchema } from './userDetails';

/** The details of watchers on an issue. */
export const WatchersSchema = z.object({
  /** Whether the calling user is watching this issue. */
  isWatching: z.boolean().optional(),
  /** The URL of these issue watcher details. */
  self: z.string().optional(),
  /** The number of users watching this issue. */
  watchCount: z.number().int().optional(),
  /** Details of the users watching this issue. */
  watchers: z.array(UserDetailsSchema).optional(),
});

export type Watchers = z.infer<typeof WatchersSchema>;
