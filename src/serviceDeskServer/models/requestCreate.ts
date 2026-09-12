import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestCreateSchema = apiObject({
  serviceDeskId: z.string().optional(),
  requestTypeId: z.string().optional(),
  requestFieldValues: z.record(z.string(), z.any()).optional(),
  requestParticipants: z.array(z.string()).optional(),
  raiseOnBehalfOf: z.string().optional(),
});

export type RequestCreate = z.infer<typeof RequestCreateSchema>;
