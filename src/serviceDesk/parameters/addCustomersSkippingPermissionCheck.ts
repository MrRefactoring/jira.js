import { z } from 'zod';
import { ServiceDeskCustomerSchema } from '../models';

export const AddCustomersSkippingPermissionCheckSchema = z.object({}).extend(ServiceDeskCustomerSchema.shape).extend({
  /** The ID of the service desk to add customers to. This can alternatively be a project identifier. */
  serviceDeskId: z.string(),
});

export type AddCustomersSkippingPermissionCheck = z.input<typeof AddCustomersSkippingPermissionCheckSchema>;
