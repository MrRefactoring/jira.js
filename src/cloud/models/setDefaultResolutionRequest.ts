import { z } from 'zod';
import { apiObject } from '#/core';
/** The new default issue resolution. */

export const SetDefaultResolutionRequestSchema = apiObject({
  /**
   * The ID of the new default issue resolution. Must be an existing ID or null. Setting this to null erases the default
   * resolution setting.
   */
  id: z.string(),
});

export type SetDefaultResolutionRequest = z.infer<typeof SetDefaultResolutionRequestSchema>;
