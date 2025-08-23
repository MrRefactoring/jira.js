import { z } from 'zod';

export const GetPreferenceParametersSchema = z.object({
  /** The key of the preference. */
  key: z.string(),
});

export type GetPreferenceParameters = z.infer<typeof GetPreferenceParametersSchema>;
