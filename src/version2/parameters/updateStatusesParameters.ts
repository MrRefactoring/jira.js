import { z } from 'zod';
import { StatusUpdateSchema } from './statusUpdate';

export const UpdateStatusesParametersSchema = z.object({
  /** The list of statuses that will be updated. */
  statuses: z.array(StatusUpdateSchema),
});

export type UpdateStatusesParameters = z.infer<typeof UpdateStatusesParametersSchema>;
