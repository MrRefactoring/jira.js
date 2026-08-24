import { z } from 'zod';
import { apiObject } from '#/core';

export const ServiceDeskCustomerAddSchema = apiObject({
  usernames: z.array(z.string()).optional(),
});

export type ServiceDeskCustomerAdd = z.infer<typeof ServiceDeskCustomerAddSchema>;
