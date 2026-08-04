import { z } from 'zod';

export const GetValidProjectKeySchema = z.object({
  /** The project key. */
  key: z.string().optional(),
});

export type GetValidProjectKey = z.input<typeof GetValidProjectKeySchema>;
