import { z } from 'zod';

export const GetStatusCategoryParametersSchema = z.object({
  /** The ID or key of the status category. */
  idOrKey: z.string(),
});

export type GetStatusCategoryParameters = z.infer<typeof GetStatusCategoryParametersSchema>;
