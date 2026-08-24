import { z } from 'zod';
import { apiObject } from '#/core';
import { RequestTypeFieldSchema } from './requestTypeField';

export const CustomerRequestCreateMetaSchema = apiObject({
  requestTypeFields: z.array(RequestTypeFieldSchema).optional(),
  canRaiseOnBehalfOf: z.boolean().optional(),
  canAddRequestParticipants: z.boolean().optional(),
});

export type CustomerRequestCreateMeta = z.infer<typeof CustomerRequestCreateMetaSchema>;
