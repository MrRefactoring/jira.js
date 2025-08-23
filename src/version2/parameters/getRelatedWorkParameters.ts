import { z } from 'zod';

export const GetRelatedWorkParametersSchema = z.object({
  /** The ID of the version. */
  id: z.string(),
});

export type GetRelatedWorkParameters = z.infer<typeof GetRelatedWorkParametersSchema>;
