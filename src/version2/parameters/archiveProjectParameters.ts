import { z } from 'zod';

export const ArchiveProjectParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
});

export type ArchiveProjectParameters = z.infer<typeof ArchiveProjectParametersSchema>;
