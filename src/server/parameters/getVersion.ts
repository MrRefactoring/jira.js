import { z } from 'zod';

export const GetVersionSchema = z.object({
  expand: z.string().optional(),
  /** ID of the version. */
  id: z.string(),
});

export type GetVersion = z.input<typeof GetVersionSchema>;
