import { z } from 'zod';
import { apiObject } from '#/core';
import { GroupNameSchema } from './groupName';
import { UserSchema } from './user';

/** Details of a user or group subscribing to a filter. */
export const FilterSubscriptionSchema = apiObject({
  group: GroupNameSchema.optional(),
  /** The ID of the filter subscription. */
  id: z.number().optional(),
  user: UserSchema.optional(),
});

export type FilterSubscription = z.infer<typeof FilterSubscriptionSchema>;
