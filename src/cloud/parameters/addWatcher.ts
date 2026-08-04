import { z } from 'zod';

export const AddWatcherSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
  body: z.record(z.string(), z.any()),
});

export type AddWatcher = z.input<typeof AddWatcherSchema>;
