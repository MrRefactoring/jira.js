import type { ServiceDeskCustomer } from '../models';

export interface RemoveCustomers extends ServiceDeskCustomer {
  /**
   * The ID of the service desk the customers should be removed from. This can alternatively be a [project
   * identifier.](#project-identifiers)
   */
  serviceDeskId: string;
}
