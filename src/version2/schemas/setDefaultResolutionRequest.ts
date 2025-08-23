import { z } from 'zod';

/** The new default issue resolution. */
export const SetDefaultResolutionRequestSchema = z.object({
  /**
   * The ID of the new default issue resolution. Must be an existing ID or null. Setting this to null erases the default
   * resolution setting.
   */
  id: z.string(),
});

export type SetDefaultResolutionRequest = z.infer<typeof SetDefaultResolutionRequestSchema>;
