import { z } from 'zod';
import { RequestTypeCreateSchema } from '../models';

export const CreateRequestTypeSchema = z.object(RequestTypeCreateSchema.shape).extend({
  /** The id of the service desk. */
  serviceDeskId: z.string(),
});

export type CreateRequestType = z.input<typeof CreateRequestTypeSchema>;
