import { z } from 'zod';

export const DeleteSchemeSchema = z.object({
  /** The id of the scheme. */
  id: z.number(),
});

export type DeleteScheme = z.input<typeof DeleteSchemeSchema>;
