import { z } from 'zod';

/** A project category. */
export const UpdatedProjectCategorySchema = z.object({
  /** The name of the project category. */
  description: z.string().optional(),
  /** The ID of the project category. */
  id: z.string().optional(),
  /** The description of the project category. */
  name: z.string().optional(),
  /** The URL of the project category. */
  self: z.string().optional(),
});

export type UpdatedProjectCategory = z.infer<typeof UpdatedProjectCategorySchema>;
