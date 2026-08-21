import { z } from 'zod';

export const RemovePreferenceSchema = z.object({
  /** Key of the preference to be removed. */
  key: z.string().optional(),
});

export type RemovePreference = z.input<typeof RemovePreferenceSchema>;
