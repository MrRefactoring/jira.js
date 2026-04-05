import { z } from 'zod';

export const RemovePreferenceSchema = z.object({
  /** The key of the preference. */
  key: z.string(),
});

export type RemovePreference = z.input<typeof RemovePreferenceSchema>;
