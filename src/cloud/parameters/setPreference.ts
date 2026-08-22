import { z } from 'zod';

export const SetPreferenceSchema = z.object({
  /** The key of the preference. The maximum length is 255 characters. */
  key: z.string(),
  body: z.string(),
});

export type SetPreference = z.input<typeof SetPreferenceSchema>;
