import { z } from 'zod';

export const SetPreferenceParametersSchema = z.object({
  /** The key of the preference. The maximum length is 255 characters. */
  key: z.string(),
});

export type SetPreferenceParameters = z.infer<typeof SetPreferenceParametersSchema>;
