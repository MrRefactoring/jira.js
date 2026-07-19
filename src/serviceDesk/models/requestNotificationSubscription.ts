import { z } from 'zod';
import { apiObject } from '#/core';

export const RequestNotificationSubscriptionSchema = apiObject({
  /** Indicates whether the user is subscribed (true) or not (false) to the request's notifications. */
  subscribed: z.boolean().optional(),
});

export type RequestNotificationSubscription = z.infer<typeof RequestNotificationSubscriptionSchema>;
