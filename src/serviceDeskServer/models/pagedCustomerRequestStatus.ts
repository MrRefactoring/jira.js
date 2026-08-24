import { pageSchema, type Page } from './page';
import { CustomerRequestStatusSchema, type CustomerRequestStatus } from './customerRequestStatus';

export const PagedCustomerRequestStatusSchema = pageSchema(CustomerRequestStatusSchema);

/**
 * @deprecated Use `Page<CustomerRequestStatus>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PagedCustomerRequestStatus = Page<CustomerRequestStatus>;
