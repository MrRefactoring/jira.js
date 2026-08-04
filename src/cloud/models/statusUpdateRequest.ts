import { z } from 'zod';
import { apiObject } from '#/core';
import { StatusUpdateSchema } from './statusUpdate';
/** The list of statuses that will be updated. */

export const StatusUpdateRequestSchema = apiObject({
  /** The list of statuses that will be updated. */
  statuses: z.array(StatusUpdateSchema),
});

export type StatusUpdateRequest = z.infer<typeof StatusUpdateRequestSchema>;
