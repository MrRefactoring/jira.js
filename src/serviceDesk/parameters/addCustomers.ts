import { z } from 'zod';
import { ServiceDeskCustomerSchema } from '../models';

export const AddCustomersSchema = z.object({}).extend(ServiceDeskCustomerSchema.shape).extend({
  /**
   * The ID of the service desk the customer list should be returned from. This can alternatively be a [project
   * identifier.](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#project-identifiers)
   */
  serviceDeskId: z.string(),
});

export type AddCustomers = z.input<typeof AddCustomersSchema>;
