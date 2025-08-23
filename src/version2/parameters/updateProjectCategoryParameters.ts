import { z } from 'zod';

export const UpdateProjectCategoryParametersSchema = z.object({
  id: z.number().int(),
  /** The description of the project category. */
  description: z.string().optional(),
  /** The ID of the project category. */
  id: z.string().optional(),
  /** The name of the project category. Required on create, optional on update. */
  name: z.string().optional(),
  /** The URL of the project category. */
  self: z.string().optional(),
});

export type UpdateProjectCategoryParameters = z.infer<typeof UpdateProjectCategoryParametersSchema>;
