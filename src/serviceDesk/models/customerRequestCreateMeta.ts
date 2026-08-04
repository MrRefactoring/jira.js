import { z } from 'zod';
import { apiObject } from '#/core';
import { RequestTypeFieldSchema } from './requestTypeField';

export const CustomerRequestCreateMetaSchema = apiObject({
  /** Flag indicating if participants can be added to a request (true) or not. */
  canAddRequestParticipants: z.boolean().optional(),
  /** Flag indicating if a request can be raised on behalf of another user (true) or not. */
  canRaiseOnBehalfOf: z.boolean().optional(),
  /** List of the fields included in this request. */
  requestTypeFields: z.array(RequestTypeFieldSchema).optional(),
});

export type CustomerRequestCreateMeta = z.infer<typeof CustomerRequestCreateMetaSchema>;
