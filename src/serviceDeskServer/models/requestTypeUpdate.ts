import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestTypeUpdateSchema = apiObject({
  description: z.string().optional(),
  helpText: z.string().optional(),
  name: z.string().optional(),
  requestTypeId: z.number().optional(),
});

export type RequestTypeUpdate = z.infer<typeof RequestTypeUpdateSchema>;
