import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';

export const ObjectHistorySchema = apiObject({
  actor: UserSchema.optional(),
  id: z.number().optional(),
  affectedAttribute: z.string().optional(),
  oldValue: z.string().optional(),
  newValue: z.string().optional(),
  type: z.number().optional(),
  created: z.coerce.date().optional(),
  objectId: z.number().optional(),
  importSourceId: z.number().optional(),
});

export type ObjectHistory = z.infer<typeof ObjectHistorySchema>;
