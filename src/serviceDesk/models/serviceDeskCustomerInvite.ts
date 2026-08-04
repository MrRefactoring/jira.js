import { z } from 'zod';
import { apiObject } from '#/core';

export const ServiceDeskCustomerInviteSchema = apiObject({
  /** Customer's name for display in the UI. */
  displayName: z.string().optional(),
  /** Customer's email address. */
  email: z.string().optional(),
});

export type ServiceDeskCustomerInvite = z.infer<typeof ServiceDeskCustomerInviteSchema>;
