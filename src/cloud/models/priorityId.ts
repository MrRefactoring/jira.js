import { z } from 'zod';
import { apiObject } from '#/core';
/** The ID of an issue priority. */

export const PriorityIdSchema = apiObject({
  /** The ID of the issue priority. */
  id: z.string(),
});

export type PriorityId = z.infer<typeof PriorityIdSchema>;
