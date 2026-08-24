import { z } from 'zod';

export const RemoveWatcherSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** The name of the user to remove from the watcher list. */
  userName: z.string().optional(),
  username: z.string().optional(),
});

export type RemoveWatcher = z.input<typeof RemoveWatcherSchema>;
