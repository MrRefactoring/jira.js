import { z } from 'zod';

export const GetProjectCategoryByIdSchema = z.object({
  /** The ID of the project category. */
  id: z.number(),
});

export type GetProjectCategoryById = z.input<typeof GetProjectCategoryByIdSchema>;
