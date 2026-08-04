import { z } from 'zod';

export const GetProjectPropertyKeysSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
});

export type GetProjectPropertyKeys = z.input<typeof GetProjectPropertyKeysSchema>;
