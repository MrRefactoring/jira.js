import { z } from 'zod';

export const GetPreferenceSchema = z.object({
  /** Key of the preference to be returned. */
  key: z.string().optional(),
});

export type GetPreference = z.input<typeof GetPreferenceSchema>;
