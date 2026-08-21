import { z } from 'zod';

export const RestoreProjectSchema = z.object({
  /** Project id or project key */
  projectIdOrKey: z.string(),
});

export type RestoreProject = z.input<typeof RestoreProjectSchema>;
