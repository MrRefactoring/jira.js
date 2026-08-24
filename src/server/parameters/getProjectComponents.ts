import { z } from 'zod';

export const GetProjectComponentsSchema = z.object({
  /** Project id or project key */
  projectIdOrKey: z.string(),
});

export type GetProjectComponents = z.input<typeof GetProjectComponentsSchema>;
