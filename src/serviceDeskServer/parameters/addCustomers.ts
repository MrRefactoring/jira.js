import { z } from 'zod';
import { ServiceDeskCustomerAddSchema } from '../models';

export const AddCustomersSchema = z.object(ServiceDeskCustomerAddSchema.shape).extend({
  /** The ID of the service project. */
  serviceDeskId: z.string(),
});

export type AddCustomers = z.input<typeof AddCustomersSchema>;
