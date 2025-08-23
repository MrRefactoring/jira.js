import { z } from 'zod';

export const UpdateDefaultProjectClassificationParametersSchema = z.object({
  /** The project ID or project key (case-sensitive). */
  projectIdOrKey: z.string(),
  /** The ID of the project classification. */
  id: z.string(),
});

export type UpdateDefaultProjectClassificationParameters = z.infer<
  typeof UpdateDefaultProjectClassificationParametersSchema
>;
