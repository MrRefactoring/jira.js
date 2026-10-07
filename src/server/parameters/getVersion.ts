import { z } from 'zod';

export const GetVersionSchema = z.object({
  /** This parameter is a comma-separated list. */
  expand: z.array(z.string()).optional(),
  /** ID of the version. */
  id: z.string(),
});

export type GetVersion = z.input<typeof GetVersionSchema>;
