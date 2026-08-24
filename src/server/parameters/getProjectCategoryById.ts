import { z } from 'zod';

export const GetProjectCategoryByIdSchema = z.object({
  /** A project category id */
  id: z.number(),
});

export type GetProjectCategoryById = z.input<typeof GetProjectCategoryByIdSchema>;
