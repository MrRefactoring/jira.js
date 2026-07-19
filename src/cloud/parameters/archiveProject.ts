import { z } from 'zod';

export const ArchiveProjectSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
});

export type ArchiveProject = z.input<typeof ArchiveProjectSchema>;
