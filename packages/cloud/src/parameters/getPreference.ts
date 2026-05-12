import { z } from 'zod';

export const GetPreferenceSchema = z.object({
  /** The key of the preference. */
  key: z.string(),
});

export type GetPreference = z.input<typeof GetPreferenceSchema>;
