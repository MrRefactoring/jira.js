import { z } from 'zod';

export const RemoveDefaultProjectClassificationParametersSchema = z.object({
  /** The project ID or project key (case-sensitive). */
  projectIdOrKey: z.string(),
});

export type RemoveDefaultProjectClassificationParameters = z.infer<
  typeof RemoveDefaultProjectClassificationParametersSchema
>;
