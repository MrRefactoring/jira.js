import type { z } from 'zod';
import { apiObject } from '#/core';
import { CustomerRequestActionSchema } from './customerRequestAction';

export const CustomerRequestActionsSchema = apiObject({
  addAttachment: CustomerRequestActionSchema.optional(),
  addComment: CustomerRequestActionSchema.optional(),
  addParticipant: CustomerRequestActionSchema.optional(),
  removeParticipant: CustomerRequestActionSchema.optional(),
});

export type CustomerRequestActions = z.infer<typeof CustomerRequestActionsSchema>;
