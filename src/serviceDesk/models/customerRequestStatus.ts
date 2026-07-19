import { z } from 'zod';
import { apiObject } from '#/core';
import { DateSchema } from './date';

export const CustomerRequestStatusSchema = apiObject({
  /** Name of the status condition. */
  status: z.string().optional(),
  /** Status category the status belongs to. */
  statusCategory: z.enum(['UNDEFINED', 'NEW', 'INDETERMINATE', 'DONE']).optional(),
  statusDate: DateSchema.optional(),
});

export type CustomerRequestStatus = z.infer<typeof CustomerRequestStatusSchema>;
