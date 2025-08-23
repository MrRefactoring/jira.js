import { z } from 'zod';

export const AddWatcherParametersSchema = z.object({
  /** The ID or key of the issue. */
  issueIdOrKey: z.string(),
});

export type AddWatcherParameters = z.infer<typeof AddWatcherParametersSchema>;
