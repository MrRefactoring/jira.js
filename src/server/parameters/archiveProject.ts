import { z } from 'zod';

export const ArchiveProjectSchema = z.object({
  /** Project id or project key */
  projectIdOrKey: z.string(),
});

export type ArchiveProject = z.input<typeof ArchiveProjectSchema>;
