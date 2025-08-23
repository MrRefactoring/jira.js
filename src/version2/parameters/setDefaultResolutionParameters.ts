import { z } from 'zod';

export const SetDefaultResolutionParametersSchema = z.object({
  /**
   * The ID of the new default issue resolution. Must be an existing ID or null. Setting this to null erases the default
   * resolution setting.
   */
  id: z.string(),
});

export type SetDefaultResolutionParameters = z.infer<typeof SetDefaultResolutionParametersSchema>;
