import { z } from 'zod';

export const SetPreferenceSchema = z.object({
  /** Key of the preference to be set. */
  key: z.string().optional(),
  body: z.string().optional(),
});

export type SetPreference = z.input<typeof SetPreferenceSchema>;
