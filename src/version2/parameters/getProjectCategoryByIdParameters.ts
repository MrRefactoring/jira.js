import { z } from 'zod';

export const GetProjectCategoryByIdParametersSchema = z.object({
  /** The ID of the project category. */
  id: z.number().int(),
});

export type GetProjectCategoryByIdParameters = z.infer<typeof GetProjectCategoryByIdParametersSchema>;
