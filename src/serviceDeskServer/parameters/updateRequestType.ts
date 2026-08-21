import { z } from 'zod';
import { RequestTypeUpdateSchema } from '../models';

export const UpdateRequestTypeSchema = z.object(RequestTypeUpdateSchema.shape).extend({
  /** The id of the service desk. */
  serviceDeskId: z.string(),
});

export type UpdateRequestType = z.input<typeof UpdateRequestTypeSchema>;
