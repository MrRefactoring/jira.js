import { z } from 'zod';

/** A project category. */
export const ProjectCategorySchema = z.object({
  /** The description of the project category. */
  description: z.string().optional(),
  /** The ID of the project category. */
  id: z.string().optional(),
  /** The name of the project category. Required on create, optional on update. */
  name: z.string().optional(),
  /** The URL of the project category. */
  self: z.string().optional(),
});

export type ProjectCategory = z.infer<typeof ProjectCategorySchema>;
