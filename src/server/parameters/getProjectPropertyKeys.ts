import { z } from 'zod';

export const GetProjectPropertyKeysSchema = z.object({
  /** The project from which keys will be returned. */
  projectIdOrKey: z.string(),
});

export type GetProjectPropertyKeys = z.input<typeof GetProjectPropertyKeysSchema>;
