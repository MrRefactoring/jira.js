import { z } from 'zod';
import { apiObject } from '#/core';
import { ManageabilityRestrictionReasonSchema } from './manageabilityRestrictionReason';

/** You are not allowed to take or write the action/property */
export const ManageabilityUnallowedSchema = apiObject({
  allowed: z.literal(false),
  reason: ManageabilityRestrictionReasonSchema,
});

export type ManageabilityUnallowed = z.infer<typeof ManageabilityUnallowedSchema>;
