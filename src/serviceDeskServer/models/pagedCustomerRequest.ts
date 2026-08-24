import { pageSchema, type Page } from './page';
import { CustomerRequestSchema, type CustomerRequest } from './customerRequest';

export const PagedCustomerRequestSchema = pageSchema(CustomerRequestSchema);

/**
 * @deprecated Use `Page<CustomerRequest>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PagedCustomerRequest = Page<CustomerRequest>;
