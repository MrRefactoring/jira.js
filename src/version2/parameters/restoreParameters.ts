import { z } from 'zod';

export const RestoreParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
});

export type RestoreParameters = z.infer<typeof RestoreParametersSchema>;
