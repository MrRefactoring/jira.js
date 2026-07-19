import { z } from 'zod';
import { ServiceDeskCustomerSchema } from '../models';

export const AddCustomersSkippingPermissionCheckSchema = z
  .object({
    /** The ID of the service desk to add customers to. This can alternatively be a project identifier. */
    serviceDeskId: z.string(),
  })
  .extend(ServiceDeskCustomerSchema.shape);

export type AddCustomersSkippingPermissionCheck = z.input<typeof AddCustomersSkippingPermissionCheckSchema>;
