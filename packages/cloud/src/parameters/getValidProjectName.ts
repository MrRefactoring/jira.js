import { z } from 'zod';

export const GetValidProjectNameSchema = z.object({
  /** The project name. */
  name: z.string(),
});

export type GetValidProjectName = z.input<typeof GetValidProjectNameSchema>;
