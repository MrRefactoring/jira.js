import { z } from 'zod';

export const RemoveProjectCategorySchema = z.object({
  /** ID of the project category to delete. */
  id: z.number(),
});

export type RemoveProjectCategory = z.input<typeof RemoveProjectCategorySchema>;
