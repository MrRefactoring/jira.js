import type { ServiceDeskCustomer } from '../models';

export interface AddCustomers extends ServiceDeskCustomer {
  /**
   * The ID of the service desk the customer list should be returned from. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
}
