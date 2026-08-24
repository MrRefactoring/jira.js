import { z } from 'zod';
import { apiObject } from '#/core';
import { UserSchema } from './user';
/** Representing a history event */

export const ObjectHistorySchema = apiObject({
  /** Who performed the operation */
  actor: UserSchema,
  id: z.string(),
  /** The name of the affected attribute */
  affectedAttribute: z.string().optional(),
  oldValue: z.string().optional(),
  newValue: z.string().optional(),
  type: z.number(),
  created: z.coerce.date(),
  objectId: z.string(),
});

export type ObjectHistory = z.infer<typeof ObjectHistorySchema>;
