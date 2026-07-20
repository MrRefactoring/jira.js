import { z } from 'zod';
import { apiObject } from '#/core';
/** A project category. */

export const ProjectCategorySchema = apiObject({
  /** The description of the project category. */
  description: z.string().optional(),
  /** The ID of the project category. */
  id: z.string().optional(),
  /** The name of the project category. Required on create, optional on update. */
  name: z.string().optional(),
  /** The URL of the project category. */
  self: z.url().optional(),
});

export type ProjectCategory = z.infer<typeof ProjectCategorySchema>;
