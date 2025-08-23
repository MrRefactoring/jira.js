import { z } from 'zod';

export const RemoveProjectCategoryParametersSchema = z.object({
  /** ID of the project category to delete. */
  id: z.number().int(),
});

export type RemoveProjectCategoryParameters = z.infer<typeof RemoveProjectCategoryParametersSchema>;
