import { z } from 'zod';

export const GetOrgsSchema = z.object({
  /** Sets the starting point for the page of results to return. */
  cursor: z.string().optional(),
});

export type GetOrgs = z.input<typeof GetOrgsSchema>;
