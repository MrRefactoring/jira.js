import { z } from 'zod';

export const ValidateProjectKeySchema = z.object({
  /** The project key. */
  key: z.string().optional(),
});

export type ValidateProjectKey = z.input<typeof ValidateProjectKeySchema>;
