import { pageSchema, type Page } from './page';
import { OrganizationSchema, type Organization } from './organization';

export const PagedOrganizationSchema = pageSchema(OrganizationSchema);

/**
 * @deprecated Use `Page<Organization>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PagedOrganization = Page<Organization>;
