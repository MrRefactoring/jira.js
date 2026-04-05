import { z } from 'zod';

export const GetProjectEmailSchema = z.object({
  /** The project ID. */
  projectId: z.number(),
});

export type GetProjectEmail = z.input<typeof GetProjectEmailSchema>;
