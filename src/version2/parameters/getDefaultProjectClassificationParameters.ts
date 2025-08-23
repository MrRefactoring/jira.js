import { z } from 'zod';

export const GetDefaultProjectClassificationParametersSchema = z.object({
  /** The project ID or project key (case-sensitive). */
  projectIdOrKey: z.string(),
});

export type GetDefaultProjectClassificationParameters = z.infer<typeof GetDefaultProjectClassificationParametersSchema>;
