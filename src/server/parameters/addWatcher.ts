import { z } from 'zod';

export const AddWatcherSchema = z.object({
  /** Issue id or key */
  issueIdOrKey: z.string(),
  /** The name of the user to add to the watcher list. If no name is specified, the current user is added. */
  userName: z.string().optional(),
  body: z.string().optional(),
});

export type AddWatcher = z.input<typeof AddWatcherSchema>;
