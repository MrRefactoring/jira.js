import { pageSchema, type Page } from './page';
import { CustomerTransitionSchema, type CustomerTransition } from './customerTransition';

export const PagedCustomerTransitionSchema = pageSchema(CustomerTransitionSchema);

/**
 * @deprecated Use `Page<CustomerTransition>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PagedCustomerTransition = Page<CustomerTransition>;
