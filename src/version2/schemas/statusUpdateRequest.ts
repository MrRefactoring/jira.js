import { z } from 'zod';
import { StatusUpdateSchema } from './statusUpdate';

/** The list of statuses that will be updated. */
export const StatusUpdateRequestSchema = z.object({
  /** The list of statuses that will be updated. */
  statuses: z.array(StatusUpdateSchema),
});

export type StatusUpdateRequest = z.infer<typeof StatusUpdateRequestSchema>;
