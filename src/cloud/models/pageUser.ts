import { pageSchema, type Page } from './page';
import { DashboardUserSchema, type DashboardUser } from './dashboardUser';

export const PageUserSchema = pageSchema(DashboardUserSchema);

/**
 * @deprecated Use `Page<DashboardUser>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PageUser = Page<DashboardUser>;
