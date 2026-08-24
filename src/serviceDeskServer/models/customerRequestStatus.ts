import { z } from 'zod';
import { apiObject } from '#/core';
import { DateSchema } from './date';

export const CustomerRequestStatusSchema = apiObject({
  status: z.string().optional(),
  statusDate: DateSchema.optional(),
});

export type CustomerRequestStatus = z.infer<typeof CustomerRequestStatusSchema>;
