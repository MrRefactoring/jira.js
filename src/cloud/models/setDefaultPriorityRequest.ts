import { z } from 'zod';
import { apiObject } from '#/core';
/** The new default issue priority. */

export const SetDefaultPriorityRequestSchema = apiObject({
  /**
   * The ID of the new default issue priority. Must be an existing ID or null. Setting this to null erases the default
   * priority setting.
   */
  id: z.string(),
});

export type SetDefaultPriorityRequest = z.infer<typeof SetDefaultPriorityRequestSchema>;
