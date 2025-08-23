import { z } from 'zod';

export const GetProjectPropertyKeysParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
});

export type GetProjectPropertyKeysParameters = z.infer<typeof GetProjectPropertyKeysParametersSchema>;
