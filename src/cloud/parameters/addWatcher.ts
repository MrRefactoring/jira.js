import { z } from 'zod';

export const AddWatcherSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  body: z.string(),
});

export type AddWatcher = z.input<typeof AddWatcherSchema>;
