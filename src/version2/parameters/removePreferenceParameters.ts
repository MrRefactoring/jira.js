import { z } from 'zod';

export const RemovePreferenceParametersSchema = z.object({
  /** The key of the preference. */
  key: z.string(),
});

export type RemovePreferenceParameters = z.infer<typeof RemovePreferenceParametersSchema>;
